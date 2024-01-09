<template>
    <ion-page class="md">
      <ion-header>
        <ion-toolbar>
          <ion-title>Entrar</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <div class="x-sm:width x-sm:absolute x-sm:transform-y-50 x-sm:top-50 
        x-sm:p-lr-3 sm:w-full sm:m-5 xl:w-20rem md:w-20rem md-sm:width-20rem 
        sm:centered xl:centered md:centered md-sm:centered">
            <form @submit.prevent="login">
              <ion-input v-model="formLogin.email" label="E-mail" autocomplete="off" autocapitalize="off" type="email" label-placement="floating" fill="outline" placeholder="Digite seu e-mail" required></ion-input>
              <ion-input v-model="formLogin.password" label="Senha" autocomplete="off" autocapitalize="off" type="password" class="mt-3 mb-3" label-placement="floating" fill="outline" placeholder="Digite sua senha" required></ion-input>
              <ion-button :disabled="buttonLoginDisabled" type="submit" class="w-full h-2rem">
                  <div class="flex align-items-center">
                      <ion-spinner v-if="loginSpinner"></ion-spinner>
                      <b class="ml-2">Entrar</b>
                  </div>
              </ion-button>
            </form>
            <div class="divider"></div>
            <ion-button @click="$router.push('/register')" fill="clean" class="w-full h-2rem font-normal">
              Registrar
            </ion-button>
          </div>
      </ion-content>
      <Footer v-if="isWeb" />
    </ion-page>
  </template>
  <script>
    import { 
    IonPage, IonContent, IonItem, IonSpinner, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonCheckbox
    } from '@ionic/vue'
    import { toast } from '@/scripts/toast';
    import { loginUser } from '@/scripts/sign-in';
    import Footer from '@/components/footer.vue';
    import { infoDevice } from '@/scripts/device';

    export default {
      data: () => {
        return {
            loginSpinner: false,
            isWeb: true,
            buttonLoginDisabled: false,
            formLogin: {
                email: '',
                password: ''
            }
        }
      },

      mixins: [infoDevice],

      components: {
        IonPage, IonContent, IonSpinner, IonItem, IonInput, IonButton, IonHeader, IonToolbar, 
        IonTitle, IonCheckbox, Footer
      },

      computed: {
        async isPlatformWeb() {
          const platform = await this.platform()

          this.isWeb = platform
        }
      },  

      methods: {
        login() {
          this.loginSpinner = true
          this.buttonLoginDisabled = true
          loginUser(this.formLogin.email, this.formLogin.password)
          .then(success => {
            this.$router.push('/panel')
          })
          .catch(error => {
            toast({
                message: error,
                position: 'middle',
                duration: 2500
            })
          })
          .finally(() => {
            this.loginSpinner = false
            this.buttonLoginDisabled = false
          })
        }
      },

      mounted() {
        this.isPlatformWeb
      }
    }
  </script>