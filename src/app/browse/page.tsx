'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase/client'

export default function Browse() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const genres = ['all', 'plugg', 'rage', 'hyperpop', 'dark', 'melodic']

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('courses').select('*').eq('is_published', true)
      setCourses(data || [])
      setLoading(false)
    }
    fetchCourses()
  }, [])

  const filteredCourses = filter === 'all' ? courses : courses.filter(c => c.genre === filter)

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Browse Courses</h1>
      
      <div className="flex gap-2 mb-8">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setFilter(genre)}
            className={filter === genre ? 'px-4 py-2 rounded-full text-sm font-medium bg-pink-600 text-white' : 'px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300'}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-gray-500">No courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <a key={course.id} href={'/course/' + course.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-pink-500">
              <div className="h-32 bg-gradient-to-br from-pink-600 to-purple-800"></div>
              <div className="p-4">
                <span className="text-xs text-pink-400 uppercase">{course.genre}</span>
                <h3 className="text-lg font-bold mt-1">{course.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{course.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  )
}