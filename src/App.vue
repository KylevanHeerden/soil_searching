<template>
  <v-app>
    <Navbar v-if="$route.path != '/form'" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Navbar, Footer },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css?family=DIN+Pro&display=swap"); */
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
/* @import url("https://fonts.googleapis.com/css?family=DIN+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css?family=DIN+Alternate&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap"); */
</style>
