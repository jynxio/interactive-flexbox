<template>
    <div :class="$style.container">
        <main><i v-for="index in itemCount" :key="index" /></main>
        <Axis />
    </div>
</template>

<script setup lang="ts">
import Axis from '@/components/Axis.vue';

const itemCount = 6;
</script>

<style module>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    block-size: 100%;
    inline-size: 100%;

    > main {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        block-size: 30rem;
        inline-size: 30rem;
        padding: 1rem;
        border-radius: 5px;
        border: 1px solid #5e666f;

        > i {
            flex: 0 0 20%;
            border-radius: 5px;
            border: 2px solid #778089;
            background-color: #2d333a;
        }
    }
}
</style>
