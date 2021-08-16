<template>
  <div class="row bg-dark mt-3">
    <div class="col-md-12 col-12 d-flex justify-content-between align-items-center">
      <p class="pt-3 text-light">
        {{ note.body }}
      </p>
    </div>
    <div class="col-md-12 col-12 d-flex justify-content-around align-items-center">
      <p class="pt-3 text-light">
        {{ account.name }}
      </p>
      <img class="rounded-circle" :src="account.picture" alt="Image" height="30">
      <h5 class="pt-3 pb-2 hoverable" @click="destory(note.id, note.bugId)">
        🗑
      </h5>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { bugService } from '../services/BugService'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activebug),
      async destory(id, bugId) {
        await noteService.destroy(id)
        await bugService.getNotesByBugId(bugId)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  cursor: pointer;
}
</style>
