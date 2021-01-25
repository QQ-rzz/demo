<template>
  <div>
    <a-date-picker @change="onChange" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    }
  },
  mounted() {
    // for (var k = 1; k <= 6; k++) {  
    //   for (var j = 1; j <= 6 - k; j++) {
    //     document.write("&nbsp*");
    //   }
    //   document.write(`<div></div>`);
    //   for (var i = 0; i <= k - 1; i++) {
    //     document.write("&nbsp");
    //   }
    // }
  }
};
</script>

<style>
input.ant-calendar-picker-input.ant-input {
  height: 100px !important;
}
</style>
