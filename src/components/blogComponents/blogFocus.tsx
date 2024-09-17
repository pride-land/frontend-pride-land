import parse from 'html-react-parser'
import BlogsTypes from "../../interfaces/BlogsType"
import React, { Dispatch, SetStateAction, useState } from "react"
import { format } from 'date-fns';
import  Pagination  from "./pagination";



interface Props {
    chosenBlog: any;
    blogsProp: BlogsTypes[];
    setChosenBlog: Dispatch<SetStateAction<BlogsTypes | null>>
}

const BlogFocus: React.FC<Props> = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState<number>(1);

    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

   
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = props.blogsProp.slice(indexOfFirstBlog, indexOfLastBlog);


    console.log(props.blogsProp)
    const createBlogList  = currentBlogs.map((blog, index) => {
        return (
            <div  className="visible lg:invisible" id={'blogs-' + String(index + 1)} key={index} onClick={() => props.setChosenBlog(blog)}>
                <div>

                <div className="bg-white my-1 shadow-md p-4 rounded-md " >
                    <div className="my-2 text-center">{blog.title}</div>
                    <div>{format(props.chosenBlog.date_created, 'dd/MM/yyyy')}</div>
                    <div className=''> {parse(props.chosenBlog.content)}</div>
                </div>
                </div>
            </div>
        )
    })

    return (
        <>
        <div className="portrait:hidden landscape:visible bg-white  shadow-md p-8 rounded-md max-w-2/3">
            <div className="my-2 text-center text-5xl font-semibold">
                {props.chosenBlog.title}
            </div>

            <div className='text-end text-gray-500'>
                {format(props.chosenBlog.date_created, 'dd/MM/yyyy')}
            </div>

            <div className="p-3 font-thin text-2xl">
                {props.chosenBlog.description}
            </div>

            <div className='center'>
                {parse(props.chosenBlog.content)}
            </div>
        </div>
            
            
            <div className='portrait:visible landscape:hidden text-gray-500'>
            {createBlogList}
            <Pagination
                blogsPerPage = {blogsPerPage}
                length = {props.blogsProp.length}
                handlePagination = {handlePagination}
                />
            </div>

    </>
    
    )
}

export default BlogFocus
