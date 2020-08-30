<template>
  <div id="app">
    <!-- eslint-disable max-len -->

    <b-navbar class="navbar">
      <template slot="brand">
        <b-navbar-item class="text" tag="router-link" :to="{ path: '/' }">NoLosses</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button v-show="isLoggedIn" type="is-danger" @click="logout()">Log Out</b-button>
            <b-button v-show="!isLoggedIn" type="is-danger" @click="login()">Log In With Google</b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view class="main container" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: mapState('auth', ['user', 'isLoggedIn']),
  methods: mapActions('auth', ['login', 'logout']),
};
</script>

<style scoped>
#app {
  width: 100%;
}

.navbar {
  background-color: mediumslateblue;
}

.text {
  color: antiquewhite;
  font-weight: 600;
}

.main {
  margin-top: 2em;
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.is-rounded {
  border: 1px;
  border-radius: 50%;
}
</style>
