<template>
  <div class="container-md">
    <div class="row justify-content-center">
      <BugForm />
    </div>
  </div>
  <div class="row justify-content-center p-1 mt-1">
    <div class="div">
      <label for="flip-1">Flip switch:</label>
      <select name="flip-1" id="flip-1" data-role="slider">
        <option value="state.isFilter = false">
          All
        </option>
        <option value="state.isFilter = true">
          Closed
        </option>
      </select>
    </div>
    <!-- $(document).delegate("#submit", "vclick", function() {
    alert($("#flip-1").val());
}); -->
    <br>
    <div v-if="state.isFilter === false">
      <BugCard v-for="fb in filterdbugs" :key="fb._id" :bug="fb" />
    </div>
    <div v-else>
      <BugCard v-for="b in bugs" :key="b._id" :bug="b" />
    </div>
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
    const state = reactive({
      dropOpen: false,
      isFilter: computed(() => AppState.isFilter)
      // isFilter: true
    })
    return {
      state,
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs),
      isFilter: computed(() => AppState.isFilter),
      filterdbugs: computed(() => AppState.bugs.filter(b => b.closed === true)),
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
//  $(document).delegate("#submit", "vclick", function() {
//     alert($("#flip-1").val())
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
