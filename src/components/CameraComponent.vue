<template>
    <section class="camera-module">
        <div class="camera-viewfinder" aria-hidden="true">
            <div class="viewfinder-corner corner-top-left"></div>
            <div class="viewfinder-corner corner-top-right"></div>
            <div class="viewfinder-corner corner-bottom-left"></div>
            <div class="viewfinder-corner corner-bottom-right"></div>
            <span class="live-indicator"><i></i> LIVE</span>
            <span class="zoom-label">1x</span>
            <div v-if="isCapturing" class="capture-overlay capturing-overlay">
                <ion-spinner name="crescent" />
                <span>CAPTURING</span>
            </div>
            <div v-else-if="captureConfirmed" class="capture-overlay captured-overlay">
                <img v-if="capturedPhoto" :src="capturedPhoto" alt="" class="captured-preview" />
                <div class="capture-check">✓</div>
                <span>PHOTO SAVED</span>
            </div>
        </div>
        <div class="camera-controls">
            <div class="control-label">{{ isCapturing ? "CAPTURING" : captureConfirmed ? "SAVED" : "PHOTO" }}</div>
            <ion-button class="shutter-button" :disabled="isCapturing" @click="takePicture" aria-label="Take picture">
                <span class="shutter-ring">
                    <ion-spinner v-if="isCapturing" name="crescent" />
                    <ion-icon v-else :icon="cameraIcon" />
                </span>
            </ion-button>
            <div class="camera-hint">{{ isCapturing ? "Preparing your photo..." : captureConfirmed ? "Added to your gallery" : "Tap to capture" }}</div>
        </div>
        <ion-text v-if="errorMessage" class="camera-error" color="danger">
            <p>{{ errorMessage }}</p>
        </ion-text>
    </section>
</template>
<script setup lang="ts">
import { IonButton, IonIcon, IonSpinner, IonText } from "@ionic/vue";
import { camera as cameraIcon } from "ionicons/icons";
import { Camera } from "@capacitor/camera";
import { ref } from "vue";

const errorMessage = ref("");
const isCapturing = ref(false);
const captureConfirmed = ref(false);
const capturedPhoto = ref("");

// Fixed to match @photo-captured in your main page
const emit = defineEmits<{ (e: "photo-captured", photo: string): void; }>();
const takePicture = async () => {
    errorMessage.value = "";
    captureConfirmed.value = false;
    isCapturing.value = true;
    try {
        const photo = await Camera.takePhoto({ quality: 90, saveToGallery: false });
        if (photo.webPath) {
            capturedPhoto.value = photo.webPath;
            emit("photo-captured", photo.webPath);
            captureConfirmed.value = true;
        }
    } catch (error) {
        errorMessage.value = "Error taking picture: " + error;
    } finally {
        isCapturing.value = false;
    }
};
</script>

<style scoped>
.camera-module {
    padding: 18px 18px 8px;
}

.camera-viewfinder {
    position: relative;
    min-height: min(53vh, 440px);
    overflow: hidden;
    border-radius: 26px;
    background:
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        radial-gradient(circle at 52% 38%, #354640 0, #17211f 28%, #0b0d0d 66%, #070707 100%);
    background-size: 33.333% 33.333%, 33.333% 33.333%, auto;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 18px 38px rgba(0, 0, 0, 0.3);
}

.camera-viewfinder::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 34%, transparent 70%, rgba(0, 0, 0, 0.35));
    content: "";
}

.capture-overlay {
    position: absolute;
    z-index: 2;
    inset: 0;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 10px;
    background: rgba(0, 0, 0, 0.62);
    color: #f5f5f7;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
}

.capturing-overlay { animation: capture-dim 0.9s ease-in-out infinite alternate; }
.capturing-overlay ion-spinner { width: 28px; height: 28px; --color: #ffd60a; }
.captured-overlay { animation: captured-in 180ms ease-out both; }
.captured-preview { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.5; }
.captured-overlay > :not(.captured-preview) { position: relative; }
.capture-check { display: grid; width: 46px; height: 46px; place-items: center; border-radius: 50%; background: #30d158; color: #071208; font-size: 26px; letter-spacing: 0; }

.viewfinder-corner {
    position: absolute;
    z-index: 1;
    width: 28px;
    height: 28px;
    border-color: rgba(255, 255, 255, 0.75);
    border-style: solid;
}

.corner-top-left { top: 22px; left: 22px; border-width: 2px 0 0 2px; }
.corner-top-right { top: 22px; right: 22px; border-width: 2px 2px 0 0; }
.corner-bottom-left { bottom: 22px; left: 22px; border-width: 0 0 2px 2px; }
.corner-bottom-right { right: 22px; bottom: 22px; border-width: 0 2px 2px 0; }

.live-indicator,
.zoom-label {
    position: absolute;
    z-index: 1;
    color: rgba(255, 255, 255, 0.85);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
}

.live-indicator { top: 24px; left: 50%; transform: translateX(-50%); }
.live-indicator i { display: inline-block; width: 6px; height: 6px; margin-right: 5px; border-radius: 50%; background: #ff453a; }
.zoom-label { right: 25px; bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50%; padding: 7px 5px; }

.camera-controls { position: relative; padding: 17px 0 3px; text-align: center; }
.control-label { color: #ffd60a; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; }
.shutter-button { --background: transparent; --background-activated: transparent; --box-shadow: none; display: block; width: 78px; height: 78px; margin: 6px auto 0; }
.shutter-button::part(native) { padding: 0; }
.shutter-ring { display: grid; width: 72px; height: 72px; place-items: center; border: 4px solid #f5f5f7; border-radius: 50%; background: #f5f5f7; box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2); color: #161616; font-size: 25px; }
.shutter-button:active .shutter-ring { transform: scale(0.92); }
.camera-hint { margin-top: 2px; color: #777; font-size: 11px; }
.camera-error { display: block; padding: 8px 12px; border-radius: 10px; background: rgba(255, 69, 58, 0.12); text-align: center; font-size: 12px; }
.camera-error p { margin: 0; }

@keyframes capture-dim { from { background: rgba(0, 0, 0, 0.48); } to { background: rgba(0, 0, 0, 0.72); } }
@keyframes captured-in { from { opacity: 0; } to { opacity: 1; } }

@media (min-width: 700px) {
    .camera-module { max-width: 720px; margin: 0 auto; }
}
</style>