<template>
  <div>
    <div class="flex flex-col gap-10 items-center w-full self-start">
      <div class="card flex flex-col gap-10 w-full">
        <h3 class="text-xl max-w-full">Analytics</h3>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 category-card-grid w-full"
        >
          <CategoryTaskCard completed="31" tasks="31" category="Category A" />
          <CategoryTaskCard completed="28" tasks="42" category="Category B" />
          <CategoryTaskCard completed="3" tasks="7" category="Category C" />
          <CategoryTaskCard completed="10" tasks="22" category="Category D" />
          <CategoryTaskCard completed="1" tasks="10" category="Category E" />
          <CategoryTaskCard completed="12" tasks="40" category="Category F" />
          <CategoryTaskCard completed="23" tasks="23" category="Category G" />
          <CategoryTaskCard completed="5" tasks="8" category="Category H" />
        </div>
        <div
          class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-between md:gap-x-10 lg:gap-x-[5rem] gap-y-10 mb-10"
        >
          <ChartCard
            block="Block A"
            bg1="#63b3ed"
            bg2="#3182ce"
            value1="300"
            value2="25"
          />
          <ChartCard
            block="Block B"
            bg1="#4fd1c5"
            bg2="#319795"
            value1="32"
            value2="102"
          />
          <ChartCard
            block="Block C"
            bg1="#dd6b20"
            bg2="#f6ad55"
            value1="456"
            value2="21"
          />
          <ChartCard
            block="Block D"
            bg1="#b794f4"
            bg2="#805ad5"
            value1="564"
            value2="132"
          />
          <ChartCard
            block="Block E"
            bg1="#4fd1c5"
            bg2="#319795"
            value1="654"
            value2="132"
          />
          <ChartCard
            block="Block F"
            bg1="#63b3ed"
            bg2="#3182ce"
            value1="873"
            value2="213"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CategoryTaskCard from "../components/CategoryTaskCard.vue";
import ChartCard from "../components/ChartCard.vue";
import Navbar from "../components/Navbar.vue";
</script>

<style scoped>
@media (min-width: 1640px) {
  .category-card-grid {
    width: 100%;
  }
}
</style>
