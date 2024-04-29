<template>
  <div
    class="chart-card flex flex-col flex-auto bg-card shadow rounded-2xl overflow-hidden p-6 lg:w-[38rem] md:w-[25rem] sm:w-80"
  >
    <div class="flex flex-col flex-auto h-44">
      <ChartComponent
        :block="block"
        :bg1="bg1"
        :bg2="bg2"
        :value1="value1"
        :value2="value2"
      />
    </div>
    <div class="mt-8">
      <div class="-my-3 divide-y">
        <div class="grid grid-cols-3 py-3 ng-star-inserted">
          <div class="flex items-center">
            <div
              class="flex-0 w-2 h-2 rounded-full"
              :style="`background-color: ${bg1}`"
            ></div>
            <div class="ml-3 truncate">Completed</div>
          </div>
          <div class="font-medium text-right" v-text="value1"></div>
          <div
            class="text-right text-secondary"
            v-text="
              `${
                (Number(value1) / (Number(value1) + Number(value2))).toFixed(
                  2
                ) * 100
              }%`
            "
          ></div>
        </div>
        <div class="grid grid-cols-3 py-3 ng-star-inserted">
          <div class="flex items-center">
            <div
              class="flex-0 w-2 h-2 rounded-full"
              :style="`background-color: ${bg2}`"
            ></div>
            <div class="ml-3 truncate">Not Completed</div>
          </div>
          <div class="font-medium text-right" v-text="value2"></div>
          <div
            class="text-right text-secondary"
            v-text="
              `${
                (Number(value2) / (Number(value1) + Number(value2))).toFixed(
                  2
                ) * 100
              }%`
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["block", "bg1", "bg2", "value1", "value2"]);
import ChartComponent from "@/components/ChartComponent.vue";
</script>
