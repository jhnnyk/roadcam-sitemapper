<template>
  <div>
    <h2>BC Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>BC Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData from './british-columbiaroads.json';

export default {
  name: 'BCRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      const cam = {};

      cam.name = `${el.camName}-${el.id}`;
      cam.slug = slugify(`${el.camName}-${el.id}`, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.latitude = el.latitude.toString();
      cam.longitude = el.longitude.toString();

      cam.imageURL = el.links_imageDisplay;
      cam.description = el.caption;

      cam.route = `Hwy ${el.highway_number}`;
      cam.routeSlug = slugify(`Hwy ${el.highway_number}`, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.credit = 'DriveBC.ca';
      cam.creditLink = el.links_bchighwaycam;

      cam.sitemapItem = `<url><loc>https://road.camera/british-columbia/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/british-columbia/roads/${cam.routeSlug}</loc></url>`,
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
