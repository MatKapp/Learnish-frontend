<template>
  <div class="hello">
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    props: ['message'],
};
</script>

<style scoped>
  p {
    color: red;
  }
</style>