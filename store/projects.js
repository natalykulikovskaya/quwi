export const state = () => ({
  projects: []
})

export const mutations = {
  set (state, projects = []) {
    state.projects = projects
  }
}
