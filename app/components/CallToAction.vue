<template>
  <div class="bg-[#1e1d2c] max-w-screen-xl mx-auto border-[#2e2d3c] border rounded-lg p-4 md:p-10 xl:p-20 grid grid-cols-1 xl:grid-cols-[3fr_2fr] items-center">
    <!-- Lottie Animation -->
    <div class="flex items-center justify-center">
      <Lottie 
        name="Coding" 
        :width="400" 
        :height="400"
        :loop="true"
        :autoplay="true"
        :speed="1"
      />
    </div>

    <!-- Content -->
    <div>
      <h2 class="text-5xl text-white font-bold mb-8">Got an idea?</h2>
      <p class="text-white mb-4">I'm not taking on new work right now, but I'm always happy to talk through an interesting project, a collaboration, or just swap notes on something you're building.</p>
      <p class="text-white mb-4">Drop me a line at <a href="mailto:hello@alexbates.dev" class="text-white font-bold hover:text-gray-200 transition-colors">hello@alexbates.dev</a>.</p>
      <GradientButton href="mailto:hello@alexbates.dev" class="mt-8 text-white">Get in touch!</GradientButton>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import GradientButton from './inspira-ui/GradientButton.vue';

</script>

<style>

</style>