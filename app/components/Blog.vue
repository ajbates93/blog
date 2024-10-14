<template>
  <section class="blogs container mx-auto p-10 text-left">
    <ul>
      <li v-for="item in blog" :key="item._id">
        <ULink :to="item._path">{{ item.title }}</ULink>
        <p>{{ new Date(item.date).toLocaleString().split(",")[0] }}</p>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const { data: blog } = await useAsyncData("blog", () =>
  queryContent("/blog").find(),
);
</script>
