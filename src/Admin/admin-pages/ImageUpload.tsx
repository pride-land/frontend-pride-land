import { useState, FormEvent } from 'react';
import axios from 'axios';



const ImageUpload: React.FC = () => {
  const UPLOAD_URL = `${process.env.media_url}upload-img/`;  
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  // const [imageData, setImageData] = useState<Image[]>([]);
  // const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  // useEffect(() => {
  //   handleGetImageById();
  // }, []);

  // Convert Image file to base64 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = new FileReader();
      data.onloadend = () => {
        setImage(data.result);
      };
      data.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById('blob_img') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      const base64string = (image as string).split(',')[1]; 
      const formData = new FormData();
      formData.append('blob_img', base64string);
      try {
        await axios.post(UPLOAD_URL, formData);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    
  };

  // const handleDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedImageId = parseInt(e.target.value);
  //   setSelectedImageId(selectedImageId);
  // };

  // const handleGetImageById = async () => {
  //   try {
  //     const response = await getImageApi.fetchAllImages();
  //     setImageData(response);
  //     if (response.length > 0) {
  //       setSelectedImageId(response[0].id);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching images:', error);
  //   }
  // };

  return (
    <>
      <div>
        <div className='flex gap-2 mt-2'>
          {/* <div>
            <select id="userdropdown" onChange={handleDataChange} value={selectedImageId ?? ''}>
              {imageData.map((image) => (
                <option key={image.id} value={image.id}>
                  {image.id} : {image.alt_text}
                </option>
              ))}
            </select>
          </div> */}
          <div>
              <div className="flex m-4">
            <form name="imageForm" onSubmit={handleSubmit}>
            <button className="bg-blue-400 p-4 m-4" onClick={handleClick}>画像を選択してください</button>
              <input type="file" id='blob_img' style={{ display: "none" }}  onChange={handleFileChange} />
             {image && 
             <div>
              <img src={image as string} alt="preview" className="w-1/4 h-1/4 m-4"/>
              <button className='bg-gray-400 rounded-sm p-2 mx-2' type="submit">画像アップロード</button>
              </div>
              }
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
