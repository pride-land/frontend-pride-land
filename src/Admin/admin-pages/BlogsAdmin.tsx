import { useEffect, useState } from "react"
import Axios from "axios";
import * as blogsPostApi from "../admin-api/admin-blogs";
import BlogsTypes from "../../interfaces/BlogsType"
import * as blogsApi from "../../api/blogs"
import { format } from 'date-fns'
import { useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ImageUpload from "./ImageUpload";


const BlogsAdmin = () => {
const [open, setOpen] = useState(false)
const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
const navigate = useNavigate();

  useEffect(()=>{
    fetchAllBlogs()
  },[]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      const formData = new FormData(e.currentTarget);
      const response = await blogsPostApi.postBlogs(formData);
      console.log(response)
      navigate('/admin-layout/blogs-admin')
    } catch (error){
      console.log("error:" , error)
    }
  } 

  const fetchAllBlogs = async() => {
      const response = await blogsApi.fetchAllBlogs();
      setBlogs(response)
  }

  const handleDelete = (id: number) => {
    try{
    Axios.delete(process.env.backend_url  + `blogs/${id}/`)
    }catch (error){
      console.log(error)
    }
  }

  return (
    <>
    <ImageUpload />
    <div>
      <div>
            <form name="blogPost" method="POST" onSubmit={handleSubmit}>
              
              {/*  Blog Titles  choose events or blogs*/}
              <div> 
                <label htmlFor="title">Title:</label>
                <div>
                  <input 
                        type="text" 
                        id="title" 
                        name="title"
                        >
                  </input>
                </div>
              </div>

              {/* Blog Post */}
              <div>
                <label htmlFor="blog">Blog post:</label>
                <div>
                  <textarea 
                            id="blog" 
                            name="blog"
                            >
                  </textarea>
                </div>
              </div>

              {/* Upload Photo */}
              <div>
                <label htmlFor="images"></label>
                  <h2> Add image:</h2>
                    <input type="file" 
                            id="images" 
                            accept="image/*"
                            name="images"
                            >
                    </input>
              </div>

              {/* Post Button */}
              <div>
                <label ></label>
                <button type="submit" className="mt-2
                bg-red-400 rounded-lg p-1">Post
                </button>
              </div>
            </form>
        </div>
    </div>
    <hr className="my-3"/>

        <div>
            <div>
                <h2 className="font-bold text-center">Blog List</h2>
                    <ul className="flex justify-between font-semibold text-gray-500 px-2">
                      <li>ID</li>
                      <li>Date</li>
                      <li>Title</li>
                      <li>Update</li>
                    </ul>
                  <div>{blogs.map((elt, index) => (
                      <div className="flex justify-between p-2  flex-row gap-5" id={"blogs-" + String(index+1)} key={index} >
                            <div key={index}>{elt.id}</div>
                            <div className="text-center"><span>{format(elt.date_created, 'MM/dd/yyyy')}</span></div>
                            <div className="text-center"><span>{elt.title}</span></div>
                            <div className="flex gap-2
                            ">
                            <div><button onClick={() => handleDelete(blogs.id)} className="bg-red-500 p-1 rounded-md text-xs">Delete</button> </div>
                            <div><button onClick={() => setOpen(true) }className="bg-orange-400 p-1 rounded-md text-xs">Edit</button> </div>
                        </div>
                      </div>
                  ))}</div>
            </div>
        </div>

    {/* Edit */}
  
    <Dialog open={open} onClose={setOpen} className="relative z-10">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 
      data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
    />

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <DialogPanel
          transition
          className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all 
          data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 
          data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 
          data-[closed]:sm:scale-95"
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Edit Blog
                </DialogTitle>
                <div className="mt-2">
                  <form>
                   {/*  Blog Titles  choose events or blogs*/}
                        <div> 
                            <label htmlFor='name'>Title:</label>
                            <div>
                            <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    value={blogs.title}
                                    >
                                    </input>
                            </div>
                        </div>
                        
                        {/* Blog Post */}
                        <div>
                            <label htmlFor='title'>Blog post:</label>
                            <div>
                            <textarea 
                                        id="title" 
                                        name="title"
                                        value={blogs.blog}
                                        >
                            </textarea>
                            </div>
                        </div>

                        {/* Upload Photo */}
                        <div>
                            <label htmlFor='images'></label>
                            <h2> Add image:</h2>
                            <input type="file" 
                                    id="images" 
                                    accept="image/*"
                                    name="images"
                                    value={blogs.images}
                                    >
                            </input>
                        </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
              type="button"
              onClick={() => handleDelete(blogs.id)} 
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
              font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
     
            Delete
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
              font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
             Update
            </button>
            <button
              type="button"
              data-autofocus
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm 
              font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 
              sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
  </>
  
  )

}

export default BlogsAdmin
