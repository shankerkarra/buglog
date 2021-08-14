<template>
  <div class="container">
    <div class="row justify-content-center">
      <BugForm />
    </div>
  </div>
  <div class="row justify-content-center mt-3">
    <BugCard v-for="b in bugs" :key="b._id" :bug="b" />
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import BugForm from '../components/BugForm.vue'
import Pop from '../utils/Notifier'

export default {
  name: 'Bugs',
  setup(bugs) {
    onMounted(async() => {
      try {
        await bugService.getAll()
      } catch (error) {
        Pop.toast('Couldn\'t find Bugs - ', error)
      }
    })
    // methods: {
    //     createdDate: computed(() => {
    //     const d = new Date(bugs.updatedAt)
    //     return new Intl.DateTimeFormat('en-US').format(d)
    //     // new TimeAgo(d) props.project.createdAt
    //   })
    // },
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs),
      // createdDate: computed(() => {
      //   const d = new Date(bugs.updatedAt)
      //   return new Intl.DateTimeFormat('en-US').format(d)
      //   // new TimeAgo(d) props.project.createdAt
      // }),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  },
  components: {
    BugForm
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
