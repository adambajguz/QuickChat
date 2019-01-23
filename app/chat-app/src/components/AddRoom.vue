<template>
  <b-row>
    <b-col cols="12" class="mb-4">
      <b-navbar toggleable="md" type="light" variant="danger">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">QuickChat</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item href="#/">Chat room list</b-nav-item>
            <b-nav-item href="#/about">About</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </b-col>
    <b-col align-self="start">&nbsp;</b-col>
    <b-col cols="6" align-self="center">
      <b-breadcrumb :items="items"/>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Name:">
          <b-form-input id="room_name" :state="state" v-model.trim="room.room_name"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Description:">
          <b-form-textarea id="room_description" :state="state" v-model.trim="room.room_description"></b-form-textarea>
        </b-form-group>

        <b-form-group id="fieldsetHorizontal"
          horizontal
          :label-cols="4"
          breakpoint="md"
          label="Highlight:">
          <b-form-checkbox id="highlighted_room" :state="state" v-model="room.highlighted_room"></b-form-checkbox>
        </b-form-group>

        <b-form-group id="fieldsetHorizontal"
          horizontal
          :label-cols="4"
          breakpoint="md"
          label="Category:">
          <b-form-select id="room_category" class="mb-3">
            <template slot="first">
              <!-- this slot appears above the options from 'options' prop -->
              <option value="Undefined" disabled>-- Please select an option --</option>
            </template>
            <!-- these options will appear after the ones from 'options' prop -->
            <option value="General">General</option>
            <option value="Art">Art</option>
            <option value="Games">Games</option>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Add</b-button>
      </b-form>
    </b-col>
    <b-col align-self="end">&nbsp;</b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'AddRoom',
  data () {
    return {
      room: {},
      items: [{
        text: 'Chat room list',
        href: '#/',
        active: false
      },
      {
        text: 'Add room',
        href: '#/',
        active: true
      }]
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/room`, this.room)
        .then(response => {
          this.$router.push({
            name: 'RoomList'
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
