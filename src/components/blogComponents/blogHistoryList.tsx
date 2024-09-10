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
    const [blogsPerPage] = useState<number>(7);
    
    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = props.blogsProp.slice(indexOfFirstBlog, indexOfLastBlog);

    const createBlogNameList = currentBlogs.map((blog, index) => {
        return (
            <div className="transition ease-in-out cursor-pointer max-w-72 hover:scale-110 duration-300 opacity-25 hover:opacity-75" id={'blogs-' + String(index + 1)} key={index} onClick={() => props.setChosenBlog(blog)}>
                <div className="bg-white my-2 shadow-md p-2 rounded-lg" >
                    <div className="my-2 text-center">{blog.title}</div>
                    <div className="text-center font-light">{blog.description}</div>
                    <div className="text-end font-thin">{formatDistanceToNow(blog.date_created)}</div>
                </div>
            </div>
            
        )
    })

    return (
        <>
            {createBlogNameList}
            <Pagination
                blogsPerPage = {blogsPerPage}
                length = {props.blogsProp.length}
                handlePagination = {handlePagination}
            />
        </>
    )
}

export default BlogHistoryList