import axios from 'axios'

export const state = () => ({
  posts: []
})

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  }
}

export const actions = {
  async getPosts({ commit }) {
    await axios
      .get('https://job.cinra.net/wp-json/wp/v2/job')
      .then((res) => {
        commit('setPosts', res.data)
      })
      .catch(console.error)
  }
}
