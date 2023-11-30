<template>
    <div :class="$style.wrapper">
        <main ref="containerDom" :class="$style['flex-container']" :style="containerStyle">
            <i v-for="index in itemCount" :key="index" :style="itemStyles[index - 1]">{{ index - 1 }}</i>
        </main>
        <aside :class="$style['main-axis']" :style="{ rotate: mainCssRotation }"><Axis type="main" /></aside>
        <aside :class="$style['cross-axis']" :style="{ rotate: crossCssRotation }"><Axis type="cross" /></aside>
        <aside ref="listenerDom" :class="$style.listener">
            <i v-for="index in Array.from({ length: 4 })" :key="String(index)" />
        </aside>
    </div>
</template>

<script setup lang="ts">
import containerRuleData from '@/assets/container';
import singleItemRuleData from '@/assets/singleItem';
import allItemRuleData from '@/assets/allItem';
import Axis from '@/components/Axis.vue';
import { GUI as Gui } from 'lil-gui';
import { Radian, Vector } from '@/types/math';
import { Rule } from '@/types/rule';
import { isDataType, createAngleBetweenVectors } from '@/utils';
import { ref, reactive, watchSyncEffect, onMounted, computed, watch } from 'vue';

/**
 *
 */
type Style = { [key: string]: string };

/**
 *
 */
const gui = new Gui().title('CSS Rule Controller');

const listenerDom = ref<HTMLElement>();
const containerDom = ref<HTMLElement>();

const itemCount = ref(5); // Flex item数

gui.add(itemCount, 'value', 0, 10, 1).name('count');

/**
 * Flex Container
 */
const containerRule = reactive(structuredClone(containerRuleData));
const containerStyle = computed<Style>(() => createStyle(containerRule));
const containerFolder = fillFolder(gui.addFolder('Flex Container CSS Rule'), containerRule);

const mainCssRotation = ref('0deg');
const crossCssRotation = ref('odeg');

onMounted(() => {
    watchSyncEffect(() => {
        listenerDom.value!.style.setProperty('direction', containerStyle.value.direction);
        listenerDom.value!.style.setProperty('writing-mode', containerStyle.value['writing-mode']);
        listenerDom.value!.style.setProperty('flex-direction', containerStyle.value['flex-direction']);

        const children = listenerDom.value!.children;
        const domrects = Array.from(children).map(child => child.getBoundingClientRect());

        const vectorBase: Vector = { x: 1, y: 0 };
        const vectorMain: Vector = { x: domrects[1].x - domrects[0].x, y: domrects[0].y - domrects[1].y }; // 因为屏幕坐标系的Y轴与笛卡尔坐标系的Y轴相反，因此对Y的计算要取反
        const vectorCross: Vector = { x: domrects[2].x - domrects[0].x, y: domrects[0].y - domrects[2].y }; // 因为屏幕坐标系的Y轴与笛卡尔坐标系的Y轴相反，因此对Y的计算要取反

        const radianMain = createAngleBetweenVectors(vectorBase, vectorMain);
        const radianCross = createAngleBetweenVectors(vectorBase, vectorCross);

        mainCssRotation.value = createCssRotation(radianMain);
        crossCssRotation.value = createCssRotation(radianCross);
    });
});

/**
 * Flex Items
 */
const itemMode = ref<'all' | 'single'>('all');
const itemIndex = ref<number | 'Select a number'>('Select a number');

watchSyncEffect(() => {
    if (itemIndex.value === 'Select a number') return;
    if (itemIndex.value < itemCount.value) return;

    itemIndex.value = 'Select a number';
});

const itemFolder = gui.addFolder('Flex items css Rule');

// Set all items
const allItemRule = reactive(structuredClone(allItemRuleData));
const allItemFolder = itemFolder.addFolder('Set all');

fillFolder(allItemFolder, allItemRule);
allItemFolder.close().onOpenClose(({ _closed }) => (itemMode.value = _closed ? 'single' : 'all'));

// Set a specific item
const singleItemRule = reactive<Rule[]>([]);

watchSyncEffect(() => {
    const delta = itemCount.value - singleItemRule.length;

    if (delta === 0) return;
    if (delta < 0) return void (singleItemRule.length = itemCount.value);
    for (let i = 0; i < delta; i++) singleItemRule.push(structuredClone(singleItemRuleData));
});

const singleItemFolder = itemFolder.addFolder('Set single');

singleItemFolder.close().onOpenClose(({ _closed }) => (itemMode.value = _closed ? 'all' : 'single'));

const singleItemOption = computed(() => Array.from({ length: itemCount.value }).map((_, index) => String(index)));
const singleItemOptionController = singleItemFolder
    .add(itemIndex, 'value', singleItemOption.value)
    .name("Item's number");

watchSyncEffect(() => singleItemOptionController.options(singleItemOption.value));
watch(
    itemIndex,
    (next, prev) => {
        if (next === prev) return;

        while (singleItemFolder.children.length > 1) singleItemFolder.children.at(-1)?.destroy();

        if (itemIndex.value === 'Select a number') return;

        fillFolder(singleItemFolder, singleItemRule[itemIndex.value]);
    },
    { immediate: true, flush: 'sync' },
);
watchSyncEffect(() => {
    if (itemMode.value === 'all') {
        allItemFolder.open();
        singleItemFolder.close();

        return;
    }

    allItemFolder.close();
    singleItemFolder.open();
});

// Create the style object of all item
const itemStyles = computed<Style[]>(() => {
    if (itemMode.value === 'all') return Array.from({ length: itemCount.value }).map(() => createStyle(allItemRule));

    return singleItemRule.map(rule => createStyle(rule));
});

/**
 * 创建CSS的Style对象
 */
function createStyle(data: Rule): Style {
    const style: Style = {};

    for (const declaration of data) {
        const { name, type } = declaration;

        switch (type) {
            case 'data-type':
            case 'option-type': {
                style[name] = declaration.value;

                break;
            }

            case 'mixed-type': {
                const mode = isDataType(declaration.option.value) ? 'data-type' : 'option-type';
                const value = mode === 'option-type' ? declaration.option.value : declaration.dataType.value;

                style[name] = value;

                break;
            }
        }
    }

    return style;
}

/**
 * 填充Gui的Folder
 */
function fillFolder(folder: Gui, data: Rule): Gui {
    for (const declaration of data) {
        const { name, type } = declaration;

        switch (type) {
            case 'data-type':
            case 'option-type': {
                folder.add(declaration, 'value', type === 'option-type' ? declaration.options : undefined).name(name);

                break;
            }

            case 'mixed-type': {
                const { option, dataType } = declaration;
                const optionController = folder.add(option, 'value', option.options).name(name);
                const dataTypeController = folder.add(dataType, 'value').name('');

                dataTypeController[isDataType(option.value) ? 'show' : 'hide']();
                optionController.onChange((value: string) => dataTypeController[isDataType(value) ? 'show' : 'hide']());

                break;
            }
        }
    }

    return folder;
}

/**
 * 创建CSS的旋转值
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
            color: #778089;
            font-style: normal;
            font-weight: 700;
            text-align: center;
            background-color: #2d333a;
            user-select: none;
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
