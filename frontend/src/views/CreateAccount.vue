<template>
  <div>
    <h2>Skapa konto</h2>
    <div v-if="!userCreated">
      <p class="errorMsg" v-if="errorMsg">{{ errorMsg }}</p>
      <input
        class="standardInput"
        type="text"
        v-model="username"
        placeholder="Användarnamn"
      />
      <input
        class="standardInput"
        type="password"
        v-model="password"
        placeholder="Lösenord"
      />
      <button class="standardButton" @click.prevent="createUser">
        Skapa konto
      </button>
    </div>
    <div v-else>
      <p>Kontot har skapats!</p>
      <router-link to="/login" class="boxLink boxLink-big boxLink-primary"
        >Logga in</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCreated: false,
      errorMsg: "",
      username: "",
      password: "",
    };
  },
  methods: {
    createUser() {
      this.errorMsg = "";

      if (this.username == "" || this.password == "") {
        this.errorMsg = "Du måste ha ett användarnamn och lösenord";
        return;
      }

      fetch("http://192.168.1.9:3000/api/auth/create-user", {
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
            this.userCreated = true;
          }
        });
    },
  },
};
</script>

<style>
</style>