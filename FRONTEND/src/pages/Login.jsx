import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext.jsx'

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const user = await login(formData.username, formData.password, isAdmin)
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 border border-base-300 shadow-sm w-full max-w-md">
        <div className="card-body">

          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-primary">
              {isAdmin ? 'Admin Login' : 'LDAP Login'}
            </h1>
            <p className="text-base-content/60 text-sm mt-1">
              {isAdmin
                ? 'Login with admin credentials'
                : 'Login with your IITB LDAP credentials'}
            </p>
          </div>

          {error && (
            <div className="alert alert-error text-sm py-2">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-base-content/70 mb-1 block">
                {isAdmin ? 'Username' : 'LDAP Username'}
              </label>
              <input
                type="text"
                placeholder={isAdmin ? 'admin' : 'eg: 25B1234'}
                className="input input-bordered w-full"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-base-content/70 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? 'Logging in...' : isAdmin ? 'Login as Admin' : 'Login with LDAP'}
            </button>
          </div>

          <div className="divider">or</div>

          <button
            className="btn btn-outline btn-sm w-full"
            onClick={() => { setIsAdmin(!isAdmin); setError('') }}
          >
            {isAdmin ? '← Back to LDAP Login' : 'Login as Admin'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default Login