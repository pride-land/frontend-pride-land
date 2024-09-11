import { useEffect, useState } from "react"
import Axios from "axios";
import BlogsTypes from "../../interfaces/BlogsType"
import * as blogsApi from "../../api/blogs"
import { format } from 'date-fns'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import AdminPostBlog from "../admin-components/AdminPostBlog";

const BlogsAdmin = () => {

  
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
  
  useEffect(()=>{
    fetchAllBlogs()
  },[]);


  const fetchAllBlogs = async() => {
    const response = await blogsApi.fetchAllBlogs();
    setBlogs(response.reverse())
  }

  const handleDelete = (id: number) => {
    try{
      Axios.delete(process.env.backend_url  + `blogs/${id}/`)
        console.log("succesfully deleted!")
    }catch (error){
        console.log('error/:', error)
      }
  }

  return (
    <>
    <AdminPostBlog/>
 
  <hr className="my-3"/>
   <div>
    <div>
      <h2 className="font-bold text-center">Blog List</h2>


   <div>
      <div>
        <table className="hover:table-fixed">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
            <tbody>
              {blogs?.map((blog) => (  
                <tr key={blog.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4  text-sm text-gray-500">{blog.id}</td>
                <td className="px-6 py-4  text-sm text-gray-500">{format(blog.date_created, 'MM/dd/yyyy')}</td>
                <td className="px-6 py-4  text-sm  text-gray-500">{blog.title}</td>
                <td className="px-6 py-4  text-sm line-clamp-1 text-gray-500">{blog.description}</td>
                <td className="px-6 py-4  text-sm text-gray-500"><button onClick={() => handleDelete(blog.id)}
                    className="bg-red-400 hover:bg-red-500 p- rounded-md text-white text-xs">Delete</button> </td>
              </tr> 
              ))}
            </tbody>
        </table>    
      </div>
    </div>
    </div>
   </div>


    {/* Edit */}
  
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
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
                                    >
                                    </input>
                            </div>
                        </div>
                        
                        {/* Blog Post */}
                        <div>
                            <label htmlFor='title'>Blog post:</label>
                            <div>
                            <textarea 
                                        id="text" 
                                        name="text"                               
                                        >
                            </textarea>
                            </div>
                        </div>

                    </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
              font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
             Close
            </button>
            <button
              type="button"
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