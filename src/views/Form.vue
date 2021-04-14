<template>
  <v-container fluid>
    <v-row justify="start" class="crossRow">
      <v-col cols="12" ms="4" md="4"> </v-col>
      <v-col cols="12" ms="4" md="4">
        <v-icon medium @click="cancelForm">close</v-icon>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center" class="containerRow">
      <h1>Dig Days Registration</h1>
    </v-row>

    <v-row justify="center" align-content="center">
      <h5 class="LetUsKnow">
        Let us know if you’re hosting a Dig Day so we can help promote it
      </h5>
    </v-row>

    <v-form>
      <v-container>
        <v-row justify="center" align-content="center">
          <v-col cols="12" sm="4" md="4" align-self="center">
            <h5 class="ButFirst">But first, we need some details:</h5>
            <v-text-field
              v-model="formData.name"
              label="Dig Day Name"
              color="black"
            ></v-text-field>
            <v-select
              v-model="formData.specializedAffiliate"
              :items="specializedAffs"
              label="Specialized Affiliate"
              color="black"
            ></v-select>
            <v-select
              v-model="formData.coordinates"
              :items="locations"
              label="Location"
              color="black"
            ></v-select>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="formData.date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData.date"
                  label="Picker in menu"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  color="black"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData.date"
                no-title
                scrollable
                color="black"
              >
                <v-spacer></v-spacer>
                <v-btn text color="black" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="black"
                  @click="$refs.menu.save(formData.date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-text-field
              v-model="formData.infoPage"
              label="Info Page URL"
              color="black"
            ></v-text-field>
            <v-row justify="end">
              <v-btn small dark class="submit" @click="handleSubmit"
                >Sumbit</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      isForm: true,
      menu: false,
      loading: false,
      formData: {
        name: null,
        specializedAffiliate: null,
        coordinates: null,
        date: new Date().toISOString().substr(0, 10),
        infoPage: null,
      },
    };
  },

  computed: {
    specializedAffs() {
      let specializedAffs_array = [];
      let specializedAffs = this.$store.getters.getSpecializedAff;
      specializedAffs.map((specializedAff) =>
        specializedAffs_array.push({
          text: specializedAff.name,
          value: specializedAff.name,
        })
      );

      return specializedAffs_array;
    },

    locations() {
      let locations_array = [];
      let locations = this.$store.getters.getLocations;
      locations.map((location) =>
        locations_array.push({
          text: location.location_name,
          value: {
            location_name: location.location_name,
            coordinates: location.coordinates,
          },
        })
      );

      return locations_array;
    },
  },

  methods: {
    async handleSubmit() {
      this.loading = true;

      await db.collection("digDays").add(this.formData);

      this.$router.push("/");

      console.log("Done");
    },

    cancelForm() {
      this.$router.push("/");
    },
  },

  created() {
    this.$store.dispatch("getSpecializedAff");
    this.$store.dispatch("getLocations");
  },
};
</script>

<style scoped>
.crossRow {
  margin-top: 1rem;
  margin-right: 5rem;
}

.containerRow {
  margin-top: 2rem;
  /* background-image: url("~@/assets/figma_images/hands.png"); */
}

.LetUsKnow {
  margin-top: 1.5rem;
}

.ButFirst {
  margin-bottom: 1rem;
  margin-top: 3rem;
}

.submit {
  margin-top: 3rem;
  margin-right: 1rem;
}

.v-icon {
  color: black;
}
</style>
