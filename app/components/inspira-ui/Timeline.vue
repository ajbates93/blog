<template>
  <div
    ref="timelineContainerRef"
    class="max-w-screen-xl mx-auto w-full bg-[#1e1d2c] font-sans"
  >
    <div class="mx-auto py-10 relative z-10">
      <h2 class="mb-4 max-w-4xl text-4xl text-white md:text-6xl font-bold">
        {{ title }}
      </h2>
      <p class="max-w-lg text-gray-300 md:text-base">
        {{ description }}
      </p>
    </div>

    <div
      ref="timelineRef"
      class="relative z-0 mx-auto max-w-7xl pb-20"
    >
       <div
         v-for="(item, index) in props.items"
         :key="item.id + index"
         class="grid lg:grid-cols-[200px_2fr_2fr] justify-start pt-10 md:gap-10 md:pt-20 flex-wrap lg:flex-nowrap"
       >
        <div
          class="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start lg:max-w-sm md:w-full md:flex-row"
        >
          <div
            class="absolute left-3 flex size-10 items-center justify-center rounded-full bg-[#1e1d2c] md:left-3"
          >
            <div
              class="size-4 rounded-full border border-gray-600 bg-gray-700 p-2"
            />
          </div>
          <h3
            class="hidden text-xl font-bold text-gray-400 md:block md:pl-20 md:text-5xl"
          >
            {{ item.label }}
          </h3>
        </div>
        <slot :name="item.id"></slot>
      </div>
      <div
        :style="{
          height: height + 'px',
        }"
        class="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-gray-600 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
      >
        <Motion
        
          as="div"
             :style="{
               height: heightTransform,
               opacity: opacityTransform,
             }"
          class="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-0% via-blue-500 via-10% to-transparent"
        >
        </Motion>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Motion, useScroll, useTransform } from "motion-v";
import type { HTMLAttributes } from "vue";

interface Props {
  containerClass?: HTMLAttributes["class"];
  class?: HTMLAttributes["class"];
  items?: {
    id: string;
    label: string;
  }[];
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
});

const timelineContainerRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);
const height = ref(0);

onMounted(async () => {
  await nextTick();
  if (timelineRef.value) {
    const rect = timelineRef.value.getBoundingClientRect();
    height.value = rect.height;
  }
});

const { scrollYProgress } = useScroll({
  target: timelineRef,
  offset: ["start 10%", "end 50%"],
});

const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
const heightTransform = ref(useTransform(scrollYProgress, [0, 1], [0, 0]));

watch(height, (newHeight) => {
  heightTransform.value = useTransform(scrollYProgress, [0, 1], [0, newHeight]);
});
</script>