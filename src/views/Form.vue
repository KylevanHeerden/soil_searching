<template>
  <v-container fluid>
    <v-row justify="start" class="crossRow">
      <v-col cols="12" ms="4" md="4"> </v-col>
      <v-col cols="12" ms="2" md="2">
        <v-icon medium @click="cancelForm">close</v-icon>
      </v-col>
      <v-col cols="12" ms="4" md="4">
        <v-card flat>
          <v-img
            src="@/assets/figma_images/SOIL SEARCHING WHITE LOGO 1.png"
            alt=""
            max-height="15%"
            max-width="15%"
          />
        </v-card>
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
            <v-text-field
              v-model="formData.specializedAffiliate"
              label="Specialized Affiliate"
              color="black"
            ></v-text-field>

            <gmap-autocomplete
              @place_changed="setCoordinates"
              class="gmapAutocomplete"
            ></gmap-autocomplete>

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
      place: null,
    };
  },

  computed: {},

  methods: {
    setCoordinates(place) {
      this.place = place;
      console.log(this.place);
    },

    async handleSubmit() {
      this.loading = true;

      this.formData.coordinates = {
        coordinates: {
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        },
        location_name: this.place.formatted_address,
      };

      await db.collection("digDays").add(this.formData);

      this.$router.push("/");

      console.log("Done");
    },

    cancelForm() {
      this.$router.push("/");
    },
  },

  created() {},

  mouted() {},
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

.gmapAutocomplete {
  margin: 1rem 0rem 1rem 0rem;
  width: 100%;
  border-bottom: 1px solid black;
}
</style>
