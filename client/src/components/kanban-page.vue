<template>
    <div id="mainDiv" class="container vw-100 vh-100 d-flex flex-column justify-content-between">
    <nav class="navbar navbar-light shadow-border">
      <a class="navbar-brand">Kan-Ban-Zai</a>
      <form class="form-inline">
        <button type="button" class="btn btn-success m-2 my-sm-0" data-toggle="modal" data-target="#AddTask">Add New Task</button>
        <button type="button" class="btn btn-outline-danger m-2 my-sm-0" @click.prevent="logOut()">Log Out</button>
      </form>
    </nav>

    <nav id="container-kanban" class="navbar navbar-light shadow-border">

      <!-- KANBAN GROUP -->
      <Group v-for="(cat,i) in categories" :key="i" :cat="cat" :id="cat.id" :list="filtered[cat.name]"></Group>
      <!-- END KANBAN GROUP -->

    </nav>

  <!-- ADD MODAL -->
  <div class="modal fade" id="AddTask" tabindex="-1" role="dialog" aria-labelledby="AddTaskLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="AddTaskLabel">Add New Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form id="addForm" @submit.prevent="addTask()">
          <div class="modal-body">
            <div class="form-group row">
              <label for="addTitle" class="col-sm-2 col-form-label">Title</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="addTitle" placeholder="Task Title" v-model="addTitle">
              </div>
            </div>
            <div class="form-group row">
              <label for="addDescription" class="col-sm-2 col-form-label">Desc.</label>
              <div class="col-sm-10">
                <textarea id="addDescription" class="form-control" placeholder="Task Description" v-model="addDescription"></textarea>
              </div>
            </div>
            <div class="form-group row">
              <label for="addCategory" class="col-sm-2 col-form-label">Category</label>
              <div class="col-sm-10">
                <select class="custom-select mr-sm-2" id="addCategory" v-model="addCategory">
                  <option value="Planning">Planning</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                  <option value="Production">Production</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-outline-success">Add</button>
          </div>
        </form>

      </div>
    </div>
  </div>
  <!-- END ADD MODAL -->
  
  <!-- EDIT MODAL -->
  <div class="modal fade" id="EditTask" tabindex="-1" role="dialog" aria-labelledby="EditTaskLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="EditTaskLabel">Edit Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form id="editForm" @submit.prevent="editTask()">
          <div class="modal-body">
            <div class="form-group row">
              <label for="editTitle" class="col-sm-2 col-form-label">Title</label>
              <div class="col-sm-10">
                <!-- <div class="form-control border-0" id="editTitle">{{ this.editTitle }}</div> -->
                <input type="text" class="form-control" id="editTitle" placeholder="Task Title" v-model="editTitle">
              </div>
            </div>
            <div class="form-group row">
              <label for="editDescription" class="col-sm-2 col-form-label">Desc.</label>
              <div class="col-sm-10">
                <textarea id="editDescription" class="form-control" placeholder="Task Description" v-model="editDescription"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-danger">Delete</button>
            <button type="submit" class="btn btn-outline-warning">Update</button>
          </div>
        </form>

      </div>
    </div>
  </div>
  <!-- END EDIT MODAL -->

  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Group from './kanban-group'
import card from './kanban-card'
import Axios from 'axios'

export default {
    name: 'mainPage',
    props: ['isLogin'],
    components: {
      Group,
      card
    },
    data() {
      return {
        categories: [
          { id: 'kanban-planning', name: 'Planning' },
          { id: 'kanban-development', name: 'Development' },
          { id: 'kanban-testing', name: 'Testing' },
          { id: 'kanban-production', name: 'Production' }
        ],
        addTitle: '',
        addDescription: '',
        addCategory: '',
        editTitle: '',
        editDescription: '',
        list: [],
        // Planning: [],
        // Development: [],
        // Testing: [],
        // Production: []
      }
    },
    created() {
      this.showAll()
      console.log("filtered : ", this.list)
      console.log("categories", this.categories)
    },
    computed: {
      filtered() {
        return {
          Planning: this.planning,
          Development: this.development,
          Testing: this.testing,
          Production: this.production,
        }
      },
      planning() {
        return this.list.filter(task => task.category === 'Planning')
      },
      development() {
        return this.list.filter(task => task.category === 'Development')
      },
      testing() {
        return this.list.filter(task => task.category === 'Testing')
      },
      production() {
        return this.list.filter(task => task.category === 'Production')
      }
    },
    mounted() {
      // console.log("filtered : ", this.list)
      // console.log("categories", this.categories)
    },
    methods: {
        logOut() {
            this.$emit('logoutSuccess', true)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Logout Success!',
                showConfirmButton: false,
                timer: 1000
            })
        },
        showAll() {
          Axios({
            method: 'GET',
            url: process.env.VUE_APP_BASE_URL + '/task',
            headers: { token: localStorage.token }
          })
          .then(({data}) => {
            console.log(data, 'MASUKKK WOEEEEEE')
            this.list = data
            console.log("LIST DATA", this.list.filter(task => { task.category === 'Planning'}))
            // console.log(this.list)
            // this.filterByCat()
          })
          .catch(err => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${err.response.data.message}`,
                showConfirmButton: true,
            })
          })
        },
        addTask() {
          Axios({
            method: 'POST',
            url: process.env.VUE_APP_BASE_URL + '/task',
            headers: { token: localStorage.token },
            data: {
              title: this.addTitle,
              description: this.addDescription,
              category: this.addCategory
            }
          })
          .then(result => {
            this.addTitle = '',
            this.addDescription = '',
            this.addCategory = '',
            // console.log(result)
            this.showAll()
          })
          .catch(err => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${err}`,
                showConfirmButton: true,
            })
          })
        }
    }

}
</script>