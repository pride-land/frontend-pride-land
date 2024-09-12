import { useState, useEffect } from "react"
import { postFeedback } from "../api/feedbacks"
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const CommentsPage = () => {

    // useStates
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const [commentsPageView, setCommentsPageView] = useState<JSX.Element | null>(null)


    // useEffects
    useEffect(() => {
        if (commentsPageView === null) {
            setCommentsPageView(initialPageView);
        }
    }, )
    useEffect(() => {
        if (isSubmitted === true) {
            handleIsSubmittedPageView();
        }
    }, [isSubmitted])

    // Helper Functions
    const handleIsSubmittedPageView = () => {
        setCommentsPageView(
            <div className="h-full w-full grid">
                <div className="m-auto">{t("ContactUs.completedForm")}</div>
            </div>
        )
    }

    const handleIsSubmitted = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const formData = new FormData(event.currentTarget);
            const request = await postFeedback(formData);
            setSubmitted(true);
            return request;
        } catch(error) {
            console.log("Error submitting form", error)
        }
    }

    const {t} = useTranslation();

    const initialPageView = (
        <div className="h-full w-full shadow-2xl rounded-md p-16 bg-white">
            <h1 className="mb-20 text-center">{t("ContactUs.FeedbackFormHeader")}</h1>
            <form name="CommentsForm" onSubmit={handleIsSubmitted}>
                <label htmlFor='name'>{t("ContactUs.Name")}</label>
                    <input type='text' id='name' placeholder={t("ContactUs.FieldInput")} name='name' required className=" border-solid border-black block w-full rounded-md border-0 py-2 px-4 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"></input> <br/>
                <label htmlFor='comments'>{t("ContactUs.Comments")}</label>
                    <textarea  id='comment'  placeholder={t("ContactUs.FieldInput")} name='comment' required className="border-solid border-black block w-full rounded-md border-0 py-2 px-4 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 "></textarea> <br/>
             <button type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-800 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-green-900 hover:bg-green-500">
              <Plus className="w-5 h-5 mr-2" />
              <span>{t("ContactUs.SubmitFeedback")}</span>
            </button>
            </form>
        </div>
    )

    return (
        <>
            <div className="flex h-screen w-screen">
                <div className="(Body) bg-gradient-to-br from-green-300 to-white font-sans grid w-1/2 h-full">
                    <div className="m-auto w-10/12 h-5/6">
                        {commentsPageView}
                    </div>
                </div>
                <div>
                    <div className="(Image) grid m-auto w-1/2 h-full">
                        <div className="m-auto w-[30rem] h-40 text-center text-[80px] ">{t("ContactUs.ImageText")}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentsPage