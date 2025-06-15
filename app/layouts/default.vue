<template>
  <div class="bg-slate-100 dark:bg-slate-900 font-mono">
    <Header />
    <main class="min-h-[calc(100dvh_-_150px)]">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}

::view-transition-old(blog-title) {
  animation: blog-title-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

::view-transition-new(blog-title) {
  animation: blog-title-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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