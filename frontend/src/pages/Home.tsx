import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    
    const handleNavigation = (path: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        } else {
            navigate(path);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-4xl font-extrabold text-gray-900 mb-4">MEDIUM</div>
            <p className="text-lg text-gray-700 mb-6 text-center px-4 max-w-2xl">
                Discover insightful articles or share your own thoughts with the world. Sign in to get started!
            </p>
            <div className="flex space-x-4">
                <button 
                    onClick={() => handleNavigation("/blogs")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition"
                >
                    View Blogs
                </button>
                <button 
                    onClick={() => handleNavigation("/publish")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition"
                >
                    Write a Blog
                </button>
            </div>
        </div>
    );
};