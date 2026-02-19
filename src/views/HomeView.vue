<script lang="ts" setup>
import { getProducts, type Product } from '../api/products';
import { useCart } from '../composables/useCart';
import { ref, onMounted } from 'vue';

/**
 * ESTADO LOCAL (UI STATE):
 * Usamos 'ref' para datps que solo pertenecen a esta vista (volátiles).
 * Se define el tipo genérico <Product[]> para garantizar Type Safety en el template.
 */
const productList = ref<Product[]>([]);
const isLoading = ref(true);

/**
 * ABSTRACCIÓN DE LÓGICA (COMPOSABLE):
 * Inyectamos sólo la funcionalidad necesaria.
 * Esto desacopla el componente de la implementación de la persistencia/Store
 */
const { addItem } = useCart();

/**
 * CICLO DE VIDA (DATA FETCHING)
 * El fetching se realiza en 'onMounted' para asegurar que el componente ya está en el DOM.
 * Se utiliza async/await para manejar la naturaleza asíncrona de la I/O de red de forma limpia.
 */
onMounted(async () => {
    try {
        productList.value = await getProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
        // Aquí se podría disparar un sistema de notificaciones global
    } finally {
        isLoading.value = false; // El estado de carga se detiene siempre, haya error o no.
    }
});
</script>

<template>
    <div class="home">
        <h1>Catálogo de Biohacking</h1>

        <!-- (Condicional) Manejo de estados de carga. Mejora la UX al avisar al usuario que los datos están en camino -->
        <div v-if="isLoading">Cargando productos...</div>
        <!-- En caso de no cumplir con la condición previa -->
        <div v-else class="product-grid">
            <!-- Bucle - :key identificador único para el Virtual DOM sepa qué elemento cambió -->
            <div v-for="product in productList" :key="product.id" class="product-card">
                <h3>{{ product.name }}</h3>
                <p>${{ product.price }}</p>
                <button @click="addItem(product)">Añadir al carrito</button>
            </div>
        </div>
        <hr />
        <router-link to="/cart">Ver mi carrito</router-link>
    </div>
</template>

<style scoped>
.product-grid {
    display: flex;
    gap: 20px;
}

.product-card {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}
</style>