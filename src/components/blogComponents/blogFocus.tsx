import parse from 'html-react-parser'
import BlogsTypes from "../../interfaces/BlogsType"
import { format } from 'date-fns';

interface Props {
    chosenBlog: BlogsTypes;
}

const BlogFocus: React.FC<Props> = (props) => {

    return (
        <div className="bg-white my-4 shadow-md p-2 rounded-lg">
            <div className="my-2 text-center font-black text-5xl">
                {props.chosenBlog.title}
            </div>

            <div className='text-end'>
                {format(props.chosenBlog.date_created, 'dd/MM/yyyy')}
            </div>

            <div className="p-3 font-semibold text-2xl">
                {props.chosenBlog.description}
            </div>

            <div className='center'>
                {parse(props.chosenBlog.content)}
            </div>
        </div>
    
    )
}

export default BlogFocus