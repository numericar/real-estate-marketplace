import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const { currentUser } = useSelector(state => state.user);

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <Link to={"/"}>
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap p-3">
                        <span className="text-slate-500">Sahand</span>
                        <span className="text-slate-700">Estate</span>
                    </h1>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input
                        type="text"
                        placeholder="search"
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                    />
                    <FaSearch className="text-slate-500" />
                </form>
                <ul className="flex gap-4">
                    <Link to={"/"}>
                        <li className="hidden sm:inline text-slate-700 hover:text-slate-500 transition">
                            Home
                        </li>
                    </Link>
                    <Link to={"/about"}>
                        <li className="hidden sm:inline text-slate-700 hover:text-slate-500 transition">
                            About
                        </li>
                    </Link>

                    {currentUser ? (
                        <div>
                            <Link to={"/profile"}>
                                <img
                                    className="rounded-full h-7 w-7 object-cover" 
                                    src={currentUser.avatar} 
                                    alt="profile" />
                            </Link>
                        </div>
                    ) : (
                        <Link to={"/sign-in"}>
                            <li className="hidden sm:inline text-slate-700 hover:text-slate-500 transition">
                                Sign in
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </header>
    );
}
