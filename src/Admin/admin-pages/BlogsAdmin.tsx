import { useEffect, useState } from "react"
import Axios from "axios";
import BlogsTypes from "../../interfaces/BlogsType"
import * as blogsApi from "../../api/blogs"
import { format } from 'date-fns'
import AdminPostBlog from "../admin-components/AdminPostBlog";

const BlogsAdmin = () => {

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
              <th className="px-6 py-3 text-left text-xs font-medium w-[10rem] text-gray-500 uppercase">Title</th>
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
                    className="bg-red-400 hover:bg-red-500 p-1 rounded-md text-white text-xs">Delete</button> </td>
              </tr> 
              ))}
            </tbody>
        </table>    
      </div>
     </div>
    </div>
   </div>
  </>
  
  )

}

export default BlogsAdmin