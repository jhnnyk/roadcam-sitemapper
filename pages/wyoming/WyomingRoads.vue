<template>
  <div>
    <h2>Wyoming Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Wyoming Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import data from './wyomingroads.json';

export default {
  name: 'WyomingRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    data.forEach((el) => {
      const cam = {};

      cam.name = el.name;
      cam.slug = slugify(el.name, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      // cam.latitude = el.latitude.toString();
      // cam.longitude = el.longitude.toString();

      cam.route = el.route;
      cam.routeSlug = slugify(el.route, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.milepoint = el.milepost;
      cam.imageURL = el.imageUrl;
      cam.description = `${el.description} near ${el.nearestTown}`;

      cam.credit = 'WYDOT';
      cam.creditLink = 'https://www.wyoroad.info';

      cam.sitemapItem = `<url><loc>https://road.camera/wyoming/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/wyoming/roads/${cam.routeSlug}</loc></url>`,
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
