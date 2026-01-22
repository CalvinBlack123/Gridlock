'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/client'
import { useParams } from 'next/navigation'

export default function CoursePage() {
  const params = useParams()
  const [course, setCourse] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      const supabase = createClient()
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', params.id)
        .single()
      setCourse(courseData)

      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', params.id)
        .order('order_index')
      setLessons(lessonData || [])
      setLoading(false)
    }
    fetchCourse()
  }, [params.id])

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading...</div>
  if (!course) return <div className="min-h-screen bg-black text-white p-8">Course not found</div>

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <span className="text-pink-400 text-sm uppercase">{course.genre}</span>
        <h1 className="text-4xl font-bold mt-2">{course.title}</h1>
        <p className="text-gray-400 mt-4">{course.description}</p>
        <span className="text-sm text-gray-500">{course.difficulty}</span>

        <h2 className="text-2xl font-bold mt-12 mb-6">Lessons</h2>
        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons yet.</p>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <a key={lesson.id} href={'/lesson/' + lesson.id} className="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-pink-500">
                <span className="text-gray-500 text-sm">Lesson {index + 1}</span>
                <h3 className="text-lg font-medium mt-1">{lesson.title}</h3>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}