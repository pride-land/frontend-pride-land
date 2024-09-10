import { useEffect, useState } from 'react'
import { Image } from '../admin-interface/AdminGalleryTypes';
import * as layoutApi from '../admin-api/admin-layout';
import { FaCircleXmark } from "react-icons/fa6";
import ImageUpload from './ImageUpload';



const Layout = () => {
  const [heroImages, setHeroImages] = useState<Image[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedImages, setSelectedImages] = useState<Image[] | null>(null);
  // const [cardEditView, setCardEditView] = useState<string>("none");
  // const [cardrefs, setCardRefs] = useState<AdminCardPropsType[] | null>(null);
  // const [cardData, setCardData] = useState<AdminCardDataPropsType>({
  //   id: 0,
  //   title: "",
  //   description: "",
  //   imgsrc: "",
  //   link: "#",
  //   setCardEditView: () => {"none"},
    
  // });
  
  useEffect(() => {
    fetchAllImages();
    if (heroImages !== null) {
      filterHeroImages(heroImages);
    }
  }, [])
  
  const fetchAllImages = async () => {
    const images = await layoutApi.getAllImages();
    setHeroImages(images);
  };

  const filterHeroImages = (heroImages: Image[]) => {
    let heroes = heroImages.filter((image) => image.set_as_hero === true);
    setSelectedImages(heroes);
  }

  
  const addHeroTagToImg = async(image: Image) => {
    await layoutApi.addHeroTagToImg(image);
  }

  const removeHeroTagFromImg = async(image: Image) => {
    await layoutApi.removeHeroTagFromImg(image);
  }

  const deleteImage = async(image: Image) => {
    await layoutApi.deleteImage(image);
  }
// const handleFieldChange = (field: string, value: string) => {
//   setCardData((prevData) => {
//     const updatedData = { ...prevData, [field]: value };

//     setCardRefs((prevCardRefs) =>
//       prevCardRefs.map((card) =>
//         card.id === updatedData.id ? { ...card, [field]: value } : card
//       )
//     );
    
//     return updatedData;
//   });
// };
const handleRemoveImage = (image: Image) => {
  setSelectedImage(image)

  if (heroImages !== null) {
  setHeroImages(heroImages.filter((img) => img.id !== image.id)); 
  if (window.confirm("Are you sure you want to delete this image?")) {
  deleteImage(selectedImage as Image);}
  };
}

const handleSetSelectedImages = (image: Image) => {
  if (selectedImages?.length === 5) {
    alert("You can only select 5 images");
    return;
  }
  if (selectedImages?.find((selectedImage) => selectedImage.blob_img === image.blob_img)) {
    alert("You have already selected this image");
    return;
  }
  if (selectedImages !== null) {
  setSelectedImages([...selectedImages, image]);
  }
  else {
    setSelectedImages([image]);
  }
}

const handleRemoveHeroTagImage = (image: Image) => {
  setSelectedImage(image);
if (selectedImages !== null) {
  setSelectedImages(selectedImages.filter((selectedImage) => selectedImage.blob_img !== image.blob_img))
}
removeHeroTagFromImg(selectedImage as Image);
}





// const renderContent = () => {
//   switch (cardEditView) {
//     case "title":
//       return (
//         <input
//           type="text"
//           value={cardData.title}
//           onChange={(e) => handleFieldChange("title", e.target.value)}
//           className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
//         />
//       );
//     case "description":
//       return (
//         <textarea
//           value={cardData.description}
//           onChange={(e) => handleFieldChange("description", e.target.value)}
//           className="mb-4 font-normal text-gray-700 dark:text-gray-400"
//         />
//       );
//     case "imgsrc":
//       return (
//         <input
//           type="text"
//           value={cardData.imgsrc}
//           onChange={(e) => handleFieldChange("imgsrc", e.target.value)}
//           className="rounded-t-md w-full h-[50%]"
//         />
//       );
//     case "link":
//       return (
//         <input
//           type="text"
//           value={cardData.link}
//           onChange={(e) => handleFieldChange("link", e.target.value)}
//           className="text-blue-500 underline"
//         />
//       );
//     default:
//       return (
//         <>
//           <h5 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {cardData.title}
//           </h5>
//           <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
//             {cardData.description}
//           </p>
//           <img className="rounded-t-md w-full h-[50%]" src={cardData.imgsrc} alt="" />
//           <a href={cardData.link} className="text-blue-500 underline">
//             {cardData.link}
//           </a>
//         </>
//       );
//   }
// };




  return (
    <div className='w-1/2'>
        <ImageUpload/>
      <div className="hero-images-container">
        <h2>Please choose 5 images for your Top Images</h2>
        <div className="snap-x snap-mandatory align-middle bg-gray-200 p-10 overflow-scroll rounded-md grid grid-rows-1 grid-flow-col gap-6 overflow-scroll w-5/6">
          {/* made a container that holds all of the images in the db */}
          {/* created a method to click 5 of those images and set them as selected for the front page. */}
          {/* need to add a button to add images to the db */}

        {heroImages?.map((image) => 
        <div className="m-6 w-[400px] relative text-center">
        <button className="m-6 w-[400px] focus:border-4 focus:border-indigo-400" onClick={() => {handleSetSelectedImages(image); addHeroTagToImg(image)}}>
          <img src={image.blob_img} alt={image.alt_text} className="rounded-md w-full"/>
            <p>{image.alt_text}</p>
        </button>
        <FaCircleXmark className="w-10 h-10 text-red-600 bg-black rounded-full absolute top-2 -right-10 cursor-pointer" onClick={() => {handleRemoveImage(image)}}/>
          
          {/* change this onClick to add a remove image from db function with an alert */}
        </div>
        )}
        </div>
        <h2>Your selected Images:</h2>
        <div className="flex grid grid-rows-a grid-flow-col bg-gray-200 overflow-scroll w-5/6">
          {selectedImages?.map((image) => 
          <div className="m-6 w-[400px] relative text-center">
            <img src={image.blob_img} alt={image.alt_text} className="rounded-md w-full"/>
            <p>{image.alt_text}</p>
            <FaCircleXmark className="w-10 h-10 text-red-600 bg-black rounded-full absolute -top-4 -right-4 cursor-pointer" onClick={() => handleRemoveHeroTagImage(image)}/>
          </div>
          )}

        </div>
          {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setSelectedImages([])}>Save Selection</button> */}
        </div>
{/* add a break to separate page elements */}
        <br />
        <h2>Create Cards for your Activities Portal</h2>
        <div className="snap-x snap-mandatory align-middle bg-gray-200 p-10 overflow-scroll rounded-md grid grid-rows-1 grid-flow-col gap-6 overflow-scroll w-5/6">
          {/* make a container that holds all of the categories in the db */}
          {/* create a method to click 6 of those categories and set them as selected for the front page. */}
          {/* add a button to add categories to the db */}
        {/* {cardrefs.map((card, index) => (
          <div className="m-6 w-[400px]" onClick={() => setCardData(card)}>
          <AdminCard
            setCardRefs={setCardRefs}
            cardrefs={cardrefs}
            key={card.id}  
            id={index}
            title={card.title}
            description={card.description}
            imgsrc={card.imgsrc}
            link={card.link}
            setCardEditView={setCardEditView}
           />

          </div>
        ))} */}
        </div>
        {/* {renderContent()} */}
        </div>
  )
}

export default Layout