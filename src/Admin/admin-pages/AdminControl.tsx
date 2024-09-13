import { useEffect, useState } from 'react';
import * as staffApi from '../admin-api/admin-control.tsx'
import { AdminControls } from '../admin-interface/AdminControlType.tsx';
import { format } from 'date-fns';

const AdminControl = () => {

  const [staff, setStaff] = useState<AdminControls[] | null>(null);

  useEffect(()=>{
    fetchAllStaff();
  }, []);

  const fetchAllStaff = async() => {
    const result = await staffApi.fetchAllStaff();
    result.sort((a:AdminControls, b:AdminControls) => b.id - a.id)
    setStaff(result)
  }

  return (
    <>
    <div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead >
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Last</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Date Registered</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Action</th>
          </tr>
        </thead>
        <tbody>
          {staff?.map((elt) => (
            <tr key={elt.id}>
              <td className="px-6 py-4  text-sm font-medium text-gray-900">{elt.id}</td>
              <td className="px-6 py-4  text-sm text-gray-500">{elt.first_name}</td>
              <td className="px-6 py-4  text-sm text-gray-500">{elt.last_name}</td>
              <td className="px-6 py-4  text-sm text-gray-500">{elt.username}</td>
              <td className="px-6 py-4  text-sm text-gray-500">{elt.is_superuser ? "admin" : "staff"}</td>
              <td className="px-6 py-4  text-sm text-gray-500">{format(elt.date_joined, "MM/dd/yy")}</td>
              <td className="px-6 py-4 hover:text-red-600 hover:cursor-pointer text-sm text-gray-500">Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

 
    </>
  )
}

export default AdminControl