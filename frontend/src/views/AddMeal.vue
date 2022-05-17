<template>
  <div class="container">
    <h1 class="pageHeader">Ny måltid</h1>
    {{ test }}
    <div v-if="!categoryChosen">
      <div
        class="optionBox"
        v-for="alternative in [
          'Frukost',
          'Lunch',
          'Middag',
          'Mellanmål',
          'Övrigt',
        ]"
        :key="alternative"
      >
        <input
          type="radio"
          v-model="category"
          name="category"
          :value="alternative"
          :id="alternative"
        />
        <label :for="alternative">{{ alternative }}</label>
      </div>

      <button @click="categoryChosen = true">Continue</button>
    </div>
    <div v-else-if="isAddingIngredients">
      <div class="ingredientsInput">
        <input class="input_ingredients" type="text" placeholder="Ingrediens" />
        <input
          class="input_calories"
          type="text"
          placeholder="kalorier per 100g"
        />
        <input class="input_amount" type="text" placeholder="Antal gram" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "",
      categoryChosen: true,
      isAddingIngredients: true,
      ingredient: "",
      category: "",
      suggestions: [
        {
          name: "Mjölk",
        },
      ],
      suggestionboxActive: false,
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.optionBox {
  display: block;
  margin-bottom: 10px;
}

.optionBox label {
  display: block;
  margin: 10px;
  border-radius: 5px;
  padding: 15px 10px;
  font-size: 1em;
  background-color: #d7d7d7;
  color: #343434;
}

.optionBox input {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

.optionBox input:checked + label {
  background-color: #6591fc;
  color: #141e37;
}

.ingredientsInput {
  width: 100%;
  padding: 10px;
}

.ingredientsInput input {
  border: none;
  border-bottom: 2px solid #ccc;
}

.input_ingredients {
  width: 40%;
}

.input_calories {
  width: 30%;
}

.input_amount {
  width: 30%;
}
</style>