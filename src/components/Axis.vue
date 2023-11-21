<template>
    <div :class="$style.wrapper">
        <section :class="[$style.axis, $style.background]">
            <header></header>
            <main></main>
            <footer><i /><i /><i /></footer>
        </section>
        <section :class="[$style.axis, $style.content]">
            <header></header>
            <main></main>
            <footer><i /><i /><i /></footer>
        </section>
    </div>
</template>

<script setup lang="ts">
interface Props {
    color: string;
    style: string[];
}

// TODO:

withDefaults(defineProps<Props>(), {
    color: String,
    style: () => ['solid', 'dotted'],
});
</script>

<style module>
.wrapper {
    --base-thickness: 0.2rem;

    position: relative;
    block-size: 100%;
    inline-size: 100%;
}

.background {
    --fill-color: #0d0f11;
    --border-style: solid;
    --extra: var(--base-thickness);
    --thickness: calc(var(--base-thickness) + var(--extra) * 2);
    --header-length: calc(var(--base-thickness) * 10 + var(--extra) * 2);
    --footer-length: calc(var(--base-thickness) * 11 + var(--extra) * 2);

    z-index: 0;
}

.content {
    --fill-color: #ffd500;
    --border-style: solid;
    --thickness: var(--base-thickness);
    --header-length: calc(var(--base-thickness) * 10);
    --footer-length: calc(var(--base-thickness) * 11);

    z-index: 1;
}

.axis {
    position: absolute;
    block-size: 100%;
    inline-size: 100%;

    > * {
        position: absolute;
        top: 50%;
    }

    > main {
        left: 50%;
        inline-size: 100%;
        border-block-start: var(--thickness) var(--border-style) var(--fill-color);
        translate: -50% -50%;
    }

    > header,
    > footer {
        position: absolute;
        inline-size: var(--thickness);
    }

    > header {
        left: 0;
        block-size: var(--header-length);
        border-radius: 999rem;
        background-color: var(--fill-color);
        translate: calc(-1 * var(--thickness) / 2) -50%;
    }

    > footer {
        right: 0;
        display: flex;
        block-size: var(--footer-length);
        flex-direction: column;
        translate: calc(1 * var(--thickness) / 2) -50%;

        > i:nth-child(3) {
            position: absolute;
            top: 50%;
            left: 50%;
            block-size: calc(var(--thickness) * 0.8);
            inline-size: calc(var(--thickness) * 0.8);
            border-radius: 999rem;
            background-color: var(--fill-color);
            translate: -50% -50%;
        }

        > i:nth-child(-n + 2) {
            flex: 1 0 0;
            border-radius: 999rem;
            background-color: var(--fill-color);

            &:nth-child(1) {
                rotate: -45deg;
                transform-origin: bottom center;
            }

            &:nth-child(2) {
                rotate: 45deg;
                transform-origin: top center;
            }
        }
    }
}
</style>
