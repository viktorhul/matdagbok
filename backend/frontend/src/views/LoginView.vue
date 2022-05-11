<template>
  <div>
    <h2>Logga in</h2>
    <form>
      <p class="errorMsg" v-if="errorMsg">{{ errorMsg }}</p>
      <input class="standardInput" type="text" v-model="username" placeholder="Användarnamn" />
      <input class="standardInput" type="password" v-model="password" placeholder="Lösenord" />
      <button class="standardButton" @click.prevent="loginUser">
        Logga in
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      errorMsg: null,
      username: "",
      password: "",
    };
  },
  computed: mapGetters({
    user: "currentUser",
  }),
  methods: {
    loginUser() {
      fetch("http://mat.hultsten.eu:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            const user = {
              token: data.token,
              username: data.username,
            };
            this.$store.commit("loginUser", user);
            this.$router.push("/");
          } else {
            this.errorMsg = data.msg;
          }
        })
        .catch((err) => {
          this.errorMsg = "Något gick fel :( Meddelande: " + err;
        });
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
</style>