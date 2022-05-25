<template>
  <div class="mealCard">
    <h2>{{ ingredient.name }}</h2>
    <div class="ingredientsList">abc</div>
  </div>
</template>

<script>
export default {
  props: {
    ingredient: {
      type: Object,
    },
  },
};
</script>

<style>
</style>