<template>
  <div>
    <h1 class="pageHeader">Ny måltid</h1>
    <div v-if="true">
      <div class="optionBox">
        <input
          type="radio"
          class="optionBox"
          v-model="category"
          name="category"
          id="breakfast"
        />
        <label for="breakfast">Frukost</label>
      </div>

      <div class="optionBox">
        <input
          type="radio"
          class="optionBox"
          v-model="category"
          name="category"
          id="lunch"
        />
        <label for="lunch">Lunch</label>
      </div>

      <div class="optionBox">
        <input
          type="radio"
          class="optionBox"
          v-model="category"
          name="category"
          id="dinner"
        />
        <label for="dinner">Middag</label>
      </div>

      <div class="optionBox">
        <input
          type="radio"
          class="optionBox"
          v-model="category"
          name="category"
          id="snack"
        />
        <label for="snack">Mellanmål</label>
      </div>

      <div class="optionBox">
        <input
          type="radio"
          class="optionBox"
          v-model="category"
          name="category"
          id="other"
        />
        <label for="other">Övrigt</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: null,
    };
  },
};
</script>

<style scoped>
.optionBox {
  display: block;
  margin-bottom: 10px;
}

.optionBox label {
  display: block;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
  font-size: 1em;
  font-weight: bold;
  background-color: #a9bdec;
  color: #2a427e;
}

.optionBox input {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

.optionBox input:checked + label {
  background-color: #6591fc;
}
</style>