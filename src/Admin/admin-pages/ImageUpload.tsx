import { useEffect, useState, FormEvent } from 'react';
import * as getImageApi from '../../api/upload-images';
import axios from 'axios';

interface Image {
  id: number;
  alt_text: string;
}

const ImageUpload: React.FC = () => {
  const UPLOAD_URL = `${process.env.media_url}upload-img/`;
  const GET_URL = `${process.env.backend_url}media/`;
  
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageData, setImageData] = useState<Image[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  useEffect(() => {
    handleGetImageById();
  }, []);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      const base64string = (image as string).replace('data:image/jpeg;base64,', ''); 
      const formData = new FormData();
      formData.append('blob_img', base64string);
      try {
        const response = await axios.post(UPLOAD_URL, formData);
        console.log('Server Response:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedImageId = parseInt(e.target.value);
    setSelectedImageId(selectedImageId);
  };

  const handleGetImageById = async () => {
    try {
      const response = await getImageApi.fetchAllImages();
      setImageData(response);
      if (response.length > 0) {
        setSelectedImageId(response[0].id);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async () => {

    if (selectedImageId !== null) {
      try {
        await axios.delete(`${GET_URL}${selectedImageId}/`);
        console.log("Successfully deleted!");
        handleGetImageById(); // Refresh the image list
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  return (
    <>
      <div>
        <div className='flex gap-2 mt-2'>
          <div>
            <select id="userdropdown" onChange={handleDataChange} value={selectedImageId ?? ''}>
              {imageData.map((image) => (
                <option key={image.id} value={image.id}>
                  {image.id} : {image.alt_text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input type="file" name='blob_img' onChange={handleFileChange} />
              <button className='bg-gray-400 rounded-sm p-2 mx-2' type="submit">Upload Photo</button>
            </form>
          </div>
          <div>
            <button onClick={handleDelete} className='bg-gray-500 rounded-sm p-2 mx-2'>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
