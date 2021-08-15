<template>
  <div class="row bg-dark justify-content-between">
    <div class="col-md-3 col-8 text-light ">
      <h5 class="hoverable pt-1"
          data-toggle="modal"
          data-target="#backlogInfo"
      >
        {{ currentbug.title }}
      </h5>

      <div class="modal fade"
           id="backlogInfo"
           tabindex="-1"
           role="dialog"
           aria-labelledby="backlogInfoTitle"
           aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered text-dark" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {{ currentbug.name }}
               </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-if="!currentbug.description">
              <p>No Description Provided</p>
              <!-- <div class="pt-3" v-if="backlogitem.isOpen">
                Tasks can be created and tracked
              </div>
              <div class="pt-3" v-else>
                🎉 Feature Complete
              </div> -->
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(currentbug.id)">
                🗑
              </h5>
            </div>
            <div class="modal-body" v-else>
              <p>{{ currentbug.description }}</p>
              <div class="pt-3" v-if="current.closed">
               Bug Status: Closed
              </div>
              <div class="pt-3" v-else>
               Bug Status: Open
             </div>
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(currentbug.id)">
                🗑
              </h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-2 col-4 border-left border-light text-light text-center pt-1">
      <span class="hoverable" data-toggle="modal" data-target="#taskCreation"> Create Task</span>

      <div class="modal fade"
           id="taskCreation"
           tabindex="-1"
           role="dialog"
           aria-labelledby="taskCreationLabel"
           aria-hidden="true"
      >
        <div class="modal-dialog text-dark text-left" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="taskCreationLabel">
                New Task
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="create()">
                <div class="form-group">
                  <label for="task-name" class="col-form-label">Name:</label>
                  <input type="text" class="form-control" v-model="state.newTask.name" id="task-name" required>
                </div>
                <div class="d-flex justify-content-between">
                  <button type="submit" class="btn btn-success">
                    Create
                  </button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center mt-3">
    <!-- <TaskCardBacklog v-for="t in tasks" :key="t.id" :task="t" /> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import { noteService } from '../services/NoteService'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'

export default {
  name: 'BugDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      newTask: { }
    })
    onMounted(async() => {
      try {
        await bugService.getById(route.params.bugId)
        await noteService.getNotesByBugId(route.params.bugId)
        // await backlogService.getById(route.params.backlogId)
        // await backlogService.getTasksbyBacklog(route.params.backlogId)
      } catch (error) {
        Pop.toast('Error fetching Bug', error)
      }
    })
    // function caculateTotal() {
    //   let totalWeight = 0
    //   //    logger.log([0])
    //   for (let i = 0; i < AppState.tasks.length; i++) {
    //     totalWeight += AppState.tasks[i].weight
    //   }
    //   return totalWeight
    // }
    return {
      state,
      currentbug: computed(() => AppState.activebug),
      notes: computed(() => AppState.notes),
      // total: computed(caculateTotal),
      // One Liner Way to call the function
      // total: computed(() => AppState.tasks.reduce((total, task) => total + task.weight), 0),
      // async destroy(id) {
      //   await backlogService.destroy(id)
      //   router.push({ name: 'ProjectBacklog' })
      // },
      // async create() {
      //   try {
      //     state.newTask.projectId = AppState.activeBacklog.projectId
      //     state.newTask.backlogId = AppState.activeBacklog.id
      //     await taskService.create(state.newTask)
      //     await backlogService.getTasksbyBacklog(route.params.backlogId)
      //     state.newTask = { }
      //   } catch (error) {
      //     Pop.toast('We couldn\'t make that Task - ', error)
      //   }
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
