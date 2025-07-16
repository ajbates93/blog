<template>
  <section class="blogs container mx-auto p-5 sm:p-10 text-left">
    <h1 class="text-4xl font-bold text-slate-700 dark:text-white mb-4">
      Blog Posts
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg">
      Thoughts on web development, mobile development, and the tech industry.
    </p>
    <ul class="my-10">
      <li
        class="pl-5 my-10 border-l-4 border-indigo-500/50 dark:text-gray-300"
        v-for="(item, id) in blog"
        :key="item.id"
      >
        <ULink
          :to="item.path"
          @click.native="active = item.id"
          :class="{ 'blog--active': active === item.id }"
          :style="`view-transition-name: blog-title-${item.title.toLowerCase().replace(/ /g, '-')}`"
          class="blog-title text-slate-700 dark:text-white text-2xl font-bold mb-3 block hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >{{ item.title }}</ULink
        >
        <p class="text-gray-700 dark:text-gray-300 mb-2">
          {{ new Date(item.date).toLocaleString().split(",")[0] }}
        </p>
        <p class="text-gray-600 dark:text-gray-400 mb-3">{{ item.description }}</p>
        <ULink
          :to="item.path"
          class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          Read more →
        </ULink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const active = useState();

const { data: blog } = await useAsyncData(route.path, () =>
  queryCollection("blog")
    .where("isArchived", "<>", true)
    .andWhere((group) => group.where("isPublished", "=", true))
    .order("date", "DESC")
    .all()
);
</script>

<style scoped>
.blog-title {
  contain: layout;
}

</style>