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
            <h4>Fundraisers</h4>
          </v-col>
          <v-col cols="12" md="2" align-self="center">
            <span class="digdaysSpan"><h4>Dig Days</h4></span>
          </v-col>
          <v-col cols="12" md="2" align-self="center" align="center">
            <v-card flat>
              <v-img
                src="@/assets/figma_images/SOIL SEARCHING WHITE LOGO 1.png"
                alt=""
                max-height="30%"
                max-width="30%"
              />
            </v-card>
          </v-col>
          <v-col cols="12" md="2" align-self="center">
            <h4>Trail Tales</h4>
          </v-col>
          <v-col cols="12" md="2" align-self="center"
            ><h4>Ambassadors</h4></v-col
          >
          <v-col cols="12" md="2" align-self="center"><h4>Products</h4></v-col>
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
</style>
