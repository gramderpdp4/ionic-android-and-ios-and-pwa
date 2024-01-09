
import { getAuth } from "firebase/auth"
import app from "./firebase"

const auth = getAuth(app);

export const userSignOut = (router) => {
    auth.signOut(auth.currentUser)
    .then(() => {
        localStorage.removeItem("firebase-user-key");
        router.push('/')
        console.log(auth.currentUser)
    })
}