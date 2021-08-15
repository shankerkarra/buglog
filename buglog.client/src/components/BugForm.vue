<template>
  <div class="Bug-form">
    <form class="d-flex" @submit.prevent="create">
      <div class="form-group col-md-5 pt-3">
        <input
          type="text"
          name="name"
          v-model="state.newBug.title"
          class="form-control"
          placeholder="Bug Titlte..."
          required
        />
      </div>
      <div class="form-group col-md-6 pt-3 px-1">
        <input
          type="text"
          name="description"
          v-model="state.newBug.description"
          class="form-control"
          placeholder="What is this bug about?"
        />
      </div>
      <div class="d-flex align-items-center">
        <button type="submit" class="btn btn-outline-dark">
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { bugService } from '../services/BugService'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      async create() {
        try {
          // debugger
          const newId = await bugService.create(state.newBug)
          await bugService.getAll()
          state.newBug = {}
          router.push({ name: 'BugDetails', params: { bugId: newId } })
        } catch (error) {
          Pop.toast('We could not make that Bug', error)
        }
      }
    }
  }
}
</script>
