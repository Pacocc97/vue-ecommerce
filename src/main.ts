import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Orquestador de Estado Global (Vuex)
import router from './router'; // Orquestador de Navegación (Vue Router)

/**
 * BOOTSTRAPPING:
 * Inicializamos la instancia raíz de la aplicación cargando el componente App.vue.
 * 'createApp' es la base de la Composition API en Vue 3.
 */
const app = createApp(App);

/**
 * PLUGIN INJECTION (Sistema de Plugins):
 * Registramos los plugins de forma global antes de montar la aplicación.
 * .use(store): Inyecta el Store para que sea accesible desde cualquier componente via 'useStore'.
 * .use(router): Habilita el sistema de rutas y las directivas <router-view> y <router-link>.
 */
app.use(store);
app.use(router);

/**
 * MOUNTING:
 * Conectamos la instancia de Vue con el DOM real a través del selector '#app'.
 * Es el paso final que activa la reactividad y renderiza el Virtual DOM en el navegador.
 */
app.mount('#app');
