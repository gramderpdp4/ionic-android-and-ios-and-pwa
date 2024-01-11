<template>
    <ion-footer>
        <ion-toolbar class="inline-flex">
            <p slot="start" class="ml-2">André Dev</p>
            <ion-button fill="clear" class="flex align-items-center" slot="end" @click="downloadApp">
                <img :src="play_store" alt="" width="24">
                <b class="capitalize ml-2 text-sm" style="color: #000000;">Baixe o aplicativo</b>
            </ion-button>
        </ion-toolbar>
    </ion-footer>
</template>
<script setup>
    import { IonToolbar, IonFooter, IonTitle, alertController, IonButton } from '@ionic/vue'
    import play_store from '@/files/play-store.svg';
    import { downloadApk } from '@/scripts/download-apk.js'

    const downloadApp = async () => {
        const download = await alertController.create({
            header: 'Importante',
            subHeader: 'Este aplicativo destina-se apenas a fins de teste e foi desenvolvido de maneira a não comprometer a segurança do seu dispositivo.',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        download.dismiss()
                    }
                },
                {
                    text: 'Baixar',
                    handler: () => {
                        downloadApk()
                    }
                }
            ]
        })

        download.present()
    }
</script>
