<template>
    <ion-page>
        <ion-header>
           <ion-toolbar>
                <ion-title>Registro</ion-title>
           </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="x-sm:width x-sm:absolute x-sm:transform-y-50 x-sm:top-50 
            x-sm:p-lr-3 sm:w-full sm:m-5 xl:w-20rem md:w-20rem md-sm:width-20rem 
            sm:centered xl:centered md:centered md-sm:centered">
                <form @submit.prevent="sendRegister" id="register">
                    <ion-input v-model="dataFormRegister.name" class="mb-3" name="name" label="Nome completo" autocomplete="off" autocapitalize="off" type="text" label-placement="floating" fill="outline" placeholder="Digite seu nome" required></ion-input>
                    <ion-input v-model="dataFormRegister.email" class="mb-3" name="email" label="E-mail" autocomplete="off" autocapitalize="off" type="email" label-placement="floating" fill="outline" placeholder="Digite seu e-mail" required></ion-input>
                    <ion-input v-model="dataFormRegister.password" class="mb-3" name="password" label="Senha" autocomplete="off" autocapitalize="off" type="password" label-placement="floating" fill="outline" placeholder="Digite sua senha" required></ion-input>
                    <ion-input v-model="dataFormRegister.repassword" class="mb-3" name="repassword" label="Repita sua senha" autocomplete="off" autocapitalize="off" type="password" label-placement="floating" fill="outline" placeholder="Repita sua senha" required></ion-input>
                    <ion-button :disabled="buttonRegisterDisabled" type="submit" class="w-full h-2rem">
                        <div class="flex align-items-center">
                            <ion-spinner v-if="registerSpinner"></ion-spinner>
                            <b class="ml-2">Registrar</b>
                        </div>
                    </ion-button>
                </form>
                <div class="divider"></div>
                <ion-button @click="$router.back('/')" fill="clean" class="w-full h-2rem">Entrar</ion-button>
            </div>
        </ion-content>
        <Footer v-if="isWeb"/>
    </ion-page>
</template>
<script>
    import { 
        IonPage, IonContent, IonToolbar, IonHeader, IonInput, IonButton, toastController, IonTitle, IonSpinner
    } from '@ionic/vue'
    import { createUser } from '@/scripts/sign-up';
    import { toast } from '@/scripts/toast'
    import Footer from '@/components/footer.vue'
    import { infoDevice } from '@/scripts/device';
 
    export default {
        data: () => {
            return {
                registerSpinner: false,
                buttonRegisterDisabled: false,
                isWeb: true,
                dataFormRegister: {
                    name: '',
                    email: '',
                    password: '',
                    repassword: ''
                }
            }
        },

        mixins: [infoDevice],

        components: {
            IonPage, IonContent, IonInput, IonButton, IonTitle, IonHeader, IonToolbar, 
            IonSpinner, Footer
        },

        computed: {
            async isPlatformWeb() {
                const platform = await this.platform()

                return this.isWeb = platform
            }
        },

        methods: {
            sendRegister() {
                if ( this.dataFormRegister.name.length > 0 && 
                this.dataFormRegister.email.length > 5 && 
                this.dataFormRegister.password.length > 0) {
                    if ( this.dataFormRegister.password === this.dataFormRegister.repassword ) {
                        this.buttonRegisterDisabled = true
                        this.registerSpinner = true
                        createUser({
                            email: this.dataFormRegister.email,
                            password: this.dataFormRegister.password,
                            name: this.dataFormRegister.name
                        })
                        .then(() => {
                            this.$router.push("/panel")
                        })
                        .finally(() => {
                            this.buttonRegisterDisabled = false
                            this.registerSpinner = false
                        })
                    } else {
                        toast({
                            message: 'As senhas não conferem',
                            duration: 2000,
                            position: 'middle'
                        })
                    }
                }
            },
        },

        mounted() {
            this.isPlatformWeb
        }
    }
</script>
<style scoped>
    
</style>