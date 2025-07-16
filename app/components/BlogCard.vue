<template>
  <div 
    ref="cardRef"
    class="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl border bg-white p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.1]"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Spotlight effect -->
    <div
      ref="spotlightRef"
      class="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/card:opacity-100 rounded-xl"
      :style="spotlightStyle"
    ></div>
    
    <!-- Content -->
    <div class="relative z-10">
      <!-- Date -->
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {{ formatDate(blog.date) }}
      </p>
      
      <!-- Title -->
      <h3 class="text-xl font-bold text-slate-700 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        <ULink 
          :to="blog.path"
          class="block"
        >
          {{ blog.title }}
        </ULink>
      </h3>
      
      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {{ blog.description }}
      </p>
      
      <!-- Tags -->
      <div v-if="blog.tags && blog.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in blog.tags.slice(0, 3)" 
          :key="tag"
          class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs rounded-full"
        >
          {{ tag }}
        </span>
        <span v-if="blog.tags.length > 3" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
          +{{ blog.tags.length - 3 }}
        </span>
      </div>
      
      <!-- Read more link -->
      <ULink
        :to="blog.path"
        class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm transition-colors group/link"
      >
        Read more
        <UIcon 
          name="i-heroicons-arrow-right" 
          class="w-4 h-4 transition-transform group-hover/link:translate-x-1" 
        />
      </ULink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  path: string;
  tags?: string[];
}

interface Props {
  blog: BlogPost;
}

const props = defineProps<Props>();

const cardRef = ref<HTMLElement>();
const spotlightRef = ref<HTMLElement>();
const spotlightStyle = ref('');

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value || !spotlightRef.value) return;
  
  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  spotlightStyle.value = `
    background: radial-gradient(600px circle at ${x}px ${y}px, rgba(120, 119, 198, 0.06), transparent 40%);
  `;
};

const handleMouseLeave = () => {
  spotlightStyle.value = '';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 