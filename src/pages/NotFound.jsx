import { Navigate } from "react-router-dom"

function NotFound() {
  return (
    <Navigate to='/productos' replace />    
)
}

export default NotFound;