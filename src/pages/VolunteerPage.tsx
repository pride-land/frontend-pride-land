
import VolunteerForm from '../components/volunteerComponents/volunteerForm'
import { useTranslation } from 'react-i18next'

const VolunteerPage = () => {
  const { t } = useTranslation()
    
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden ">
        <div className="(Image) bg-volunteer-background w-full md:w-1/2 h-1/2 md:h-full bg-cover 
        bg-center flex items-center justify-center">
        </div>
        <div className=" md:w-1/2 py-6 px-4 md:px-16 bg-gradient-to-br from-green-300
         to-white font-sans flex items-center justify-center">
            <div className="w-full">
         <div className="xl:mb-20 text-center text-black text-2xl md:text-4xl lg:text-2xl xl:text-4xl lg:mt-10 p-4 md:p-0">
             {t("volunteer.slug")}
                <div className=' xl:mt-10 mt-2 lg:h-1/2'><VolunteerForm /></div>
         </div>
            </div>
        </div>
    </div>
  )
}

export default VolunteerPage