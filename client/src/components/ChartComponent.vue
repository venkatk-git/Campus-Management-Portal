<template>
  <div class="w-full flex flex-col items-center">
    <h3 v-text="block" class="self-start"></h3>
    <div class="w-40 h-40">
      <canvas :id="block"></canvas>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["block", "bg1", "bg2", "value1", "value2"]);
import Chart from "chart.js/auto";
import { onMounted } from "vue";
const data = {
  labels: ["Completed", "Not Completed"],
  datasets: [
    {
      data: [props.value1, props.value2],
      backgroundColor: [props.bg1, props.bg2],
      hoverOffset: 4,
    },
  ],
};

onMounted(() => {
  new Chart(props.block, {
    type: "doughnut",
    data: data,
    options: {
      cutout: 45,
      radius: 65,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});
</script>
