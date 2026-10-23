<template>
  <div class="relative min-h-screen bg-[#1e1d2c]">
    <!-- Background FlickeringGrid -->
    <ClientOnly>
      <FlickeringGrid
        class="fixed inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        :square-size="4"
        :grid-gap="6"
        color="#60A5FA"
        :max-opacity="0.3"
        :mobile-max-opacity="0.1"
        :flicker-chance="0.1"
        style="view-transition-name: bg-grid"
      />
    </ClientOnly>
    
    <!-- Content -->
    <UApp class="relative z-10">
      <div class="min-h-screen flex flex-col">
        <Header class="relative z-20" style="view-transition-name: site-header" />
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
/* ---------------------------------------------------------------------------
   Page transitions (Nuxt experimental.viewTransition)
   - Pages: old page fades out fast; the new page's own fade-up entrances do the rest
   - Header and background grid stay put
   - Page titles (Home / Blog / Work) morph into each other
   - Blog card image + title morph into the post hero + title, and back
   --------------------------------------------------------------------------- */

::view-transition-old(root) {
  animation: 100ms ease-out both vt-fade-out;
}

::view-transition-new(root) {
  animation: 150ms ease-out both vt-fade-in;
}

/* Pinned: show the live new state with no animation */
::view-transition-group(site-header),
::view-transition-group(bg-grid),
::view-transition-new(site-header),
::view-transition-new(bg-grid) {
  animation: none;
}

::view-transition-old(site-header),
::view-transition-old(bg-grid) {
  display: none;
}

/* Page title: move + crossfade without stretching the text */
::view-transition-group(page-title) {
  animation-duration: 250ms;
  animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
}

::view-transition-old(page-title),
::view-transition-new(page-title) {
  width: auto;
  height: 100%;
  object-fit: none;
  object-position: left top;
}

/* Old title gets out of the way quickly; new one fades in as it settles */
::view-transition-old(page-title) {
  animation: 90ms ease-out both vt-fade-out;
}

::view-transition-new(page-title) {
  animation: 200ms ease-out 50ms both vt-fade-in;
}

/* Card <-> post morphs */
::view-transition-group(*.post-image),
::view-transition-group(*.post-title) {
  animation-duration: 280ms;
  animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
}

/* Card and hero images have different aspect ratios: crop rather than squash */
::view-transition-image-pair(*.post-image) {
  overflow: hidden;
  border-radius: 0.75rem;
}

::view-transition-old(*.post-image),
::view-transition-new(*.post-image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes vt-fade-out {
  to {
    opacity: 0;
  }
}

@keyframes vt-fade-in {
  from {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
</style>
