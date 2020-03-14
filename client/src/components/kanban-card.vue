<template>
    <div class="card text-center mx-auto my-2" style="width: 16rem;">
          <div class="card-body">
            <!-- {{list}} -->
            <h5 class="card-title text-left">{{task.title}}</h5>
            <p class="card-text text-left">{{task.description}}</p>

            <button type="button" class="btn btn-danger" v-if="task.category == 'Planning'" @click.prevent="cancelPlan(task.id)">✘</button>
            <button type="button" class="btn btn-primary" v-if="task.category != 'Planning'" @click.prevent="backtrack(task.id, task.category)">◀</button>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#EditTask" @click.prevent="editTaskForm(task.id)">🖉</button>
            <button type="button" class="btn btn-primary" v-if="task.category != 'Production'" @click.prevent="advance(task.id, task.category)">▶</button>
            <button type="button" class="btn btn-success" v-if="task.category == 'Production'" @click.prevent="finishProd(task.id)">✔</button>
          </div>
        </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['task'],
    methods: {
      cancelPlan(id) {
        this.$emit('cancelPlan', id)
      },
      backtrack(id, category) {
        this.$emit('backtrack', { id, category })
      },
      editTaskForm(id) {
        this.$emit('editTaskForm', id)
      },
      advance(id, category) {
        this.$emit('advance', { id, category })
      },
      finishProd(id) {
        this.$emit('finishProd', id)
      }
    }
}
</script>