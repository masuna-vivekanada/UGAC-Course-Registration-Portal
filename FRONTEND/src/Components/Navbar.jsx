import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="sticky top-0 z-50 navbar bg-base-100 shadow-sm">

      <div className="navbar-start pl-2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg"
            height="40px"
            width="40px"
          />
          <span className="font-bold text-2xl px-2 pt-1">IIT BOMBAY</span>
        </Link>
      </div>

      <div className="navbar-end gap-4 pr-4">
        {user ? (
          <>
            <span className="text-sm text-base-content/60">
              👤 {user.name}
            </span>

            {user.role === 'admin' ? (
              <Link to="/admin" className="group relative inline-block font-semibold hover:text-primary">
                Admin Panel
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ) : (
              <Link to="/dashboard" className="group relative inline-block font-semibold hover:text-primary">
                Dashboard
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}

            <button onClick={handleLogout} className="btn btn-outline text-red-700 rounded-2xl ">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary rounded-full">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
            </svg>
            Login
          </Link>
        )}
      </div>

    </div>
  )
}