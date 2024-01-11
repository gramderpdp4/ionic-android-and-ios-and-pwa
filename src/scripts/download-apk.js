import app from "./firebase";
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { toast } from './toast'
import { loadingController } from "@ionic/vue";

const storage = getStorage(app);

const file_name = 'ionic-apk.rar'

export const downloadApk = async () => {
    
    const loading = await loadingController.create({
        message: 'Baixando aplicativo...'
    })

    loading.present()

    getDownloadURL(ref(storage, file_name))
    .then( async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
            })

            const buffer = await response.arrayBuffer()

            const blob = new Blob([buffer])

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob)
            link.download = file_name
            link.click()
        } catch (error) {
            console.log('catch error', error.message)
        }
    })
    .catch(error => {
        toast({
            message: 'Erro ao fazer download',
            position: 'middle',
            duration: 2000
        })

        console.log('error download', error)
    }).finally(() => {
        loading.dismiss()
    })
}