<template>
    <div :class="$style.wrapper">
        <section :class="$style.control"><Control /></section>
        <section :class="$style.board"><Board /></section>
    </div>
</template>

<script setup lang="ts">
import Control from '@/components/Control.vue';
import Board from '@/components/Board.vue';
</script>

<style module>
.wrapper {
    display: flex;
    block-size: 100vh;
    block-size: 100dvh;
    inline-size: 100vw;
    inline-size: 100dvw;
}

.control {
    flex: 0 0 15rem;
    border-inline-end: 1px solid #282e34;
}

.board {
    flex: 1 0 auto;
}
</style>
