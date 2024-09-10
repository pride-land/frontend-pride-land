import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../admin-authContext/AuthContext'



 const AdminHeader = () => {

    const authContext = useContext(AuthContext)
    
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }

  const { user , logoutUser } = authContext

  return (
      <div className='font-mono w-dvw  bg-gray-400 flex flex-row justify-between p-5'>
         <div  className='hover:cursor-pointer mx-5'> <Link to="/" >Main Page</Link> </div>
          {user ? (
               <div className='hover:cursor-pointer mx-5' onClick={logoutUser}>Logout</div>
          ): (
             <div className='hover:cursor-pointer'> <Link to="/login" >Login</Link> </div>
          )}         
      </div>
  )
}

export default AdminHeader
