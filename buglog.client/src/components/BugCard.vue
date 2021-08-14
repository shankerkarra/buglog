<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between align-items-center">
    <!-- <router-link :to="{ name: 'ProjectBacklog', params: {projectId: project.id} }"> -->
    <td>{{ bug.title }}</td>
    <td>{{ bug.creator.name }}</td>
    <td>{{ bug.updatedAt }}</td>

    <!-- </router-link> -->

    <img class="rounded-circle" :src="account.picture" :alt="account.name" height="40">
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  cursor: pointer;
}
</style>
