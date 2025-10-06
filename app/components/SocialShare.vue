<template>
  <div class="social-share mb-8">
    <h3 class="text-lg font-semibold text-white mb-4 text-center font-mono">Share this post</h3>
    <div class="flex flex-wrap gap-3 justify-center">
      <!-- Twitter/X -->
      <button
        @click="shareOnTwitter"
        class="flex items-center gap-2 px-4 py-2 bg-[#4278ba] hover:cursor-pointer text-[#2b2b2b] rounded-lg transition-all duration-200 font-mono"
      >
        <UIcon name="i-mdi-twitter" class="w-5 h-5" />
        <span class="hidden sm:inline">Twitter</span>
      </button>
      
      <!-- LinkedIn -->
      <button
        @click="shareOnLinkedIn"
        class="flex items-center gap-2 px-4 py-2 bg-[#4278ba] hover:cursor-pointer text-[#2b2b2b] rounded-lg transition-all duration-200 font-mono"
      >
        <UIcon name="i-mdi-linkedin" class="w-5 h-5" />
        <span class="hidden sm:inline">LinkedIn</span>
      </button>
      
      <!-- Facebook -->
      <button
        @click="shareOnFacebook"
        class="flex items-center gap-2 px-4 py-2 bg-[#4278ba] hover:cursor-pointer text-[#2b2b2b] rounded-lg transition-all duration-200 font-mono"
      >
        <UIcon name="i-mdi-facebook" class="w-5 h-5" />
        <span class="hidden sm:inline">Facebook</span>
      </button>
      
      <!-- Copy Link -->
      <button
        @click="copyLink"
        class="flex items-center gap-2 px-4 py-2 bg-[#4278ba] hover:cursor-pointer text-[#2b2b2b] rounded-lg transition-all duration-200 font-mono"
        :class="{ 'bg-green-500 bg-opacity-20': linkCopied }"
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