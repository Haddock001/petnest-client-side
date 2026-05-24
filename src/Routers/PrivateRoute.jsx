import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-pet-primary px-5">
        <div className="rounded-[28px] bg-white p-8 text-center font-poppins shadow-xl outline outline-1 outline-(--pet-accent)/30">
          <span className="loading loading-spinner loading-lg text-(--pet-orange)" />
          <p className="mt-4 font-bold text-(--pet-secondary)">Checking your session...</p>
        </div>
      </main>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute
