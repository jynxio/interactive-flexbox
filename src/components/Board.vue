<template>
    <div :class="$style.wrapper">
        <main><i v-for="index in itemCount" :key="index" /></main>
        <aside><Axis /></aside>
        <aside><Axis /></aside>
    </div>
</template>

<script setup lang="ts">
import Axis from '@/components/Axis.vue';

const itemCount = 4;
</script>

<style module>
.wrapper {
    --size-length: 30rem;

    position: relative;
    block-size: 100%;
    inline-size: 100%;

    > * {
        position: absolute;
        inset: 0;
        block-size: var(--size-length);
        inline-size: var(--size-length);
        margin: auto;
    }

    > main {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        padding: 1rem;
        border-radius: 5px;
        border: 1px solid #5e666f;

        > i {
            flex: 1 1 10%;
            border-radius: 5px;
            border: 2px solid #778089;
            background-color: #2d333a;
        }
    }

    > aside {
        /* pointer-events: none; */
    }
}
</style>
