<script setup>
import { computed, ref, onMounted } from "vue";
import { mdiEye, mdiPencil, mdiTrashCan } from "@mdi/js";

import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import http from "@/services/http";
import CardBoxComponentEmpty from "../CardBoxComponentEmpty.vue";
import router from "@/router";

const props = defineProps({
  checkable: Boolean,
  page: {
    type: String,
    default: "1",
  },
});

const items = ref([]);
const processing = ref(true);

const DataModal = ref({ active: false, data: null });
const DeleteModal = ref({ active: false, data: null });
const currentPage = ref(0);
const checkedRows = ref([]);
const currentPageHuman = computed(() => currentPage.value + 1);

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    // eslint-disable-next-line no-undef
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const getData = (page) => {
  router.replace(router.currentRoute.value.path + "?page=" + page);
  http
    .get("companies/paginated?page=" + page)
    .then((res) => {
      items.value = res.data.data;
      processing.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteCompany = (uuid) => {
  console.log(uuid);
};

onMounted(() => {
  getData(props.page);
});
</script>

<template>
  <CardBoxModal
    v-model="DataModal.active"
    :title="DataModal.data ? DataModal.data.register_name : ''"
  >
    <div>
      <p>
        Tipo de Empresa:
        <b>{{ DataModal.data ? companyType(DataModal.data.type) : null }}</b>
      </p>
      <p>
        Nome de Registro:
        <b>{{ DataModal.data ? DataModal.data.register_name : null }}</b>
      </p>
      <p>
        Nome Fantasia:
        <b>{{ DataModal.data ? DataModal.data.fantasy_name : null }}</b>
      </p>
      <p>
        Documento (CNPJ/CPF):
        <b>{{
          DataModal.data ? documentMask(DataModal.data.document) : null
        }}</b>
      </p>
      <p>
        Código da Empresa:
        <b>{{ DataModal.data ? DataModal.data.company_code : null }}</b>
      </p>
    </div>
  </CardBoxModal>

  <CardBoxModal
    v-model="DeleteModal.active"
    title="Deseja Excluir esta empresa?"
    button="danger"
    has-cancel
    @click="deleteCompany(DeleteModal.data.uuid)"
  >
    <p>
      Você deseja excluir a empresa
      <b>{{ DeleteModal.data ? DeleteModal.data.register_name : null }} ?</b>
    </p>
    <p>
      Você não poderá mais acessar os dados dela e todos os dados serão
      perdidos.
    </p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.register_name }}
    </span>
  </div>
  <template v-if="items">
    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th>Nome</th>
          <th>Nome Fantasia</th>
          <th>Apelido</th>
          <th>Documento</th>
          <th>Código da Empresa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in items.data" :key="company.id">
          <TableCheckboxCell
            v-if="checkable"
            @checked="checked($event, company)"
          />
          <td data-label="Nome">
            {{ company.register_name }}
          </td>
          <td data-label="Nome Fantasia">
            {{ company.fantasy_name }}
          </td>
          <td data-label="Apelido">
            {{ company.nickname }}
          </td>
          <td data-label="Documento">
            {{ documentMask(company.document) }}
          </td>
          <td data-label="Código da Empresa">
            {{ company.company_code }}
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiEye"
                small
                @click="
                  DataModal.active = true;
                  DataModal.data = company;
                "
              />
              <BaseButton color="warning" :icon="mdiPencil" small />

              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="
                  DeleteModal.active = true;
                  DeleteModal.data = company;
                "
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="index in items.last_page"
            :key="index"
            :active="index === items.current_page ? true : false"
            :label="index"
            :color="index === items.current_page ? 'lightDark' : 'whiteDark'"
            small
            @click="getData(index)"
          />
        </BaseButtons>
        <small>Página {{ currentPageHuman }} de {{ items.total }}</small>
      </BaseLevel>
    </div>
  </template>
  <template v-else>
    <CardBoxComponentEmpty />
    <LoadingSpinner v-if="processing" />
  </template>
</template>
