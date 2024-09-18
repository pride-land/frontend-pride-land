import { useEffect, useState } from "react"
import Axios from "axios";
import BlogsTypes from "../../interfaces/BlogsType"
import * as blogsApi from "../../api/blogs"
import { format } from 'date-fns'
import AdminPostBlog from "../admin-components/AdminPostBlog";

const BlogsAdmin = () => {

  const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
  
  useEffect(()=>{
    fetchAllBlogs();
  },[]);


  const fetchAllBlogs = async() => {
    const response = await blogsApi.fetchAllBlogs();
    setBlogs(response.reverse())
  }

  const handleDelete = (id: number) => {
  if(window.confirm("削除します")){
    try{
      Axios.delete(process.env.backend_url  + `blogs/${id}/`)
      .then(() => {
        window.location.reload()
      });
    }catch (error){
      console.error('error', error);
      }
    }
  }

  return (
    <>
    <AdminPostBlog/>
 
  <hr className="my-3"/>
   <div>
    <div>
      <h2 className="font-bold text-center">ブログリスト</h2>


   <div>
      <div>
        <table className="hover:table-fixed">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日付</th>
              <th className="px-6 py-3 text-left text-xs font-medium w-[10rem] text-gray-500 uppercase">タイトル</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">説明</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">アクション</th>
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
                    className="bg-red-400 hover:bg-red-500 p-1 rounded-md text-white text-xs">削除</button></td>
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

