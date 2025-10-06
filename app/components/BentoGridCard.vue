<template>
  <a
    :href="href"
    :key="name"
    :class="
        cn(
          'group relative col-span-1 flex flex-col justify-end overflow-hidden rounded-xl h-full',
          // light styles - softer background and shadows
          'bg-slate-50 border border-slate-200 [box-shadow:0_1px_3px_rgba(0,0,0,.05),0_4px_12px_rgba(0,0,0,.08)]',
          // dark styles - softer contrast for dark backgrounds
          'transform-gpu',
          props.class,
        )
    "
  >
    <slot name="background" />

    <!-- Header slot for date -->
    <div class="hidden sm:block absolute font-mono top-4 left-4 md:top-6 md:left-6 z-20">
      <slot name="header" />
    </div>

    <div
      class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 pb-2 md:p-6 md:pb-6 transition-all duration-300 lg:group-hover:-translate-y-10"
    >
      <UIcon
        v-if="icon"
        :name="icon"
        class="size-8 md:size-12 origin-left mb-2 transform-gpu text-slate-700 transition-all duration-300 ease-in-out lg:group-hover:scale-75"
      />
      <div
        v-else
        class="size-8 md:size-12 origin-left mb-2 transform-gpu text-slate-700 transition-all duration-300 ease-in-out lg:group-hover:scale-75"
      ></div>
      <h3 class="text-lg md:text-xl font-semibold text-slate-700">
        {{ name }}
      </h3>
      <p class="max-w-lg text-sm font-mono tracking-tight md:text-base text-slate-500 mb-4 md:mb-0">{{ description }}</p>
    </div>
    
    <!-- Mobile Read More Link -->
    <div class="lg:hidden relative z-30 p-4 pt-2 md:p-6 md:pt-6">
      <a
        :href="href"
        class="inline-flex items-center rounded-md text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
      >
        {{ cta }} →
      </a>
    </div>

    <!-- Desktop Read More Link (absolute positioned for hover effect) -->
    <div
      class="absolute bottom-0 hidden lg:flex w-full transform-gpu flex-row items-center p-4 translate-y-10 opacity-0 transition-all duration-300 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 z-30"
    >
      <a
        :href="href"
        class="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
      >
        {{ cta }} →
      </a>
    </div>
    <div
      class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 lg:group-hover:bg-slate-100/50"
    />
  </a>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

interface Props {
  name: string;
  class?: HTMLAttributes["class"];
  icon?: string;
  description: string;
  href: string;
  cta: string;
}

const props = defineProps<Props>();
</script> 