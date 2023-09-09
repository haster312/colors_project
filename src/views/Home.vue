<template>
  <b-container fluid class="pb-3">
    <section class="find-my-look">
      <h2 class="section-title">Find my looks</h2>
      <div class="find-my-look__container">
        <router-link :to="{ name: 'ArtBoard' }">
          <div class="make-up-advisor">
            <img src="../assets/images/woman.png" alt="" />
            <p>Make Up <br />Advisor</p>
          </div>
        </router-link>
        <router-link :to="{ name: 'TryOn' }">
          <div class="cosmetic-try-on">
            <img src="../assets/images/cosmetics.png" alt="" />
            <p>Cosmetics <br />Try-on</p>
          </div>
        </router-link>
      </div>
    </section>
    <section class="user-photo">
      <h2 class="section-title">User photos</h2>
      <div class="user-photo__container">
        <div ref="swiper" class="swiper">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div
              class="swiper-slide"
              v-for="(item, index) in userPhotos"
              v-bind:key="index"
            >
              <UserPhotoItem :item="item" />
            </div>
          </div>
          <!-- If we need scrollbar -->
          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </section>
    <section class="trending">
      <h2 class="section-title">Trending</h2>
      <div class="trending__container">
        <div ref="swiper-2" class="swiper">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div
              class="swiper-slide"
              v-for="(item, index) in userPhotos"
              v-bind:key="index"
            >
              <UserPhotoItem :item="item" />
            </div>
          </div>
          <!-- If we need scrollbar -->
          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </section>
  </b-container>
</template>

<script>
import Swiper, { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import UserPhotoItem from "../components/Home/UserPhotoItem";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { UserPhotoItem },
  data() {
    return {
      activeIndex: 0,
      images: null,
      userPhotos: [],
    };
  },
  computed: {
    ...mapGetters({
      info: "User/info",
    }),
  },
  beforeMount() {
    for (let i = 1; i <= 3; i++) {
      this.images = require.context("@/assets/images", false, /\.png$/);
      this.userPhotos.push({
        photo: this.images("./home_" + i + ".png"),
        title: "My perfect look",
        content:
          "Just inputted my event details and  the app showed me exactly how to...",
        rating: 5,
        rate_user: 2109,
      });
    }
  },
  mounted() {
    const SECOND = 1000; // milliseconds
    new Swiper(this.$refs.swiper, {
      modules: [Autoplay],
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3 * SECOND,
        disableOnInteraction: false,
      },
      speed: 2 * SECOND,
    });

    new Swiper(this.$refs["swiper-2"], {
      modules: [Autoplay],
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3 * SECOND,
        disableOnInteraction: false,
      },
      speed: 2 * SECOND,
    });
  },
};
</script>

<style scoped lang="scss">
.find-my-look {
  &__container {
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 25px;
    div {
      border-radius: 25px;
      padding: 10px;

      img {
        width: 50px;
      }

      p {
        margin-bottom: 0;
        margin-top: 15px;
        color: white;
      }
    }
    .make-up-advisor {
      background-color: #fcc589;
      -webkit-box-shadow: 3px 3px 5px 2px rgba(252, 197, 137, 0.4);
      box-shadow: 3px 3px 5px 2px rgba(252, 197, 137, 0.4);
    }
    .cosmetic-try-on {
      background-color: $primary-color;
      -webkit-box-shadow: 3px 3px 5px 2px rgba(243, 177, 177, 0.4);
      box-shadow: 3px 3px 5px 2px rgba(243, 177, 177, 0.4);
    }
  }
}
.user-photo {
  overflow: auto;
  &__container {
    margin-bottom: 25px;
    overflow-x: hidden;
  }
}

.trending {
  overflow: auto;
  &__container {
    margin-bottom: 25px;
    overflow-x: hidden;
  }
}
</style>
