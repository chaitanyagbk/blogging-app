import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "../components/BlogCard";
import { useNavigate } from "react-router-dom";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <Appbar />
            <div className="grid grid-cols-12 gap-6 px-6 py-6 max-w-6xl mx-auto">
                {/* Blog Content */}
                <div className="col-span-12 md:col-span-8 space-y-4">
                    <h1 className="text-5xl font-extrabold">{blog.title}</h1>
                    <p className="text-md text-slate-600 font-light">
                        Posted on: 1st March 2025
                    </p>
                    <p className="text-lg font-light leading-relaxed">
                        {blog.content}
                    </p>
                </div>

                {/* Author Section */}
                <div className="col-span-12 md:col-span-4 space-y-4 ml-12">
                    <h2 className="text-lg font-extrabold text-slate-600">Author</h2>
                    <div className="flex items-center space-x-3">
                        <Avatar name={blog.author.name} size="small" />
                        <p className="text-lg font-bold">{blog.author.name.toUpperCase()}</p>
                    </div>
                    <p className="text-md text-slate-600 font-light min-w-180">
                        "An insightful thinker with a unique perspective that captivates readers."
                    </p>
                </div>

                {/* Back Button */}
                <div className="col-span-12">
                    <button 
                        onClick={() => navigate('/blogs')} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
};
