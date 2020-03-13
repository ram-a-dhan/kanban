<template>
    <div class="card text-center mx-auto my-2" style="width: 16rem;">
          <div class="card-body">
            <!-- {{list}} -->
            <h5 class="card-title text-left">{{task.title}}</h5>
            <p class="card-text text-left">{{task.description}}</p>

            <button type="button" class="btn btn-primary">&lt;</button>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#EditTask" @click.prevent="editTaskForm(task.id)">
              Edit
            </button>
            <button type="button" class="btn btn-primary">&gt;</button>
          </div>
        </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['task'],
    methods: {
      editTaskForm(taskId) {
        this.$emit('editTaskForm', taskId)
      }
    }
}
</script>