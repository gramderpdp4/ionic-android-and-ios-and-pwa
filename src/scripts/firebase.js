import { initializeApp } from 'firebase/app'

const config = {
    apiKey: "AIzaSyBU-d-aV62IidKkGuq0oUjVd30YmHs-J2I",
    authDomain: "ionic-project-bd4a7.firebaseapp.com",
    databaseURL: "https://ionic-project-bd4a7-default-rtdb.firebaseio.com",
    projectId: "ionic-project-bd4a7",
    storageBucket: "ionic-project-bd4a7.appspot.com",
    messagingSenderId: "1044111735364",
    appId: "1:1044111735364:web:97540ba58e1dafaca15a11"
}

const app = initializeApp(config)

export default app