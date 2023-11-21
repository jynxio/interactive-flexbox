<template>
    <div :class="$style.wrapper">
        <main :class="$style['flex-container']">
            <i v-for="index in itemCount" :key="index" />
        </main>
        <aside :class="$style['cross-axis']"><Axis type="cross" /></aside>
        <aside :class="$style['main-axis']"><Axis type="main" /></aside>
        <aside :class="$style.listener">
            <i v-for="index in Array.from({ length: 4 })" :key="String(index)" />
        </aside>
    </div>
</template>

<script setup lang="ts">
import Axis from '@/components/Axis.vue';

const itemCount = 5;
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
}

.flex-container {
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

.main-axis,
.cross-axis,
.listener {
    pointer-events: none;
}

.main-axis {
    rotate: 0deg;
}

.cross-axis {
    rotate: 90deg;
}

.listener {
    display: flex;
    flex-wrap: wrap;

    > i {
        flex: 0 0 50%;
        /* padding: 1rem; */
        /* background-color: red; */
        /* background-clip: content-box; */
    }
}
</style>
