<template>
  <div class="card border border-black p-3 m-2">
    <form>
      <div class="form-row ">
        <div class="form-group col-md-6">
          <label for="Title">Title</label>
          <input type="title" class="form-control" id="title">
        </div>
        <div class="form-group col-md-6">
          <label for="description">Description</label>
          <input type="description" class="form-control" id="decription">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        Save
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewBugForm'
}
</script>

<style scoped>

</style>
