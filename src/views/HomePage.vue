<template>
  <ion-page>
    <ion-header class="app-header" :translucent="true">
      <ion-toolbar>
        <ion-title>Camera</ion-title>
        <ion-button slot="end" fill="clear" class="header-action" aria-label="Open gallery">
          <ion-icon :icon="imagesIcon" />
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="camera-page">
      <CameraComponent @photo-captured="addPhoto" />
      <PhotoGallery :photos="photos" />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { ref } from "vue";
import { images as imagesIcon } from "ionicons/icons";
import CameraComponent from "@/components/CameraComponent.vue";
import PhotoGallery from "@/components/PhotoGallery.vue";
const photos = ref<string[]>([]);
const addPhoto = (photo: string) => {
  photos.value.unshift(photo);
};
</script>

<style scoped>
:global(body) {
  background: #050505;
}

.camera-page {
  --background: #050505;
}

.app-header {
  background: #050505;
}

.app-header ion-toolbar {
  --background: rgba(5, 5, 5, 0.92);
  --color: #f5f5f7;
  --border-color: transparent;
  padding: 8px 14px 6px;
  backdrop-filter: blur(18px);
}

.app-header ion-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.header-action {
  --color: #f5f5f7;
  --padding-start: 10px;
  --padding-end: 10px;
  font-size: 22px;
}
</style>