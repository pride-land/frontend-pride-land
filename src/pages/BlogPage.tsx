import { useEffect, useState } from "react";
import * as blogsApi from "../api/blogs";
import BlogsTypes from "../interfaces/BlogsType";
import BlogFocus from "../components/blogComponents/blogFocus";
import BlogHistoryList from "../components/blogComponents/blogHistoryList";

const BlogPage = () => {

    // useStates
    const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
    const [chosenBlog, setChosenBlog] = useState<BlogsTypes | null>(null);

    // useEffects
    useEffect(() => {
        fetchAllBlogs();
    }, []);

    // Helper Functions
    const fetchAllBlogs = async () => {
        const response = await blogsApi.fetchAllBlogs();
        setBlogs(response);
    };
    
    return (
        <div className="w-screen">
            <div className="(Image) grid w-full h-[45rem] bg-pudding-background bg-cover bg-top rounded-sm opacity-80">

                <div className="mt-auto mb-auto ml-24 w-60 h-40 text-left text-[100px] text-white font-serif">
                    Blogs...
                </div>

            </div>
            <div className="(Body) bg-gradient-to-br from-green-300 to-white font-sans h-full flex">
                <div className="(Blog History) flex flex-col m-10 w-3/12 h-[60rem]">
                    <BlogHistoryList
                        blogsProp={blogs} 
                        setChosenBlog={setChosenBlog}
                    />
                </div>
                {chosenBlog && (
                <div className="(Selected Month's Blog Posts) m-10 w-full">
                    <h1 className="(Selected Month Placeholder) m-auto"></h1>
                    <BlogFocus chosenBlog={chosenBlog} />
                </div>
                )}
            </div>
          

            
        </div>
    )
}

export default BlogPage