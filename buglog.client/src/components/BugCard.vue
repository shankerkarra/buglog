<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between align-items-center">
    <!-- <router-link :to="{ name: 'BugDetail', params: {BugUd: bug.id} }"> -->
    <td>{{ bug.title }}</td>
    <td>{{ bug.creator.name }}</td>
    <td>{{ createdDate }}</td>
    <p style="color: Red;" v-if="bug.closed === false">
      Closed
    </p><p style="color: Green;" v-else>
      Open
    </p>
    <!-- <td>{{ bug.closed }}</td> -->
    <!-- </router-link> -->
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
  setup(props) {
    return {
      account: computed(() => AppState.account),
      createdDate: computed(() => {
        const d = new Date(props.bug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      // new TimeAgo(d) props.project.createdAt
      })
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  cursor: pointer;
}
</style>
