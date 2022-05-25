<template>
  <div>
    <h1 class="pageHeader">Logga in</h1>
    <p class="error" v-if="error">{{ error }}</p>
    <form>
      <input
        class="inputText"
        type="text"
        v-model="username.value"
        placeholder="Användarnamn"
        autocomplete="username"
        :class="{ errorInput: username.error }"
      />
      <input
        class="inputText"
        type="password"
        v-model="password.value"
        placeholder="Lösenord"
        autocomplete="password"
        :class="{ errorInput: password.error }"
      />
      <button class="loginButton" @click.prevent="loginUser">Logga in</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: "",
      username: {
        error: false,
        value: "",
      },
      password: {
        error: false,
        value: "",
      },
    };
  },
  methods: {
    loginUser() {
      this.error = false;

      this.username.error = !this.username.value;
      this.password.error = !this.password.value;

      if (this.username.error || this.password.error) {
        this.error = "Ange både användarnamn och lösenord";
        return;
      }

      fetch(process.env.VUE_APP_PATH || "" + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username.value,
          password: this.password.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.$store.commit("loginUser", {
              token: data.token,
              username: data.username,
            });
            this.$router.push("/");
          } else {
            this.error = "Felaktiga inloggningsuppgifter";
          }
        })
        .catch(() => {
          this.error = "Fel på servern";
        });
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

.errorInput {
  border-bottom: 2px solid #e31b1b !important;
}

.errorInput::placeholder,
.error {
  color: #e31b1b;
}
</style>