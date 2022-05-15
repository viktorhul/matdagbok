<template>
  <div id="app">
    <nav>
      <router-link to="/" class="logo">M</router-link>
      <div class="menuIcons">
        <div v-if="user" class="profileIcon">
          {{ user.username.charAt(0) }}
        </div>

        <div class="hamburgerIcon" @click="menuActive = !menuActive">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </nav>
    <div class="menu" v-if="menuActive">
      <ul>
        <li v-if="user">Inloggad som {{ user.username }}</li>
        <li>
          <router-link @click="menuActive = false" to="/"
            >Startsida</router-link
          >
        </li>
        <li v-if="user">
          <router-link @click="menuActive = false" to="/add-meal"
            >Lägg till måltid</router-link
          >
        </li>
        <li
          v-if="user"
          class="menuLink"
          @click="
            this.$store.commit('logoutUser');
            menuActive = false;
          "
        >
          Logga ut
        </li>
        <li v-if="!user">
          <router-link @click="menuActive = false" to="/login"
            >Logga in</router-link
          >
        </li>
      </ul>
    </div>
    <router-view @click="menuActive = false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      menuActive: false,
    };
  },
  beforeCreate() {
    this.$store.commit("initializeUser");
  },
  computed: mapGetters({
    user: "currentUser",
  }),
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #2e2e2e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  /* color: #2c3e50; */
  font-weight: bold;
  text-decoration: none;
  color: white;
}

nav a.logo {
  padding: 20px;
  font-family: "Times New Roman", Times, serif;
  font-size: 2em;
  color: #6591fc;
}

nav .menuIcons {
  display: flex;
  margin-right: 20px;
}

.menuIcons > div {
  width: 35px;
  height: 35px;
}

.menuIcons > div + div {
  margin-left: 20px;
}

nav .hamburgerIcon div {
  width: 35px;
  height: 4px;
  background: white;
  margin: 6px 0;
}

.profileIcon {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  border-radius: 45%;
}

.menu {
  position: absolute;
  width: 100%;
  text-align: left;
  background-color: white;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 3px 20px 0 grey;
}

.menu ul li {
  font-size: 1.3em;
}

.menu ul li + li {
  border-top: 1px solid #ccc;
}

.menu ul li a,
.menuLink {
  padding: 20px;
  text-decoration: none;
  color: rgb(53, 53, 53);
  display: block;
  width: 100%;
  height: 100%;
}

.menu ul li a.router-link-exact-active {
  background-color: #6591fc;
  color: #fff;
}

h1.pageHeader {
  margin: 20px 0;
}

a {
  text-decoration: none;
  color: #6591fc;
}
</style>
