import { useEffect, useState } from 'react'
import * as adminFeedbackApi from '../admin-api/admin-feedbacks'
import {AdminFeedback} from '../admin-interface/AdminFeedbackType';
// import { Link } from 'react-router-dom'

const Comments = () => {
  const [allFeedbacks, setFeedbacks] = useState<AdminFeedback[] | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, [])

  const fetchFeedbacks = async() => {
    const result = await adminFeedbackApi.getFeedbacks();
    result.sort((a:AdminFeedback, b:AdminFeedback) => a.id - b.id);
    setFeedbacks(result);
  }

  const handleStatus = async(feedback:AdminFeedback) => {
    let update = !feedback.is_accepted ? true : false;
    const data = {
      is_accepted: update
    };
    await adminFeedbackApi.updateFeedbacks(feedback.id, data);
    fetchFeedbacks();
  }

  const handleDeletion = async(feedback:AdminFeedback) => {
    await adminFeedbackApi.deleteFeedbacks(feedback.id)
    const newFeedbacks = allFeedbacks?.filter((feedbackTile) => feedbackTile !== feedback);
    newFeedbacks ? setFeedbacks(newFeedbacks) : null;
  }

  const displayFeedbacks = allFeedbacks?.map((feedback) => 
    <div className='relative h-[16rem] bg-gray-200 border-gray-300 border border-solid rounded-lg p-5' key={feedback.id}>
      <div className='flex my-2'>
        <h1 className='font-medium text-gray-500'>Name:</h1>
        <h1 className='ml-3 mt-[-0.4rem] font-bold text-xl'>{feedback.name}</h1>
      </div>
      <h1 className='mb-1 font-medium text-gray-500'>Comment:</h1>
      <div className='p-2 max-h-[6rem] overflow-auto rounded-md bg-gray-100'>
        <h1 className='inline text-sm'>{feedback.comment}</h1>
      </div>
      <div className='flex absolute bottom-5'>
        <div className='font-medium w-28 mr-3 text-gray-500'>{!feedback.is_accepted? "Not Displayed": "Displaying"}</div>
        <div>
          <input type='checkbox' name='checkbox' className="h-4 w-4 text-green-500
                                     border-gray-300 rounded focus:ring-green-300 transition duration-150 ease-in-out"onChange={()=>handleStatus(feedback)} checked={feedback.is_accepted? true : false}></input>
        </div>
        <button className='ml-6 text-sm bg-gray-400 border hover:bg-red-400 text-white border-gray-300 border-solid rounded-md px-2 py-1' type='button' name='delete-button' onClick={()=>handleDeletion(feedback)}>Delete</button>
      </div>
    </div>
  )

  return (
    <div className='mt-11 grid grid-cols-4 gap-x-3 gap-y-3' id='feedbackStorage'>
      {displayFeedbacks}
    </div>
  )
}

export default Comments