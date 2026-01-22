'use client'

import { useState } from 'react'
import { createClient } from '../lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    router.push('/')
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back</h1>

        <div className="mb-4">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-pink-600 hover:bg-pink-700 rounded font-bold"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-400">{message}</p>
        )}

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account? <a href="/signup" className="text-pink-500">Sign up</a>
        </p>
      </form>
    </main>
  )
}