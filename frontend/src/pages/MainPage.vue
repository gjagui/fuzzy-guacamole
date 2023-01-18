<template>
  <div class="container">

    <div class="row m-4 text-center">
      <h1>fuzzy-guacamole</h1>
    </div>

    <div class="row m-2">
      <div class="col-2 text-start">User</div>
      <div class="col-10">
        <ListComponent :options="values" @on-selected="onSelected($event)" @some-event="callback" />
      </div>
    </div>

    <div class="row m-2">
      <div class="col-2 text-start">Notifications</div>
      <div class="col-10">
        <ListComponent :options="values" />
      </div>
    </div>

    <div class="row m-2">
      <div class="col-2 text-start">Subscriptions</div>
      <div class="col-10">
        <ListComponent :options="values" />
      </div>
    </div>

    <div class="row m-4">
      <button class="btn btn-primary">Send Message</button>
    </div>

    <div class="row m-6">
      <div class="col-12">
        <LogComponent />
      </div>
    </div>

  </div>
</template>

<script>
import ListComponent from "@/components/ListComponent.vue";
import LogComponent from "../components/LogComponent.vue";
import { Button } from "bootstrap";

export default {
  name: "MainPage",
  components: { ListComponent, LogComponent },
  setup() {
    const onSelected = (event) => { console.log(event); console.log(import.meta.env.VITE_BASE_URL) };
    const callback = (event) => { console.log(event) };
    const data = {
      "notifications": [
        {
          "description": "SMS",
          "id": 1,
          "type": "sms"
        },
        {
          "description": "E-Mail",
          "id": 2,
          "type": "email"
        },
        {
          "description": "Push Notification",
          "id": 3,
          "type": "pn"
        }
      ]
    };

    const values = data.notifications.map((notification) => { return { "id": notification.id, "name": notification.description } });

    return {
      values,
      onSelected,
      callback
    }
  }
}
</script>

<style>
div {
  align-items: center;
}
</style>