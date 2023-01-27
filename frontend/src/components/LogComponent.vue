<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">User</th>
        <th scope="col">Category</th>
        <th scope="col">Channel</th>
        <th scope="col">Message</th>
        <th scope="col">Created At</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="log in logs">
        <th scope="row">{{ log.id }}</th>
        <td>{{ log.user.name }}</td>
        <td>{{ log.subscription.name }}</td>
        <td>{{ log.notification.name }}</td>
        <td>{{ log.text }}</td>
        <td>{{ log.created_at }}</td>
        <td :class="[log.status ? 'sent' : 'failed']">{{ log.status ? "sent" : "failed" }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ListComponent",
  props: { logs: { type: Array, required: true } },
}
</script>

<style scoped>
.sent {
  color: green;
}

.failed {
  color: red;
}
</style>