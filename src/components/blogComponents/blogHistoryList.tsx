import BlogsTypes from "../../interfaces/BlogsType"

interface BlogListProps {
    blogsProp: BlogsTypes[];
}

const BlogHistoryList: React.FC<BlogListProps> = ({ blogsProp }) => {

    const createBlogNameList = blogsProp.map((blog, index) => {
        return (
            <div className="" id={'blogs-' + String(index + 1)} key={index}>
                <div className="bg-white my-4 shadow-md p-2 rounded-lg">
                    <div className="my-2 text-center">{blog.title}</div>
                </div>
            </div>
        )
    })

    return createBlogNameList
}

export default BlogHistoryList