<template>
  <div class="container">
    <page-header title="Projects" />
    <ul>
      <project
        v-for="project in projects"
        :key="project.id"
        :project-id="project.id"
        :name="project.name"
        :spent-time-week="project.spent_time_week"
        :spent-time-month="project.spent_time_month"
        :spent-time-all="project.spent_time_all"
        :logo-url="project.logo_url"
        :is-active="project.is_active === 1"
      />
    </ul>
  </div>
</template>

<script>
import PageHeader from '~/components/Header'
import Project from '~/components/Project'

export default {
  middleware: 'authenticated',
  components: {
    PageHeader,
    Project
  },
  async fetch ({ store, params, $axios }) {
    try {
      const { data } = await $axios.get('/projects-manage/index')
      store.commit('projects/set', data.projects)
    } catch (err) {
      console.log('fetch projects error:', err.message)
    }
  },
  computed: {
    projects () {
      return this.$store.state.projects.projects
    }
  }
}
</script>

<style lang="scss">
$header-height: 64px;

.container {
  background-color: #f4f4f4;
  padding-top: $header-height;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;

  overflow-y: scroll;

  & ul {
    list-style: none;
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    flex-direction: column;
    justify-content:  flex-start;
    align-items: center;
    padding: 0 16px;
    margin: 0;
  }
}
</style>
