<template>
  <div>
    <h1 class="pageHeader">Lägg till måltid</h1>
    <div v-if="step == 'mealInserted'">
      <p>Måltiden inlagd!</p>
      <span class="boxLink" @click="resetForm">Lägg till ny måltid</span>
    </div>
    <div v-else-if="step == 'chooseCategory'">
      <BlockOptions
        :alternatives="['Frukost', 'Lunch', 'Middag', 'Mellanmål', 'Övrigt']"
        :chosenAlternative="category"
        v-model="category"
        @changeAlternative="
          (e) => {
            category = e;
            step = 'addIngredient';
          }
        "
      />
    </div>
    <div v-else>
      <div class="infoBoxContainer">
        <InfoBox
          v-if="category != ''"
          @click="step = 'chooseCategory'"
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
      <div class="ingredientsContainer">
        <IngredientCard
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :ingredient="ingredient"
          @updateIngredient="updateIngredient"
        />
      </div>

      <div>
        <span class="linkText boxLink" @click="addIngredientCard"
          >Lägg till ingrediens</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import BlockOptions from "@/components/BlockOptions.vue";
import InfoBox from "@/components/InfoBox.vue";
import IngredientCard from "@/components/IngredientCard.vue";

export default {
  components: {
    BlockOptions,
    InfoBox,
    IngredientCard,
  },
  data() {
    return {
      step: "chooseCategory",
      category: "",
      ingredients: [
        {
          id: 1,
        },
      ],
    };
  },
  created() {
    if (process.env.VUE_APP_MODE == "dev") {
      this.step = "addIngredient";
      this.category = "Frukost";

      setInterval(() => {
        //console.log(this.ingredients.map((i) => i.name));
      }, 1000);
    }
  },
  methods: {
    resetForm() {
      this.step = "chooseCategory";
    },
    updateIngredient(ingredient) {
      console.log(ingredient);
      this.ingredients = this.ingredients.map((i) =>
        i.id == ingredient.id ? ingredient : i
      );
    },
    addIngredientCard() {
      let id = this.ingredients.length;
      while (this.ingredients.filter((i) => i.id == id) > 0) {
        console.log(id);
        id = id + 1;
      }

      const newIngredient = { id };
      this.ingredients.push(newIngredient);
    },
  },
  computed: {
    totalCalories() {
      return this.ingredients.reduce(
        (acc, ing) =>
          Number.parseInt(ing.totalCalories) > 0
            ? acc + Number.parseInt(ing.totalCalories)
            : acc,
        0
      );
    },
  },
};
</script>

<style scoped>
.infoBoxContainer {
  display: flex;
  gap: 5px;
  padding: 10px;
  justify-content: center;
}
</style>