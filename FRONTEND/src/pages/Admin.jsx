import { useState, useEffect } from 'react'
import { getCourses, addCourse, updateCourse, deleteCourse, allRegistrations, updateRegistration } from '../api'

const emptyForm = {
  department: '',
  code: '',
  title: '',
  type: 'Theory',
  credits: '',
  instructor: '',
  schedule: '',
  capacity: '',
  description: ''
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('courses')
  const [courses, setCourses] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    fetchCourses()
    fetchApplications()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await getCourses()
      setCourses(res.data)
    } catch (err) {
      console.error('Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const res = await allRegistrations()
      setApplications(res.data)
    } catch (err) {
      console.error('Failed to fetch applications')
    }
  }

  const handleAddCourse = () => {
    setEditingCourse(null)
    setFormData(emptyForm)
    setShowModal(true)
  }

  const handleEditCourse = (course) => {
    setEditingCourse(course)
    setFormData(course)
    setShowModal(true)
  }

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id)
      setCourses(courses.filter(c => c._id !== id))
    } catch (err) {
      alert('Failed to delete course')
    }
  }

  const handleSaveCourse = async () => {
    try {
      if (editingCourse) {
        const res = await updateCourse(editingCourse._id, formData)
        setCourses(courses.map(c => c._id === editingCourse._id ? res.data : c))
      } else {
        const res = await addCourse({ ...formData, seatsLeft: formData.capacity })
        setCourses([...courses, res.data])
      }
      setShowModal(false)
    } catch (err) {
      alert('Failed to save course')
    }
  }

  const handleAccept = async (id) => {
    try {
      await updateRegistration(id, 'accepted')
      setApplications(applications.map(a =>
        a._id === id ? { ...a, status: 'accepted' } : a
      ))
    } catch (err) {
      alert('Failed to update')
    }
  }

  const handleReject = async (id) => {
    try {
      await updateRegistration(id, 'rejected')
      setApplications(applications.map(a =>
        a._id === id ? { ...a, status: 'rejected' } : a
      ))
    } catch (err) {
      alert('Failed to update')
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
        <p className="text-base-content/60 text-sm mt-1">Manage courses and applications</p>
      </div>

      <div className="tabs tabs-bordered mb-6">
        <button
          className={`tab tab-lg font-medium ${activeTab === 'courses' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses ({courses.length})
        </button>
        <button
          className={`tab tab-lg font-medium ${activeTab === 'applications' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Applications ({applications.length})
        </button>
      </div>

      {activeTab === 'courses' && (
        <div>
          <div className="flex justify-end mb-4">
            <button className="btn btn-primary btn-sm" onClick={handleAddCourse}>
              + Add Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course._id} className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">

                  <div className="flex justify-between items-center mb-1">
                    <span className="text-primary text-sm font-semibold">{course.department}</span>
                    <div className="flex gap-2">
                      <span className="badge badge-outline text-xs">{course.type}</span>
                      <span className="badge badge-outline text-xs">{course.credits} Credits</span>
                    </div>
                  </div>

                  <h2 className="card-title">
                    <span className="text-primary font-bold">{course.code}</span> {course.title}
                  </h2>

                  <div className="text-sm text-base-content/70 flex flex-col gap-1 mt-1">
                    <span>👤 {course.instructor}</span>
                    <span>🕐 {course.schedule}</span>
                    <span>👥 {course.seatsLeft} / {course.capacity} seats left</span>
                  </div>

                  <p className="text-sm text-base-content/60 mt-2 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="card-actions justify-end mt-3 gap-2">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleEditCourse(course)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-error btn-sm btn-outline"
                      onClick={() => handleDeleteCourse(course._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="flex flex-col gap-4">
          {applications.length === 0 ? (
            <div className="text-center text-base-content/50 py-12">
              No applications yet
            </div>
          ) : (
            applications.map(app => (
              <div key={app._id} className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{app.user?.name}</span>
                        <span className="text-base-content/40 text-xs">@{app.user?.ldapId}</span>
                      </div>
                      <div className="text-sm text-base-content/60">
                        <span className="text-primary font-medium">{app.course?.code}</span> — {app.course?.title}
                      </div>
                      <div className="text-xs text-base-content/40 mt-1">
                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`badge ${app.status === 'accepted' ? 'badge-success' :
                        app.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>

                      {app.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="btn btn-success btn-sm btn-outline"
                            onClick={() => handleAccept(app._id)}>
                            Accept
                          </button>
                          <button className="btn btn-error btn-sm btn-outline"
                            onClick={() => handleReject(app._id)}>
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg text-primary mb-4">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Department</label>
                <input type="text" className="input input-bordered w-full input-sm"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Course Code</label>
                <input type="text" className="input input-bordered w-full input-sm"
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Course Title</label>
                <input type="text" className="input input-bordered w-full input-sm"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Instructor</label>
                <input type="text" className="input input-bordered w-full input-sm"
                  value={formData.instructor}
                  onChange={e => setFormData({ ...formData, instructor: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Schedule</label>
                <input type="text" className="input input-bordered w-full input-sm"
                  value={formData.schedule}
                  onChange={e => setFormData({ ...formData, schedule: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Credits</label>
                <input type="number" className="input input-bordered w-full input-sm"
                  value={formData.credits}
                  onChange={e => setFormData({ ...formData, credits: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Capacity</label>
                <input type="number" className="input input-bordered w-full input-sm"
                  value={formData.capacity}
                  onChange={e => setFormData({ ...formData, capacity: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Type</label>
                <select className="select select-bordered w-full select-sm"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}>
                  <option>Theory</option>
                  <option>Lab</option>
                  <option>Elective</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-base-content/70 mb-1 block">Description</label>
                <textarea className="textarea textarea-bordered w-full" rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>

            <div className="modal-action">
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleSaveCourse}>
                {editingCourse ? 'Save Changes' : 'Add Course'}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
        </div>
      )}

    </div>
  )
}

export default Admin