import CourseCard from "../Components/Coursecard"
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCourses } from '../api'

const Home = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses()
        setCourses(res.data)
      } catch (err) {
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )

  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="alert alert-error">{error}</div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">Available Courses</h1>
      <p className="text-base-content/60 mb-6">Browse and enroll in courses offered this semester</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default Home