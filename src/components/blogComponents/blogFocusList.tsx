
import BlogsTypes from "../../interfaces/BlogsType"

interface BlogListProps {
    blogsProp: BlogsTypes[];
}

const BlogFocusList: React.FC<BlogListProps> = ({ blogsProp }) => {

    const createBlogs = blogsProp.map((blog, index) => {
        return (
            <div className="" id={'blogs-' + String(index + 1)} key={index}>
                <div className="bg-white my-4 shadow-md p-2 rounded-lg">
                    <div className="my-2 text-center">{blog.title}</div>
                    <div className="p-3">{blog.description}</div>
                </div>
            </div>
        )
    })

    return createBlogs
}

export default BlogFocusList