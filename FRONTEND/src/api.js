import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:4001/api'
})

// Token auto-attach చేయడానికి
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

// Auth
export const login = (data) => API.post('/auth/login', data)
export const register = (data) => API.post('/auth/register', data)

// Courses
export const getCourses = () => API.get('/courses')
export const getCourse = (id) => API.get(`/courses/${id}`)
export const addCourse = (data) => API.post('/courses', data)
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data)
export const deleteCourse = (id) => API.delete(`/courses/${id}`)

// Registrations
export const enroll = (courseId) => API.post('/registrations', { courseId })
export const myRegistrations = () => API.get('/registrations/my')
export const allRegistrations = () => API.get('/registrations/all')
export const updateRegistration = (id, status) => API.put(`/registrations/${id}`, { status })