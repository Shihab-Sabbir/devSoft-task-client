import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import app from "../firebase/firebase.config";

export const logOut = (user, setUser, navigate, setDbUser) => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
        if (user?.uid) {
            setUser(null);
            toast.success('Logout Successful');
            setDbUser(null)
            localStorage.removeItem('job-task-token')
            navigate('/login');
        }
        else {
            toast.error('No user Logged in !')
        }
    }).catch((error) => {
        console.log(error)
    });
}