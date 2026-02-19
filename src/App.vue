<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useCart } from './composables/useCart';

/** * PATRÓN COMPOSABLE: Desacoplamos la lógica del Store de al UI
 * Obtenemos estado reactivo (items, total) de forma limpia.
 */
const { items, total } = useCart();

/**
 * SIDE EFFECTS (Efectos secundarios):
 * Usamos watch para monitorear cambios en el 'total' y ejecutar
 * reglas de negocio (como el límite de presupuesto) de forma reactiva
 */
watch(total, (newTotal) => {
  if (newTotal > 2000) {
    alert('¡Cuidado! Te estás pasando de presupuesto.');
  }
});

/**
 * COMPUTED (Estado Derivado):
 * Calculamos la cantidad total de piezas.
 * Se cachea automáticamente y sólo se recalcula si 'items' cambia.
 */
const totalQuantity = computed(() => {
  return items.value.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0);
});

</script>

<template>
  <header class="main-header">
    <nav>
      <router-link to="/" class="logo">🧬 Biohack Store</router-link>
      <div class="nav-links">
        <!-- Navegación declarativa. Cambia la URL sin recargar la página (comportamiento SPA) -->
        <router-link to="/">Catálogo</router-link>
        <router-link to="/cart" class="cart-link">
          🛒 Carrito
          <!-- Renderizado condicional. El elemento (badge) sólo existe en el DOM si hay productos en el carrito -->
          <span v-if="totalQuantity > 0" class="badge">{{ totalQuantity }}</span>
        </router-link>
      </div>
    </nav>
  </header>
  <main class="container">
    <!-- Punto de inyección dinámica. Aquí Vue Router 'dibuja' el componente que coincida con la URL actual -->
    <router-view />
  </main>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background-color: #f9f9f9;
}

.main-header {
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #42b883;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.nav-links a.router-link-active {
  color: #42b883;
  font-weight: bold;
}

.container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.badge {
  background: #42b883;
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 0.8rem;
  margin-left: 5px;
}
</style>