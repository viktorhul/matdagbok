<template>
  <div class="container">
    <h1 class="pageHeader">Ny måltid</h1>
    <div class="infoBoxContainer">
      <span
        v-if="categoryChosen"
        @click="categoryChosen = false"
        class="infoBox"
        >{{ category }}</span
      >
      <span v-if="ingredients.length > 0" class="infoBox"
        >{{ ingredients.length }} ingredienser</span
      >
      <span v-if="totalCalories > 0" class="infoBox"
        >{{ totalCalories }} kalorier</span
      >
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
          <ul v-if="ingredientInput.length > 0" class="suggestionsBox">
            <li @click="addNewIngredient">
              <i>Lägg till "{{ ingredientInput }}"</i>
            </li>
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
          @updateData="updateData"
        />
      </div>
      <!-- TODO: Focus on input field when adding new ingredient -->
      <span @click="addingIngredientBox = true" class="linkText"
        >Lägg till ingrediens</span
      >

      <br /><br /><span @click="insertMeal" class="linkText">Spara måltid</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IngredientCard from "@/components/IngredientCard.vue";
export default {
  components: {
    IngredientCard,
  },
  computed: {
    totalCalories() {
      return this.ingredients.reduce((acc, ing) => {
        if (ing.total_calories > 0) return acc + ing.total_calories;
        else return acc;
      }, 0);
    },
    ...mapGetters({
      user: "currentUser",
    }),
  },
  data() {
    return {
      categoryChosen: false,
      category: "",
      isAddingIngredients: true,
      ingredients: [],
      suggestions: [
        {
          name: "Mjölk",
          calories: 80,
        },
        {
          name: "Havregryn",
          calories: 350,
        },
        {
          name: "Jordgubbssaft",
          calories: 84,
        },
        {
          name: "Philadelphia, lätt",
          calories: 128,
        },
        {
          name: "Philadelphia, vanlig",
          calories: 192,
        },
        {
          name: "Smör",
          calories: 600,
        },
        {
          name: "Hushållsost",
          calories: 604,
        },
        {
          name: "Creme fraiche, normal",
          calories: 175,
        },
        {
          name: "Creme fraiche, lätt",
          calories: 90,
        },
        {
          name: "Creme fraiche, mini",
          calories: 50,
        },
      ],
      activeSuggestions: [],
      addingIngredientBox: false,
      ingredientInput: "",
      suggestionboxActive: false,
    };
  },
  methods: {
    updateData(ingredient) {
      ingredient.total_calories =
        ingredient.amount && ingredient.calories
          ? Math.round((ingredient.amount * ingredient.calories) / 100)
          : 0;

      const ingredientIndex = this.ingredients.findIndex(
        (i) => i.id == ingredient.id
      );

      if (ingredientIndex == -1) return;

      this.ingredients[ingredientIndex] = ingredient;
    },
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
    generateIngredientId() {
      // TODO: Make sure ID is always unique (check if random ID is already assigned or another solution)
      return Math.round(Math.random() * 10000);
    },
    addIngredient(ingredient) {
      ingredient.id = this.generateIngredientId();
      ingredient.totalCalories = 0;
      this.ingredients.push(ingredient);
      this.activeSuggestions = [];
      this.ingredientInput = "";
      this.$refs.ingredientInput.focus();
    },
    addNewIngredient() {
      let ingredient = {
        id: this.generateIngredientId(),
        name: this.ingredientInput,
        amount: "",
        calories: "",
        total_calories: "",
      };
      this.ingredients.push(ingredient);
      this.activeSuggestions = [];
      this.ingredientInput = "";
      this.$refs.ingredientInput.focus();
    },
    insertMeal() {
      console.log("insertMeal");
      fetch(process.env.VUE_APP_PATH || "" + "/api/consumption/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
        body: JSON.stringify({
          meal_name: this.category,
          consumption: this.ingredients,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    },
    updateMeal() {
      // TODO
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
  gap: 5px;
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