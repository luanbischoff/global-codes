import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginPage } from './views/LoginPage'
import { NotFoundPage } from './views/NotFoundPage'
import { AdminDashboard } from './views/AdminDashboard'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
