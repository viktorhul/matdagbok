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
  beforeCreate() {
    this.$store.commit("initializeStore");
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

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.boxLink {
  display: inline-block;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  background: lightgrey;
  color: rgb(52, 52, 52);
  text-decoration: none;
}

.boxLink-primary {
  background: rgb(192, 235, 190);
  color: rgb(23, 104, 23);
}

.boxLink-secondary {
  background: rgb(168, 187, 250);
  color: rgb(22, 22, 186);
}

.boxLink:hover {
  opacity: 0.8;
}

.boxInfo {
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.5em;
}

.boxInfo + .boxInfo {
  margin-left: 10px;
}

.boxInfo-primary {
  background: rgb(255, 226, 168);
  border: 1px solid rgb(193, 141, 86);
  color: rgb(114, 74, 31);
}

.standardInput {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1em;
}

.standardInput + .standardInput {
  margin-top: 10px;
}

.standardButton {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 1em;
  border-radius: 10px;
  border: 1px solid rgb(21, 71, 20);
  background-color: rgb(92, 197, 99);
  color: rgb(21, 71, 20);
}

.vertical-margin {
  margin: 10px 0;
}
</style>