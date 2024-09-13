import { useEffect, useState } from 'react'
import * as feedbackApi from "../../api/feedbacks"
import FeedbackType from '../../interfaces/FeedbackType';
import Feedback from '../../interfaces/FeedbackType';


const FeedbackComments: React.FC = () => {

    const [feedbacks, setFeedbacks] = useState<FeedbackType []>([]);
    const [currentCard, setCurrentCard] = useState<number>(0);
    const [mousedOver, setMousedOver] = useState<boolean>(false);
  
    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (!mousedOver) {
        timer = setInterval(() => {
          setCurrentCard((prevCard) => (prevCard + 1) % (feedbacks.length -1));
        }, 2000);
      }
  
      return () => clearInterval(timer);
    }, [mousedOver, currentCard, feedbacks]);
    
    useEffect(() => {
        fetchAllFeedbacks();
    }, [])

    const fetchAllFeedbacks = async() => {
        const result = await feedbackApi.fetchAllFeedbacks();
        if(!result) return;
        const filteredFeedback = result.filter((feedback) => feedback.is_accepted)
        let chosenFiveFeedbacks = (pickRandomElement(filteredFeedback));
        setFeedbacks(chosenFiveFeedbacks);
    }

    const pickRandomElement = (feedbackArr: Feedback[]) => {
        let emptyArr: Feedback[] = [];
        if(feedbackArr.length < 5){
            emptyArr = feedbackArr;
        } else {
            while(emptyArr.length <= feedbackArr.length){
                let chosen = feedbackArr[Math.floor(Math.random() * feedbackArr.length)];
                feedbackArr.splice(feedbackArr.indexOf(chosen), 1);
                emptyArr.push(chosen);
            }
        }
        return emptyArr;
    }
    
    const createFeedbackDiv = feedbacks.map((feedback, index) => {
        return <div id={"feedback-" + String(index+1)} key={feedback.name + index} className="bg-white p-6 flex flex-col text-center text-md rounded-md drop-shadow-lg my-3 justify-center m-12">
                    <div className=''>
                        <h1>{feedback.comment}</h1>
                    </div>
                    <div className=''>
                        <p>{feedback.name}</p>
                    </div>
                </div>
    })

  return (
    <div className="md:overflow-hidden relative">
    <div
      className="flex transition ease-out duration-700"
      style={{ transform: `translateX(-${currentCard * 20}%)` }}
      onMouseOver={() => setMousedOver(true)}
      onMouseOut={() => setMousedOver(false)}
    >
        {createFeedbackDiv}
    </div>
    </div>
  )
}

export default FeedbackComments