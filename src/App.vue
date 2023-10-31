<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
  <notifications
    position="bottom right"
    width="300"
    class="my-10 mx-10"
    :duration="2000"
    :max="10"
    />
</template>
