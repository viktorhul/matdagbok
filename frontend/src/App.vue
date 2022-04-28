<template>
  <ImageBarcodeReader @decode="onDecode" @error="onError"></ImageBarcodeReader>
</template>

<script>
import { ImageBarcodeReader } from "vue-barcode-reader";

export default {
  name: "App",
  components: {
    ImageBarcodeReader,
  },
  created() {
    this.$barcodeScanner.init(this.onBarcodeScanned);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
