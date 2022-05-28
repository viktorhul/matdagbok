<template>
  <div id="app">
    <div class="navWrapper">
      <nav>
        <router-link to="/" @click="menuActive = false" class="logo"
          >M</router-link
        >
        <div class="menuIcons">
          <div
            v-if="user"
            class="profileIcon"
            @click="this.$router.push('/profile')"
          >
            {{ user.username.charAt(0).toUpperCase() }}
          </div>

          <div class="hamburgerIcon" @click="menuActive = !menuActive">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </nav>
    </div>
    <div class="menu" v-if="menuActive">
      <ul>
        <li v-if="user">
          <router-link @click="menuActive = false" to="/profile"
            >Inloggad som {{ user.username }}</router-link
          >
        </li>
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
            this.$router.push('/login');
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
    <div class="routerView">
      <router-view @click="menuActive = false" />
    </div>
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
body {
  overscroll-behavior: none;
}

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
  position: absolute;
  width: 100vw;
  height: 100vh;
}

.navWrapper {
  background-color: #2e2e2e;
  width: 100%;
  position: fixed;
}

.navWrapper ~ * {
  padding-top: 80px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  margin: 0 auto;
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
  user-select: none;
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
  padding-top: 3px;
}

.menu {
  position: absolute;
  width: 700px;
  left: 0;
  right: 0;
  margin: 77px auto;
  padding: 0;
  text-align: left;
  background-color: white;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 3px 20px 0 grey;
}

.menu ul li {
  user-select: none;
  font-size: 1.3em;
  list-style-type: none;
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

h4.pageSubheader {
  font-size: 1em;
  font-weight: normal;
  margin-top: -10px;
  margin-bottom: 20px;
}

h1.pageHeader + .infoBoxContainer,
h4.pageSubheader + .infoBoxContainer {
  margin-top: -20px;
}

.boxContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  height: 30px;
}

.switchButton {
  background-color: #ddd;
  padding: 10px 15px;
  border-radius: 10px;
  user-select: none;
}

.switchButton-disabled {
  background-color: #eee;
}

.switchButton-date {
  width: 200px;
}

a,
.linkText {
  text-decoration: none;
  color: #6591fc;
}

p {
  margin-bottom: 15px;
  padding: 0 20px;
  line-height: 150%;
}

.routerView {
  width: 700px;
  margin: 0 auto;
}

.boxLink {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #6591fc;
  color: white;
}

.boxLink-disabled {
  background-color: #eee !important;
  color: grey !important;
}

@media screen and (max-width: 700px) {
  nav {
    width: 100%;
  }

  .menu {
    width: 100%;
  }

  .routerView {
    width: 100%;
  }
}
</style>
