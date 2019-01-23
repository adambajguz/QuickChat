<template>
  <b-row>
    <b-col cols="12" class="mb-4">
      <b-navbar toggleable="md" type="light" variant="danger">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">QuickChat</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item href="#/">Chat room list</b-nav-item>
            <b-nav-item href="#/add-room">Add Chat Room</b-nav-item>
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
                  label="Enter Nickname">
          <b-form-input id="nickname" :state="state" v-model.trim="chat.nickname"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Join</b-button>
      </b-form>
    </b-col>
    <b-col align-self="end">&nbsp;</b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
import * as io from 'socket.io-client'

export default {
  name: 'JoinRoom',
  data () {
    return {
      chat: {},
      socket: io('http://localhost:4000')
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.chat.room = this.$route.params.id
      this.chat.message = this.chat.nickname + ' join the room'
      axios.post(`http://localhost:3000/api/chat`, this.chat)
        .then(response => {
          this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, color: 777977, message: 'Join this room', created_date: new Date() })
          this.$router.push({
            name: 'ChatRoom',
            params: { id: this.$route.params.id, nickname: response.data.nickname }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
