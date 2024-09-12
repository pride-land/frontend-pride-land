
import VolunteerForm from '../components/volunteerComponents/volunteerForm'

const VolunteerPage = () => {
    
  return (
    <div className="flex h-screen w-screen">
        <div className="hidden md:grid md:w-1/2 md:h-full">
            <div className="m-auto w-[30rem] h-40 text-center text-[70px]">Join Pride Farm!
        </div>
    </div>
        <div className="py-6 px-16  mt-0 lg:w-1/2 sm:max-w-full bg-gradient-to-br from-green-300 to-white font-sans">
            <h1 className='mb-5 text-3xl text-center font-bold'>Apply to be a Pride Farm Volunteer!</h1>
            <div>
                <VolunteerForm />
            </div>
        </div>
    </div>
  )
}

export default VolunteerPage