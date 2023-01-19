<template>

  <div class="container">

    <div class="row m-4 text-center">
      <h1>fuzzy-guacamole</h1>
    </div>

    <div class="row m-2">
      <div class="col-2 text-start">User</div>
      <div class="col-10">
        <ListComponent :options="users" @on-change="loadUserIdData($event)" />
      </div>
    </div>

    <div class="row m-2">
      <div class="col-2 text-start">Notifications</div>
      <div class="col-10">
        <ListComponent :options="userNotifications" @on-change="message.notification_id = $event" />
      </div>
    </div>

    <div class="row m-2">
      <div class="col-2 text-start">Subscriptions</div>
      <div class="col-10">
        <ListComponent :options="userSubscriptions" @on-change="message.subscription_id = $event" />
      </div>
    </div>

    <div class="row m-2">
      <textarea v-model="message.text" class="form-control" placeholder="Leave a message here" id="floatingTextarea"
        @change="message.text = $event.target.value"></textarea>
    </div>

    <div class="row m-4">
      <button class="btn btn-primary" @click="sendMessage">Send Message</button>
    </div>

    <div class="row m-6">
      <div class="col-12">
        <LogComponent :messages="messages" />
      </div>
    </div>

  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import ListComponent from "@/components/ListComponent.vue";
import LogComponent from "../components/LogComponent.vue";
import axios from "axios";

export default {
  name: "MainPage",
  components: { ListComponent, LogComponent },
  setup() {
    const users = ref([]);
    const messages = ref([]);
    const userNotifications = ref([]);
    const userSubscriptions = ref([]);
    const message = reactive({
      user_id: null,
      notification_id: null,
      subscription_id: null,
      text: null
    });

    const fetchUsersData = async () => {
      try {
        const { data } = await axios.get('users');
        users.value = data;
        loadUserIdData(users.value[0].id);
        fetchUserMessages(users.value[0].id);
      }

      catch (error) {
        console.log(error);
      }
    };

    const fetchUserMessages = async (id) => {
      try {
        const { data } = await axios.get(`user/${id}/messages`);
        messages.value = data;
      }

      catch (error) {
        console.log(error);
      }
    };

    onMounted(fetchUsersData);

    const loadUserIdData = (id) => {
      const user = getUser(id);
      message.user_id = user.id;
      setUserNotifications(user);
      setUserSubscriptions(user);
      fetchUserMessages(user.id);
    };

    const getUser = (id) => {
      return (users.value.filter((user) => user.id == id))[0];
    }

    const setUserNotifications = (user) => {
      message.notification_id = user.notifications[0].id;
      userNotifications.value = user.notifications;
    };

    const setUserSubscriptions = (user) => {
      message.subscription_id = user.subscriptions[0].id;
      userSubscriptions.value = user.subscriptions;
    };

    const sendMessage = async () => {
      try {
        await axios.post('message', message);
        fetchUserMessages(message.user_id);
        message.text = null;
      }

      catch (error) {
        console.log(error);
      }
    };

    return {
      users,
      messages,
      userNotifications,
      userSubscriptions,
      message,
      loadUserIdData,
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