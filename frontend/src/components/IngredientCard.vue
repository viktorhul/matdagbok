<template>
  <div class="mealCard">
    <h2>
      <input
        @change="$emit('updateData', localIngredient)"
        type="text"
        v-model="localIngredient.name"
        class="invisibleInput"
      />
      <span class="calories">{{ ingredientCalories }} kalorier</span>
    </h2>
    <div class="categoryWrapper">
      <div class="categoryContainer">
        <div v-for="option in options" :key="option" class="optionBox">
          <input
            type="radio"
            :id="option + localIngredient.id"
            :name="'calorieCategory' + localIngredient.id"
            :value="localIngredient.calorieCategory"
            :checked="localIngredient.calorieCategory == option"
            @click="
              localIngredient.calorieCategory = option;
              $emit('updateData', localIngredient);
            "
          />
          <label :for="option + localIngredient.id">{{ option }}</label>
        </div>
      </div>
    </div>
    <div
      v-if="localIngredient.calorieCategory == 'Normal'"
      class="ingredientsList"
    >
      <div class="inputContainer">
        <label for="">Antal gram</label>
        <input
        class="textFieldInput"
          @change="$emit('updateData', localIngredient)"
          type="text"
          placeholder="Antal gram"
          v-model="localIngredient.amount"
        />
      </div>
      <div class="inputContainer">
        <label for="">Kalorier per 100g</label>
        <input
        class="textFieldInput"
          @change="$emit('updateData', localIngredient)"
          type="text"
          placeholder="Kalorier per 100g"
          v-model="localIngredient.calories"
        />
      </div>
    </div>
    <div
      v-else-if="localIngredient.calorieCategory == 'Förenklad'"
      class="ingredientsList"
    >
      <div class="inputContainer">
        <label for="">Totalt antal kalorier</label>
        <input
        class="textFieldInput"
          @change="$emit('updateData', localIngredient)"
          type="text"
          placeholder="Antal kalorier"
          v-model="localIngredient.custom_total_calories"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ingredient: {
      id: Number,
      name: String,
      amount: String,
      amountUnit: String,
      calories: String,
      total_calories: String,
      custom_total_calories: String,
      calorieCategory: {
        default: "Normal",
      },
    },
    options: Array,
  },
  computed: {
    ingredientCalories() {
      if (this.localIngredient.calorieCategory == "Normal") {
        return this.localIngredient.amount && this.localIngredient.calories
          ? Math.round(
              (this.localIngredient.amount * this.localIngredient.calories) /
                100
            ).toLocaleString("sv-SE")
          : 0;
      } else if (this.localIngredient.calorieCategory == "Förenklad") {
        return this.localIngredient.custom_total_calories > 0
          ? this.localIngredient.custom_total_calories
          : 0;
      } else return 0;
    },
  },
  data() {
    return {
      localIngredient: {
        id: this.ingredient.id,
        name: this.ingredient.name,
        amount: this.ingredient.amount,
        amountUnit: this.ingredient.amountUnit, // TODO: Make unit editable
        calories: this.ingredient.calories,
        total_calories: this.ingredient.total_calories,
        custom_total_calories:
          this.ingredient.custom_total_calories ||
          this.ingredient.total_calories,
        calorieCategory: this.ingredient.calorieCategory,
      },
    };
  },
  emits: ["updateData"],
};
</script>

<style scoped>
.invisibleInput {
  background: none;
  border: none;
  outline: none;
  font-weight: bold;
  width: 60%;
}

.inputContainer {
  width: 100%;
}

.inputContainer + .inputContainer {
  margin-top: 10px;
}

.inputContainer label {
  display: block;
  font-size: 0.8em;
  margin-bottom: 5px;
  margin-left: 10px;
}

.textFieldInput {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  font-size: 1em;
  margin-bottom: 10px;
}

.categoryWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.categoryContainer {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  column-gap: 10px;
  background-color: #eee;
  border-radius: 30px;
  border: 2px solid #ccc;
  padding: 5px;
}

.categoryContainer input {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

.categoryContainer label {
  display: block;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 0.8em;
}

.categoryContainer input:checked + label {
  background-color: #6591fc;
  color: white;
}
</style>