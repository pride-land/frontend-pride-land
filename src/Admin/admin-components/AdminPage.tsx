import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import SideBar from "../admin-pages/SideBar"

const AdminPage: React.FC = () => {
  return (
    <>
    <AdminHeader/>
    <SideBar />
    <Outlet/>
    </>
  )
}

export default AdminPage