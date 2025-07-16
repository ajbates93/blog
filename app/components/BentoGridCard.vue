<template>
  <div
    :key="name"
    :class="
      cn(
        'group relative col-span-1 flex flex-col justify-end overflow-hidden rounded-xl',
        // light styles
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles - increased contrast
        'transform-gpu dark:bg-slate-800 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_4px_12px_rgba(0,0,0,.3),0_-20px_80px_-20px_#ffffff1f_inset]',
        props.class,
      )
    "
  >
    <slot name="background" />

    <!-- Header slot for date -->
    <div class="hidden sm:block absolute top-4 left-4 md:top-6 md:left-6 z-20">
      <slot name="header" />
    </div>

    <div
      class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 md:p-6 transition-all duration-300 group-hover:-translate-y-10"
    >
      <UIcon
        v-if="icon"
        :name="icon"
        class="size-8 md:size-12 origin-left mb-2 transform-gpu text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75"
      />
      <div
        v-else
        class="size-8 md:size-12 origin-left mb-2 transform-gpu text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75"
      ></div>
      <h3 class="text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {{ name }}
      </h3>
      <p class="max-w-lg text-sm md:text-base text-neutral-400 dark:text-neutral-500 mb-4 md:mb-0">{{ description }}</p>
    </div>
    
    <!-- Mobile Read More Link -->
    <div class="md:hidden relative z-30 p-4 pt-0 md:p-6 md:pt-0">
      <a
        :href="href"
        class="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        {{ cta }} →
      </a>
    </div>

    <!-- Desktop Read More Link (absolute positioned for hover effect) -->
    <div
      class="absolute bottom-0 hidden md:flex w-full transform-gpu flex-row items-center p-4 translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-30"
    >
      <a
        :href="href"
        class="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        {{ cta }} →
      </a>
    </div>
    <div
      class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"
    />
  </div>
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