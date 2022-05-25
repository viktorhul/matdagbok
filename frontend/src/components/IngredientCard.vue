<template>
  <div class="mealCard">
    <h2>
      <input
        @change="$emit('updateData', localIngredient)"
        type="text"
        v-model="localIngredient.name"
        class="invisibleInput"
      />
      <span class="calories"
        >{{
          localIngredient.amount && localIngredient.calories
            ? Math.round(
                (localIngredient.amount * localIngredient.calories) / 100
              ).toLocaleString("sv-SE")
            : 0
        }}
        kalorier</span
      >
    </h2>
    <div class="ingredientsList">
      <div class="inputContainer">
        <label for="">Antal gram</label>
        <input
          @change="$emit('updateData', localIngredient)"
          type="text"
          placeholder="Antal gram"
          v-model="localIngredient.amount"
        />
      </div>
      <div class="inputContainer">
        <label for="">Kalorier per 100g</label>
        <input
          @change="$emit('updateData', localIngredient)"
          type="text"
          placeholder="Kalorier per 100g"
          v-model="localIngredient.calories"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ingredient: {
      type: Object,
    },
  },
  data() {
    return {
      localIngredient: {
        id: this.ingredient.id,
        name: this.ingredient.name,
        amount: this.ingredient.amount,
        calories: this.ingredient.calories,
        total_calories: this.ingredient.total_calories,
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
}

.inputContainer input {
  padding: 5px;
  width: 100%;
}
</style>