<template>
  <div class="relative min-h-screen bg-[#1e1d2c]">
    <!-- Background FlickeringGrid -->
    <ClientOnly>
      <FlickeringGrid
        class="fixed inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        :square-size="4"
        :grid-gap="6"
        color="#60A5FA"
        :max-opacity="0.5"
        :flicker-chance="0.1"
      />
    </ClientOnly>
    
    <!-- Content -->
    <UApp class="relative z-10">
      <div class="min-h-screen flex flex-col">
        <main class="flex-1">
          <slot />
        </main>
        <Footer class="relative z-20" />
      </div>
    </UApp>
  </div>
</template>

<script setup>
import FlickeringGrid from '@/components/inspira-ui/FlickeringGrid.vue'

</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}

/* ::view-transition-old(blog-title) {
  animation: blog-title-out 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
} */

::view-transition-new(blog-title) {
  animation: blog-title-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* ::view-transition-old(author-section),
::view-transition-old(blog-content) {
  animation: fade-out 0.4s ease-out forwards;
  animation-delay: 0.6s;
} */

::view-transition-new(author-section),
::view-transition-new(blog-content),
::view-transition-new(blog-description),
::view-transition-new(blog-tags) {
  animation: fade-in 0.4s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blog-title-out {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  to {
    transform: translateY(-30px) scale(0.95);
    opacity: 0;
  }
}

@keyframes blog-title-in {
  from {
    transform: translateY(30px) scale(1.05);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>