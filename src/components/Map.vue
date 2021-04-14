<template>
  <div align="center">
    <!-- <h1>
      Your coordinates:
    </h1>

    <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>

    <h1>
      Map coordinates:
    </h1>

    <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude</p> -->

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="5" align-self="center"> </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-autocomplete
              v-model="searchInput"
              :items="locations"
              label="Search Location"
              style="display: inline"
              color="black"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4" align="left">
            <v-btn x-small dark @click="handleSearch(searchInput)"
              >Search</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <gmap-map
      :center="myCoordinates"
      :zoom="Number(zoom)"
      style="width:85%; height:360px"
      ref="mapRef"
      @dragend="handleDrag"
    >
      <gmap-info-window
        :options="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpened"
        @closeclick="handleInfoWindowClose"
      >
        <div class="info-window">
          <h3 class="window-heading">{{ activeDigDay.name }}</h3>

          <div class="window-p">
            <v-icon class="material-icons-outlined">event</v-icon>
            <p class="icon-text">{{ activeDigDay.date }}</p>
            <br />
          </div>
          <div class="window-p">
            <v-icon class="material-icons-outlined">location_on </v-icon>
            <p class="icon-text">{{ activeDigDay.location }}</p>
            <br />
          </div>

          <div class="window-p">
            <v-icon class="material-icons-outlined">info </v-icon>
            <p class="space icon-text">{{ activeDigDay.infoPage }}</p>
          </div>
        </div>
      </gmap-info-window>
      <gmap-marker
        v-for="digDay in digDays"
        :key="digDay.id"
        :position="getPosition(digDay)"
        :clickable="true"
        :draggable="false"
        :icon="{ url: require('@/assets/figma_images/custom_pin.png') }"
        @click="handleMarkerClicked(digDay)"
      >
      </gmap-marker>
    </gmap-map>

    <!-- <div>
      <p>{{ digDays }}</p>
    </div> -->

    <v-row justify="center" align-content="center" class="findMoreGroupRow">
      <v-col cols="12" md="4" align-self="center">
        <v-card class="text-center" color="transparent" elevation="0">
          <v-btn color="#C0A049" dark to="/form">Add new Dig Day</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="divider"></v-divider>

    <h2>Upcomming Dig Days</h2>

    <v-row class="cardsRow">
      <Cards
        v-for="digDay in slicedDigDays"
        :key="digDay.id"
        :digDay="digDay"
        class="card"
      />
    </v-row>
    <v-row justify="center">
      <v-pagination
        v-model="page"
        :length="Math.ceil(digDays.length / 3)"
        circle
        color="black"
        prev-icon="chevron_left"
        next-icon="chevron_right"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Cards from "@/components/Cards";
export default {
  components: { Cards },
  data() {
    return {
      isForm: false,
      page: 1,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },

      zoom: 10,

      map: null,
      searchInput: null,

      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      activeDigDay: {
        coordinates: {
          coordinates: {
            lat: 0,
            lng: 0,
          },
        },
      },
      infoWindowOpened: false,
    };
  },

  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0,
        };
      }

      return {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(4),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(4),
      };
    },

    digDays() {
      let digDays = this.$store.getters.getDigDays;
      return digDays;
    },

    slicedDigDays() {
      return this.digDays.slice((this.page - 1) * 3, this.page * 3);
    },

    infoWindowPosition() {
      return {
        lat: parseFloat(this.activeDigDay.coordinates.coordinates.lat),
        lng: parseFloat(this.activeDigDay.coordinates.coordinates.lng),
      };
    },

    locations() {
      let locations_array = [];
      let locations = this.$store.getters.getLocations;
      locations.map((location) =>
        locations_array.push({
          text: location.location_name,
          value: location.coordinates,
        })
      );

      return locations_array;
    },
  },

  methods: {
    handleDrag() {
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
      };

      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },

    getPosition(digDay) {
      return {
        lat: parseFloat(digDay.coordinates.coordinates.lat),
        lng: parseFloat(digDay.coordinates.coordinates.lng),
      };
    },

    handleMarkerClicked(digDay) {
      this.activeDigDay = digDay;
      this.infoWindowOpened = true;
    },

    handleInfoWindowClose() {
      this.activeDigDay = {
        coordinates: {
          coordinates: {
            lat: 0,
            lng: 0,
          },
        },
      };
      this.infoWindowOpened = false;
    },

    handleSearch(location) {
      let numberLat = parseFloat(location.lat);
      let numberLng = parseFloat(location.lng);

      this.myCoordinates.lat = numberLat;
      this.myCoordinates.lng = numberLng;
    },
  },

  created() {
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates;
        })
        .catch((error) => alert(error));
    }

    if (localStorage.zoom) {
      this.zoom = localStorage.zoom;
    }

    this.$store.dispatch("getDigDays");
    this.$store.dispatch("getLocations");
  },

  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
};
</script>

<style scoped>
.findMoreGroupRow {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.findMoreGroupText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: -0.015em;
  text-align: center;
  color: white;
}

.findMoreGroupHeading {
  font-size: 56px;
}

.findMoreGroupSubHeading {
  font-size: 24px;
}

.searchButton {
  display: inline;
}

.cardsRow {
  width: 85%;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.divider {
  width: 70%;
  margin-bottom: 2rem;
}

.card {
  margin-left: 3rem;
  border-radius: 40px;
}

.icon-text {
  margin-bottom: 5px;
  display: inline;
}

.info-window {
  text-align: left;
  height: 130px;
}

.window-p {
  margin-bottom: 10px;
}

.window-heading {
  margin-bottom: 1rem;
}
</style>
