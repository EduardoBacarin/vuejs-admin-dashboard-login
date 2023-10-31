<script setup>
import { mdiPlus, mdiGithub, mdiOfficeBuilding } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableCompanies from "@/components/Companies/TableCompanies.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/router";

</script>
<script>
export default {
  props: {
    page: {
      type: String,
      default: "1",
    },
  },
  data() {
    return {};
  },
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiOfficeBuilding" title="Empresas" main>
        <BaseButton
          :icon="mdiPlus"
          label="Cadastrar nova empresa"
          color="contrast"
          rounded-full
          small
          @click="router.push('companies/create')"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableCompanies checkable :page="page" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
