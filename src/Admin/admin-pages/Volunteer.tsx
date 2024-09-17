import { useEffect, useState } from 'react'
import * as volunteerApi from '../admin-api/admin-volunteers'
import {AdminVolunteer} from '../admin-interface/AdminVolunteerType';
import { format } from 'date-fns';

// const categories = [
//   "bamboo",
//   "vegetables",
//   "eggs",
//   "shiitake",
//   "bees",
//   "goats",
//   "construction"
// ];

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState<AdminVolunteer[] | null> (null);
  
  useEffect(() => {
    getAllVolunteers();
  }, [])

  const getAllVolunteers = async() => {
    const result = await volunteerApi.getAllVolunteers();
    result.sort((a:AdminVolunteer, b:AdminVolunteer) => b.id - a.id)
    setVolunteers(result);
  }

  const changeVolunteerStatus = async(volunteerData:AdminVolunteer) => {
    const data = {
      name: volunteerData.name,
      email: volunteerData.email,
      start_date: volunteerData.start_date,
      is_accepted: !volunteerData.is_accepted
    };
    await volunteerApi.updateVolunteerStatus(volunteerData.id, data);
    getAllVolunteers();
  }

  return (
    <div>
    <h1 className='text-3xl m-5 mt-0'>ボランティアリスト</h1>
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead className="bg-gray-300 border-b border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">名前</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">メールアドレス</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">提出日</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">ボランティア参加日</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">制約</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">ステータス</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">アクション</th>
        </tr>
      </thead>
      <tbody>
        {volunteers?.map((volunteer) => (
          <tr key={volunteer.id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-6 py-4  text-sm font-medium text-gray-900">{volunteer.name}</td>
            <td className="px-6 py-4  text-sm text-gray-500">{volunteer.email}</td>
            <td className="px-6 py-4  text-sm text-gray-500">{format(volunteer.signup_date, "MM/dd/yy")}</td>
            <td className="px-6 py-4  text-sm text-gray-500">{format(volunteer.start_date, "MM/dd/yy @ H:mm")}</td>
            <td className="px-6 py-4   text-sm text-gray-500">{volunteer.restrictions}</td>
            <td className="px-6 py-4   text-sm text-gray-500">{volunteer.is_accepted ? "了承済み" : "未了承"}</td>
            <td className="px-6 py-4  text-sm text-gray-500">
              <button
                className={`px-4 py-2 font-semibold text-white rounded-md ${volunteer.is_accepted ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => changeVolunteerStatus(volunteer)}
              >
                {volunteer.is_accepted ? "断る" : "了承する"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
}

export default Volunteer