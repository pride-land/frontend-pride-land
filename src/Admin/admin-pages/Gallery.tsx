import { useEffect, useState } from 'react'
import { Image } from '../admin-interface/AdminGalleryTypes';
import * as layoutApi from '../admin-api/admin-layout';
import { FaCircleXmark } from "react-icons/fa6";
import ImageUpload from './ImageUpload';
import CardEditor from '../admin-components/Card-Editor';



const Layout = () => {
  const [heroImages, setHeroImages] = useState<Image[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedImages, setSelectedImages] = useState<Image[] | null>(null);

  useEffect(() => {
    fetchAllImages();
  }, [])
  
  useEffect(() => {
    if (heroImages !== null){
    filterHeroImages(heroImages);
    }
  }, [heroImages])


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

const handleRemoveImage = (image: Image) => {
  console.log('selectedImage: ', selectedImage);
if (heroImages !== null) {
  if (window.confirm("Are you sure you want to delete this image?")) {
    deleteImage(selectedImage as Image);
    setHeroImages(heroImages.filter((img) => img.id !== image.id)); 
  };
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

  return (
    <div className='w-screen'>
        <ImageUpload/>
      <div className="(images container) w-5/6">
        <h2>Please choose 5 images for your Top Images</h2>
        <div className="snap-x snap-mandatory align-middle bg-gray-200 p-10 overflow-scroll rounded-md grid grid-rows-1 grid-flow-col gap-6 overflow-scroll">
          {/* made a container that holds all of the images in the db */}
          {/* created a method to click 5 of those images and set them as selected for the front page. */}
          {/* need to add a button to add images to the db */}

        {heroImages && heroImages.map((image) => 
        <div className="m-6 w-[400px] relative text-center">
        <button className="m-6 w-[400px] focus:border-4 focus:border-indigo-400" onClick={() => {handleSetSelectedImages(image); addHeroTagToImg(image)}}>
          <img src={"data:image/jpeg;base64," + image.blob_img} alt={image.alt_text} className="rounded-md w-full"/>
            <p>{image.alt_text}</p>
        </button>
        <FaCircleXmark className="w-10 h-10 text-red-600 bg-black rounded-full absolute top-2 -right-10 cursor-pointer" onClick={() => {console.log(image); setSelectedImage(image); handleRemoveImage(image)}}/>
                  </div>
        )}
        </div>
        <div className="(hero container) w-full">
        <h2>Your selected Images:</h2>
        <div className="flex grid grid-rows-a grid-flow-col bg-gray-200 overflow-scroll w-full">
          {selectedImages && selectedImages?.map((image) => 
          <div className="m-6 w-[400px] relative text-center">
            <img src={"data:image/jpeg;base64," + image.blob_img} alt={image.alt_text} className="rounded-md w-full"/>
            <p>{image.alt_text}</p>
            <FaCircleXmark className="w-10 h-10 text-red-600 bg-black rounded-full absolute -top-4 -right-4 cursor-pointer" onClick={() => handleRemoveHeroTagImage(image)}/>
          </div>
          )}

        </div>
        </div>
        </div>
        <br />

        {/* <CardEditor/> */}
        </div>
  )
}

export default Layout