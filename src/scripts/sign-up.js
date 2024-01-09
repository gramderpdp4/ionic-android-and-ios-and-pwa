import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { getDatabase, onValue, update, ref } from 'firebase/database'
import app from './firebase';
import { toast } from './toast';

const auth = getAuth(app)
const db = getDatabase(app)

export const createUser = (obj) => {
    return new Promise((resolve, reject) => {
        const { email, password, name } = obj;

        createUserWithEmailAndPassword(auth, email, password)
            .then(currentUser => {
                const user = currentUser.user;
                const uid = user.uid;

                updateProfile(user, {
                    displayName: name
                })

                createUserDatabase(obj, uid)

                resolve()
            })
            .catch(error => {
                const code = error.code;

                switch (code) {
                    case 'auth/invalid-email':
                        toast({
                            message: 'Digite um e-mail válido',
                            position: 'middle',
                            duration: 2000
                        })
                        break;
                    case 'auth/weak-password':
                        toast({
                            message: 'Sua senha deve conter pelo menos 6 dígitos',
                            position: 'middle',
                            duration: 2500
                        })
                        break;
                    case 'auth/email-already-in-use':
                        toast({
                            message: 'Esse e-mail já está cadastrado',
                            position: 'middle',
                            duration: 2500
                        })
                        break;

                    default:
                        break;
                }

                reject()
            })
    })
}

const createUserDatabase = (obj, uid) => {
    const obj_user = { ...obj, uid };

    const user_exists = ref(db, `users/${uid}`);

    onValue(user_exists, (user) => {
        if (!user.exists()) {
            update(user_exists, obj_user)

            toast({
                message: 'Usuário cadastrado',
                position: 'middle',
                duration: 2000
            })
        }
    })
}