<template>
  <div>
    <h2>Colorado Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Colorado Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import rawData from './coloradoroads.json';

export default {
  name: 'ColoradoRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.name;
      cam.slug = el.slug;
      cam.latitude = el.latitude;
      cam.longitude = el.longitude;
      cam.route = el.route;
      cam.routeSlug = el.routeSlug;
      cam.milepoint = el.milepoint;
      cam.imageURL = el.imageUrl;
      cam.description = el.description;

      cam.credit = 'COtrip';
      cam.creditLink = 'https://www.cotrip.org/home.htm';

      cam.sitemapItem = `<url><loc>https://road.camera/colorado/roads/${cam.routeSlug}/${cam.slug}</loc><lastmod>2021-02-23</lastmod></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/colorado/roads/${cam.routeSlug}</loc><lastmod>2021-02-23</lastmod></url>`,
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
