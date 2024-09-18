
import VolunteerForm from '../components/volunteerComponents/volunteerForm'
import { useTranslation } from 'react-i18next'

const VolunteerPage = () => {
  const { t } = useTranslation()
    
  return (
    <div className="flex flex-col  md:flex-row h-screen w-screen overflow-hidden bg-gradient-to-br from-green-300 to-white">
        <div className="portrait:hidden bg-volunteer-background w-full md:w-1/2 h-1/2 md:h-full bg-cover 
        bg-center flex items-center justify-center">
        </div>
        <div className="md:w-1/2 py-6 px-4 md:px-16 bg-gradient-to-br from-green-300
         to-white font-sans flex items-center justify-center">
            
         <div className="text-center text-black md:text-2xl lg:text-2xl xl:text-4xl ">
             {t("volunteer.slug")}
                <div className='mb-16 h-full xl:mt-5 mt-2 xl:h-1/2 lg:h-1/2'><VolunteerForm /></div>
         </div>
    
        </div>
    </div>
  )
}

export default VolunteerPage