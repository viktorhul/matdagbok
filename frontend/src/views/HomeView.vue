<template>
  <div v-if="user" class="home">
    <h1 class="pageHeader">Dagens måltider</h1>
    <div class="meals" v-if="meals.length > 0">
      <div class="mealCard" v-for="meal in meals" :key="meal.meal_id">
        <h2>
          <span class="mealInfo">
            {{ meal.meal_name }}
            <span class="calories"
              >{{
                meal.ingredients.reduce(
                  (acc, ing) => acc + ing.total_calories,
                  0
                )
              }}
              kalorier</span
            >
          </span>
          <span class="headerIcons">
            <i @click="editMeal(meal.id)" class="mealIcon editIcon"></i>
            <i
              @click="meal.isActive = !meal.isActive"
              class="mealIcon charIcon"
            >
              <span>{{ meal.isActive ? "-" : "+" }}</span>
            </i>
          </span>
        </h2>
        <!-- TODO: Collapse tables -->
        <table class="ingredientsList" v-if="meal.isActive">
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
      <p>Du har inte registrerat något i dag</p>
    </div>
    <router-link to="/add-meal">Lägg till måltid</router-link>
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
      meals: [
        {
          meal_name: "Frukost",
          meal_id: 1,
          isActive: false,
          ingredients: [
            {
              name: "Knäckebröd",
              amount: "2 st",
              total_calories: 60,
            },
            {
              name: "Ägg",
              amount: "1 st",
              total_calories: 120,
            },
          ],
        },
        {
          meal_name: "Frukost",
          meal_id: 1,
          isActive: false,
          ingredients: [
            {
              name: "Knäckebröd",
              amount: "2 st",
              total_calories: 60,
            },
            {
              name: "Ägg",
              amount: "1 st",
              total_calories: 120,
            },
          ],
        },
      ],
    };
  },
  created() {
    if (this.user) {
      const date = new Date();
      const today =
        date.getFullYear() +
        "-" +
        (Number.parseInt(date.getMonth()) + 1) +
        "-" +
        date.getDate();
      fetch("https://mat.hultsten.eu/api/consumption/day/" + today, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            //this.meals = data.data;
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

.mealIcon {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background-color: #bbb;
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
}

.editIcon {
  background-image: url("@/assets/edit_icon.png");
}

.charIcon {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.charIcon span {
  font-size: 1.5em;
}

.headerIcons {
  display: flex;
  gap: 10px;
}

.headerIcons i {
  display: block;
}
</style>