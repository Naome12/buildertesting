"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please enter both email and password")
      return
    }

    const success = await login(username, password)
    if (!success) {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-950 p-4 relative">
      {/* Top-left corner flag and text */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <img 
          src="/rwanda-flag.png" 
          alt="Rwanda Flag" 
          className="w-12 h-8 object-cover rounded shadow-md"
        />
        <div className="text-white">
          <div className="text-sm font-semibold leading-tight">Stakeholder</div>
          <div className="text-sm font-semibold leading-tight">Mapping Tool</div>
        </div>
      </div>

      {/* Main Content - All elements moved out of card */}
      <div className="w-full max-w-md mt-24 text-center">
        {/* Rwanda Emblem and Title */}
        <div className="space-y-4">
          <div className="mx-auto w-40 h-40 flex items-center justify-center">
            <img 
              src="/RWANDA-EMBELM.png" 
              alt="Rwanda Emblem" 
              className="w-full h-full object-contain"
            />
          </div>
        
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              className="transition-all duration-200 focus:ring-2 focus:ring-white/20 border-0 bg-blue-600/50 text-white placeholder:text-blue-200"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              className="transition-all duration-200 focus:ring-2 focus:ring-white/20 border-0 bg-blue-600/50 text-white placeholder:text-blue-200"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300 bg-red-500/20 border-0">
              <AlertDescription className="text-white">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full transition-all duration-200 hover:scale-[1.02] bg-white text-blue-800 hover:bg-blue-100 hover:text-blue-900 font-semibold border-0"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full flex flex-col items-center justify-center text-white mt-8">
        <div className="flex items-center gap-3 mb-2">
          <img 
            src="/RWANDA-EMBELM.png" 
            alt="Rwanda Emblem" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">MIGEPROF</span>
        </div>
        <div className="text-xs text-blue-200 text-center">
          <p>© {new Date().getFullYear()} Ministry of Gender and Family Promotion (MIGEPROF)</p>
          <p>Republic of Rwanda | All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}