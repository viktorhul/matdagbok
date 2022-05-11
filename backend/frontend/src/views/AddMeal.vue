<template>
  <div>
    <h2 @click="printIngredients">Ny måltid</h2>
    <div v-if="mealAdded">
      <p>Måltiden inlagd!</p>
      <span class="boxLink boxLink-primary" @click="this.$router.push('/')"
        >Gå till startsidan</span
      >
      <span class="boxLink boxLink-secondary" @click="resetForm"
        >Lägg till ny</span
      >
    </div>
    <div v-else>
      <span class="boxLink boxLink-secondary" @click="addMeal"
        >Lägg till måltiden</span
      >
      <p>Kalorier totalt: {{ totalCalories }}</p>
      <input
        class="standardInput vertical-margin"
        type="text"
        v-model="mealName"
        placeholder="Ge måltiden ett namn..."
      />
      <IngredientForm
        v-for="ingredient in ingredients"
        :key="ingredient.name"
        :info="ingredient"
        :database="databaseIngredients"
        @updateInfo="updateIngredient"
      />
      <span
        class="boxLink boxLink-primary"
        @click="ingredients.push({ id: ingredients.length, name: '' })"
        >+ Lägg till rad</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IngredientForm from "@/components/IngredientForm";

export default {
  data() {
    return {
      mealName: "",
      ingredients: [{ id: 0, name: "" }],
      databaseIngredients: [],
      mealAdded: false,
    };
  },
  created() {
    fetch("http://192.168.1.9:3000/ingredients")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          this.databaseIngredients = data.data;
        }
      });
  },
  computed: {
    totalCalories() {
      let totalCalories = 0;
      this.ingredients.forEach((i) => {
        const amount = parseInt(i.amount);
        const calories = parseInt(i.calories);

        if (amount > 0 && calories > 0) {
          totalCalories += (amount * calories) / 100;
        }
      });
      return Math.round(totalCalories);
    },
    ...mapGetters({
      user: "currentUser",
    }),
  },
  components: {
    IngredientForm,
  },
  methods: {
    resetForm() {
      this.ingredients = [{ id: 0, name: "" }];
      this.mealAdded = false;
    },
    updateIngredient(newIngredient) {
      this.ingredients = this.ingredients.map((i) => {
        if (i.id == newIngredient.id) {
          return newIngredient;
        } else {
          return i;
        }
      });
    },
    addMeal() {
      const uploadIngredients = this.ingredients.filter(
        (i) => i.name && i.amount
      );

      const addTemplates = this.ingredients.filter((i) => i.addTemplate);

      fetch("http://192.168.1.9:3000/ingredients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
        body: JSON.stringify({
          ingredients: addTemplates,
        }),
      });

      fetch("http://192.168.1.9:3000/consumption/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
        body: JSON.stringify({
          meal_name: this.mealName,
          consumption: uploadIngredients,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.mealAdded = true;
          }
        });
    },
  },
};
</script>

<style>
</style>