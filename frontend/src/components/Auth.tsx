import { ChangeEvent, useState } from "react";
import { SignupInput } from "@gbkchaitanya/common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <div>
            <div className="px-8 text-center">
                <div className="text-3xl font-extrabold">
                    {type === "signin" ? "Login to account" : "Create an account"}
                </div>
                <div className="text-slate-500 mt-4 mb-8">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?"} <a href={type === "signin" ? "/signup" : "/signin"} className="text-blue-500 underline">
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </a>
                </div>
            </div>
            <div className="space-y-2">
            {type === "signup" && <LabelledInput label="Name" placeholder="Chaitanya" onChange={(e) => {
                setPostInputs({...postInputs, name: e.target.value});
            }
            } />}
            <LabelledInput label="Username" placeholder="Chaitanya@gmail.com" onChange={(e) => {
                setPostInputs({...postInputs, username: e.target.value});
            }} />
            <LabelledInput label="Password" type="password" placeholder="******" onChange={(e) => {
                setPostInputs({...postInputs, password: e.target.value});
            }} />
            <button 
            onClick={sendRequest}
            type="button" className="mt-4 text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">
                {type === "signup" ? "Sign up" : "Sign in"}
            </button>

            </div>
        </div>
        </div>
    );
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{label}</label>
            <input type={type || "text"}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    );
}