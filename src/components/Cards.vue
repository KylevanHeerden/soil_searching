<template>
  <v-card outlined>
    <v-img
      src="@/assets/figma_images/ground_burm.png"
      height="150"
      width="320"
      class="image"
    ></v-img>
    <h2>{{ digDay.name }}</h2>

    <p>hosted by</p>
    <h4 class="space">{{ digDay.specializedAffiliate }}</h4>

    <v-icon class="material-icons-outlined">event</v-icon>
    <p class="icon-text">{{ digDay.date }}</p>
    <br />
    <v-icon class="material-icons-outlined">location_on </v-icon>
    <p class="icon-text">{{ digDay.location }}</p>
    <br />

    <v-btn dark x-small class="button" :href="digDay.infoPage" target="_blank"
      >More details</v-btn
    >
  </v-card>
</template>

<script>
export default {
  props: {
    digDay: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.image {
  margin-bottom: 1rem;
}

.button {
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.space {
  margin-bottom: 1rem;
}

.icon-text {
  display: inline-block;
  margin-bottom: 1rem !important;
}
</style>
