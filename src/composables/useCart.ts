// src/composables/useCart.js
import { computed } from 'vue';
import { useStore } from 'vuex';

/**
 * COMPOSABLE: useCart
 * Implementa el patrón 'Function-based Composition API' para encapsular
 * y reutilizar la lógica de negocio del carrito en cualquier componente.
 */
export function useCart() {
  /**
   * ACCESO AL STORE:
   * Obtenemos la instancia global de Vuex. Al estar dentro de una función,
   * garantizamos que cada componente que lo use acceda al mismo estado (Singleton).
   */
  const store = useStore();

  return {
    /**
     * ESTADO REACTIVO (Computed Properties):
     * Envolvemos el estado del store en 'computed' para asegurar que:
     * 1. La UI sea reactiva: Si el store cambia, el componente se actualiza solo.
     * 2. Read-only: Evitamos que los componentes muten el estado directamente (buena práctica).
     */
    items: computed(() => store.state.cart),

    /**
     * GETTER MEMOIZADO:
     * Accedemos al cálculo del total. Al ser un 'computed' que viene de un getter,
     * se beneficia del sistema de caché de Vuex (solo se recalcula si el carrito cambia).
     */
    total: computed(() => store.getters.totalPrice),

    /**
     * ABSTRACCIÓN DE MÉTODOS (Action Dispatching):
     * @param {Object} product - El payload del producto a añadir.
     * Desacoplamos el componente de la implementación de Vuex.
     * El componente no sabe que es una 'action' asíncrona; solo llama a la función.
     */
    addItem: (product: any) => store.dispatch('addAsync', product),

    /**
     * MUTATION COMMITTING:
     * Exponemos la limpieza del estado. Centralizarlo aquí permite que, si en el futuro
     * queremos agregar analytics al vaciar el carrito, solo lo cambiamos en este archivo.
     */
    clearCart: () => store.commit('CLEAR_CART'),
  };
}
