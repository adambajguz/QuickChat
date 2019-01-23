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

          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </b-col>
    <b-col cols="6">
      <b-breadcrumb :items="items"/>

      <b-jumbotron bg-variant="light" text-variant="dark" border-variant="info">
        <template slot="header">
          QuickChat
        </template>
        <template slot="lead">
          This is a simple Vue.js chatting application.
        </template>
        <hr class="my-4">
        <p>
          Adam Bajguz, Michał Kierzkowski, Mateusz Janel
        </p>
      </b-jumbotron>

    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'About',
  data () {
    return {
      items: [{
        text: 'Chat room list',
        href: '#',
        active: false
      },
      {
        text: 'About',
        href: '#',
        active: true
      }]
    }
  }
}
</script>
