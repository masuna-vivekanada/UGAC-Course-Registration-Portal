import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCourse, enroll } from '../api'
import { useAuth } from '../context/Authcontext.jsx'

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [enrollMsg, setEnrollMsg] = useState('')
  const [enrolling, setEnrolling] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourse(id)
        setCourse(res.data)
      } catch (err) {
        setError('Course not found')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    setEnrolling(true)
    setEnrollMsg('')
    try {
      await enroll(id)
      setEnrollMsg('Successfully enrolled! Status: Pending')
    } catch (err) {
      setEnrollMsg(err.response?.data?.message || 'Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )

  if (error || !course) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="alert alert-error">{error}</div>
      <Link to="/" className="btn btn-primary mt-4">Back to Courses</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <Link to="/" className="btn btn-ghost btn-sm mb-6">← Back to Courses</Link>

      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">

          <div className="flex justify-between items-start">
            <span className="text-primary font-semibold">{course.department}</span>
            <div className="flex gap-2">
              <span className="badge badge-outline">{course.type}</span>
              <span className="badge badge-outline">{course.credits} Credits</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-base-content mt-1">
            <span className="text-primary">{course.code}</span> {course.title}
          </h1>

          <div className="divider"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-base-content/50 uppercase text-xs font-semibold mb-1">Instructor</p>
              <p>👤 {course.instructor}</p>
            </div>
            <div>
              <p className="text-base-content/50 uppercase text-xs font-semibold mb-1">Schedule</p>
              <p>🕐 {course.schedule}</p>
            </div>
            <div>
              <p className="text-base-content/50 uppercase text-xs font-semibold mb-1">Seats Available</p>
              <p>👥 {course.seatsLeft} / {course.capacity}</p>
            </div>
          </div>

          <div className="divider"></div>

          <div>
            <p className="text-base-content/50 uppercase text-xs font-semibold mb-2">Description</p>
            <p className="text-base-content/80 leading-relaxed">{course.description}</p>
          </div>

          {enrollMsg && (
            <div className={`alert mt-4 ${enrollMsg.includes('Success') ? 'alert-success' : 'alert-error'}`}>
              {enrollMsg}
            </div>
          )}

          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary"
              onClick={handleEnroll}
              disabled={enrolling}
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now →'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CourseDetail