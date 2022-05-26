<template>
  <div v-if="user" class="home">
    <h1 class="pageHeader">Dagens måltider</h1>
    <h4 class="pageSubheader boxContainer">
      <span @click="changeSelectedDate(-1)" class="switchButton">&lt;</span>
      <span class="switchButton">{{ selectedDate }}</span>
      <span
        @click="changeSelectedDate(1)"
        class="switchButton switchButton-disabled"
        >&gt;</span
      >
    </h4>
    <p v-if="!mealsLoaded">Hämtar måltider...</p>
    <p v-else-if="meals.length == 0">Inga registrerade måltider</p>
    <div class="meals" v-if="meals.length > 0">
      <div class="mealCard" v-for="meal in meals" :key="meal.meal_id">
        <h2 @click="meal.isActive = !meal.isActive">
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
            <!-- TODO: Implement editable meals -->
            <i
              v-if="false"
              @click="this.$router.push('/add-meal/' + meal.meal_id)"
              class="mealIcon editIcon"
            ></i>
            <i
              @click="meal.isActive = !meal.isActive"
              class="mealIcon charIcon"
            >
              <span>{{ meal.isActive ? "-" : "+" }}</span>
            </i>
          </span>
        </h2>

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
      selectedDate: new Date().toLocaleDateString("sv-SE"),
      mealsLoaded: false,
      meals: [],
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
      fetch(
        (process.env.VUE_APP_PATH || "") + "/api/consumption/day/" + today,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.user.token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.mealsLoaded = true;
          if (data.ok) {
            this.meals = data.data;
          }
        });
    }
  },
  methods: {
    editMeal(mealId) {
      // TODO
      console.log(mealId);
    },
    changeSelectedDate(inc) {
      if (inc === 1) {
        // increment
        // TODO: Increment date
        console.log(new Date().setDate(this.selectedDate + 1));
        /*this.selectedDate = this.selectedDate.setDate(
          this.selectedDate.getDate() + 1
        );*/
        this.selectedDate++;
      } else if (inc === -1) {
        // decrement
        this.selectedDate;
      }
    },
  },
  computed: mapGetters({
    user: "currentUser",
  }),
};
</script>

<style>
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
  font-style: normal;
  user-select: none;
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

.mealInfo {
  user-select: none;
}
</style>