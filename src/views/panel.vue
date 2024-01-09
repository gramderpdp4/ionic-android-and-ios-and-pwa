<template>
    <ion-page class="md" ref="page">
        <ion-header>
            <ion-toolbar>
                <ion-chip v-if="user.details">
                    <ion-avatar>
                        <img :src="userThumb" />
                    </ion-avatar>
                    <ion-label>
                        Olá, {{ firstName }}
                    </ion-label>
                </ion-chip>
                <ion-item v-else lines="none">
                    <ion-thumbnail slot="start">
                        <ion-skeleton-text :animated="true"></ion-skeleton-text>
                    </ion-thumbnail>
                    <ion-label>
                        <h3>
                            <ion-skeleton-text :animated="true" style="width: 120px; height: 15px;"></ion-skeleton-text>
                        </h3>
                    </ion-label>
                </ion-item>
                <ion-button v-if="user.details" shadow @click="exitUser" fill="clear" slot="end"
                    class="flex align-items-center">
                    <img :src="logout_icon" alt="">
                    <b class="font-normal capitalize">Sair</b>
                </ion-button>
                <h3 v-else slot="end" class="mr-2">
                    <ion-skeleton-text :animated="true" style="width: 50px; height: 15px;"></ion-skeleton-text>
                </h3>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="block mt-5">
                <skeletonListTasks v-if="!user.tasks" />
                <h4 v-else-if="user.tasks == 'empty'" class="text-center mt-8">Nenhuma tarefa</h4>
                <ion-list v-else class="lg:w-20rem sm:w-full md:w-20rem xl:w-20rem">
                    <ion-list-header>
                        <ion-title>Minhas tarefas</ion-title>
                    </ion-list-header>
                    <ion-item lines="none" v-for="item in user.tasks" class="ml-3">
                        <ion-thumbnail slot="start" class="flex align-items-center justify-content-center">
                            <div v-if="item.scheduler">
                                <img :src="scheduler_true" />
                            </div>
                            <div v-else>
                                <img :src="scheduler_false" />
                            </div>
                        </ion-thumbnail>
                        <ion-label class="ml-2">
                            <h3>
                                {{ item.title }}
                            </h3>
                            <p>{{ item.description }}</p>
                        </ion-label>
                    </ion-item>
                </ion-list>
                <ion-card v-if="isWeb && !user.tasks | isWeb " class="mb-2 xl:w-15rem md:w-15rem sm:w-full xl:mx-auto md:mx-auto ml-3 mr-3 grid m-auto mt-8">
                    <ion-card-header>
                        <ion-card-title class="font-bold text-base">Aviso</ion-card-title>
                    </ion-card-header>
                    <ion-card-content class="font-semibold text-sm">
                        No momento, você só pode adicionar tarefas pelo aplicativo. Alterações feitas por lá serão refletidas aqui.
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
        <NewTask v-if="!isWeb" @click="createdTask"/>
        <Footer v-if="isWeb" />
    </ion-page>
</template>
<script>
import {
    IonPage, IonListHeader, IonList, IonSkeletonText, alertController, IonThumbnail, modalController, IonToggle,
    IonContent, IonHeader, IonToolbar, IonButton, IonChip, IonAvatar, IonTextarea, IonInput, IonItem, IonLabel,
    IonSpinner, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle
} from '@ionic/vue'
import { userSignOut } from '@/scripts/sign-out'
import task_icon from '@/files/task.svg';
import Modal from '@/components/modal-create-task.vue'
import skeletonListTasks from '@/components/skeleton-list.tasks.vue';
import scheduler_true from '@/files/schedule-true.svg';
import scheduler_false from '@/files/schedule-false.svg'
import more_icon from '@/files/more.svg'
import logout_icon from '@/files/logout.svg'
import Footer from '@/components/footer.vue'
import app from '@/scripts/firebase';
import { getDatabase, onValue, ref, push, update } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NewTask from '@/components/new-task.vue';
import { infoDevice } from '@/scripts/device';

const db = getDatabase(app);
const auth = getAuth(app)

export default {
    mixins: [infoDevice],

    data() {
        return {
            scheduler_true: scheduler_true,
            scheduler_false: scheduler_false,
            more_icon: more_icon,
            logout_icon: logout_icon,
            modal: true,
            isWeb: true,
            task_icon: task_icon,
            user: {
                details: null,
                tasks: null
            },
            isOpenModal: false,
            firebaseKey: localStorage.getItem("firebase-user-key"),
            notificationSpinner: false
        }
    },

    components: {
        IonPage, IonContent, IonButton, IonTextarea,
        IonInput, IonList, IonItem, IonLabel, IonToolbar, IonHeader,
        IonSpinner, IonToggle, IonTitle, skeletonListTasks,
        IonListHeader, IonSkeletonText, IonThumbnail, IonChip,
        IonAvatar, Footer, IonCard, IonCardContent, IonCardHeader,
        IonCardTitle, NewTask
    },

    computed: {
        firstName() {
            return this.user.details.name.split(' ').slice(0, 1).join()
        },

        userThumb() {
            return this.user.details.photo ? this.user.details.photo : 'https://ionicframework.com/docs/img/demos/avatar.svg'
        },

        async isPlatformWeb() {
          const platform = await this.platform()

          this.isWeb = platform
        }
    },

    methods: {
        async createdTask() {
            const modal = await modalController.create({
                component: Modal,
                componentProps: {
                    closeModal: () => {
                        modal.dismiss()
                    },
                    changeBreakPoint: (breakpoint) => {
                        modal.setCurrentBreakpoint(breakpoint)
                    }
                },
                initialBreakpoint: 0.5,
                breakpoints: [0, 0.5, 0.75, 1]
            })

            modal.present()
        },

        async exitUser() {
            const exit = await alertController.create({
                header: 'Deseja sair?',
                cssClass: 'ion-custom-alert',
                buttons: [
                    {
                        text: 'Cancelar',
                        cssClass: 'ion-alert-custom-button',
                        handler: () => {
                            exit.dismiss()
                        }
                    },
                    {
                        text: 'Sair',
                        cssClass: 'ion-alert-custom-button',
                        handler: () => {
                            userSignOut(this.$router)
                        }
                    },
                ]
            })

            exit.present()
        },

        getDataUserFirebase() {

            const path = ref(db, `users/${this.firebaseKey}`);

            onValue(path, (output) => {

                const { tasks, ...rest } = output.val()

                this.user.details = rest
                
                if(tasks) this.user.tasks = tasks
                else this.user.tasks = 'empty'
            })
        },

    },
    mounted() {
        this.isPlatformWeb

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.firebaseKey = user.uid;
                this.getDataUserFirebase()
            }
        })
    },

}
</script>
<style>
ion-thumbnail {
    --size: 24px;
}
</style>