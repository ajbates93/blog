<template>
  <footer class="bg-slate-800">
    <div class="container mx-auto px-5 py-8">
      <!-- Main footer content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <!-- About section -->
        <div>
          <h3 class="text-lg font-semibold text-slate-200 mb-3">Alex Bates</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Web developer based in the UK, specialising in building websites, web applications and mobile applications using modern technologies.
          </p>
        </div>

        <!-- Quick links -->
        <div class="text-right">
          <h3 class="text-lg font-semibold text-slate-200 mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <ULink to="/" class="text-slate-400 hover:text-indigo-400 transition-colors">
                Home
              </ULink>
            </li>
            <li>
              <ULink to="/blog" class="text-slate-400 hover:text-indigo-400 transition-colors">
                Blog
              </ULink>
            </li>
            <li>
              <a href="mailto:hello@alexbates.dev" class="text-slate-400 hover:text-indigo-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <!-- Social & External -->
        <div class="text-right">
          <h3 class="text-lg font-semibold text-slate-200 mb-3">Connect</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="https://github.com/alexbates" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-indigo-400 transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/alexbates" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-indigo-400 transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:hello@alexbates.dev" class="text-slate-400 hover:text-indigo-400 transition-colors">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar with copyright -->
      <div class="border-t border-slate-600 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div class="text-slate-400">
          &copy; {{ year }} Alex Bates. All rights reserved.
        </div>
        <div class="text-slate-500 flex items-center gap-2">
          <Icon name="tabler:brand-nuxt" class="w-4 h-4" />
          Built with Nuxt & Nuxt Content
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = ref(new Date().getFullYear());
</script>
