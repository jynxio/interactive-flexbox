<template>
    <div :class="[$style.wrapper, $style[type]]">
        <section :class="$style['axis-body']">
            <div :class="$style.footer"></div>
            <div :class="$style.body"></div>
            <div :class="$style.header"></div>
        </section>
        <section :class="$style['axis-shadow']">
            <div :class="$style.footer"></div>
            <div :class="$style.body"></div>
            <div :class="$style.header"></div>
        </section>
        <section :class="$style['axis-title']">
            {{ type === 'main' ? 'MAIN AXIS' : 'CROSS AXIS' }}
        </section>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    type: {
        type: String as PropType<'main' | 'cross'>,
        default: 'main',
        require: true,
    },
});
</script>

<style module>
.wrapper {
    --base-thickness: 0.2rem;
    --shadow-color: #0d0f11;

    &.main {
        --body-color: #ffd500;
    }

    &.cross {
        --body-color: #70a1ec;
    }

    position: relative;
    block-size: 100%;
    inline-size: 100%;
}

.axis-body {
    --color: var(--body-color);
    --thickness: var(--base-thickness);
    --header-length: calc(var(--base-thickness) * 10);
    --footer-length: calc(var(--header-length) * 1.2);

    z-index: 1;
}

.axis-shadow {
    --color: var(--shadow-color);
    --extra: var(--base-thickness);
    --thickness: calc(var(--base-thickness) + var(--extra) * 2);
    --header-length: calc(var(--base-thickness) * 10 + var(--extra) * 2);
    --footer-length: calc(var(--header-length) * 1.2);

    z-index: 0;
}

.axis-body,
.axis-shadow {
    position: absolute;
    inset: 0;
    block-size: auto;
    inline-size: auto;

    > * {
        position: absolute;
    }

    > .body {
        inset: 50% auto auto 0;
        inline-size: 100%;
        border-block-start: var(--thickness) solid var(--color);
        translate: 0 -50%;
    }

    > .header {
        inset: 50% auto auto 0;
        block-size: var(--header-length);
        border-radius: 999rem;
        border-inline-start: var(--thickness) solid var(--color);
        translate: calc(-0.5 * var(--thickness)) -50%;
    }

    > .footer {
        inset: 50% 0 auto auto;
        block-size: var(--footer-length);
        inline-size: var(--thickness);
        translate: calc(+0.5 * var(--thickness)) -50%;

        &::before,
        &::after {
            content: '';
            display: block;
            block-size: 50%;
            inline-size: 100%;
            border-radius: 999rem;
            background-color: var(--color);
        }

        &::before {
            rotate: -45deg;
            translate: 0 calc(+0.3 * var(--base-thickness));
            transform-origin: bottom center;
        }

        &::after {
            rotate: 45deg;
            translate: 0 calc(-0.3 * var(--base-thickness));
            transform-origin: top center;
        }
    }
}

.axis-title {
    --block-offset: calc(var(--base-thickness));
    --inline-offset: calc(var(--block-offset) * 3);

    position: absolute;
    inset: 50% auto auto 0;
    color: var(--body-color);
    font-size: 0.8rem;
    font-family: monospace;
    font-weight: 1000;
    text-shadow: 0 0 2px var(--shadow-color);
    translate: var(--inline-offset) var(--block-offset);
}
</style>
