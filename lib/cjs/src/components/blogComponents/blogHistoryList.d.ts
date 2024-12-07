import React, { Dispatch, SetStateAction } from "react";
import BlogsTypes from "../../interfaces/BlogsType";
interface Props {
    blogsProp: BlogsTypes[];
    setChosenBlog: Dispatch<SetStateAction<BlogsTypes | null>>;
}
declare const BlogHistoryList: React.FC<Props>;
export default BlogHistoryList;
