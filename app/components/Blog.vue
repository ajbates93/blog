<template>
  <section class="blogs container mx-auto p-5 sm:p-10 text-left">
    <h2 class="text-4xl font-bold text-slate-700 dark:text-white">
      what's been going on?
    </h2>
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
          class="blog-title text-slate-700 dark:text-white text-2xl font-bold mb-3 block"
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