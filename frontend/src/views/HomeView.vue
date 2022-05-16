<template>
  <div v-if="user" class="home">
    <h1 class="pageHeader">Dagens måltider</h1>
    <div class="mealCard" v-for="meal in meals" :key="meal.meal_id">
      <h2>
        <span class="mealInfo">
          {{ meal.meal_name }}
          <span class="calories"
            >{{
              meal.ingredients.reduce((acc, ing) => acc + ing.total_calories, 0)
            }}
            kalorier</span
          >
        </span>
        <span class="headerIcons">
          <i @click="editMeal(meal.id)" class="editIcon"></i>
        </span>
      </h2>
      <table class="ingredientsList">
        <colgroup>
          <col class="colIngredient" />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Vad</th>
            <th>Storlek</th>
            <th>Kalorier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredient in meal.ingredients" :key="ingredient.id">
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.amount }}</td>
            <td>{{ ingredient.total_calories }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <h1 class="pageHeader">Matdagboken</h1>
    <router-link to="/login">Logga in</router-link> eller
    <router-link to="/create-account">skapa ett konto</router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      meals: [],
    };
  },
  created() {
    console.log(this.user);
    if (this.user) {
      const date = new Date();
      const today =
        date.getFullYear() +
        "-" +
        (Number.parseInt(date.getMonth()) + 1) +
        "-" +
        date.getDate();
      fetch("/api/consumption/day/" + today, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.meals = data.data;
          }
        });
    }
  },
  methods: {
    editMeal(mealId) {
      console.log(mealId);
    },
  },
  computed: mapGetters({
    user: "currentUser",
  }),
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

.mealCard h2 .calories {
  font-weight: normal;
  font-size: 0.8em;
}

.ingredientsList {
  font-size: 0.9em;
  padding: 15px;
  width: 100%;
  table-layout: fixed;
  border-spacing: 5px;
  border-collapse: separate;
}

.colIngredient {
  width: 50%;
}

.editIcon {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background-color: #bbb;
  background-image: url("@/assets/edit_icon.png");
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
}

.headerIcons {
  display: flex;
  gap: 10px;
}

.headerIcons i {
  display: block;
}
</style>