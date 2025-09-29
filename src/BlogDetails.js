import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        })
        .then(() => {
            history.push('/');
            console.log('blog deleted');
        })
    }

    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{error}</div> }
            { blog && (
                <article>
                    <h1>{blog.title}</h1>
                    <h2>Written by { blog.author }</h2>
                    <p>{ blog.body }</p>
                </article>
            )}
            { !isPending && <button onClick={handleClick}>delete</button>}
        </div>
     );
}
 
export default BlogDetails;