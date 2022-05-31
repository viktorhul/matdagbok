<template>
  <div class="mealCard">
    <h2>
      <input
        type="text"
        class="invisibleInput"
        v-model="localIngredient.name"
        @change="$emit('updateIngredient', localIngredient)"
        placeholder="Ange ingrediens..."
      />
      <span class="smalltext"
        >{{ localIngredient.totalCalories }} kalorier</span
      >
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    ingredient: {
      id: Number,
      name: String,
      totalCalories: Number,
    },
  },
  data() {
    return {
      localIngredient: {
        id: this.ingredient.id,
        name: this.ingredient.name,
        totalCalories: this.ingredient.totalCalories || 0,
      },
    };
  },
};
</script>

<style scoped>
.mealCard {
  text-align: left;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.mealCard h2 {
  background-color: rgb(226, 226, 226);
  color: rgb(53, 53, 53);
  padding: 15px;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mealCard h2 .smalltext {
  font-weight: normal;
  font-size: 0.8em;
}

.invisibleInput {
  background: none;
  border: none;
  border-right: 1px solid #bbb;
  outline: none;
  font-weight: bold;
  width: 60%;
}
</style>