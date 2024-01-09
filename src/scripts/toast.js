import { toastController } from '@ionic/vue'

export const toast = async (obj) => {
    const { position, message, duration } = obj;
    const elToast = await toastController.create({
        position: position,
        message: message,
        duration: duration,
        color: 'dark'
    })

    await elToast.present();
}