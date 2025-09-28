"use client"

import { useEffect } from "react"

export default function SafeFetchGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const origFetch = window.fetch.bind(window)

    // Wrap fetch to short-circuit FullStory requests (which fail in this environment)
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      try {
        const url = typeof input === "string" ? input : (input as Request).url
        if (url && url.includes("fullstory.com")) {
          // Return an empty successful response to avoid third-party errors
          return Promise.resolve(new Response(null, { status: 204, statusText: "No Content" }))
        }
      } catch (err) {
        // ignore parsing errors and fall through to real fetch
      }

      return origFetch(input, init)
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
