<script setup>
import { reactive, onBeforeMount } from "vue";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import NoAuthHttp from "@/services/NoAuthHttp.js";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { useCompanyStore } from '@/stores/company';

const router = useRouter();
const auth = useAuthStore();
const companies = useCompanyStore();
const form = reactive({
  email: "eduardo.obacarin@gmail.com",
  password: "12345678",
  remember: true,
});

async function login() {
  const { data } = await NoAuthHttp.post("auth/login", form);
  if (data.success) {
    auth.setToken(data.data.token);
    auth.setUser(data.data.name);
    auth.setUserData(data.data.userdata);
    auth.setIsAuth(true);
    companies.setCompanies(data.data.companies);
    window.location = window.location.origin + "/dashboard"
  } else {
    console.log("não logou");
  }
}
onBeforeMount(() => {
  if (auth.isAuth) router.push("/dashboard");
});
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="login">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
