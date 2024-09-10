import { useEffect, useState } from 'react'
import * as feedbackApi from "../../api/feedbacks"
import FeedbackType from '../../interfaces/FeedbackType';
import Feedback from '../../interfaces/FeedbackType';


interface ImageType {
    src: string,
    alt: string
}
interface Props {
    images: ImageType []
}

const FeedbackComments: React.FC<Props> = () => {

    const [feedbacks, setFeedbacks] = useState<FeedbackType []>([]);
    
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
            while(emptyArr.length < 5){
                let chosen = feedbackArr[Math.floor(Math.random() * feedbackArr.length)];
                feedbackArr.splice(feedbackArr.indexOf(chosen), 1);
                emptyArr.push(chosen);
            }
        }
        return emptyArr;
    }
    
    const createFeedbackDiv = feedbacks.map((feedback, index) => {
        return <div id={"feedback-" + String(index+1)} key={feedback.name + index} className='m-4 flex flex-col justify-center'>
                <div className="bg-white p-6 flex flex-col text-center text-md rounded-md drop-shadow-lg my-3">
                    <div>
                        {/* <img src={props.images[index].src}></img> */}
                    </div>
                    <div className=''>
                        <h1>{feedback.comment}</h1>
                    </div>
                    <div className=''>
                        <p>{feedback.name}</p>
                    </div>
                </div>
            </div>

    })

  return (
    <div id='all-feedbacks' className='mx-auto max-w-full flex gap-10'>
        {createFeedbackDiv}
    </div>
  )
}

export default FeedbackComments