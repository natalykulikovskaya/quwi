<template>
  <div class="container">
    <page-header :title="`Project: ${project.name}`" />
    <div class="subheader">
      <router-link type="button" to="/">
        Back
      </router-link>
    </div>
    <div v-if="project" class="card">
      <form @submit.prevent="updateProject">
        <span class="name">Name</span>
        <input v-model="name" class="field" type="text">
        <confirm-button type="submit" text="ok" />
        <div class="card-placeholder" />
        <span :class="{ error: true, 'error--active': error }">{{ error }}</span>
        <div class="card-placeholder" />
      </form>
    </div>
    <snackbar :message="message" :success="success" />
  </div>
</template>

<script>
import PageHeader from '~/components/Header'
import Snackbar from '~/components/Snackbar'
import ConfirmButton from '~/components/ConfirmButton'

function getErrorText (error) {
  // eslint-disable-next-line camelcase
  const firstErrors = error?.response?.data?.first_errors ?? null
  const messages = Object.values(firstErrors)
  if (messages.length > 0) {
    return messages[0]
  }
  return 'Some error occurred'
}

export default {
  middleware: 'authenticated',
  components: {
    PageHeader,
    Snackbar,
    ConfirmButton
  },
  async asyncData ({ params, route, $axios }) {
    try {
      const { data } = await $axios.get(`/projects-manage/${params.id}`)
      return {
        project: data.project,
        name: data.project.name,
        message: null,
        error: null,
        success: false
      }
    } catch (e) {
      return {
        project: null,
        name: '',
        message: null,
        // eslint-disable-next-line camelcase
        error: getErrorText(e),
        success: false
      }
    }
  },
  methods: {
    async updateProject () {
      try {
        this.error = null
        const { params } = this.$route
        const formData = new FormData()
        formData.append('name', this.name)
        const {
          data: res
        } = await this.$axios.post(
          `/projects-manage/update?id=${params.id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        this.showSnackSuccess()
        this.project = res.project
      } catch (err) {
        this.error = getErrorText(err)
      }
    },
    showSnackSuccess () {
      this.success = true
      this.message = 'Project name updated'
      this.resetSnack()
    },
    resetSnack () {
      setTimeout(() => {
        this.success = false
        this.message = null
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
}
.subheader {
  background-color: #c1c8d2;
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  & a {
    background-color: #cecece;
    color: #151515;
    text-transform: uppercase;
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #bebfbf;
    font-weight: bold;
    font-size: 1rem;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }
}
.card {
  padding: 64px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #0002;
  border-radius: 4px;
  margin: 16px;
  box-shadow: -1px 4px 8px 0px rgba(0, 0, 0, 0.5);

  & form {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 16px;

    @media screen and (max-width: 576px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      justify-content: center;
      align-items: center;
      grid-gap: 32px;
    }
  }

  &-placeholder {
     @media screen and (max-width: 576px) {
       display: none;
    }
  }
}
.name {
  font-size: 1.5rem;
  font-weight: 500;
  margin-right: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit {
  margin-bottom: 32px;
}
.field {
  min-width: 320px;
  background-color: #fff;
  border: 1px solid #cccccc;
  border-radius: 4px;
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
