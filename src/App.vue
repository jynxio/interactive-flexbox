<template>
    <div :class="$style.wrapper">
        <main ref="containerDom" :class="$style['flex-container']">
            <i v-for="index in itemCount" :key="index" />
        </main>
        <aside :class="$style['main-axis']" :style="{ rotate: mainCssRotation }"><Axis type="main" /></aside>
        <aside :class="$style['cross-axis']" :style="{ rotate: crossCssRotation }"><Axis type="cross" /></aside>
        <aside ref="listenerDom" :class="$style.listener">
            <i v-for="index in Array.from({ length: 4 })" :key="String(index)" />
        </aside>
    </div>
</template>

<script setup lang="ts">
import Axis from '@/components/Axis.vue';
import Gui from 'lil-gui';
import flexContainerStyleData from '@/assets/flexContainerStyle.json';
import { ref, reactive, watchSyncEffect, onMounted, onUnmounted } from 'vue';

type Radian = number;
type Vector = { x: number; y: number };

const itemCount = 5;

const listenerDom = ref<HTMLElement>();
const containerDom = ref<HTMLElement>();

const mainCssRotation = ref('0deg');
const crossCssRotation = ref('odeg');

let flexContainerStyle = {};

for (const item of flexContainerStyleData) {
    const name = item.name;
    const mode = item.mode as 'option' | 'length' | 'percentage';
    const value = item[mode];

    if (!value) throw new Error('Value is not undefined');

    flexContainerStyle[name] = value;
}

flexContainerStyle = reactive(flexContainerStyle);

const gui = new Gui();
const flexContainerFolder = gui.addFolder('Flex Container');
const flexItemsFolder = gui.addFolder('Flex Items');

for (const { name, mode, options } of flexContainerStyleData) {
    flexContainerFolder.add(flexContainerStyle, name, mode === 'option' ? options : undefined);
}

// onUnmounted(() => gui.destroy());
// onMounted(() => {
//     watchSyncEffect(() => {
//         for (const pair of Object.entries(containerCss)) {
//             const name = pair[0];
//             const value = typeof pair[1] === 'number' ? pair[1] + '%' : pair[1];

//             containerDom.value!.style.setProperty(name, typeof value === 'number' ? value + '%' : value);
//         }
//     });

//     watchSyncEffect(() => {
//         listenerDom.value!.style.setProperty('direction', containerCss.direction);
//         listenerDom.value!.style.setProperty('writing-mode', containerCss['writing-mode']);
//         listenerDom.value!.style.setProperty('flex-direction', containerCss['flex-direction']);

//         const children = listenerDom.value!.children;
//         const domrects = Array.from(children).map(child => child.getBoundingClientRect());

//         const vectorBase: Vector = { x: 1, y: 0 };
//         const vectorMain: Vector = { x: domrects[1].x - domrects[0].x, y: domrects[0].y - domrects[1].y }; // 因为屏幕坐标系的Y轴与笛卡尔坐标系的Y轴相反，因此对Y的计算要取反
//         const vectorCross: Vector = { x: domrects[2].x - domrects[0].x, y: domrects[0].y - domrects[2].y }; // 因为屏幕坐标系的Y轴与笛卡尔坐标系的Y轴相反，因此对Y的计算要取反

//         const radianMain = createAngleBetweenVectors(vectorBase, vectorMain);
//         const radianCross = createAngleBetweenVectors(vectorBase, vectorCross);

//         mainCssRotation.value = createCssRotation(radianMain);
//         crossCssRotation.value = createCssRotation(radianCross);
//     });
// });

/**
 * 计算v1至v2的逆时针夹角（弧度）
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

/**
 * 创建CSS的Rotation
 */
function createCssRotation(angle: Radian): string {
    if (angle <= (Math.PI / 4) * 1) return '0deg';
    if (angle <= (Math.PI / 4) * 3) return '-90deg';
    if (angle <= (Math.PI / 4) * 5) return '180deg';
    if (angle <= (Math.PI / 4) * 7) return '90deg';

    return '0deg';
}
</script>

<style module>
.wrapper {
    --size-length: 30rem;

    position: relative;
    block-size: 100vh;
    block-size: 100dvh;
    inline-size: 100vw;
    inline-size: 100dvw;

    > * {
        position: absolute;
        inset: 0;
        block-size: var(--size-length);
        inline-size: var(--size-length);
        margin: auto;
    }

    > .listener {
        z-index: 0;
        display: flex;
        flex-wrap: wrap;

        > i {
            flex: 0 0 50%;
            padding: 1rem;
        }
    }

    > .flex-container {
        z-index: 1;
        display: flex;
        gap: 2% 2%;
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

    > .cross-axis {
        z-index: 2;
        pointer-events: none;
        transition: all 1000ms cubic-bezier(0.65, 0, 0.35, 1);
    }

    > .main-axis {
        z-index: 3;
        pointer-events: none;
        transition: all 1000ms cubic-bezier(0.65, 0, 0.35, 1);
    }
}
</style>
