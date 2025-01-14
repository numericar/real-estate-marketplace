import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { app } from "../firebase.js";
import { signInSuccess } from "../redux/user/userSlice.js";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleGoogleSignIn() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch("/api/auths/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            });

            const data = await res.json();
            dispatch(signInSuccess(data.data));
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="mt-3">
            <button
                onClick={handleGoogleSignIn}
                type="submit"
                className="
                bg-red-700 
                text-white 
                p-3 
                rounded-lg
                uppercase
                w-full"
            >
                Continue with google
            </button>
        </div>
    );
}
