import BlogsTypes from "../../interfaces/BlogsType";
import React, { Dispatch, SetStateAction } from "react";
interface Props {
    chosenBlog: BlogsTypes;
    blogsProp: BlogsTypes[];
    setChosenBlog: Dispatch<SetStateAction<BlogsTypes | null>>;
}
declare const BlogFocus: React.FC<Props>;
export default BlogFocus;
