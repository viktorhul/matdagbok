<template>
  <div class="wrapper">
    <input
      v-model="ingredient.name"
      autocomplete="off"
      list="ingredients"
      placeholder="Ange ingrediens"
      class="ingredient"
      @change="updateIngredientInfo"
    />
    <datalist id="ingredients">
      <option
        v-for="ingredient in ingredients"
        :key="ingredient.name"
        :value="ingredient.name"
      />
    </datalist>
    <div v-if="ingredient.name" class="ingredientInfo">
      <p v-if="!ingredient.predefined">Ny ingrediens</p>
      <table class="ingredientTable">
        <tbody>
          <tr>
            <td><span class="inputHeader">Gram</span></td>
            <td>
              <input
                class="ingredientInfoInput"
                type="text"
                placeholder="Ange antal gram"
                v-model="ingredient.amount"
              />
            </td>
          </tr>
          <tr>
            <td><span class="inputHeader">Kalorier per 100g</span></td>
            <td>
              <input
                class="ingredientInfoInput"
                type="text"
                placeholder="Ange kalorier"
                v-model="ingredient.calories"
              />
            </td>
          </tr>
          <tr>
            <td><span class="inputHeader">Protein per 100g</span></td>
            <td>
              <input
                class="ingredientInfoInput"
                type="text"
                placeholder="Ange andel protein"
                v-model="ingredient.protein"
              />
            </td>
          </tr>
          <tr>
            <td><span class="inputHeader">Fett per 100g</span></td>
            <td>
              <input
                class="ingredientInfoInput"
                type="text"
                placeholder="Ange andel fett"
                v-model="ingredient.fat"
              />
            </td>
          </tr>
          <tr>
            <td><span class="inputHeader">Kolhydrater per 100g</span></td>
            <td>
              <input
                class="ingredientInfoInput"
                type="text"
                placeholder="Ange andel kolhydrater"
                v-model="ingredient.carbon"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,
  },
  data() {
    return {
      ingredient: {
        predefined: false,
        name: "",
        amount: "",
        calories: "",
        protein: "",
        fat: "",
        carbon: "",
      },
      predefinedIngredient: null,
      ingredients: [
        {
          name: "Tonfisk",
          calories: 100,
        },
        {
          name: "Smör",
          calories: 600,
        },
        {
          name: "Salladsost",
          calories: 214,
        },
      ],
    };
  },
  methods: {
    updateIngredientInfo() {
      const ingredient = this.ingredients.find(
        (i) => i.name.toLowerCase() == this.ingredient.name.toLowerCase()
      );

      if (ingredient) {
        // Get additional information
        this.ingredient = {
          predefined: true,
          name: ingredient.name,
          calories: ingredient.calories,
        };
      } else {
        // Custom ingredient
        this.ingredient.predefined = false;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background: lightgrey;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.ingredient {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  width: 100%;
}

.ingredientInfo {
  margin-top: 10px;
  padding: 5px;
}

.ingredientTable {
  width: 100%;
  border-spacing: 0;
}

.inputHeader {
  font-size: 0.8em;
}

.ingredientInfoInput {
  padding: 5px;
  margin: 5px 0;
}
</style>