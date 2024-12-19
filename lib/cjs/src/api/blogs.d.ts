import BlogsType from "../interfaces/BlogsType";
export declare const fetchAllBlogs: () => Promise<BlogsType[]>;
export declare const fetchAllBlogsById: (id: number) => Promise<BlogsType[]>;
