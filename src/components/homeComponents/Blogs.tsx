import { useEffect, useState } from "react";
import * as blogsApi from '../../api/blogs';
import BlogsTypes from '../../interfaces/BlogsType';
import Content from "../../Admin/admin-pages/Content";
import { format } from 'date-fns'
import parse from 'html-react-parser'


const Blogs = () => {
  const [blogs, setBlogs ] = useState<BlogsTypes[]>([]);

    useEffect(() => {
       fetchAllBlogs()
    },[]);

    const fetchAllBlogs = async() => {
      const response = await blogsApi.fetchAllBlogs();
      setBlogs(response)
    }

   return (
    <> 
      <div className="e p-10 m-20 bg-green-100 mt-36 mb-0 shadow-lg rounded-md  max-w-7xl px-6 lg:px-8 " >
        <div className="bg-green-100 p-5 rounded-sm">
          <div>{blogs.map((blog, index) => (
              <div className="bg-white  text-center m-5 p-16 rounded-md shadow-lg" key={index}>
                <div>{blog.title}</div>
                <br/>
                <div>{blog.description}</div>
                <hr className="mt-3"/><br/>
                <div> <Content content={parse(blog.content)} /> </div>
              <div className="text-right mt-3">{format(blog.date_created, 'MM/dd/yyyy')}</div>
          </div>
          ))}
          </div>
        </div>
      </div>
    </>
   )
}


export default Blogs