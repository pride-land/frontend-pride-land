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
    <div className="bg-green-100 rounded-xl p-4 md:p-8 lg:p-12 mt-8 lg:mt-12">
      <div className="max-w-7xl p-5 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-lg shadow-2xl overflow-hidden
              transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.description}</p>
                <Content content={parse(blog.content)} />
                <div className="text-right text-sm text-gray-500 mt-4">
                  {format(blog.date_created, 'MM/dd/yyyy')}</div>
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