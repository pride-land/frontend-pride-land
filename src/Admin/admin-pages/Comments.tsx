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
    <div className='relative h-[16rem] bg-gray-200 border-black border border-solid rounded-lg p-5' key={feedback.id}>
      <div className='flex my-2'>
        <h1 className='font-medium'>Name:</h1>
        <h1 className='ml-3 mt-[-0.4rem] font-bold text-2xl'>{feedback.name}</h1>
      </div>
      <h1 className='mb-5 font-medium'>Comment:</h1>
      <div className='p-2 max-h-[5.5rem] overflow-auto rounded-xl bg-gray-50'>
        <h1 className='inline'>{feedback.comment}</h1>
      </div>
      <div className='flex absolute bottom-5'>
        <div className='font-medium w-28 mr-3'>{!feedback.is_accepted? "Not Displayed": "Displaying"}</div>
        <div>
          <input type='checkbox' name='checkbox' onChange={()=>handleStatus(feedback)} checked={feedback.is_accepted? true : false}></input>
        </div>
        <button className='ml-6 text-sm bg-red-500 border border-gray-300 border-solid rounded-2xl px-2 py-1' type='button' name='delete-button' onClick={()=>handleDeletion(feedback)}>Delete</button>
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