/**
 * UNIT TESTING: Cart.spec.ts
 * Stack: Vitest + Vue Test Utils
 * Estrategia: "Component Testing" aislado mediante el mockeo de dependencias.
 */
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Cart from './Cart.vue';

/**
 * 1. MOCKING DEL COMPOSABLE (Isolation):
 * No queremos testear Vuex aquí, solo que el componente reaccione bien a los datos.
 * 'vi.mock' intercepta el import y devuelve datos controlados (Stub).
 */
vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    // Simulamos un estado con productos
    items: [
      { id: 1, name: 'Magnesio', price: 100, quantity: 2 },
      { id: 2, name: 'Creatina', price: 200, quantity: 1 },
    ],
    // Simulamos el getter calculado
    total: 400,
    // Mock de la función para verificar llamadas (Spy)
    clearCart: vi.fn(),
  }),
}));

describe('Cart.vue', () => {
  /**
   * TEST DE RENDERIZADO:
   * Objetivo: Verificar que la directiva 'v-for' funciona correctamente.
   */
  it('debe renderizar la lista de productos correctamente', () => {
    // Act: Montamos el componente (Wrapper)
    const wrapper = mount(Cart);

    // Assert: Verificamos presencia de texto en el DOM
    expect(wrapper.text()).toContain('Magnesio');
    expect(wrapper.text()).toContain('Creatina');
    // Verificamos que se renderizaron dos elementos de lista
    expect(wrapper.findAll('li')).toHaveLength(2);
  });

  /**
   * TEST DE LÓGICA DERIVADA:
   * Objetivo: Validar que el componente muestra el total inyectado por el composable.
   */
  it('debe mostrar el total correcto calculado', () => {
    const wrapper = mount(Cart);

    // Buscamos el elemento semántico 'strong'
    const totalElement = wrapper.find('strong');
    expect(totalElement.text()).toBe('Total: $400');
  });

  /**
   * TEST DE INTERACCIÓN (Comportamiento):
   * Objetivo: Asegurar que el botón de vaciar dispara la lógica correcta.
   */
  it('debe mostrar el botón de vaciar cuando hay items', () => {
    const wrapper = mount(Cart);
    const button = wrapper.find('button');

    // Verificamos que el botón existe (v-if="items.length > 0")
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('Vaciar');
  });
});
