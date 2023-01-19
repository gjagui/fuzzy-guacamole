<template>
  <select class="form-select" @change="onChange($event)">
    <option v-for="option in options" :value="option.id" :key="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "ListComponent",
  props: { options: { type: Array, required: true } },
  setup(_, context) {
    const onChange = (event) => context.emit('onChange', event.target.value);

    return {
      onChange
    }
  }
}
</script>

