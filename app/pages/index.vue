<template>
  <section
    class="grid md:grid-cols-[2fr_3fr] grid-cols-1 container mx-auto p-10 text-left"
  >
    <picture class="rounded shadow-xl overflow-hidden">
      <img src="/images/About.webp" alt="Alex Bates" class="w-full" />
    </picture>
    <div class="py-5 px-10 flex flex-col justify-start">
      <h1 class="text-4xl font-bold">what's up?</h1>
      <TextWrapper>
        I'm <span class="font-bold text-gray-300">Alex Bates</span>. I'm a
        software developer that's been working professionally for
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
        <ULink target="_blank" to="https://github.com/ajbates93"
          ><UIcon name="uil:github" size="2em"
        /></ULink>
        <ULink
          target="_blank"
          to="https://www.linkedin.com/in/alex-bates-01b548a7"
          ><UIcon name="uil:linkedin" size="2em"
        /></ULink>
      </div>
    </div>
  </section>
  <Blog />
</template>

<script lang="ts" setup>
const startDate = ref<Date>(new Date("2013-02-02"));

const yearsSinceStartDate = computed(() => {
  const now = new Date();
  const diff = now.getTime() - startDate.value.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
});
</script>
