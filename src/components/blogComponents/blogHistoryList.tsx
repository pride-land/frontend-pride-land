import React, { Dispatch, SetStateAction, useState } from "react"
import BlogsTypes from "../../interfaces/BlogsType"
import { formatDistanceToNow } from "date-fns"
import Pagination from "./pagination"

interface Props {
    blogsProp: BlogsTypes[],
    setChosenBlog: Dispatch<SetStateAction<BlogsTypes | null>>
}

const BlogHistoryList: React.FC<Props> = (props) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [blogsPerPage] = useState<number>(6);
    
    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = props.blogsProp.slice(indexOfFirstBlog, indexOfLastBlog);

    const createBlogNameList = currentBlogs.map((blog, index) => {
        return (
            <div className="invisible lg:visible xl:visible ml-2 transition ease-in-out cursor-pointer  hover:scale-105 duration-300" id={'blogs-' + String(index + 1)} key={index} onClick={() => props.setChosenBlog(blog)}>
                <div className="bg-white my-1 shadow-md p-4 rounded-md h-32" >
                    <div className="my-2 text-center">{blog.title}</div>
                    <div className="text-end font-thin mt-10">{formatDistanceToNow(blog.date_created)}</div>
                </div>
            </div>
            
        )
    })

    return (
        <>
            <div className="text-gray-500">
            {createBlogNameList}
            <Pagination
                blogsPerPage = {blogsPerPage}
                length = {props.blogsProp.length}
                handlePagination = {handlePagination}
            />
            </div>
        </>
    )
}

export default BlogHistoryList