<template>
  <div class="col-12 border justify-content-around align-items-center">
    <div class="row p-3 m-1 bg-dark border">
      <div class="col-md-6 col-12" v-if="note.creator">
        <small>{{ note.creator.name }}</small>
            &nbsp;
        <img
          :src="note.creator.picture"
          alt="user photo"
          height="50"
          class="rounded"
        />
      </div>
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
      <!-- For edit Notes button -->
      <!-- <div class="col-4 p-3 hoverable" v-if="account.id === note.creator.id">
        <p style="color: Green;">
          <button type="button"
                  class="btn btn-success"
                  data-dismiss="modal"
                  data-toggle="modal"
                  :data-target="'#Note'+ note.
                    id"
          >
            Edit
          </button>
        </p>
      </div> -->
      <!-- Edit Note button end here   -->
    </div>
  </div>

  <!-- Modal for Bug Edit -->

  <!-- <div class="modal fade"
       :id="'Note' + note.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="NoteTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-start">
            <div class="post-form">
              <form class="d-flex" @submit.prevent="update">
                <div class="form-group col-md-12 pt-3">
                  <textarea
                    type="text"
                    rows="5"
                    cols="40"
                    name="title"
                    v-model="state.noteEditing.body"
                    class="form-control"
                    placeholder="Note. Body....."
                    required
                  />
                  <br>
                </div>
                <div class="d-flex align-items-center">
                  <button type="submit" class="btn btn-outline-dark">
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <div class="col-md-2 col-2">
            <button type="button" class="btn btn-dark" data-dismiss="modal" data-toggle="modal" :data-target="'#Note'">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { bugService } from '../services/BugService'
import Pop from '../utils/Notifier'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      editNote: { }
    })
    return {
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activebug),
      noteEditing: computed(() => AppState.activeNote),
      async update() {
        try {
          await noteService.update(props.note.id, state.noteEditing.body)
          await bugService.getNotesByBugId(props.note.bugId)
          state.editNote = { }
        } catch (error) {
          Pop.toast(error)
        }
      },

      async destory(id, bugId) {
        await noteService.destroy(id)
        // await bugService.getNotesByBugId(bugId)
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
