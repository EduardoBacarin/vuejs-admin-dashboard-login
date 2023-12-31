<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu, mdiCheck} from "@mdi/js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import menuAside from "@/menuAside.js";
import menuNavBar from "@/menuNavBar.js";
import { useMainStore } from "@/stores/main.js";
import { useAuthStore } from "@/stores/auth.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import FormControl from "@/components/FormControl.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";

const layoutAsidePadding = "xl:pl-60";
const auth = useAuthStore();
const styleStore = useStyleStore();

const router = useRouter();

if (auth.isAuth){
  let userData = JSON.parse(localStorage.getItem("userdata"));
  // if (typeof useMainStore().userEmail == 'undefined'){
    useMainStore().setUser({
      name: localStorage.getItem("user"),
      email: userData.email,
      avatar: userData.image != null
        ? userData.image
        : "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93",
    });
  // }
}

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    auth.logout();
  }
};


function loadMenu(){
  if (localStorage.getItem('companies')) {
    menuNavBar[0].menu = [];
    JSON.parse(localStorage.getItem('companies')).forEach(element => {
      menuNavBar[0].menu.push({
        label: element.register_name,
        uuid: element.uuid
      })
    });

    if (localStorage.getItem('company_selected')){
      menuNavBar[0].label = JSON.parse(localStorage.getItem('company_selected')).register_name

      menuNavBar[0].menu.forEach(element => {
        if (element.uuid == JSON.parse(localStorage.getItem('company_selected')).uuid){
          menuNavBar[0].menu[0].icon = mdiCheck;
        }
      });
    }else{
      localStorage.setItem('company_selected', JSON.stringify(JSON.parse(localStorage.getItem('companies'))[0]))
      loadMenu();
    }
  }else{

  }
}
loadMenu();
</script>

<template>
  <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin>
          <FormControl
            placeholder="Search (ctrl+k)"
            ctrl-k-focus
            transparent
            borderless
          />
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
      <FooterBar>
        Get more with
        <a
          href="https://tailwind-vue.justboil.me/"
          target="_blank"
          class="text-blue-600"
          >Premium version</a
        >
      </FooterBar>
    </div>
  </div>
</template>
