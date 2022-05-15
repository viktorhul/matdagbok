<template>
  <div>
    <h1 class="pageHeader">Skapa konto</h1>
    <form>
      <input
        class="inputText"
        type="text"
        v-model="username"
        placeholder="Användarnamn"
      />
      <input
        class="inputText"
        type="password"
        v-model="password"
        placeholder="Lösenord"
      />
      <button class="loginButton" @click.prevent="createUser">
        Skapa konto
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    createUser() {
      console.log("create account:", this.username, this.password);
    },
  },
};
</script>

<style scoped>
form {
  padding: 20px;
}

.inputText {
  display: block;
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 10px;
  font-size: 1em;
  margin-bottom: 20px;
}

.loginButton {
  width: 100%;
  border-radius: 5px;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 1em;
  background-color: #6591fc;
  color: #fff;
  font-weight: bold;
}
</style>