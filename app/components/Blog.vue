<template>
  <section class="blogs container mx-auto p-5 sm:p-10 text-left">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard 
        v-for="(item, id) in transformedBlog" 
        :key="item.id" 
        :blog="item"
      />
    </div>
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

// Transform the blog data to match the BlogPost interface
const transformedBlog = computed(() => {
  if (!blog.value) return [];
  
  return blog.value.map((item: any) => ({
    id: item.id || item._id || item._path,
    title: item.title || 'Untitled',
    description: item.description || 'No description available',
    date: item.date || new Date().toISOString(),
    path: item._path || item.path || '/',
    tags: item.tags || [],
    image: item.image, // Add image to the transformed data
    icon: item.icon // Add icon to the transformed data
  }));
});
</script>

<style scoped>
.blog-title {
  contain: layout;
  font-family: 'Lora', serif;
}

</style>