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
      </tr>
    </thead>
    <tbody>
      <tr v-for="message in messages">
        <th scope="row">{{ message.id }}</th>
        <td>{{ message.user.name }}</td>
        <td>{{ message.subscription.name }}</td>
        <td>{{ message.notification.name }}</td>
        <td>{{ message.text }}</td>
        <td>{{ message.created_at }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ListComponent",
  props: { messages: { type: Array, required: true } },
}
</script>