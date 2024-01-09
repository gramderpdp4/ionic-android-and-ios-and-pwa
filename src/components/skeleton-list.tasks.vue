<template>
 <ion-list class="lg:w-20rem sm:w-full md:w-20rem xl:w-20rem">
    <ion-list-header>
      <ion-skeleton-text :animated="true" class="ml-3" style="width: 140px; height: 25px;"></ion-skeleton-text>
    </ion-list-header>
    <ion-item lines="none" v-for="item in 3" class="ml-3">
        <ion-thumbnail slot="start">
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
        </ion-thumbnail>
        <ion-label class="ml-2">
            <h3>
            <ion-skeleton-text :animated="true" style="width: 80%; height: 15px;"></ion-skeleton-text>
            </h3>
        </ion-label>
    </ion-item>
  </ion-list>
</template>
<script setup>
    import { IonSkeletonText, IonThumbnail, IonLabel, IonList, IonAlert, IonItem, IonListHeader } from '@ionic/vue';
</script>
<style>
  ion-skeleton-text {
    --border-radius: 9999px;
    --background: rgba(188, 0, 255, 0.065);
    --background-rgb: 188, 0, 255;
  }
</style>