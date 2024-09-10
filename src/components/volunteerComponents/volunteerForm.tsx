import { useState } from "react"
import * as volunteerApi from "../../api/volunteers"
import Volunteer from "../../interfaces/VolunteersType";
import { format } from "date-fns";

const volunteerForm = () => {
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const [volunteer, setVolunteer] = useState<Volunteer | null>(null);

    const handleIsSubmitted = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const formData = new FormData(event.currentTarget);
            const request = await volunteerApi.postVolunteer(formData);
            setVolunteer(request);
            setSubmitted(true);
        } catch(error) {
            console.log("error submitting form", error)
        }
    }
    return (
        <div className="max-w-full md:max-w-lg mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
            {!isSubmitted ? (
                <form name="myForm" method='POST' onSubmit={handleIsSubmitted} 
                className="space-y-4 sm:space-y-6"><div>
                        <label htmlFor='volunteer-status' className="block text-sm font-medium text-gray-700">Choose your desired role as a volunteer: </label>
                        <select id='is_regular_volunteer' name='is_regular_volunteer' className="mt-1 block w-full
                         border-gray-300 rounded-md shadow-sm focus:ring-green-300 focus:border-green-300 sm:text-sm">
                            <option value='false'>One-Time Volunteer</option>
                            <option value='true'>Regular Volunteer</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='name' className="block text-sm font-medium text-gray-700">Name: </label>
                        <input type='text' id='name' name='name' required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm
                         focus:ring-green-300 focus:border-green-300 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email: </label>
                        <input type='email' id='email' name='email' required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm
                         focus:ring-green-300 focus:border-green-300 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor='start_date' className="block text-sm font-medium text-gray-700">Start Date: </label>
                        <input type='datetime-local' id='start_date' name='start_date' required className="mt-1 block w-full
                         border-gray-300 rounded-md shadow-sm focus:ring-green-300 focus:border-green-300 sm:text-sm" />
                    </div>
                    <div className="space-y-2">
                        <legend className="block text-sm font-medium text-gray-700">Category:</legend>
                        <div className="flex flex-wrap gap-4">
                            {['bamboo', 'vegetables', 'eggs', 'shiitake', 'bees', 'goats', 'construction'].map(item => (
                                <div key={item} className="flex items-center">
                                    <input id={item} name={item} type="checkbox"  className="h-4 w-4 text-green-500
                                     border-gray-300 rounded focus:ring-green-300 transition duration-150 ease-in-out" />
                                    <label  className="ml-2 text-sm font-medium text-gray-700 capitalize">{item}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor='restrictionsCheck' className="flex items-center text-sm font-medium text-gray-700">
                            <input id='restrictionsCheck' name='restrictionsCheck' type='checkbox' className="h-4 w-4
                             text-green-500 border-gray-300 rounded focus:ring-green-300 transition duration-150 ease-in-out" />
                            <span className="ml-2">Any restrictions we should know about?</span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor='restrictions' className="block text-sm font-medium text-gray-700">If so, what?</label>
                        <input id='restrictions' name='restrictions' type='text' className="mt-1 block w-full
                         border-gray-300 rounded-md shadow-sm focus:ring-green-300 focus:border-green-300 sm:text-sm" />
                    </div>
                    <input name='is_accepted' defaultValue="false" hidden />
                    <div className="flex justify-center">
                    <button type='submit' className="w-1/2 px-4 py-2 bg-gradient-to-r from-green-300 via-green-400
                     to-green-500 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105 
                     hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                        Submit
                    </button>
                    </div>
                </form>
            ) : (
                <div className="text-center">
                    {volunteer && 
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Thank you for your interest, {volunteer.name}!</h1>
                            <h2 className="text-base sm:text-lg text-gray-600">You will receive an email at {volunteer.email}</h2>
                            <h2 className="text-base sm:text-lg text-gray-600">Make sure you remember the date: {format(volunteer.start_date, "MM/dd/yyyy")} at {format(volunteer.start_date, "HH:mm")}</h2>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default volunteerForm