import {AdminCardPropsType} from "../admin-interface/AdminGalleryTypes";
import {FaCircleXmark} from "react-icons/fa6";

export const AdminCard = ({
  id,
  title,
  description,
  imgsrc,
  link,
  setCardEditView,
  setCardRefs,
  cardrefs,
}: AdminCardPropsType) => {
  return (
    <>
    <div key={id} className="first:ml-[10%] mx-12 text-center max-w-sm bg-[#ffffff] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-[25%] relative">
        <img className="rounded-t-md w-full h-[50%]" src={imgsrc} alt="" onClick={() => setCardEditView("imgsrc")}/>
      <div className="p-5">
          <h5 id="title" className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={() => setCardEditView("title")}>
            {title}
          </h5>
        
        <p id="description" className="mb-4 font-normal text-gray-700 dark:text-gray-400" onClick={() => setCardEditView("description")}>
          {description}
        </p>
        <br/>
          <p>this card is set to the link:</p>
        <div className="w-full border-2 border-black" onClick={() => setCardEditView("link")}>
          {link}
        </div>
        
      </div>
      <FaCircleXmark className="w-10 h-10 text-red-600 bg-black rounded-full absolute -top-4 -right-4 cursor-pointer" onClick={() => setCardRefs(cardrefs.filter((c) => c.id !== (id + 1)))}/>
    </div>
        </>
  );
}

export default AdminCard;
