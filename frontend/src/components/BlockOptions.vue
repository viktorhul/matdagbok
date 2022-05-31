<template>
  <div>
    <div
      class="optionBox"
      v-for="alternative in [
        'Frukost',
        'Lunch',
        'Middag',
        'Mellanmål',
        'Övrigt',
      ]"
      :key="alternative"
    >
      <input
        type="radio"
        name="category"
        :value="alternative"
        :id="alternative"
        @click="$emit('changeAlternative', alternative)"
      />
      <label :for="alternative">{{ alternative }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alternatives: Array,
    chosenAlternative: String,
  },
  emits: ["changeAlternative"],
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
  padding: 15px 10px;
  font-size: 1em;
  background-color: #d7d7d7;
  color: #343434;
}

.optionBox input {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

.optionBox input:checked + label {
  background-color: #6591fc;
  color: #141e37;
}
</style>