import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

const cameraButtonStyles = `
  .camera-footer .pick-image,
  .camera-footer .rotate {
    top: 50%;
    width: 3.25em;
    height: 3.25em;
    border-radius: 50%;
    background: rgba(118, 128, 143, 0.72);
    justify-content: center;
    transform: translateY(-50%);
  }

  .camera-footer .pick-image {
    left: 1.4em;
  }

  .camera-footer .rotate {
    right: 1.4em;
  }

  .camera-footer .pick-image svg,
  .camera-footer .rotate img {
    width: 1.8em;
    height: 1.8em;
  }

  .camera-footer .shutter {
    width: 5.4em;
    height: 5.4em;
    padding: 0.55em;
    background: #c9d2df;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
  }

  .camera-footer .shutter-button {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  }

  .camera-footer .accept-cancel img,
  .camera-footer .accept-use img {
    width: 3.15em;
    height: 3.15em;
  }

  .camera-header .close img,
  .camera-header .flash img {
    width: 1.7em;
    height: 1.7em;
  }
`;

const observedRoots = new WeakSet<Document | ShadowRoot>();
const observeCameraRoot = (root: Document | ShadowRoot) => {
  if (observedRoots.has(root)) {
    return;
  }

  observedRoots.add(root);
  const scan = () => {
    root.querySelectorAll<HTMLElement>('*').forEach((element) => {
      const shadowRoot = element.shadowRoot;
      if (!shadowRoot) {
        return;
      }

      if (element.tagName.toLowerCase() === 'pwa-camera' && !shadowRoot.querySelector('#photo-gallery-camera-buttons')) {
        const style = document.createElement('style');
        style.id = 'photo-gallery-camera-buttons';
        style.textContent = cameraButtonStyles;
        shadowRoot.appendChild(style);
      }

      observeCameraRoot(shadowRoot);
    });
  };

  new MutationObserver(scan).observe(root, { childList: true, subtree: true });
  scan();
};

observeCameraRoot(document);

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
