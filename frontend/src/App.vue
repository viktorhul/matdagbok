<template>
  <div>
    <PageHeader />
    <div class="router-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";

export default {
  components: {
    PageHeader,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.router-view {
  padding: 10px;
}

.boxLink {
  display: inline-block;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  background: rgb(192, 235, 190);
  color: green;
  text-decoration: none;
}

.boxLink:hover {
  opacity: 0.8;
}
</style>