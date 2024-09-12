
import VolunteerForm from '../components/volunteerComponents/volunteerForm'
import { useTranslation } from 'react-i18next'

const VolunteerPage = () => {
  const { t } = useTranslation()
    
  return (
    <div className="flex h-screen w-screen">
        <div className="(Image) grid w-1/2 h-full">
            <div className="m-auto w-[30rem] h-40 text-center text-6xl ">{t("volunteer.slug")}</div>
        </div>
        <div className="py-6 px-16  mt-0 w-1/2 bg-gradient-to-br from-green-300 to-white font-sans">
            <div>
                <VolunteerForm />
            </div>
        </div>
    </div>
  )
}

export default VolunteerPage