<template>
  <ion-header>
    <ion-toolbar class="m-2">
      <h4 slot="start">Criar tarefa</h4>
      <ion-button @click="eventCloseModal" fill="clear" slot="end">Fechar</ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="m-4">
      <form @submit.prevent="saveTask" id="formTask">
        <ion-input name="title" class="mb-3" label="Título da tarefa" autocomplete="off" autocapitalize="off" type="text"
          label-placement="floating" fill="outline" placeholder="Título da notificação" required></ion-input>
        <ion-textarea class="mb-3" name="description" label="Descrição da tarefa" label-placement="floating"
          fill="outline" placeholder="Descrição da notificação" required></ion-textarea>
        <ion-toggle class="mb-5" @ionChange="task.checkedNotificationTask = !task.checkedNotificationTask"
          :checked="task.checkedNotificationTask">Receber notificação</ion-toggle>
        <ion-accordion-group v-if="task.taskScheduled">
          <ion-accordion value="first">
            <ion-item slot="header" color="light">
              <ion-label>
                <div class="flex align-items-center">
                  <img :src="scheduled_task" />
                  <b class="font-normal ml-2">Tarefa agendada</b>
                </div>
              </ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">
              <ion-badge slot="start">{{ task.value }}</ion-badge>
            </div>
          </ion-accordion>
        </ion-accordion-group>
        <ion-button type="submit" fill="solid" class="w-full" required>
          <div class="flex align-items-center">
            <ion-spinner v-if="notificationSpinner"></ion-spinner>
            <b class="ml-2">Salvar tarefa</b>
          </div>
        </ion-button>
      </form>
    </div>
  </ion-content>
</template>
<script>
import scheduled_task from '@/files/scheduled-task.svg';
import { pickerTime } from '@/scripts/pickeTime.js'
import moment from 'moment-timezone';
import app from '@/scripts/firebase';
import { getDatabase, ref, push } from 'firebase/database'
import { LocalNotifications } from '@capacitor/local-notifications';
import { toast } from '@/scripts/toast'
import {
  IonHeader, IonTitle, IonContent, alertController, IonToolbar, IonNote, IonCheckbox,
  IonList, IonItem, IonButtons, IonButton
} from '@ionic/vue'

const db = getDatabase(app);

export default {
  data: () => {
    return {
      scheduled_task: scheduled_task,
      notificationSpinner: false,
      idNotification: 0,
      firebaseKey: localStorage.getItem("firebase-user-key"),
      buttonRegisterNotificationDisabled: false,
      task: {
        checkedNotificationTask: false,
        taskScheduled: false,
        value: ''
      },
    }
  },

  components: {
    IonHeader, IonTitle, IonContent, IonToolbar, IonNote, IonCheckbox, IonList, IonItem, IonButtons, IonButton
  },

  props: {
    closeModal: Function,
    changeBreakPoint: Function
  },

  computed: {
    notificationId() {
      return this.idNotification == 0 ? this.idNotification + 1 : this.idNotification
    },
  },

  watch: {
    'task.checkedNotificationTask': {
      async handler(newValue, oldValue) {
        if (newValue) {

          const isNotificationNow = await alertController.create({
            header: 'Deseja agendar ou receber a notificação agora?',
            cssClass: 'ion-custom-alert',
            buttons: [
              {
                text: 'Agendar e salvar',
                cssClass: 'ion-alert-custom-button',
                handler: () => {
                  this.openDateTimePicker()
                }
              },
              {
                text: 'Receber agora',
                cssClass: 'ion-alert-custom-button',
                handler: () => {
                  if ( formTask.title.value.length > 0 && formTask.description.value.length > 0 ) {
                    this.notificationNow()
                  } else {
                    this.task.checkedNotificationTask = false
                    toast({
                      position: 'middle',
                      duration: 3500,
                      message: 'Preencha o Título e a Descrição da tarefa',
                    })
                  }
                }
              }
            ]
          });

          isNotificationNow.present();

        } else {
          this.task.taskScheduled = false
          this.changeBreakPoint(0.5)
        }
      },
      deep: true
    }
  },

  methods: {
    async notificationNow() {
        const schedule = moment().add(10, 'seconds');

        this.scheduledNotification(schedule.toDate(), 'Notificação agendada, ela será disparada em 10 segundos')
    },

    async scheduledNotification(schedule, message) {
        try {
          await LocalNotifications.schedule({
            notifications: [{
              title: formTask.title.value,
              body: formTask.description.value,
              id: this.notificationId,
              schedule: { at: schedule },
              sound: null,
              attachments: null,
              actionTypeId: '',
              extra: null,
            }]
          })

          toast({
            position: 'middle',
            duration: 3500,
            message: message,
          })

          this.eventCloseModal()
        } catch (error) {
          alert("error scheduled")
          alert(error.message)
        }
    },

    async openDateTimePicker() {
      this.changeBreakPoint(0.75)
      this.task.taskScheduled = true
      this.task.value = moment().tz("America/Sao_Paulo").add(2, 'minutes').format('DD/MM/YYYY HH:mm');

      const { value } = await pickerTime()

      if (value) {
        this.task.value = value
      }
    },

    eventCloseModal() {
      this.closeModal()
    },

    saveTask() {
      const path_save_task = ref(db, `users/${this.firebaseKey}/tasks`);

      const obj = {
        title: formTask.title.value,
        description: formTask.description.value,
        scheduler: this.task.taskScheduled
      }

      if (this.task.taskScheduled) obj.schedulerDateTime = this.task.value;

      push(path_save_task, obj)
        .then(() => {
          toast({
            position: 'middle',
            duration: 3500,
            message: this.task.taskScheduled ? 'Tarefa salva e agendada' : 'Tarefa salva',
            schedule: this.task.value
          })

          if (this.task.taskScheduled) this.scheduledNotification(moment(this.task.value, 'DD/MM/YYYY HH:mm').toDate(), 'Notificação agendada')
        
          this.closeModal()
        })
        .catch((error) => {
          toast({
            position: 'middle',
            duration: 3500,
            message: 'Houve um erro ao salvar a tarefa',
          })
        })

    },
  },
}
</script>