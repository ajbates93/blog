<template>
  <div
    :class="[
      'group relative flex size-full overflow-hidden rounded-xl border border-gray-200/50 bg-gradient-to-br from-slate-100 to-gray-200 text-black',
      $props.class,
    ]"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div :class="cn('relative z-10 w-full', props.slotClass)">
      <slot></slot>
    </div>
    <div
      class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: backgroundStyle,
        opacity: gradientOpacity,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    slotClass?: HTMLAttributes["class"];
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
  }>(),
  {
    class: "",
    slotClass: "",
    gradientSize: 200,
    gradientColor: "#262626",
    gradientOpacity: 0.8,
  },
);

const mouseX = ref(-props.gradientSize * 10);
const mouseY = ref(-props.gradientSize * 10);

function handleMouseMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  mouseX.value = e.clientX - rect.left;
  mouseY.value = e.clientY - rect.top;
}

function handleMouseLeave() {
  mouseX.value = -props.gradientSize * 10;
  mouseY.value = -props.gradientSize * 10;
}

onMounted(() => {
  mouseX.value = -props.gradientSize * 10;
  mouseY.value = -props.gradientSize * 10;
});

const isDark = ref(false);

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
});

const backgroundStyle = computed(() => {
  if (isDark.value) {
    return `radial-gradient(
      circle at ${mouseX.value}px ${mouseY.value}px,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 30%,
      rgba(0, 0, 0, 0) 70%
    )`;
  }
  
  return `radial-gradient(
    circle at ${mouseX.value}px ${mouseY.value}px,
    ${props.gradientColor} 0%,
    rgba(0, 0, 0, 0) 70%
  )`;
});
</script> 