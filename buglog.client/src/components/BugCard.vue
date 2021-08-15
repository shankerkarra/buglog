<template>
  <div class="col-md-7 col-12 bg-light d-flex mt-1 justify-content-between align-items-center">
    <!-- <router-link :to="{ name: 'BugDetail', params: {BugUd: bug.id} }"> -->
    <router-link :to="{ name: 'BugDetails', params: {id: bug._id} }">
      <td><small>{{ bug.title }}</small></td>
    </router-link>

    <td><small>{{ bug.creator.name }}</small></td>
    <img
      :src="bug.creator.picture"
      alt="user photo"
      height="25"
      class="rounded"
    />
    <td>{{ createdDate }}</td>
    <td>
      <p style="color: Green;" v-if="bug.closed === false">
        Open
      </p><p style="color: Red;" v-else>
        Closed
      </p>
    </td>
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
      }),
      computed: {
        rows() { // All the rows to be shown
          return this.allRows.sort(this.createdDate)
          // .filter(this.filterSomethingElse).filter(this.closed)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  cursor:  pointer;;
}
</style>
