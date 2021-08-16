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
          <h5>Bug Title:</h5>
          {{ bug.title }}
        </div>
        <!-- Commented to understand the way to code as on load it is throwing error -->
        <!-- <div class="col-4" v-if="user.isAuthenticated">
        <h5> Bug created Date: </h5> {{ createdDate }}
        </div> -->
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
          <h5>Bug Description:</h5>{{ bug.description }}
        </div>
      </div>
      <!-- <div>
        First Name:
        <input type="text"
               v-model="bug.title"
               :disabled="!isEditing"
               :class="{view: !isEditing}"
        >
      </div>
      <div>
        Last Name:
        <input type="text"
               v-model="bug.description"
               :disabled="!isEditing"
               :class="{view: !isEditing}"
        >
      </div>
      <button @click="isEditing = !isEditing">
        {{ isEditing ? 'Save' : 'Edit' }}
      </button>
      <button v-if="isEditing" @click="isEditing = false">
        Cancel
      </button> -->
    </div>
    <!-- </div> -->
    <div class="row hoverable justify-content-center" v-if="user.isAuthenticated">
      <h5 class="pt-3" @click="destory(bug.id)" v-if="bug.closed === false">
        🗑 Close the bug
      </h5>
    </div>
    <div class="row" v-if="user.isAuthenticated">
      <div class="col-4" v-if="bug.closed === false">
        <p style="color: Green;" v-if="account.id === bug.creator.id">
          <button type="button" class="btn btn-success" data-dismiss="modal" data-toggle="modal" :data-target="'#Editbug'">
            Edit
          </button>
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-12 col-12 bg-primary mt-3 justify-content-between align-items-center">
    <div class="bugnoteInfo m-1 p-1">
      <div class="row m-1 p-2 border">
        <!-- <div class="container-md"> -->
        <div class="modal-footer justify-content-between" v-if="user.isAuthenticated">
          <div class="col-md-2 col-2" v-if="bug.closed === false">
            <button type="button" class="btn btn-success" data-dismiss="modal" data-toggle="modal" :data-target="'#Notes'">
              Add Notes
            </button>
          </div>
        </div>
        <!-- </div> -->
        <div class="row justify-content-center mt-2">
          <NotesCard v-for="n in notes" :key="n.id" :note="n" />
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Bug Edit -->
  <div class="modal fade"
       :id="'Editbug'"
       tabindex="-1"
       role="dialog"
       aria-labelledby="BugTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <h5 class="modal-title" id="BugTitle">
            Notes for Bug Title : <br>
            <small>{{ bug.title }}</small>
          </h5>
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
                    class="form-control"
                    v-model="state.editBug.title"
                    placeholder="Bug Title....."
                    required
                  />
                  <br>
                  <textarea
                    type="text"
                    rows="5"
                    cols="40"
                    name="desription"
                    class="form-control"
                    v-model="state.editBug.description"
                    placeholder="Bug Description...."
                    required
                  />
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
            <button type="button" class="btn btn-dark" data-dismiss="modal" data-toggle="modal" :data-target="'#Task'">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Notes -->
  <div class="modal fade"
       :id="'Notes'"
       tabindex="-1"
       role="dialog"
       aria-labelledby="notesTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <h5 class="modal-title" id="notesTitle">
            Notes for Bug Title : <br>
            <small>{{ bug.title }}</small>
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
        </div>
        <div class="modal-footer justify-content-between">
          <div class="col-md-2 col-2">
            <button type="button" class="btn btn-dark" data-dismiss="modal" data-toggle="modal" :data-target="'#Task'">
              Back
            </button>
          </div>
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
import { logger } from '../utils/Logger'
import { noteService } from '../services/NoteService'
import { bugService } from '../services/BugService'

export default {
  name: 'BugDetail',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: { },
      editBug: { }
      // data: {
      //   isEditing: false,
      //   user: {
      //     firstName: 'John',
      //     lastName: 'Smith'
      //   }
      // }
    })
    onMounted(async() => {
      try {
        await bugService.getById(route.params.bugId)
        state.editBug = AppState.activebug
        // await noteService.getNotesByBugId(route.params.bugId)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bugcreator: computed(() => AppState.activebug.creator.Id),
      bug: computed(() => AppState.activebug),
      editBug: computed(() => AppState.activebug),
      notes: computed(() => AppState.notes),
      createdDate: computed(() => {
        const d = new Date(AppState.activebug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      // new TimeAgo(d) props.project.createdAt
      }),
      async current() {
        await bugService.getById(route.params.bugId)
        await noteService.getNotesByBugId(route.params.bugId)
      },
      async create() {
        try {
          // if user is authenticated an created
          state.newNote.bugId = AppState.activebug.id
          await noteService.create(state.newNote)
          await noteService.getNotesByBugId(route.params.bugId)
          state.newNote = { }
        } catch (error) {
          Pop.toast(error)
        }
      },
      async update() {
        try {
          if (AppState.account.id === AppState.activebug.creatorId) {
            logger.log(state.editBug)
            state.editBug.bugId = AppState.activebug.id
            // state.editBug.title = state.bug.title
            // state.editBug.description = state.bug.description
            await bugService.update(state.editBug)
            await noteService.getNotesByBugId(route.params.bugId)
          }
        } catch (error) {
          Pop.toast(error)
        }
      },
      async destory(id) {
        try {
          if (await Pop.confirm()) {
            if (AppState.account.id === AppState.activebug.creatorId) {
              await bugService.destroy(id)
              await noteService.getNotesByBugId(id)
            } else { Pop.toast('You can not delete other\'s bug') }
          }
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
  border-style: solid;
   box-sizing: border-box;
   margin-bottom: 1;
}

.textarea {
  width: 250px;
  height: 100px;
}
// .text-header { color: white; text-align: center; top: 30px; width: 110px; left: 35%; position: absolute; background: green;}

</style>
