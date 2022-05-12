<template>
  <div class="wrapper">
    <router-link to="/" class="wrapperChild header">Matdagboken</router-link>
    <div class="wrapperChild userInfo">
      <div v-if="user">
        {{ user.username }}
        <span
          @click="
            this.$store.commit('logoutUser');
            this.$router.push('/');
          "
          >Logga ut</span
        >
      </div>
      <div class="wrapperChild userInfo" v-else>
        <router-link to="/login">Logga in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    user: "currentUser",
  }),
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 60px;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.wrapperChild {
  padding: 0 10px;
}

.wrapperChild a {
  display: inline-block;
}

.wrapperChild a + a {
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid white;
}

.header {
  font-size: 1.5em;
}

.userInfo {
  font-size: 1em;
}

a {
  color: white;
  text-decoration: none;
}
</style>