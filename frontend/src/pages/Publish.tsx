import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    return (
        <div>
            <Appbar />
            <div className="flex justify-center mt-10">
                <form className="space-y-4 min-w-180">
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white" htmlFor="title">Title</label>
                        <input 
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white" htmlFor="content">Content</label>
                        <textarea
                        onChange={(e) => setContent(e.target.value)}
                        name="content" id="content" className="min-h-120 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-48" required></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 cursor-pointer"
                        onClick={async (e) => {
                            e.preventDefault();
                            try {
                                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                    title,
                                    content
                                },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': localStorage.getItem('token')
                                    }
                                });
                                navigate('/blog/' + response.data.id);
                            } catch (error) {
                                console.error('Error publishing blog:', error);
                            }
                        }}
                        >Publish</button>
                    </div>
                </form>
            </div>
        </div>
    )
}