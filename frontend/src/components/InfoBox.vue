<template>
  <div class="infobox">
    <i class="icon" :class="icon"></i>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
  },
};
</script>

<style scoped>
.infobox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon,
.text {
  border: 2px solid #6591fc;
  padding: 5px;
  height: 100%;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6591fc;
  border-radius: 10px 0 0 10px;
  font-size: 0.6em;
  color: white;
}

.text {
  border-radius: 0 10px 10px 0;
  font-size: 0.7em;
  padding: 5px 10px;
}
</style>