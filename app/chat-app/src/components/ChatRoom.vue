<template>
  <b-row class="justify-content-center">
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
            <b-nav-item href="#" @click.stop="logout()" >Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-col>
    <b-col cols="6">
      <b-breadcrumb :items="items"/>
      <b-list-group class="panel-body" v-chat-scroll>
        <b-list-group-item v-for="(item, index) in chats" :key="index" class="chat">
          <div class="left clearfix" v-if="item.nickname === nickname">
            <div class="chat-body clearfix">
              <div class="header">
                <strong class="primary-font">{{ item.nickname }}</strong>{{ item.color }} <small class="pull-right text-muted">
                <span class="glyphicon glyphicon-time"></span>{{ item.created_date }}</small>
              </div>
              <p>{{ item.message }}</p>
            </div>
          </div>
          <div class="right clearfix" v-else>
            <div class="chat-body clearfix">
              <div class="header">
                <strong class="primary-font">{{ item.nickname }}</strong> <small class="pull-right text-muted">
                <span class="glyphicon glyphicon-time"></span>{{ item.created_date }}</small>
              </div>
              <p>{{ item.message }}</p>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error">
          {{error.message}}
        </li>
      </ul>
      <b-form @submit="onSubmit" class="chat-form">
        <b-input-group prepend="Message">
          <b-form-input id="message" :state="state" v-model.trim="chat.message"></b-form-input>

          <b-form-group id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Category:">
            <b-form-select id="room_category" v-model="chat.color" class="mb-3">
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option value="0" disabled>-- Please select an option --</option>
              </template>
              <!-- these options will appear after the ones from 'options' prop -->
              <option value="1">General</option>
              <option value="2">Art</option>
              <option value="3">Games</option>
            </b-form-select>
          </b-form-group>

          <b-input-group-append>
            <b-btn type="submit" variant="info">Send</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import * as io from 'socket.io-client'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

export default {
  name: 'ChatRoom',
  data () {
    return {
      chats: [],
      errors: [],
      nickname: this.$route.params.nickname,
      chat: {},
      socket: io('http://localhost:4000'),
      items: [{
        text: 'Chat room list',
        href: '#/',
        active: false
      },
      {
        text: 'Chat room',
        href: '#/',
        active: true
      }]
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/chat/` + this.$route.params.id)
      .then(response => {
        this.chats = response.data
        console.log(response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })

    this.socket.on('new-message', function (data) {
      if (data.message.room === this.$route.params.id) {
        this.chats.push(data.message)
      }
    }.bind(this))
  },
  methods: {
    logout () {
      this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, color: 111111, message: this.chat.nickname + ' left this room', created_date: new Date() })
      this.$router.push({
        name: 'RoomList'
      })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.chat.room = this.$route.params.id
      this.chat.nickname = this.$route.params.nickname
      axios.post(`http://localhost:3000/api/chat`, this.chat)
        .then(response => {
          this.socket.emit('save-message', response.data)
          this.chat.message = ''
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style>
  .chat .left .chat-body {
    text-align: left;
    margin-left: 100px;
  }

  .chat .right .chat-body {
    text-align: right;
    margin-right: 100px;
  }

  .chat .chat-body p {
    margin: 0;
    color: #777777;
  }

  .panel-body {
    overflow-y: scroll;
    height: 350px;
  }

  .chat-form {
    margin: 20px auto;
    width: 80%;
  }
</style>
