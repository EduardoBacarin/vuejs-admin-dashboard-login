<script setup>
import { mdiTableBorder, mdiGithub } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableCompanies from "@/components/Companies/TableCompanies.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
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
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableCompanies checkable :page="page" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
