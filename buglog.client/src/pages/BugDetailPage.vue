<template>
  <div class="col-md-7 col-9 bg-light d-flex mt-3 justify-content-between align-items-center">
    <h5 class="t-3 pb-2">
      <span>{{ bug.title }}</span>
    </h5>
  </div>

  <!-- Notes Modal -->
  <!-- <div class="modal fade"
       :id="'Notes' + note.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="bugnotes"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <h5 class="modal-title" id="bugnotes">
            Notes for {{ bug.title }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-start">
            <div class="post-form">
              <form class="d-flex" @submit.prevent="create">
                <div class="form-group col-md-12 pt-3">
                  <input
                    type="text"
                    name="body"
                    class="form-control"
                    v-model="state.newNote.body"
                    placeholder="Leave a note..."
                    required
                  />
                </div>
                <div class="d-flex align-items-center">
                  <button type="submit" class="btn btn-outline-dark">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="pt-2">
            <NotesCard v-for="n in notes" :key="n.id" :note="n" />
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'
import {noteService} from '../services/NoteService'



export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newNote: { },
      editBug: { }
    })
    onMounted(async() => {
      try {
        await noteService.getByBugId(req.params.id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      activebug: computed(()=> AppState.activebug)
      notes: computed(() => AppState.note),
      async current() {
        await bugService.getById(props.bug.id)
        await taskService.getNotesByTasks(AppState.activebug.id)
      },
      async create() {
        try {
          // state.newNote.taskId = AppState.activeTask.id
          // await noteService.create(state.newNote)
          // await taskService.getNotesByTasks(AppState.activeTask.id)
          // state.newNote = { }
        } catch (error) {
          Pop.toast(error)
        }
      },

      async update() {
        try {
          // logger.log(state.editTask)
          // await taskService.update(props.task.id, state.editTask)
          // await sprintService.getTaskBySprint(props.task.sprintId)
          // state.editTask = { }
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
 .action{
   cursor: pointer;
   &:hover {
    color: blue;
  }
 }
</style>
