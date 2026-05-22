import { useState, useEffect } from 'react'
import { myRegistrations } from '../api'

const statusConfig = {
  accepted: { label: "Accepted", className: "badge-success" },
  pending: { label: "Pending", className: "badge-warning" },
  rejected: { label: "Rejected", className: "badge-error" }
}

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await myRegistrations()
        setRegistrations(res.data)
      } catch (err) {
        setError('Failed to load registrations')
      } finally {
        setLoading(false)
      }
    }
    fetchRegistrations()
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )

  if (error) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="alert alert-error">{error}</div>
    </div>
  )

  const accepted = registrations.filter(r => r.status === 'accepted').length
  const pending = registrations.filter(r => r.status === 'pending').length
  const rejected = registrations.filter(r => r.status === 'rejected').length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">My Dashboard</h1>
        <p className="text-base-content/60 text-sm mt-1">Track your course registrations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body py-4 px-5">
            <p className="text-base-content/50 text-xs uppercase font-semibold">Applied</p>
            <p className="text-3xl font-bold text-primary">{registrations.length}</p>
          </div>
        </div>
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body py-4 px-5">
            <p className="text-base-content/50 text-xs uppercase font-semibold">Accepted</p>
            <p className="text-3xl font-bold text-success">{accepted}</p>
          </div>
        </div>
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body py-4 px-5">
            <p className="text-base-content/50 text-xs uppercase font-semibold">Pending</p>
            <p className="text-3xl font-bold text-warning">{pending}</p>
          </div>
        </div>
      </div>

      {/* Registrations */}
      {registrations.length === 0 ? (
        <div className="text-center text-base-content/50 py-12">
          No registrations yet — browse courses and enroll!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {registrations.map(reg => (
            <div key={reg._id} className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-primary">{reg.course?.code}</span>
                      <span className="text-base-content/40 text-xs">{reg.course?.department}</span>
                    </div>
                    <h3 className="font-semibold text-base-content">{reg.course?.title}</h3>
                    <div className="text-sm text-base-content/60 mt-1 flex gap-4">
                      <span>👤 {reg.course?.instructor}</span>
                      <span>🕐 {reg.course?.schedule}</span>
                      <span>📚 {reg.course?.credits} Credits</span>
                    </div>
                  </div>
                  <span className={`badge ${statusConfig[reg.status].className} badge-lg`}>
                    {statusConfig[reg.status].label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Dashboard