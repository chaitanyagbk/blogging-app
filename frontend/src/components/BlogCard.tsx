import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({authorName, title, content, publishedDate, id}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
        <div className="border-b-1 border-gray-300 dark:border-gray-600 p-4 min-w-120 max-w-240 cursor-pointer">
            <div className="flex space-x-1.25">
                <div>
                    <Avatar name={authorName} /> 
                </div>
                <div className="font-extralight text-sm flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex items-center">
                    <Circle />
                </div>
                <div className="font-thin text-slate-800 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>                
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100)}...
            </div>
            <div className="text-sm font-thin text-slate-600 pt-2">
                {Math.ceil(content.length / 100)} min(s) read
            </div>
        </div>
        </Link>
    );
}

function Circle() {
    return (
        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600">
        </div>
    )
}

export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
    const sizeClass = size === "big" ? "w-10 h-10 text-md" : "w-6 h-6 text-sm";

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 ${sizeClass}`}>
            <span className="text-gray-600 dark:text-gray-300">
                {name.split(" ").map((n) => n[0].toUpperCase()).join("")}
            </span>
        </div>
    );
}


