<template>
  <section class="blogs container mx-auto p-5 sm:p-10 text-left">
    <h2 class="text-4xl font-bold text-slate-700 dark:text-white">
      what's been going on?
    </h2>
    <ul class="my-10">
      <li
        class="pl-5 my-5 border-l-4 border-indigo-500/50"
        v-for="item in blog"
        :key="item.id"
      >
        <ULink
          :to="item.path"
          class="text-slate-700 dark:text-white text-2xl mb-3 block"
          >{{ item.title }}</ULink
        >
        <p class="text-gray-700 dark:text-gray-300 mb-2">
          {{ new Date(item.date).toLocaleString().split(",")[0] }}
        </p>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: blog } = await useAsyncData(route.path, () =>
  queryCollection("blog")
    .where("isArchived", "=", false)
    .andWhere((group) => group.where("isPublished", "=", true))
    .order("date", "DESC")
    .all()
);
</script>
