<template>
    <div id="" class="kanban-group col-3 p-0">
        <div class="h1 text-center my-3 position-sticky sticky-top text-dark">{{cat.name}}</div>

        <!-- CARD -->
        <Card v-for="task in list" :key="task.id" :task="task"
          @cancelPlan="cancelPlan"
          @backtrack="backtrack"
          @editTaskForm="editTaskForm"
          @advance="advance"
          @finishProd="finishProd"
        >
          {{task}}
        </Card>
        <!-- END CARD -->
        <div class="bottom-shade"></div>
      </div>
</template>

<script>
import Card from './kanban-card'

export default {
    name: 'group',
    props: ['cat','list'],
    components: {
      Card
    },
    methods: {
      cancelPlan(id) {
        this.$emit('cancelPlan', id)
      },
      backtrack({ id, category }) {
        this.$emit('backtrack', { id, category })
      },
      editTaskForm(id) {
        this.$emit('editTaskForm', id)
      },
      advance({ id, category }) {
        this.$emit('advance', { id, category })
      },
      finishProd(id) {
        this.$emit('finishProd', id)
      }
    }
}
</script>