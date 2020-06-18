<template>
  <div class="container">
    <form class="auth" @submit.prevent="login">
      <h2>LOGIN</h2>
      <input v-model="email" class="field" type="text" placeholder="Email" autocomplete="email">
      <span :class="{ error: true, 'error--active': emailError }">{{ emailError }}</span>
      <input
        v-model="password"
        class="field"
        type="password"
        placeholder="Password"
        autocomplete="password"
      >
      <span :class="{ error: true, 'error--active': passwordError }">{{ passwordError }}</span>
      <confirm-button type="submit" text="Login" />
    </form>
  </div>
</template>

<script>
import ConfirmButton from '~/components/ConfirmButton'

export default {
  components: {
    ConfirmButton
  },
  data () {
    return {
      email: '',
      password: '',
      emailError: null,
      passwordError: null
    }
  },
  methods: {
    async login () {
      this.emailError = null
      this.passwordError = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email.trim().toLowerCase(),
            password: this.password.trim()
          }
        })
      } catch (e) {
        // eslint-disable-next-line camelcase
        this.emailError = e?.response?.data?.first_errors?.email ?? null
        // eslint-disable-next-line camelcase
        this.passwordError = e?.response?.data?.first_errors?.password ?? null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.auth {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 600px;
  min-height: 400px;
}
.field {
  min-width: 400px;
  background-color: #fff;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 16px 8px;
  font-size: 1rem;
  color: #151515;
  &::placeholder {
    color: #cccccc;
  }
}
.error {
  font-size: 1rem;
  color: #8d021f;
  padding: 16px 0 16px 0;
}
</style>
