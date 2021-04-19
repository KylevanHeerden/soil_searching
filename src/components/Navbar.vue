<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="2" align-self="center" align="right" class="ml-2">
        <v-img
          src="@/assets/figma_images/specialized_logo.png"
          max-height="180"
          max-width="230"
          class="specializedLogo"
        ></v-img>
      </v-col>
      <v-col cols="12" md="9" class="ml-9" align="center">
        <v-row>
          <v-col cols="12" md="2" align-self="center">
            <h4>
              <a
                href="https://specializedsoilsea.wixsite.com/my-site-1/copy-of-home"
              >
                Fundraisers
              </a>
            </h4>
          </v-col>
          <v-col cols="12" md="2" align-self="center">
            <span class="digdaysSpan"
              ><h4><a href="">Dig Days</a></h4></span
            >
          </v-col>
          <v-col cols="12" md="2" align-self="center" align="center">
            <v-card
              flat
              href="https://specializedsoilsea.wixsite.com/my-site-1"
            >
              <v-img
                src="@/assets/figma_images/SOIL SEARCHING WHITE LOGO 1.png"
                alt=""
                max-height="30%"
                max-width="30%"
              />
            </v-card>
          </v-col>
          <v-col cols="12" md="2" align-self="center">
            <h4>
              <a
                href="https://specializedsoilsea.wixsite.com/my-site-1/trail-tales"
                >Trail Tales</a
              >
            </h4>
          </v-col>
          <v-col cols="12" md="2" align-self="center">
            <h4>
              <a
                href="https://specializedsoilsea.wixsite.com/my-site-1/copy-of-ambassadors"
                >Ambassadors</a
              >
            </h4></v-col
          >
          <v-col cols="12" md="2" align-self="center"
            ><h4>
              <a
                href="https://specializedsoilsea.wixsite.com/my-site-1/copy-of-products"
                >Products</a
              >
            </h4></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {};
</script>

<style scoped>
h4 {
  color: black;
}

.digdaysSpan {
  display: inline-block;
  border-bottom: 3px solid black;
  padding-bottom: 2px;
}

a {
  text-decoration: none;
  color: black !important;
}
</style>
