<template>
    <div :class="$style.wrapper">
        <main :class="$style['flex-container']">
            <i v-for="index in itemCount" :key="index" />
        </main>
        <aside :class="$style['cross-axis']"><Axis type="cross" /></aside>
        <aside :class="$style['main-axis']"><Axis type="main" /></aside>
        <aside ref="listenerDom" :class="$style.listener">
            <i v-for="index in Array.from({ length: 4 })" :key="String(index)" />
        </aside>
    </div>
</template>

<script setup lang="ts">
import Axis from '@/components/Axis.vue';
import { ref, onMounted } from 'vue';

type Radian = number;
type Vector = {
    x: number;
    y: number;
};

const itemCount = 5;
const listenerDom = ref<HTMLElement>();

onMounted(() => {
    const children = listenerDom.value!.children;
    const domrects = Array.from(children).map(child => child.getBoundingClientRect());

    const vectorMain: Vector = [domrects[1].x - domrects[0].x, domrects[1].y - domrects[0].y];
    const vectorCross: Vector = [domrects[2].x - domrects[0].x, domrects[2].y - domrects[0].y];
});

/**
 * 计算两个向量之间的逆时针夹角（弧度）
 */
function createAngleBetweenVectors(v1: Vector, v2: Vector): Radian {
    // 计算两个向量之间的角度
    const angle = Math.acos(createDotProduct(v1, v2) / (createMagnitude(v1) * createMagnitude(v2)));

    // 使用叉积判断旋转方向，如果叉积非负，则直接返回
    if (createCrossProduct(v1, v2) >= 0) return angle;

    // 否则返回补角
    return Math.PI * 2 - angle;

    function createDotProduct(v1: Vector, v2: Vector): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    function createCrossProduct(v1: Vector, v2: Vector): number {
        return v1.x * v2.y - v1.y * v2.x;
    }

    function createMagnitude(v: Vector): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
}
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
        padding: 1rem;
        background-color: #f005;
        background-clip: content-box;
    }
}
</style>
