<template>
  <div>
    <h2>Ohio Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Ohio Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData from './alabamaroads.json';

export default {
  name: 'AlabamaRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.cameras.forEach((el) => {
      const cam = {};

      cam.name = `${el.primaryRoad} at ${el.crossStreet}`;
      cam.slug = slugify(`${el.primaryRoad} at ${el.crossStreet}-${el.id}`, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.latitude = el.latitude.toString();
      cam.longitude = el.longitude.toString();
      cam.route = el.primaryRoad;
      cam.routeSlug = slugify(el.primaryRoad, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.imageURL = el.imageUrl;
      cam.description = `${el.primaryRoad} @ mile ${Math.round(el.mileMarker)}`;

      cam.credit = 'ALGO Traffic';
      cam.creditLink = 'https://algotraffic.com';

      cam.sitemapItem = `<url><loc>https://road.camera/alabama/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

      this.allCams.push(cam);
    });
  },

  computed: {
    routes: function() {
      const routes = [];

      this.allCams.forEach((cam) => {
        const routeIndex = routes.findIndex((route) => {
          return route.slug === cam.routeSlug;
        });

        if (routeIndex === -1) {
          routes.push({
            slug: cam.routeSlug,
            name: cam.route,
            sitemapItem: `<url><loc>https://road.camera/alabama/roads/${cam.routeSlug}</loc></url>`,
          });
        }
      });

      return routes.sort((a, b) => {
        if (a.slug > b.slug) return 1;
        if (a.slug < b.slug) return -1;
        return 0;
      });
    },
  },
};
</script>
