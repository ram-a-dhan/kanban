<template>
    <div id="" class="kanban-group col-3 p-0">
        <div class="h1 text-center my-3 position-sticky sticky-top text-dark">{{cat.name}}</div>

        <!-- CARD -->
        <Card v-for="task in list" :key="task.id" :task="task" @editTaskForm="editTaskForm">
          {{task}}
        </Card>
        <!-- END CARD -->

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
    mounted(){
      // console.log(this.list)
    },
    methods: {
      editTaskForm(id) {
        this.$emit('editTaskForm', id)
      }
    }
}
</script>