import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);

        try {
            const response = await fetch("/api/auths/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!data.status) {
                throw new Error(data.message);
            } else {
                setIsLoading(false);
                navigate("/sing-in");
            }
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    className="border p-3 rounded-lg"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    placeholder="email"
                    id="email"
                    className="border p-3 rounded-lg"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    className="border p-3 rounded-lg"
                    onChange={handleInputChange}
                    required
                />
                <div className="mt-5">
                    {errorMsg !== null && <p className="text-red-500">{errorMsg}</p>}
                    <button
                        disabled={isLoading}
                        className="
                    bg-slate-700 
                    text-white 
                    p-3 
                    rounded-lg 
                    uppercase 
                    hover:opacity-80
                    w-full
                    mt-3"
                    >
                        {isLoading ? "Loading..." : "Sign up"}
                    </button>
                </div>
                <div className="flex gap-2 mt-5">
                    <p>Have an account ?</p>
                    <Link to={"/sign-in"}>
                        <span className="text-blue-700">Sign in</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}
