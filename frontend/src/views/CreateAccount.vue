<template>
  <div>
    <h1 class="pageHeader">Skapa konto</h1>
    <p class="error" v-if="error">{{ error }}</p>
    <form v-if="!isCreated">
      <input
        class="inputText"
        type="text"
        v-model="username.value"
        placeholder="Användarnamn"
        :class="{ errorInput: username.error }"
      />
      <input
        class="inputText"
        type="password"
        v-model="password.value"
        placeholder="Lösenord"
        :class="{ errorInput: password.error }"
      />
      <button class="loginButton" @click.prevent="createUser">
        Skapa konto
      </button>
    </form>
    <p v-else>
      Ditt konto är skapat!
      <router-link to="/login">Klicka här för att logga in</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCreated: false,
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
    createUser() {
      this.error = false;

      this.username.error = !this.username.value;
      this.password.error = !this.password.value;

      if (this.username.error || this.password.error) {
        this.error = "Ange både användarnamn och lösenord";
        return;
      }

      fetch("/api/auth/create-user", {
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
            this.isCreated = true;
          } else {
            this.username.error = true;
            this.error = "Användarnamnet är upptaget";
          }
        })
        .catch((err) => {
          console.log(err);
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