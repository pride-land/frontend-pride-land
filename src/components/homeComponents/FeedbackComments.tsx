import { useEffect, useState } from 'react'
import * as feedbackApi from "../../api/feedbacks"
import FeedbackType from '../../interfaces/FeedbackType';

const FeedbackComments: React.FC = () => {

    const [feedbacks, setFeedbacks] = useState<FeedbackType []>([]);
    
    useEffect(() => {
        fetchAllFeedbacks();
    }, [])

    const fetchAllFeedbacks = async() => {
        const result = await feedbackApi.fetchAllFeedbacks();
        if(!result) return;
        const filteredFeedback = result.filter((feedback) => feedback.is_accepted)
        // let chosenFiveFeedbacks = (pickRandomElement(filteredFeedback));
        setFeedbacks(filteredFeedback);
    }
    
    const createFeedbackCards = feedbacks.map((feedback, index) => {
        return <div id={"feedback-" + String(index+1)} key={feedback.name + index} className="min-h-56 min-w-72  bg-white max-h-10 rounded overflow-hidden shadow-lg m-12">
          <div className="px-6 py-4">
          <div className="font-semibold line-clamp-6 mb-2">{feedback.comment}</div>
          <p className="text-gray-700 text-xs">
          {feedback.name}
    </p>
                    </div>
                    </div>
    })

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden">
    <div
      className="flex items-center justify-center md:justify-start md:mx-12 max-w-none animate-infinite-scroll [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
        {createFeedbackCards}
        {createFeedbackCards}
        {createFeedbackCards}

        </div>
    </div>
  )
}

export default FeedbackComments