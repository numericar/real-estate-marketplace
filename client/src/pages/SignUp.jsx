import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-5">
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    className="border p-3 rounded-lg"
                    required
                />
                <input
                    type="email"
                    placeholder="email"
                    id="email"
                    className="border p-3 rounded-lg"
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    className="border p-3 rounded-lg"
                    required
                />
                <button
                    className="
                    bg-slate-700 
                    text-white 
                    p-3 
                    rounded-lg 
                    uppercase 
                    hover:opacity-80"
                >
                    Sign up
                </button>
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
