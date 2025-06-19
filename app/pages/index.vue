<template>
  <section
    class="grid sm:grid-cols-[2fr_3fr] grid-cols-1 container mx-auto p-5 sm:p-10 text-left"
  >
    <picture class="rounded shadow-2xl overflow-hidden mb-5 sm:mb-0">
      <img src="/images/home-about-small.webp" alt="Alex Bates" class="w-full" />
    </picture>
    <div class="py-5 px-0 sm:px-10 flex flex-col justify-start">
      <h1 class="text-4xl text-slate-700 dark:text-white font-bold">
        what's up?
      </h1>
      <TextWrapper>
        I'm
        <span class="font-bold text-slate-700 dark:text-gray-300"
          >Alex Bates</span
        >. I'm a software developer that's been working professionally for
        <span>{{ yearsSinceStartDate }}</span> years.
      </TextWrapper>
      <TextWrapper>
        I'm currently working at
        <a class="text-[#e68937] font-bold" href="https://www.pocketworks.co.uk"
          >Pocketworks</a
        >
        as a Full Stack Developer.
      </TextWrapper>
      <TextWrapper class="mt-auto">
        I try and remember to write about things I learn or find interesting.
        You can also follow me on Github (or LinkedIn, if that's your thing).
      </TextWrapper>
      <div class="flex gap-5 mt-5">
        <ULink
          class="text-indigo-500 dark:text-indigo-400"
          target="_blank"
          to="https://github.com/ajbates93"
          ><UIcon name="uil:github" size="2em"
        /></ULink>
        <ULink
          class="text-indigo-500 dark:text-indigo-400"
          target="_blank"
          to="https://www.linkedin.com/in/alex-bates-01b548a7"
          ><UIcon name="uil:linkedin" size="2em"
        /></ULink>
      </div>
    </div>
  </section>
  <Blog />
  <section class="container mx-auto p-5 !pt-0 sm:p-10 text-left">
    <div class="mt-10">
      <ULink class="text-white dark:text-indigo-500" to="/blog">View all blog posts</ULink>
    </div>
  </section>
  
</template>

<script lang="ts" setup>
const startDate = ref<Date>(new Date("2015-02-02"));

const yearsSinceStartDate = computed(() => {
  const now = new Date();
  const diff = now.getTime() - startDate.value.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
});
</script>

<style>

</style>
