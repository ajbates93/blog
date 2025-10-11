<template>
  <div class="min-h-screen bg-[#1e1d2c]">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-10">
      <div class="max-w-4xl mx-auto">
        <!-- Page Title -->
        <h1 class="text-4xl md:text-6xl font-bold text-[#2b2b2b] mb-8">
          My Work
        </h1>
        
        <!-- Coming Soon Section -->
        <div class="bg-white rounded-lg p-8 shadow-lg">
          <div class="text-center">
            <div class="text-6xl mb-4">🚧</div>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
            <p class="text-gray-600 mb-6">
              I'm currently building out this section to showcase my projects, case studies, and work portfolio.
            </p>
            <p class="text-gray-600 mb-8">
              In the meantime, feel free to check out my <ULink to="/blog" class="text-[#1e1d2c] hover:text-[#4278ba] font-semibold">blog</ULink> 
              or <ULink to="/" class="text-[#1e1d2c] hover:text-[#4278ba] font-semibold">interactive terminal</ULink> to explore my site!
            </p>
            
            <!-- Contact CTA -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Interested in working together?</h3>
              <p class="text-gray-600 mb-4">
                I'm currently available for freelance work and would love to discuss your project.
              </p>
              <a 
                href="mailto:hello@alexbates.dev"
                class="inline-block bg-[#1e1d2c] text-white px-6 py-3 rounded-lg hover:bg-[#4278ba] transition-colors font-semibold"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
        
        <!-- Back to Home -->
        <div class="mt-8 text-center">
          <ULink 
            to="/" 
            class="inline-flex items-center text-[#2b2b2b] hover:text-white transition-colors font-semibold"
          >
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
