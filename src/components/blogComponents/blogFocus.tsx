import parse from 'html-react-parser'
import BlogsTypes from "../../interfaces/BlogsType"
import { format } from 'date-fns';

interface Props {
    chosenBlog: BlogsTypes;
}

const BlogFocus: React.FC<Props> = (props) => {

    return (
        <div className="bg-white my-4 shadow-md p-8 rounded-lg max-w-2/3">
            <div className="my-2 text-center font-black text-5xl font-semibold">
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
    
    )
}

export default BlogFocus