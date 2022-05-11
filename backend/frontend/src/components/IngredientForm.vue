<template>
  <div class="wrapper" @change="$emit('updateInfo', ingredient)">
    <input
      v-model="ingredient.name"
      autocomplete="off"
      list="ingredients"
      placeholder="Ange ingrediens"
      class="ingredient"
      type="text"
      @change="updateIngredientInfo"
      @keyup="updateIngredientInfo"
    />
    <datalist id="ingredients">
      <option
        v-for="ingredient in database"
        :key="ingredient.name"
        :value="ingredient.name"
      />
    </datalist>
    <div v-if="ingredient.name" class="ingredientInfo">
      <p v-if="!ingredient.predefined" class="boxInfo boxInfo-primary">
        Ny ingrediens
      </p>
      <div
        v-if="!ingredient.predefined"
        class="boxInfo boxInfo-primary boxCheck"
        :class="{
          'boxCheck-active': ingredient.addTemplate,
          'boxCheck-inactive': !ingredient.addTemplate,
        }"
      >
        <input
          type="checkbox"
          v-model="ingredient.addTemplate"
          name=""
          :id="'checkbox' + ingredient.id"
          value="wow"
        /><label :for="'checkbox' + ingredient.id">Lägg till mall</label>
      </div>
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
          <!--
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
          </tr>-->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["updateInfo"],
  props: {
    info: Object,
    database: Array,
  },
  created() {
    this.ingredient.id = this.info.id;
    this.ingredient.name = this.info.name;

    this.updateIngredientInfo();
  },
  data() {
    return {
      ingredient: {
        addTemplate: false,
        predefined: false,
        id: 0,
        name: "",
        amount: "",
        calories: "",
        protein: "",
        fat: "",
        carbon: "",
      },
    };
  },
  methods: {
    updateIngredientInfo() {
      const ingredient = this.database.find(
        (i) => i.name.toLowerCase() == this.ingredient.name.toLowerCase()
      );

      if (ingredient) {
        // Get additional information
        this.ingredient.predefined = true;
        this.ingredient.name = ingredient.name;
        this.ingredient.calories = ingredient.calories;
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
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
  outline: none;
}

.boxCheck {
  display: inline-flex;
  align-items: center;
}

.boxCheck input {
  margin-right: 5px;
}

.boxCheck-active {
  background-color: rgb(88, 215, 88);
  color: rgb(12, 56, 12);
  border: 1px solid rgb(12, 56, 12);
}

.boxCheck-inactive {
  background-color: rgb(247, 137, 137);
  color: rgb(74, 21, 21);
  border: 1px solid rgb(74, 21, 21);
}
</style>