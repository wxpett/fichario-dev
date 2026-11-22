<template>
  <div class="postit" :class="[cor, { 'postit--flat': flat }]">
    <span v-if="label" class="postit-label">{{ label }}</span>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  cor: {
    type: String,
    default: 'yellow',
    validator: (v) => ['yellow', 'pink', 'green', 'blue'].includes(v)
  },
  label: {
    type: String,
    default: ''
  },
  flat: {
    type: Boolean,
    default: false
  }
})
</script>
