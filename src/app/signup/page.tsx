'use client'

import { useState } from 'react'
import { createClient } from '../lib/supabase/client'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Create profile
      await supabase.from('profiles').insert({
        id: data.user.id,
        username: username,
      })
      setMessage('Check your email to confirm your account!')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <form onSubmit={handleSignUp} className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Join Gridlock</h1>
        
        <div className="mb-4">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
            required
          />
        </div>

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
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm">{message}</p>
        )}
      </form>
    </main>
  )
}