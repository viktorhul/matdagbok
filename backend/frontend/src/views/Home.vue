<template>
  <div>
    <div v-if="user">
      <router-link to="/add-meal" class="boxLink">Lägg till måltid</router-link>
      <div class="content">
        <div v-for="meal in meals" :key="meal.meal_id" class="vertical-margin">
          <h2>
            {{ meal.meal_name }} <span class="boxInfo">523 kalorier</span>
          </h2>
          <table class="ingredientTable">
            <thead>
              <tr>
                <th>Vad</th>
                <th>Gram</th>
                <th>Kalorier</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ingredient in meal.ingredients" :key="ingredient.id">
                <td>{{ ingredient.name }}</td>
                <td>{{ ingredient.amount }}</td>
                <td>{{ ingredient.energy }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Matdagboken</h2>
      <p>Här kan du bokföra dina måltider. Logga in uppe till höger</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      consumption: [],
      meals: [],
    };
  },
  created() {
    if (this.user) {
      this.fetchConsumption();
    }
  },
  computed: {
    totalCalories() {
      let totalCalories = 0;
      this.consumption.forEach((c) => {
        totalCalories += c.energy;
      });
      return totalCalories;
    },
    ...mapGetters({
      user: "currentUser",
    }),
  },
  methods: {
    fetchConsumption() {
      const date = new Date();
      fetch(
        `http://192.168.1.9:3000/consumption/day/${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.user.token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.meals = data.data;
          }
        });
    },
  },
};
</script>

<style scoped>
.content {
}

.ingredientTable {
  width: 100%;
}

.ingredientTable th {
  text-align: left;
}

.tableSum {
  font-weight: bold;
}
</style>