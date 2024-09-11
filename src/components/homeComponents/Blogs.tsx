import { useEffect, useState } from "react";
import * as blogsApi from '../../api/blogs';
import BlogsTypes from '../../interfaces/BlogsType';
import { format } from 'date-fns'
import parse from 'html-react-parser'
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs ] = useState<BlogsTypes[]>([]);

  useEffect(() => {
    fetchAllBlogs()
  },[]);

  const fetchAllBlogs = async() => {
    const response = await blogsApi.fetchAllBlogs();
    const sixBlogs = response.sort((a, b) => b.id - a.id).slice(0,3);
    setBlogs(sixBlogs)
  }

  return (
    <>
    <div className="bg-green-100 rounded-xl p-4 md:p-8 lg:p-12 mt-8 lg:mt-12">
      
      <div className="rounded-2xl w-1/4 m-auto text-center font-roboto font-semibold text-6xl">
        Blogs
      </div>
  

      <div className="max-w-8xl p-5 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-lg shadow-2xl h-[40rem] overflow-hidden
              transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-center underline">{blog.title}</h2>
                <div className="text-left text-sm text-gray-500 mt-4">
                  {format(blog.date_created, 'MM/dd/yyyy')}
                </div>
                <div>
                  <p className="text-gray-700  mt-3 mb-4 font-bold text-2xl un">{blog.description}</p>
                </div>
                <div className="font-light line-clamp-6 ">
                  {parse(blog.content)}
                </div>
              </div>
              <div className="p-6">
                <Link to="/blogs" state={{blog : blog}}>See More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Blogs