import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import app from "./firebase"

const auth = getAuth(app)

export const loginUser = (email, password) => {
   return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            resolve()
        })
        .catch(error => {
            let code = error.code;

            switch (code) {
                case 'auth/invalid-credential':
                    code = 'E-mail ou senha incorretos'
                    break;
                    case 'auth/too-many-requests':
                        code = 'Muitas tentantivas. Aguarde 40 segundos e tente novamente'
                        break;
                default:
                    break;
            }
            
            reject(code)
        })
   })
}