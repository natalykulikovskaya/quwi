<template>
  <header class="header">
    <h1>Q</h1>
    <div class="header-left">
      <span class="header-item">{{ title }}</span>
      <button type="button" class="header-button header-item" @click="logout">
        Logout
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    async logout () {
      try {
        await this.$auth.logout()
        this.$router.push({ path: '/login' })
      } catch (e) {
        console.log('logout error', e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 64px;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fafafa;
  width: 100vw;
  height: $header-height;
  border-bottom: 1px solid rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: -1px 4px 8px 0px rgba(0,0,0,0.5);

  &-left {
    display: flex;
  }

  &-item {
    font-size: 1.2rem;
    color: #7b7888;
    margin-right: 16px;
    padding: 16px;
  }

  &-button {
    border: none;
    background-color: transparent;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
