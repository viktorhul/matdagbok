<template>
  <div class="wrapper">
    <router-link to="/" class="wrapperChild header">Matdagboken</router-link>
    <div class="wrapperChild userInfo">
      <div v-if="!user">
        <router-link to="/login">Logga in</router-link>
      </div>
      <div v-else>Inloggad</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
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