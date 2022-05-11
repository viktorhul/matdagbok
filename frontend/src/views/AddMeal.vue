<template>
  <div>
    <h2 @click="printInfo">Ny måltid</h2>
    <IngredientForm
      v-for="ingredient in ingredients"
      :key="ingredient.name"
      :info="ingredient"
    />
    <span class="boxLink" @click="ingredients.push({ name: '' })"
      >Add ingredient</span
    >
  </div>
</template>

<script>
import IngredientForm from "@/components/IngredientForm";

export default {
  data() {
    return {
      ingredients: [{ name: "" }],
    };
  },
  components: {
    IngredientForm,
  },
  methods: {
    printInfo() {
      console.log(this.ingredients);
    },
  },
};
</script>

<style>
</style>