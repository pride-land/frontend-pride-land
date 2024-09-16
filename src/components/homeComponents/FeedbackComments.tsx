import { useEffect, useState } from 'react'
import * as feedbackApi from "../../api/feedbacks"
import FeedbackType from '../../interfaces/FeedbackType';

const FeedbackComments: React.FC = () => {

    const [feedbacks, setFeedbacks] = useState<FeedbackType []>([]);

  
  
    // useEffect(() => {
    //   let timer: NodeJS.Timeout;
    //   if (!mousedOver) {
    //     timer = setInterval(() => {
    //       setCurrentCard((prevCard) => (prevCard + 1));
    //     }, 2000);
    //   }
  
    //   return () => clearInterval(timer);
    // }, [mousedOver, currentCard, feedbacks]);
    
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

    // const pickRandomElement = (feedbackArr: Feedback[]) => {
    //     let emptyArr: Feedback[] = [];
    //     if(feedbackArr.length < 5){
    //         emptyArr = feedbackArr;
    //     } else {
    //         while(emptyArr.length <= feedbackArr.length){
    //             let chosen = feedbackArr[Math.floor(Math.random() * feedbackArr.length)];
    //             feedbackArr.splice(feedbackArr.indexOf(chosen), 1);
    //             emptyArr.push(chosen);
    //         }
    //     }
    //     return emptyArr;
    // }
    
    const createFeedbackCards = feedbacks.map((feedback, index) => {
        return <div id={"feedback-" + String(index+1)} key={feedback.name + index} className="min-h-56 min-w-72 bg-white rounded overflow-hidden shadow-lg m-12">
          <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{feedback.comment}</div>
          <p className="text-gray-700 text-base">
          {feedback.name}
    </p>
                    </div>
                    </div>
    })

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden">
    <div
      className="flex items-center justify-center md:justify-start md:mx-12 max-w-none animate-infinite-scroll"
    >
        {createFeedbackCards}
        {createFeedbackCards}
        {createFeedbackCards}
        </div>
    </div>
  )
}

export default FeedbackComments