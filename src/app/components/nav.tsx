'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Nav() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login')
  }
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-pink-500">Gridlock</a>
        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <a href="/browse" className="text-gray-300 hover:text-white">Browse</a>
              <button onClick={handleLogout} className="text-gray-400 hover:text-white">Log out</button>
            </>
          ) : (
            <>
              <a href="/login" className="text-gray-300 hover:text-white">Log in</a>
              <a href="/signup" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded font-medium">Sign up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}