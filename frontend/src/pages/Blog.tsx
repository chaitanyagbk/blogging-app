import { useBlog } from "../hooks";
import { Appbar } from "../components/Appbar"
import { FullBlog } from "../components/FullBlog";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/GenericComponents";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog(Number(id || ""));

    if (loading) {
        return <div>
            <Appbar /> 
            <Spinner />
        </div>
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    );
}