
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as imageUploadApi from '../admin-api/upload-image'
import { Form } from 'react-router-dom';

const ImageUpload = () => {

  useEffect(()=> {

  },[])

    const [image, setImage] = useState<string | ArrayBuffer | null>('');
  
    // Function to handle file input change
    const handleFileChange = (e: React.FormEvent<HTMLFormElement>) => {
      const file = e.target.files[0];
      if (file) {
        const data = new FileReader();
        data.onloadend = () => {
          setImage(data.result); // Extract Base64 string from data URL
        };
        data.readAsDataURL(file);
      }
    };

    console.log(JSON.stringify(image))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post(process.env.backend_url + 'media/upload/', {
          imageUrl: JSON.stringify(image),
        }, {
          headers: {
             "Accept": "multipart/form-data",
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Server Response:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };


  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        {/* <input type="text"  name='imageUrl' accept="image/*" value={image.imageUrl}  onChange={(e) =>handleFileChange('imageUrl', e)} /> */}
        <input type="file"  name='imageUrl' accept="image/*" value={image.imageUrl}  onChange={handleFileChange}/>
        <button type="submit">Upload</button>
      </form>
    </div>

   
    </>
  )
}

export default ImageUpload


  // const [images, setImages] = useState ({
  //   imageUrl:'',
  // });

    // const [images,setImages] = useState()

    // useEffect(() => {
      
    // }, [])

  // const handleDatacha = (key, e) => {
	// 	e.preventDefault();
	// 	const value = e.target.value;
	// 	const newData = { ...image, [key]: value };
	// 	setImage(newData);
	// 	console.log(image);
	// };


  //   const handleFile =(e: React.FormEvent<HTMLFormElement>)=>{
  //       const data = new FileReader()
  //       data.addEventListener('load',()=>{
  //           setImages(data.result)
  //       })
  //       data.readAsDataURL(e.target.files[0])
  //   }
  // console.log(images)


   // const handleUpload = async (e) => {
    //   // const file   = event.target.files[0]
    //   // const base64 = await convertBase64(file)
      
    //   const formData = new FormData()
    //   formData.append('img', images, )
    //   const config = {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   }
 

    //   try {
    //       const request = await fetch(  process.env.backend_url + 'medias/', {
    //             method: 'POST',
    //             body:  JSON.stringify({imageUrl: e.target.imageUrl.value })
               
    //         });
    //         const result = await request.json();
    //         console.log(result)
    //         return result
    //     } catch(error){
    //         console.log("error", error)
    //     }
    // }
    