// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

/**
 * CONFIGURACIÓN DEL ENRUTADOR (Vue Router 4):
 * Orquestamos la navegación de la SPA (Single Page Application).
 */
const router = createRouter({
  /**
   * WEB HISTORY API:
   * Utilizamos el historial de HTML5 para tener URLs limpias (ej: /cart en lugar de /#/cart).
   * Requiere configuración en el servidor para que todas las rutas apunten al index.html.
   */
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home', // Named Routes: Facilitan la navegación programática y el mantenimiento.
      component: HomeView, // Carga estática: Se incluye en el bundle principal (esencial para el LCP).
    },
    {
      path: '/cart',
      name: 'cart',
      /**
       * LAZY LOADING (Carga Perezosa):
       * Implementamos Dynamic Imports para generar un "chunk" separado para esta ruta.
       * BENEFICIO: Reduce el tamaño del bundle inicial, mejorando el Time to Interactive (TTI)
       * El componente solo se descarga cuando el usuario realmente navega a la ruta.
       */
      component: () => import('../components/Cart.vue'),
    },
  ],
});

export default router;
