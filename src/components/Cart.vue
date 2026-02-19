<script lang="ts" setup>
import { useCart } from '../composables/useCart';
const { items, total, clearCart } = useCart();
</script>

<template>
    <div class="cart-box">
        <h2>Tu Carrito</h2>
        <ul>
            <!-- Bucle sobre los productos del estado -->
            <li v-for="item in items" :key="item.id">
                {{ item.name }} x {{ item.quantity }} - ${{ item.price * item.quantity }}
            </li>
        </ul>
        <hr />
        <strong>Total: ${{ total }}</strong>
        <div class="cart-box">
            <button @click="clearCart" v-if="items.length > 0">
                Vaciar Carrito
            </button>
        </div>
    </div>
</template>