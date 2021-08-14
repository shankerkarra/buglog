<template>
  <!-- <div class="row justify-content-center">
    <ProjectForm />
  </div> -->
  <!-- <div class="row justify-content-center mt-3">
      <BugCard v-for="b in bugs" :key="b._id" :bug="b" />
  </div> -->
  <div class="container">
    <h3 class="p-3 text-center">
      Vue 3 - Display a list of items with v-for
    </h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Creator Nam</th>
          <th>Last Updated</th>
          <th>Bug Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in bugs" :key="b._id">
          <!-- <tr v-for="user in users" :key="user.id"> -->
          <td>{{ b.title }}</td>
          <td>{{ b.creator.name }}</td>
          <td>{{ b.updatedAt }}</td>
          <td>{{ b.closed }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import Pop from '../utils/Notifier'

export default {
  name: 'Bugs',
  setup() {
    onMounted(async() => {
      try {
        await bugService.getAll()
      } catch (error) {
        Pop.toast('Couldn\'t find Bugs - ', error)
      }
    })
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  },
  components: {
    // ProjectForm
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
