import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailed, signInSuccess } from "../redux/user/userSlice";

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { isLoading, errorMsg } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        dispatch(signInStart());

        try {
            const response = await fetch("/api/auths/signin", {
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
                dispatch(signInSuccess(data.data));
                navigate("/");
            }
        } catch (error) {
            dispatch(signInFailed(error.message));
        }
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
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
                        {isLoading ? "Loading..." : "Sign In"}
                    </button>
                </div>
                <div className="flex gap-2 mt-5">
                    <p>Don&apos;t have an account ?</p>
                    <Link to={"/sign-up"}>
                        <span className="text-blue-700">Sign Up</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}
