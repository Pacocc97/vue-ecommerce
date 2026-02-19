// src/components/Cart.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Cart from './Cart.vue';
import { createStore } from 'vuex'; // 1. Importamos createStore

// Mock del composable (asegúrate de que la ruta coincida EXACTAMENTE
// con la que usas en Cart.vue, ej: '../composables/useCart')
vi.mock('../composables/useCart', () => ({
  useCart: () => ({
    items: [
      { id: 1, name: 'Magnesio', price: 100, quantity: 2 },
      { id: 2, name: 'Creatina', price: 200, quantity: 1 },
    ],
    total: 400,
    clearCart: vi.fn(),
  }),
}));

describe('Cart.vue', () => {
  // 2. Creamos un store mínimo para que el componente no llore
  const dummyStore = createStore({
    state: { cart: [] },
  });
  it('debe renderizar la lista de productos correctamente', () => {
    // 3. Pasamos el store en las opciones globales del mount
    const wrapper = mount(Cart, {
      global: {
        plugins: [dummyStore],
      },
    });

    expect(wrapper.text()).toContain('Magnesio');
    expect(wrapper.text()).toContain('Creatina');
  });

  it('debe mostrar el total correcto calculado', () => {
    const wrapper = mount(Cart, {
      global: {
        plugins: [dummyStore],
      },
    });

    const totalElement = wrapper.find('strong');
    expect(totalElement.text()).toBe('Total: $400');
  });

  it('debe mostrar el botón de vaciar cuando hay items', () => {
    const wrapper = mount(Cart, {
      global: {
        plugins: [dummyStore],
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('Vaciar');
  });
});
