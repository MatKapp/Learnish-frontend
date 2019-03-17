<template>
  <div class="hello">
    <p>{{ message }}</p>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
         With Bootstrap!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
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