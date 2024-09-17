import { useEffect, useState } from "react";
import * as blogsApi from "../api/blogs";
import BlogsTypes from "../interfaces/BlogsType";
import BlogFocus from "../components/blogComponents/blogFocus";
import BlogHistoryList from "../components/blogComponents/blogHistoryList";
import { useLocation } from "react-router-dom";

const BlogPage = () => {
    
    // useStates
    const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
    const [chosenBlog, setChosenBlog] = useState<BlogsTypes | null>(null);


    //info from index page
    const fromIndexData = useLocation();

    // useEffects
    useEffect(() => {
        fetchAllBlogs();
    }, []);

    useEffect(() => {
        if(fromIndexData.state) {
            const blogFromIndex = fromIndexData.state.blog;
            setChosenBlog(blogFromIndex)
            window.scrollTo({top: 500, behavior: "smooth"});
        } else {
            setChosenBlog(blogs[0]);
        }
    }, [blogs])
    
    // Helper Functions
    const fetchAllBlogs = async () => {
        const response = await blogsApi.fetchAllBlogs();
        response.sort((a:BlogsTypes, b:BlogsTypes) => b.id - a.id)
        setBlogs(response);
    };
    
    return (
        <>
        <div className="w-screen">
            <div className="grid w-full h-[40rem] bg-pudding-background bg-cover bg-top rounded-sm opacity-80">
            </div>
            <div className="bg-gradient-to-br from-green-300 to-white font-sans h-full flex flex-col md:flex-row">
                <div className="hidden md:flex md:flex-col m-10 md:w-3/12 h-[60rem]">
                    <BlogHistoryList
                        blogsProp={blogs} 
                        setChosenBlog={setChosenBlog}
                        />
                </div>
                <div className="xl:mt-10 xl:mr-10 m-4 w-11/12 md:w-9/12">  
                {chosenBlog ? (
                    <BlogFocus chosenBlog={chosenBlog} />
                ) : (
                    <p>Please select a blog.</p>
                )}
                </div>
            </div>
        </div>

        {/* <Pagination
                blogsPerPage = {blogsPerPage}
                length = {props.blogsProp.length}
                handlePagination = {handlePagination}
            /> */}
        </>
    )
}

export default BlogPage