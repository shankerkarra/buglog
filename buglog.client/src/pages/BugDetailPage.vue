<template>
  <div class="col-md-12 col-12 bg-light mt-3 justify-content-between align-items-center">
    <div class="bugInfo m-1 p-1">
      <!-- <div class="row bg-dark">
      <div class="col-12">
        {{ bug.creator.name }}
        <img
          :src="bug.creator.picture"
          alt="user photo"
          height="50"
          class="rounded"
        />
      </div>
    </div> -->
      <div class="row m-1 p-1 border">
        <div class="col-4">
          Bug Title:<br> {{ bug.title }}
        </div>
        <div class="col-4">
          Bug created Date:<br> {{ bug.updatedAt }}
        </div>
        <div class="col-4">
          <p style="color: Green;" v-if="bug.closed === false">
            Bug Status: Open
          </p><p style="color: Red;" v-else>
            Bug Status: Closed
          </p>
        </div>
      </div>
      <div class="row m-1 p1 border">
        <div class="col-12">
          Bug Description: <br> {{ bug.description }}
        </div>
      </div>
    </div>
    <div class="row hoverable justify-content-center">
      <h5 class="pt-3" @click="destory(bug.id)">
        🗑 Close the bug
      </h5>
    </div>
    <!-- <div>
      <button type="button" class="btn btn-success" data-dismiss="modal">
        Add Notes
      </button>
    </div> -->
  </div>
  <div class="col-md-12 col-12 bg-primary mt-3 justify-content-between align-items-center">
    <div class="bugnoteInfo m-1 p-1">
      <div class="row m-1 p-2 border">
        <div class="container-md">
          <div class="modal-footer justify-content-between">
            <div class="col-md-2 col-2">
              <button type="button" class="btn btn-success" data-dismiss="modal" data-toggle="modal" :data-target="'#Notes'">
                Add Notes
              </button>
            </div>
          </div>
          <!-- <div>
            <button type="button" class="btn btn-success" data-dismiss="modal">
              Add Notes
            </button>
          </div> -->
          <!-- <div class="row justify-content-center">
            <BugForm />
          </div> -->
        </div>
        <div class="row justify-content-center mt-3">
          <NotesCard v-for="n in notes" :key="n.id" :note="n" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
// import { logger } from '../utils/Logger'
import { noteService } from '../services/NoteService'
import { bugService } from '../services/BugService'

export default {
  name: 'BugDetail',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: { },
      editBug: { }
    })
    onMounted(async() => {
      try {
        await bugService.getById(route.params.bugId)
        // await noteService.getNotesByBugId(route.params.bugId)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      bugcreator: computed(() => AppState.activebug.creator.Id),
      bug: computed(() => AppState.activebug),
      notes: computed(() => AppState.notes),
      createdDate: computed(() => {
        const d = new Date(AppState.activebug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      // new TimeAgo(d) props.project.createdAt
      }),
      async current() {
        await bugService.getById(route.params.bugId)
        await noteService.getByBugId(route.params.bugId)
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

.hoverable {
   cursor: pointer;
  }
.border{
   box-sizing: border-box;
   margin-bottom: 1;
}

// .text-header { color: white; text-align: center; top: 30px; width: 110px; left: 35%; position: absolute; background: green;}

</style>
