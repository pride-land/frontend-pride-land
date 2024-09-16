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
      <div className="bg-green-100 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 mt-8 sm:mt-10 lg:mt-12">
        <div className="text-center font-roboto font-thin text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
         
        </div>
  
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <div key={index} className="hover:xl:bg-white rounded-lg shadow-md hover:shadow-lg 
                transition ease-in-out cursor-pointer  hover:scale-105 duration-300
                 overflow-hidden" >
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-center underline">
                    {blog.title}
                  </h2>
                  <div className="text-left text-xs sm:text-sm text-gray-500 mt-2">
                    {format(blog.date_created, 'MM/dd/yyyy')}
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700 text-lg sm:text-xl md:text-2xl font-bold mb-4">
                      {blog.description}
                    </p>
                  </div>
                  <div className="font-light line-clamp-4 sm:line-clamp-6">
                    {parse(blog.content)}
                  </div>
                </div>
                <div className="p-4 sm:p-6 sm:text-sm">
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