import { Outlet } from 'react-router-dom'
import SideBar from '../admin-pages/SideBar'
import Header from '../admin-pages/Header'

const AdminLayout = () => {
  return (
    <div className='flex'>
      <div className='flex flex-row bg-gray-200 h-screen sticky top-0'>
              <SideBar />
      </div>
          <div className='flex-1'>
          <div><Header /></div>
          <div className='p-4 w-full'>
            {<Outlet/>}
          </div>
      </div>
    </div>
  )
}

export default AdminLayout