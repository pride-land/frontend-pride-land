
import VolunteerForm from '../components/volunteerComponents/volunteerForm'
import { useTranslation } from 'react-i18next'

const VolunteerPage = () => {
  const { t } = useTranslation()
    
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
        <div className="(Image) w-full md:w-1/2 h-1/2 md:h-full bg-cover 
        bg-center flex items-center justify-center">
            <div className="text-center text-4xl md:text-6xl lg:text-7xl p-4 md:p-0">
                {t("volunteer.slug")}
            </div>
        </div>
        <div className="w-full md:w-1/2 py-6 px-4 md:px-16 bg-gradient-to-br from-green-300
         to-white font-sans flex items-center justify-center">
            <div className="w-full max-w-md">
                <VolunteerForm />
            </div>
        </div>
    </div>
  )
}

export default VolunteerPage