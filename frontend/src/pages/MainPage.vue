<template>

  <div class="container">

    <div class="row m-4 text-center">
      <h1>fuzzy-guacamole</h1>
    </div>

    <div class="row m-2">
      <div class="col-4 text-start">Category Subscriptions</div>
      <div class="col-8">
        <ListComponent :options="subscriptions" @on-change="message.subscription_id = $event" />
      </div>
    </div>

    <div class="row">
      <textarea v-model="message.text" placeholder="Leave a message here"></textarea>
    </div>

    <div class="row m-4">
      <button class="btn btn-primary" @click="sendMessage">Send Message</button>
    </div>

    <div class="row m-6">
      <div class="col-12">
        <LogComponent :logs="logs" />
      </div>
    </div>

  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ListComponent from "@/components/ListComponent.vue";
import LogComponent from "../components/LogComponent.vue";
import axios from "axios";

export default {
  name: "MainPage",
  components: { ListComponent, LogComponent },
  setup() {
    const logs = ref([]);
    const subscriptions = ref([]);
    const message = reactive({
      subscription_id: null,
      text: null
    });

    const fetchLogs = async () => {
      try {
        const { data } = await axios.get("logs");
        logs.value = data.map((log) => { return { ...log, created_at: log?.created_at.replace("T", " ").replace(".000Z", " ") } });
      }

      catch (error) {
        alert("There was a network error fetching logs messages, please try again in a few minutes...");
        console.log(error);
      }
    };

    const fetchSubscriptions = async () => {
      try {
        const { data } = await axios.get("subscriptions");
        subscriptions.value = data;
      }

      catch (error) {
        alert("There was a network error fetching category subscriptions, please try again in a few minutes...");
        console.log(error);
      }
    };

    const initializeData = async () => {
      try {
        await Promise.all([fetchLogs(), fetchSubscriptions()]);
        message.subscription_id = subscriptions.value[0].id;
      }

      catch (error) {
        console.log(error);
      }
    };

    onMounted(initializeData);

    const sendMessage = async () => {
      try {
        if (!message.text || message.text.trim().length === 0) return alert("The message can't be empty...");

        await axios.post('message', message);
        await fetchLogs();
        message.text = null;
      }

      catch (error) {
        alert("There was a network error sending the message, please try again in a few minutes...");
        console.log(error);
      }
    };

    return {
      subscriptions,
      logs,
      message,
      sendMessage
    }
  }
}
</script>

<style>
div {
  align-items: center;
}
</style>