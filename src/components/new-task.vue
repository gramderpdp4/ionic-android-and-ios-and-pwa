<template>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
    </ion-fab>
</template>
<script setup>
import { IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
</script>