import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import SafeFetchGuard from "@/components/safe-fetch-guard"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "MIGEPROF Stakeholder Mapping Tool",
  description: "Stakeholder coordination and planning platform for MIGEPROF",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SafeFetchGuard />
        <AuthProvider>
          <Shell>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </Shell>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
