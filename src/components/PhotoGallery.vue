<template>
    <section class="gallery-module">
        <div class="gallery-heading">
            <div>
                <p class="section-kicker">YOUR LIBRARY</p>
                <h2>Recent photos</h2>
            </div>
            <span class="photo-count">{{ photos.length }}</span>
        </div>
        <div v-if="!photos.length" class="empty-gallery">
            <div class="empty-icon"><ion-icon :icon="imagesIcon" /></div>
            <p>No photos yet</p>
            <span>Your captured moments will appear here.</span>
        </div>
        <ion-grid v-else class="gallery-grid">
            <ion-row>
                <ion-col v-for="(photo, index) in photos" :key="index" size="4" size-md="3">
                    <ion-img :src="photo" class="gallery-image" />
                </ion-col>
            </ion-row>
        </ion-grid>
    </section>
</template>
<script setup lang="ts">
import {
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonIcon,
} from "@ionic/vue";
import { images as imagesIcon } from "ionicons/icons";
defineProps<{ photos: string[] }>();
</script>
<style scoped>
.empty-gallery {
    text-align: center;
    padding: 24px 16px 34px;
    color: #8e8e93;
}

.gallery-module { padding: 22px 18px 36px; }
.gallery-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.section-kicker { margin: 0 0 4px; color: #8e8e93; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; }
h2 { margin: 0; color: #f5f5f7; font-size: 22px; font-weight: 600; }
.photo-count { display: grid; min-width: 28px; height: 28px; place-items: center; border: 1px solid #38383a; border-radius: 50%; color: #8e8e93; font-size: 12px; }
.empty-icon { display: grid; width: 48px; height: 48px; margin: 0 auto 12px; place-items: center; border-radius: 50%; background: #1c1c1e; color: #8e8e93; font-size: 22px; }
.empty-gallery p { margin: 0 0 5px; color: #f5f5f7; font-size: 15px; }
.empty-gallery span { font-size: 12px; }
.gallery-grid { padding: 0; }
.gallery-grid ion-row { margin: -4px; }
.gallery-grid ion-col { padding: 4px; }
.gallery-image { aspect-ratio: 1; overflow: hidden; border-radius: 10px; background: #1c1c1e; }
.gallery-image::part(image) { width: 100%; height: 100%; object-fit: cover; }
@media (min-width: 700px) {
    .gallery-module { max-width: 720px; margin: 0 auto; }
}
</style>