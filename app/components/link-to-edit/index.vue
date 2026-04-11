<script setup lang="ts">
defineProps({
  fileName: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <a
    :href="`https://github.com/hikkobay/blog/tree/main/${fileName}`"
    target="_blank"
    class="page-edit-link"
  >
    <img
      src="@/assets/images/github.svg"
      alt=""
      width="20"
      height="20"
    >
    {{ $t('linkToEdit') }}
  </a>
</template>

<style scoped>
.page-edit-link {
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 4px;
  border: 1px solid var(--primary-border-color);
  padding: 8px;
  background-color: var(--primary-bg-color);
  font-size: 12px;
  color: var(--primary-text-color);
  text-decoration: none;
  gap: 0 8px;
  transition: all 0.5s ease;
}

.page-edit-link:hover {
  cursor: pointer;
  background-color: var(--secondary-bg-color);
}
</style>
