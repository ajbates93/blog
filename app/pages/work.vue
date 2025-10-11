<template>
  <div class="min-h-screen bg-[#1e1d2c]">
    <!-- Header -->

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-10 relative z-10">
      <div class="max-w-screen-xl mx-auto">
        <!-- Page Title -->
        <h1 class="text-4xl md:text-6xl font-bold text-[#ffffff] mb-8">
          Work
        </h1>

        <TextWrapper>
          Coming soon...
        </TextWrapper>

        <!-- Back to Home -->
        <div class="mt-8 text-center">
          <ULink to="/"
            class="inline-flex items-center text-[#2b2b2b] hover:text-white transition-colors font-semibold">
            <UIcon name="i-heroicons:arrow-left" class="mr-2" />
            Back to Home
          </ULink>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  viewTransition: false
})

// Set page meta for SEO
useHead({
  title: 'My Work - Alex Bates',
  meta: [
    { name: 'description', content: 'Portfolio and work showcase for Alex Bates, a software developer specializing in web and mobile applications.' }
  ]
})
</script>
