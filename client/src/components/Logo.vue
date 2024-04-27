<template>
  <img
    src="https://angular-material.fusetheme.com/assets/images/logo/logo.svg"
    alt="logo"
    :width="size"
    :height="size"
    class="transition duration-200 ease-in-out"
  />
</template>
<script setup>
defineProps(["size"]);
</script>

<style scoped>
img {
  transition: 250ms ease-in-out;
}
</style>
