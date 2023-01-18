<template>
  <div>
    <h1>MainView</h1>
    <ListComponent />
  </div>
</template>

<script>
import ListComponent from "@/components/ListComponent.vue";

export default {
  name: "MainPage",
  components: { ListComponent }
}
</script>