import Vue from 'vue'
import Router from 'vue-router'

import About from '@/components/About'
import RoomList from '@/components/RoomList'
import AddRoom from '@/components/AddRoom'
import EditRoom from '@/components/EditRoom'
import JoinRoom from '@/components/JoinRoom'
import ChatRoom from '@/components/ChatRoom'
import SearchRoom from '@/components/SearchRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/',
      name: 'RoomList',
      component: RoomList
    },
    {
      path: '/add-room',
      name: 'AddRoom',
      component: AddRoom
    },
    {
      path: '/edit-room',
      name: 'EditRoom',
      component: EditRoom
    },
    {
      path: '/search-room/:query',
      name: 'SearchRoom',
      component: SearchRoom
    },
    {
      path: '/join-room/:id',
      name: 'JoinRoom',
      component: JoinRoom
    },
    {
      path: '/chat-room/:id/:nickname',
      name: 'ChatRoom',
      component: ChatRoom
    }
  ]
})
