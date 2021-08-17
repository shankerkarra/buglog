<template>
  <div class="col-12 border justify-content-around align-items-center">
    <div class="row p-3 m-1 bg-dark border">
      <!-- <div class="col-12"> -->
      <!-- <p class="pt-3 text-dark">
        {{ note.creator.name }}
      </p> -->
      <!-- <div class="row"> -->
      <div class="col-md-6 col-12" v-if="note.creator">
        <!-- <div class="row bg-dark">
          <div class="col-md-6 col-12 "> -->
        <small>{{ note.creator.name }}</small>
            &nbsp;
        <img
          :src="note.creator.picture"
          alt="user photo"
          height="50"
          class="rounded"
        />
        <!-- </div>
        </div> -->
      </div>
      <!-- </div> -->
      <!-- <img class="rounded-circle" :src="account.picture" alt="Image" height="30"> -->
      <!-- </div> -->
    </div>
    <div class="row m-2 border">
      <div class="col-md-6 m-1 col-12 d-flex justify-content-between align-items-center">
        <p class="pt-3 text-dark">
          {{ note.body }}
        </p>
      </div>
    </div>
    <div class="row m-2 border" v-if="account.id === note.creator.id">
      <div class="col-md-6 m-1 col-6 d-flex justify-content-between align-items-center">
        <h5 class="pt-3 pb-2 hoverable" @click="destory(note.id, note.bugId)">
          🗑 Delete the Note
        </h5>
      </div>
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

.border{
  border-style: solid;
   box-sizing: border-box;
   margin-bottom: 1;
}

</style>
