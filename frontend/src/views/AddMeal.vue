<template>
  <div class="container">
    <h1 class="pageHeader">Ny måltid</h1>
    <div class="infoBoxContainer">
      <span class="infoBox">{{ ingredients.length }} ingredienser</span>
    </div>
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
      <!--<div class="ingredientsInput">
        <input list="ingredient_suggestions" class="input_ingredients" type="text" placeholder="Ingrediens" />
        <datalist id="ingredient_suggestions">
          <option v-for="suggestion in suggestions" :key="suggestion.name" :value="suggestion.name" />
        </datalist>
        <input
          class="input_calories"
          type="text"
          placeholder="kalorier per 100g"
        />
        <input class="input_amount" type="text" placeholder="Antal gram" />
      </div>-->
      <Transition name="addIngredients">
        <div v-if="addingIngredientBox" class="addingIngredientsBox">
          <span @click="addingIngredientBox = false" class="headerBox"
            ><b class="closeIcon">&#10005;</b></span
          >
          <div class="inputContainer">
            <input
              type="text"
              ref="ingredientInput"
              v-model="ingredientInput"
              class="icInputField"
              @input="checkIngredient"
              placeholder="Sök ingrediens..."
            />
          </div>
          <ul v-if="activeSuggestions.length > 0" class="suggestionsBox">
            <li
              v-for="suggestion in activeSuggestions"
              :key="suggestion.id"
              @click="addIngredient(suggestion)"
            >
              <span class="ingredientName">{{ suggestion.name }}</span>
            </li>
          </ul>
          <p v-else class="hintText">Börja skriv...</p>
        </div>
      </Transition>
      <div v-if="ingredients.length > 0">
        <IngredientCard
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :ingredient="ingredient"
        />
      </div>
      <span @click="addingIngredientBox = true" class="linkText"
        >Lägg till ingrediens</span
      >
    </div>
  </div>
</template>

<script>
import IngredientCard from "@/components/IngredientCard.vue";
export default {
  components: {
    IngredientCard,
  },
  data() {
    return {
      categoryChosen: true,
      isAddingIngredients: true,
      ingredients: [
        {
          name: "Mjölk",
        },
        {
          name: "Havregryn",
        },
      ],
      category: "",
      suggestions: [
        {
          name: "Mjölk",
        },
        {
          name: "Havregryn",
        },
        {
          name: "Jordgubbssaft",
        },
        {
          name: "Philadelphia, lätt",
        },
        {
          name: "Philadelphia, vanlig",
        },
        {
          name: "Smör",
        },
        {
          name: "Hushållsost",
        },
        {
          name: "Creme fraiche, normal",
        },
        {
          name: "Creme fraiche, lätt",
        },
        {
          name: "Creme fraiche, mini",
        },
      ],
      activeSuggestions: [],
      addingIngredientBox: false,
      ingredientInput: "",
      suggestionboxActive: false,
    };
  },
  created() {},
  methods: {
    checkIngredient(event) {
      this.ingredientInput = event.target.value;
      if (this.ingredientInput.length <= 1) {
        this.activeSuggestions = [];
        return;
      }

      this.activeSuggestions = this.suggestions.filter(
        (s) =>
          s.name
            .toLocaleLowerCase()
            .indexOf(this.ingredientInput.toLowerCase()) !== -1
      );
    },
    addIngredient(ingredient) {
      this.ingredients.push(ingredient);
      this.activeSuggestions = [];
      this.ingredientInput = "";
      this.$refs.ingredientInput.focus();
    },
  },
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

.addingIngredientsBox {
  background-color: #fff;
  position: fixed;
  width: 100%;
  height: 100%;
}

.addingIngredientsBox .headerBox {
  display: block;
  text-align: right;
  padding: 10px;
  background-color: #eee;
}

.inputContainer {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.inputContainer .icInputField {
  width: 100%;
  padding: 5px;
  font-size: 1em;
  border: none;
  outline: none;
}

.suggestionsBox {
}

.suggestionsBox li {
  text-align: left;
  padding: 10px;
}

.suggestionsBox li .ingredientName {
  font-size: 1em;
}

.hintText {
  color: #aaa;
  font-size: 0.8em;
  margin-top: 15px;
}

.infoBoxContainer {
  display: flex;
  padding: 10px;
  justify-content: center;
}

.infoBox {
  background-color: #b5c5fe;
  color: #272727;
  font-size: 1em;
  font-weight: normal;
  padding: 10px;
  border-radius: 5px;
}

.addIngredients-enter-active,
.addIngredients-leave-active {
  transition: all 0.5s ease;
}

.addIngredients-enter-from,
.addIngredients-leave-to {
  transform: translateY(200px);
  opacity: 0;
}

.closeIcon {
  font-size: 1.5em;
}
</style>