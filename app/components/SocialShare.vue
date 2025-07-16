<template>
  <div class="social-share mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Share this post</h3>
    <div class="flex flex-wrap gap-3">
      <!-- Twitter/X -->
      <button
        @click="shareOnTwitter"
        class="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
      >
        <UIcon name="i-simple-icons-twitter" class="w-5 h-5" />
        <span class="hidden sm:inline">Twitter</span>
      </button>
      
      <!-- LinkedIn -->
      <button
        @click="shareOnLinkedIn"
        class="flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006097] text-white rounded-lg transition-colors"
      >
        <UIcon name="i-simple-icons-linkedin" class="w-5 h-5" />
        <span class="hidden sm:inline">LinkedIn</span>
      </button>
      
      <!-- Facebook -->
      <button
        @click="shareOnFacebook"
        class="flex items-center gap-2 px-4 py-2 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg transition-colors"
      >
        <UIcon name="i-simple-icons-facebook" class="w-5 h-5" />
        <span class="hidden sm:inline">Facebook</span>
      </button>
      
      <!-- Copy Link -->
      <button
        @click="copyLink"
        class="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        :class="{ 'bg-green-600 hover:bg-green-700': linkCopied }"
      >
        <UIcon :name="linkCopied ? 'i-heroicons-check' : 'i-heroicons-link'" class="w-5 h-5" />
        <span class="hidden sm:inline">{{ linkCopied ? 'Copied!' : 'Copy Link' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  url?: string;
}

const props = withDefaults(defineProps<Props>(), {
  url: () => window.location.href
});

const linkCopied = ref(false);

const shareOnTwitter = () => {
  const text = encodeURIComponent(props.title);
  const url = encodeURIComponent(props.url);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
};

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(props.url);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
};

const shareOnFacebook = () => {
  const url = encodeURIComponent(props.url);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.url);
    linkCopied.value = true;
    setTimeout(() => {
      linkCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy link:', err);
  }
};
</script> 