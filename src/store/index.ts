import { createStore } from 'vuex';

// Centralizamos la key en una constante para asegurar el 'Single Source of Truth'
const CART_STORAGE_KEY = 'biohack_cart';

/**
 * STATE REHYDRATION:
 * Recuperar la sesión del GUEST al cargar.
 * Persistencia entre recargas de página (no llamadas a la API adicionales)
 */
const getInitialCart = () => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
};

export default createStore({
  state: {
    // Iniciamos el estado con lo que haya en LocalStorage
    cart: getInitialCart(),
  },

  /**
   * MUTATIONS:
   * Funciones puras y síncronas.
   * Responsables únicamente de transformar el estado (trazabilidad en Vue DevTools)
   */
  mutations: {
    /**
     * @param {Object} state - Es el estado actual del store. Vuex te lo pasa para que puedas
     * modificar las variables (como 'cart') de forma reactiva.
     * @param {Any} product - Se le llama 'payload'. Es la información que viene desde afuera
     * (el componente o la acción) que quieres guardar.
     */
    ADD_ITEM(state, product) {
      const item = state.cart.find((i: { id: any }) => i.id === product.id);
      if (item)
        item.quantity++; // Mutación reactiva
      else state.cart.push({ ...product, quantity: 1 });
    },
    /**
     * @param {Object} state - Aquí solo necesitas el estado para resetearlo.
     * No necesitas 'payload' porque vas a borrar todo.
     */
    CLEAR_CART(state) {
      state.cart = [];
    },
  },

  /**
   * ACTIONS:
   * Orquestación. Llamadas a API e Idempotencia.
   * Asíncronas, no bloquean el hilo de la UI.
   */
  actions: {
    /**
     * @param {Object} context - Es un objeto que tiene métodos como 'commit', 'dispatch' y 'state'.
     * @param {Object} context.commit - Aquí usamos ES6 DESTRUCTURING. En lugar de recibir todo el
     * objeto 'context', solo "agarramos" la función 'commit'
     * para poder llamar a las mutaciones.
     * @param {Any} product - El 'payload' que mandaste desde el componente.
     */
    async addAsync({ commit }, product) {
      await new Promise((r) => setTimeout(r, 500));
      commit('ADD_ITEM', product);
    },
  },

  /**
   * GETTERS
   * Implementan 'Memoization'
   * Vue Cachea el resultado y sólo recalcula si el estado cambia
   */
  getters: {
    /**
     * @param {Object} state - Vuex te da el estado para que puedas leer los datos y
     * hacer cálculos (como sumas o filtros) sin modificar el original.
     */
    totalPrice: (state) => {
      return state.cart.reduce(
        (total: number, item: { price: number; quantity: number }) =>
          total + item.price * item.quantity,
        0,
      );
    },
  },

  /**
   * PLUGINS
   * Manejan Side Effects
   * Desacomplamos la persistencia de las mutaciones.
   * El Store "reacciona" a los cambios
   */
  plugins: [
    /**
     * @param {Object} store - El plugin recibe toda la instancia del Store.
     * Te da acceso a TODO para que puedas suscribirte a cambios.
     */
    (store) => {
      /**
       * @param {Object} mutation - Información sobre lo que acaba de pasar.
       * Tiene 'type' (el nombre de la mutación) y 'payload'.
       * @param {Object} state - El estado completo de la app DESPUÉS de que se aplicó la mutación.
       */
      store.subscribe((mutation, state) => {
        // Cada vez que ocurra una mutación del carrito, guardamos
        if (
          mutation.type.startsWith('ADD_ITEM') ||
          mutation.type === 'CLEAR_CART'
        ) {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
        }
      });
    },
  ],
});
