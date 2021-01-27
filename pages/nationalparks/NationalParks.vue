<template>
  <div>
    <h2>National Parks Sitemap ({{ parkList.length }})</h2>
    <div v-for="park in parkList" :key="park.index">
      {{ park.sitemapItem }}
    </div>

    <hr />
    <h2>National Parks Cams Sitemap ({{ allCams.length }})</h2>
    <div v-for="cam in allCams" :key="cam.index">
      <div v-if="cam.images[0]">
        <!-- filter out cams that don't really have a cam and are just a direct link back to the NPS.gov site -->
        {{ cam.sitemapItem }}
      </div>
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import data from './nationalparks.json';

export default {
  name: 'NationalParks',

  data() {
    return {
      allCams: [],
    };
  },

  async created() {
    await data.data.forEach((cam) => {
      cam.slug = slugify(cam.title, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.parkSlug = slugify(cam.relatedParks[0].fullName, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.sitemapItem = `<url><loc>https://road.camera/nationalparks/${cam.parkSlug}/${cam.slug}</loc></url>`;

      this.allCams.push(cam);
    });
  },

  computed: {
    parkList: function() {
      const parkList = [];

      this.allCams.forEach((cam) => {
        const parkIndex = parkList.findIndex((park) => {
          return park.slug === cam.parkSlug;
        });

        if (parkIndex === -1) {
          parkList.push({
            slug: cam.parkSlug,
            name: cam.relatedParks[0].fullName,
            sitemapItem: `<url><loc>https://road.camera/nationalparks/${cam.parkSlug}</loc></url>`,
          });
        }
      });

      return parkList.sort((a, b) => {
        if (a.slug > b.slug) return 1;
        if (a.slug < b.slug) return -1;
        return 0;
      });
    },
  },
};
</script>
