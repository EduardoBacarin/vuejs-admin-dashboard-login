<script setup>
import { reactive, ref } from "vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiArrowLeft } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import cnaeJson from "../../../public/data-sources/cnae.json";
import router from "@/router";
import http from "@/services/http"
import { notify } from "@kyvg/vue3-notification";


const typeOptions = [
  { id: "pf", label: "Pessoa Física" },
  { id: "me", label: "Micro Empresa" },
  { id: "mei", label: "Micro Empreendedor Individual" },
  { id: "eireli", label: "Empresa Individual de Responsabilidade Limitada" },
  { id: "ei", label: "Empresa Individual" },
  { id: "slu", label: "Sociedade Limitada Unipessoal" },
  { id: "ss", label: "Sociedade Simples" },
  { id: "sa", label: "Sociedade Anônima" },
  { id: "ltda", label: "Sociedade Limitada" },
];


const cnaeOptions = cnaeJson;


const form = reactive({
  register_name: "",
  fantasy_name: "",
  type: typeOptions[0].id,
  occupation_area: cnaeOptions[0].id,
});

const submit = () => {
  http.post('companies/store', form).then(res => {
    if (res.status == 201){
      notify({
        type: "success",
        title: "Sucesso",
        text: "Empresa cadastrada com sucesso!",
      });
      router.push("/companies");
    }else{
      notify({
        type: "error",
        title: "Erro",
        text: res.data.message,
      });
    }
  }).catch(error => {
    console.log(error);
  })
};

const clearInputs = () => {
  form.register_name = "";
  form.fantasy_name = "";
  form.type = typeOptions[0];
  form.occupation_area = cnaeOptions[0];
}

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Cadastrar Empresa" main>
        <BaseButton
          :icon="mdiArrowLeft"
          label="Voltar"
          color="contrast"
          rounded-full
          small
          @click="router.back"
        />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <FormField>
          <FormField label="Tipo de Empresa" required>
            <FormControl v-model="form.type" :options="typeOptions" :icon="mdiMail" required/>
          </FormField>

          <FormField label="Razão Social" required>
            <FormControl v-model="form.register_name" :icon="mdiAccount" placeholder="Razão Social" required/>
          </FormField>

        </FormField>
        <FormField label="">
          <FormField label="Nome Fantasia" required>
            <FormControl v-model="form.fantasy_name" :icon="mdiMail" placeholder="Nome Fantasia" required/>
          </FormField>
          <FormField label="Apelido">
            <FormControl v-model="form.nickname" :icon="mdiMail" placeholder="Apelido" />
          </FormField>
          <FormField label="Documento" required>
            <FormControl v-model="form.document" :icon="mdiAccount" placeholder="CPF ou CNPJ" required/>
          </FormField>
        </FormField>
        <FormField>
          <FormField label="Data de Fundação">
            <FormControl v-model="form.foundation_date" type="date" :icon="mdiMail" required/>
          </FormField>
          <FormField label="Área de Ocupação / CNAE" required>
            <FormControl v-model="form.occupation_area" :options="cnaeOptions" :icon="mdiMail" required/>
          </FormField>
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Cadastrar" @click="submit()"/>
            <BaseButton type="reset" color="info" outline label="Limpar" @click="clearInputs()"/>
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
