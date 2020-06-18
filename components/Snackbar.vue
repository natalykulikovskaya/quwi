<template>
  <div v-if="message" :class="{ info: true, 'info--error': error, 'info--success': success }">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    success: {
      type: Boolean,
      required: false,
      default: false
    },
    message: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  position: fixed;
  bottom: 16px;
  right: 16px;
  padding: 8px 16px;
  background-color: #0457ae;
  color: #ffffff;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: bold;

  &--error {
    background-color: #a40000;
  }
  &--success {
    background-color: #046a02;
  }
}
</style>
