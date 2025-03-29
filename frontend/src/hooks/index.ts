import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);    
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            }) 
    }, []);

    return { loading, blogs };

}

export const useBlog = (id: number) => {
    const [loading, setLoading] = useState(true);    
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id]);

    return { loading, blog };
}
