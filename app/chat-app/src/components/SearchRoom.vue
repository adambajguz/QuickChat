<template>
  <b-row>
    <b-col cols="12">
      <b-navbar toggleable="md" type="light" variant="danger">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">QuickChat</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item href="#/add-room">Add Chat Room</b-nav-item>
            <b-nav-item href="#/about">About</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" v-model.trim="query" type="text" placeholder="Search"/>
              <b-button size="sm" variant="danger" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
      <b-breadcrumb :items="items"/>

      <b-table striped hover :items="rooms" :fields="fields">
        <template slot="actions" slot-scope="row">
          <b-btn size="sm" variant="primary" @click.stop="join(row.item._id)">Join</b-btn>
          <b-btn size="sm" @click.stop="edit(row.item._id)">Edit</b-btn>
          <b-btn size="sm" variant="danger" @click.stop="remove(row.item._id)">Remove</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'RoomList',
  data () {
    return {
      fields: {
        room_name: { label: 'Room Name', sortable: true, 'class': 'text-center' },
        room_description: { label: 'Room Description', sortable: false, 'class': 'text-justify' },
        highlighted_room: { label: 'Highlighted room', sortable: true },
        created_date: { label: 'Created Date', sortable: true },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      query: this.$route.params.query,
      rooms: [],
      errors: [],
      items: [{
        text: 'Chat room list',
        href: '#',
        active: true
      },
      {
        text: 'Search room',
        href: '#',
        active: false
      }]
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/room`)
      .then(response => {
        let unfilteredData = response.data
        var q = this.query
        this.rooms = unfilteredData.filter(function (room) { if (room.room_name.includes(q) === true) { return room } })
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    join (id) {
      console.log(id)
      this.$router.push({
        name: 'JoinRoom',
        params: { id: id }
      })
    },

    edit (id) {
      console.log(id)
      this.$router.push({
        name: 'EditRoom',
        params: { id: id }
      })
    },

    remove (id) {
      console.log(id)
      axios.delete(`http://localhost:3000/api/room/` + id)
        .then(response => {
          this.$router.go()
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
