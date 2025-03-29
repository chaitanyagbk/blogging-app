import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return (
        <div className="flex justify-between items-center px-10 py-4 border-b">
            <Link to="/blogs">
            <div className="text-2xl font-bold cursor-pointer">
                Medium
            </div>
            </Link>
            <div className="flex space-x-4">
                <Link to="/publish">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 cursor-pointer">
                        Write
                    </button>
                </Link>
                <Link to="/signin">
                    <button onClick={() => localStorage.removeItem('token')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 cursor-pointer">
                        Logout
                    </button>
                </Link>
                <Avatar name="GBK Chaitanya" size="big"/>
            </div>
        </div>
    )
}