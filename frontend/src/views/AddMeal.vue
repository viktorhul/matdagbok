<template>
  <div class="container">
    <Transition name="addIngredients">
          <div
            v-if="addingIngredientBox"
            class="addingIngredientsBox"
            @keyup.esc="addingIngredientBox = false"
          >
            <span @click="addingIngredientBox = false" class="headerBox"
              ><b class="closeIcon">&#10005;</b></span
            >
            <div class="inputContainer">
              <input
                type="text"
                ref="ingredientInputRef"
                v-model="ingredientInput"
                class="icInputField"
                @input="checkIngredient"
                placeholder="Sök ingrediens..."
                @keyup.enter="addNewIngredient"
              />
            </div>
            <ul v-if="ingredientInput.length > 0" class="suggestionsBox">
              <li
                
                @click="addNewIngredient"
                v-if="
                  activeSuggestions.filter(
                    (a) => a.name.toLowerCase() == ingredientInput.toLowerCase()
                  ).length == 0
                "
              >
                <span class="boxLink">Lägg till "{{ ingredientInput }}"</span>
              </li>
              <li
                class="suggestionListItem"
                v-for="suggestion in activeSuggestions"
                :key="suggestion.name"
                @click="addIngredient(suggestion)"
              >
                <span class="ingredientName">{{ suggestion.name }}</span>
              </li>
            </ul>
            <p v-else class="hintText">Börja skriv...</p>
          </div>
        </Transition>
    <h1 class="pageHeader">Ny måltid</h1>
    <p v-if="mealInserted">
      <!-- TODO: Clean data -->
      Måltiden inlagd!
      <router-link to="/add-meal">Lägg till ny måltid</router-link>
    </p>
    <div v-else>
      <div class="infoBoxContainer">
        <InfoBox
          v-if="categoryChosen"
          @click="categoryChosen = false"
          icon="fa-solid fa-mug-saucer"
          :text="category"
        />

        <InfoBox
          v-if="ingredients.length > 0"
          icon="fa-solid fa-carrot"
          :text="
            ingredients.length.toString() +
            ' ingrediens' +
            (ingredients.length > 1 ? 'er' : '')
          "
        />

        <InfoBox
          v-if="ingredients.length > 0"
          icon="fa-solid fa-bolt"
          :text="totalCalories.toString() + ' kalorier'"
        />
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
            @click="
              categoryChosen = true;
              category = alternative;
            "
          />
          <label :for="alternative">{{ alternative }}</label>
        </div>
      </div>
      <div v-else>
        <div v-if="ingredients.length > 0">
          <IngredientCard
            v-for="ingredient in ingredients"
            :key="ingredient.id"
            :ingredient="ingredient"
            v-model="ingredient.calorieCategory"
            :options="['Normal', 'Förenklad']"
            @updateData="updateData"
          />
        </div>
        <span
          @click="
            this.addingIngredientBox = true;
            this.$nextTick(() => {
              this.$refs.ingredientInputRef.focus();
            });
          "
          class="linkText boxLink"
          >Lägg till ingrediens</span
        >

        <br /><br /><span
          @click="insertMeal"
          class="linkText boxLink"
          :class="{
            'boxLink-disabled':
              ingredients.filter((i) => i.total_calories > 0).length == 0,
          }"
          >Spara måltid</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IngredientCard from "@/components/IngredientCard.vue";
import InfoBox from "@/components/InfoBox.vue";
export default {
  components: {
    IngredientCard,
    InfoBox,
  },
  computed: {
    totalCalories() {
      return this.ingredients.reduce((acc, ing) => {
        if (Number.parseInt(ing.total_calories) > 0)
          return acc + Number.parseInt(ing.total_calories);
        else return acc;
      }, 0);
    },
    ...mapGetters({
      user: "currentUser",
    }),
  },
  data() {
    return {
      mealInserted: false,
      categoryChosen: false,
      category: "",
      ingredients: [],
      suggestions: [],
      activeSuggestions: [],
      addingIngredientBox: false,
      ingredientInput: "",
      suggestionboxActive: false,
    };
  },
  methods: {
    updateData(ingredient) {
      if (ingredient.calorieCategory == "Normal") {
        ingredient.total_calories =
          ingredient.amount && ingredient.calories
            ? Math.round((ingredient.amount * ingredient.calories) / 100)
            : 0;
      } else if (ingredient.calorieCategory == "Förenklad") {
        ingredient.total_calories = Number.parseInt(
          ingredient.custom_total_calories
        );
      }

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
          s.name.toLowerCase().indexOf(this.ingredientInput.toLowerCase()) !==
          -1
      );
    },
    generateIngredientId() {
      // TODO: Make sure ID is always unique (check if random ID is already assigned or another solution)
      return Math.round(Math.random() * 10000);
    },
    addIngredient(ingredient) {
      ingredient.id = this.generateIngredientId();
      ingredient.total_calories = 0;
      ingredient.calorieCategory = "Normal";
      ingredient.amountUnit = "g";
      this.ingredients.push(ingredient);
      this.activeSuggestions = [];
      this.ingredientInput = "";
      this.$refs.ingredientInputRef.focus();
    },
    addNewIngredient() {
      if (this.ingredientInput == "") return;

      const suggestion = this.activeSuggestions.find(
        (a) => a.name.toLowerCase() == this.ingredientInput.toLowerCase()
      );

      if (suggestion) {
        suggestion.id = this.generateIngredientId();
        suggestion.total_calories = "";
        suggestion.calorieCategory = "Normal";
        suggestion.amountUnit = "g";
        this.ingredients.push(suggestion);
      } else {
        const ingredient = {
          id: this.generateIngredientId(),
          name: this.ingredientInput,
          amount: "",
          amountUnit: "g",
          calories: "",
          total_calories: "",
          calorieCategory: "Normal",
        };
        this.ingredients.push(ingredient);
      }

      this.activeSuggestions = [];
      this.ingredientInput = "";
      this.$refs.ingredientInputRef.focus();
    },
    insertMeal() {
      if (this.ingredients.length == 0) return;

      fetch((process.env.VUE_APP_PATH || "") + "/api/consumption/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
        body: JSON.stringify({
          meal_name: this.category,
          date:
            this.$route.params.date || new Date().toLocaleDateString("sv-SE"),
          consumption: this.ingredients,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            //this.mealInserted = true;
            this.$router.push("/");
          }
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

.nextStepButton {
  width: 200px;
  padding: 10px;
  font-size: 1em;
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
  width: 700px;
  height: 100%;
  margin-top: -22px;
}

@media screen and (max-width: 700px) {
  .addingIngredientsBox {
    width: 100%;
  }
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

.suggestionsBox li {
  text-align: left;
  padding: 20px;
  list-style-type: none;
}

.suggestionsBox li:not(:first-child) {
  border-top: 1px solid #ccc;
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

.infoTab {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.infoTab .infoIcon,
.infoTab .infoText {
  border: 2px solid #6591fc;
  height: 100%;
  padding: 5px;
}

.infoTab .infoIcon {
  background-color: #6591fc;
  color: white;
  font-size: 0.7em;
  border-radius: 10px 0 0 10px;
}

.infoTab .infoText {
  border-radius: 0 10px 10px 0;
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