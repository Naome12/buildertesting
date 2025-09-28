"use client"

import { useEffect } from "react"

export default function SafeFetchGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const origFetch = window.fetch.bind(window)

    // Wrap fetch to short-circuit FullStory requests (which fail in this environment)
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      let urlStr: string | null = null
      try {
        urlStr = typeof input === "string" ? input : (input as Request).url
        if (urlStr && urlStr.includes("fullstory.com")) {
          // Return an empty successful response to avoid third-party errors
          return Promise.resolve(new Response(null, { status: 204, statusText: "No Content" }))
        }
      } catch (err) {
        // ignore parsing errors and fall through to real fetch
      }

      // Attempt fetch; if it fails for same-origin absolute URLs, retry using relative path
      try {
        return origFetch(input, init).catch((err) => {
          try {
            if (urlStr && typeof window !== "undefined") {
              const origin = window.location.origin
              if (urlStr.startsWith(origin)) {
                const relative = urlStr.substring(origin.length) || "/"
                return origFetch(relative, init)
              }
            }
          } catch (e) {
            // ignore
          }
          // rethrow original error if no retry possible
          throw err
        })
      } catch (e) {
        // If origFetch throws synchronously for some reason, attempt relative retry
        try {
          if (urlStr && typeof window !== "undefined") {
            const origin = window.location.origin
            if (urlStr.startsWith(origin)) {
              const relative = urlStr.substring(origin.length) || "/"
              return origFetch(relative, init)
            }
          }
        } catch (ee) {
          // ignore
        }
        // fallback to original fetch call (which will likely reject)
        return origFetch(input, init)
      }
    }

    return () => {
      try {
        window.fetch = origFetch
      } catch (e) {
        // noop
      }
    }
  }, [])

  return null
}
