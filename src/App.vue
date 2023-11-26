<template>
    <div :class="$style.wrapper">
        <main ref="containerDom" :class="$style['flex-container']">
            <i v-for="index in itemCount" :key="index">{{ index }}</i>
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
import itemsRuleData from '@/assets/items';
import Axis from '@/components/Axis.vue';
import { GUI as Gui } from 'lil-gui';
import { Radian, Vector } from '@/types/math';
import { isDataType, createAngleBetweenVectors } from '@/utils';
import { ref, reactive, watchSyncEffect, onMounted, computed, triggerRef } from 'vue';

/**
 *
 */
const listenerDom = ref<HTMLElement>();
const containerDom = ref<HTMLElement>();

const mainCssRotation = ref('0deg');
const crossCssRotation = ref('odeg');

const itemCount = ref(5); // Flex item数

const containerRule = reactive<{ [key: string]: string }>({});

// 初始化containerRule
for (const declaration of containerRuleData) {
    const { name, type } = declaration;

    switch (type) {
        case 'data-type':
        case 'option-type': {
            containerRule[name] = declaration.value;

            break;
        }

        case 'mixed-type': {
            const mode = isDataType(declaration.option.value) ? 'data-type' : 'option-type';
            const value = mode === 'option-type' ? declaration.option.value : declaration.dataType.value;

            containerRule[name] = value;

            break;
        }
    }
}

const itemsRule = computed<{ [key: string]: string }[]>({
    get: () => {
        const itemRule: { [key: string]: string } = {};

        for (const declaration of itemsRuleData) {
            const { name, type } = declaration;

            switch (type) {
                case 'data-type':
                case 'option-type': {
                    itemRule[name] = declaration.value;

                    break;
                }

                case 'mixed-type': {
                    const mode = isDataType(declaration.option.value) ? 'data-type' : 'option-type';
                    const value = mode === 'option-type' ? declaration.option.value : declaration.dataType.value;

                    itemRule[name] = value;

                    break;
                }
            }
        }

        return Array.from({ length: itemCount.value }).map(() => structuredClone(itemRule));
    },
    set: () => {},
});

// 初始化itemsRule

/**
 * 控制面板
 */
const gui = new Gui().title('CSS Rule Controller');

gui.add(itemCount, 'value', 0, 10, 1).name('count');

const containerFolder = gui.addFolder('Flex Container CSS Rule');

for (const declaration of structuredClone(containerRuleData)) {
    const { name, type } = declaration;

    switch (type) {
        case 'data-type':
        case 'option-type': {
            const options = type === 'option-type' ? declaration.options : undefined;

            containerFolder
                .add(declaration, 'value', options)
                .name(name)
                .onChange((value: string) => (containerRule[name] = value));

            break;
        }

        case 'mixed-type': {
            const { option, dataType } = declaration;
            const optionController = containerFolder.add(option, 'value', option.options).name(name);
            const dataTypeController = containerFolder.add(dataType, 'value').name('');

            dataTypeController[isDataType(option.value) ? 'show' : 'hide']();

            dataTypeController.onChange((value: string) => (containerRule[name] = value));
            optionController.onChange((value: string) => {
                if (isDataType(value)) {
                    dataTypeController.show();
                    containerRule[name] = dataType.value;

                    return;
                }

                dataTypeController.hide();
                containerRule[name] = option.value;
            });

            break;
        }
    }
}

const itemsFolder = gui.addFolder('Flex Items CSS Rule');

for (const declaration of structuredClone(itemsRuleData)) {
    const { name, type } = declaration;

    switch (type) {
        case 'data-type':
        case 'option-type': {
            const options = type === 'option-type' ? declaration.options : undefined;

            itemsFolder
                .add(declaration, 'value', options)
                .name(name)
                .onChange((value: string) => {
                    itemsRule.value.forEach(itemRule => (itemRule[name] = value));
                    triggerRef(itemsRule);
                });

            break;
        }

        case 'mixed-type': {
            const { option, dataType } = declaration;
            const optionController = itemsFolder.add(option, 'value', option.options).name(name);
            const dataTypeController = itemsFolder.add(dataType, 'value').name('');

            dataTypeController[isDataType(option.value) ? 'show' : 'hide']();

            dataTypeController.onChange((value: string) => {
                itemsRule.value.forEach(itemRule => (itemRule[name] = value));
                triggerRef(itemsRule);
            });
            optionController.onChange((value: string) => {
                if (isDataType(value)) {
                    dataTypeController.show();
                    itemsRule.value.forEach(itemRule => (itemRule[name] = dataType.value));
                    triggerRef(itemsRule);

                    return;
                }

                dataTypeController.hide();
                itemsRule.value.forEach(itemRule => (itemRule[name] = option.value));
                triggerRef(itemsRule);
            });

            break;
        }
    }
}

/**
 * 更新样式
 */
onMounted(() => {
    // 更新Flex Container元素
    const containerProperties = Object.keys(containerRule);

    for (const property of containerProperties)
        watchSyncEffect(() => containerDom.value!.style.setProperty(property, containerRule[property]));

    // TODO: 优化
    // 更新Flex Item元素
    itemsRule.value.forEach((itemRule, index) => {
        const itemProperties = Object.keys(itemRule);

        itemProperties.forEach(property => {
            const dom = containerDom.value!.children[index];

            if (!(dom instanceof HTMLElement)) throw new Error("TypeError: it's not a HTMLElement");

            watchSyncEffect(() => dom.style.setProperty(property, itemsRule.value[index][property]));
        });
    });
    const itemsProperties = Object.keys(itemsRule);

    for (const property of itemsProperties)
        watchSyncEffect(() => containerDom.value!.style.setProperty(property, containerRule[property]));

    // 更新Flex Container 的Listener元素
    watchSyncEffect(() => {
        listenerDom.value!.style.setProperty('direction', containerRule.direction);
        listenerDom.value!.style.setProperty('writing-mode', containerRule['writing-mode']);
        listenerDom.value!.style.setProperty('flex-direction', containerRule['flex-direction']);

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
