<template>
  <div>
    <h2 @click="printTest">
      {{ newMeal ? "Ny måltid" : "Ändra måltid" }}
    </h2>
    <div v-if="mealAdded">
      <p>Måltiden inlagd!</p>
      <span
        class="boxLink boxLink-primary boxLink-big"
        @click="this.$router.push('/')"
        >Gå till startsidan</span
      >
      <span class="boxLink boxLink-secondary boxLink-big" @click="resetForm"
        >Lägg till ny</span
      >
    </div>
    <div v-else>
      <span class="boxLink boxLink-secondary boxLink-big" @click="addMeal">{{
        newMeal ? "Lägg till måltiden" : "Uppdatera måltiden"
      }}</span>
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
        @removeIngredient="removeIngredient"
      />
      <span
        class="boxLink boxLink-primary boxLink-big"
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
      newMeal: true,
      mealName: "",
      ingredients: [{ id: 0, name: "" }],
      databaseIngredients: [],
      mealAdded: false,
    };
  },
  created() {
    // TODO: Update meals
    /*
    if (this.$route.params.id) {
      // Modify existing meal
      this.newMeal = false;
      fetch("http://192.168.1.9:3000/api/consumption/meal/" + this.$route.params.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.ingredients = data.data[0].ingredients.map((i, index) => ({
              ...i,
              id: index,
            }));
          }
        });
    } else {
      // New meal
    }*/

    fetch("http://192.168.1.9:3000/api/ingredients")
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
    printTest() {
      console.log(...this.ingredients);
    },
    removeIngredient(ingredient) {
      this.ingredients = this.ingredients.filter((i) => i.id != ingredient.id);
    },
    resetForm() {
      this.mealName = "";
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

      fetch("http://192.168.1.9:3000/api/ingredients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
        body: JSON.stringify({
          ingredients: addTemplates,
        }),
      });

      fetch("http://192.168.1.9:3000/api/consumption/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
        body: JSON.stringify({
          meal_name: this.mealName || "Måltid",
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