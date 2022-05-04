<template>
  <div>
    <router-link to="/ingredients">Ingredients</router-link>
    <input
      type="text"
      placeholder="Ingredient"
      v-model="ingredient"
      @keyup="checkIngredient"
      list="ingredientsList"
    />
    <datalist id="ingredientsList">
      <option
        v-for="is in ingredientSuggestions"
        :key="is"
        :value="is.value"
      ></option>
    </datalist>
    <input type="text" placeholder="Amount" v-model="ingredientAmount" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      ingredient: "",
      ingredientSuggestions: [
        { value: "wow" },
        { value: "bigboy" },
        { value: "pang" },
      ],
    };
  },
  created() {
    fetch("http://localhost:3000/ingredients")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          data.data.forEach((d) => {
            this.ingredientSuggestions = [];
            this.ingredientSuggestions.push({ value: d.name });
          });
        }
      });
  },
  methods: {
    checkIngredient() {
      console.log("wow");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
