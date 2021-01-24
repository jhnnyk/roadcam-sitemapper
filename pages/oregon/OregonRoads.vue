<template>
  <div>
    <h2>Oregon Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Oregon Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData from './oregonroads.json';

export default {
  name: 'OregonRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.data.forEach((el) => {
      const cam = {};

      cam.name = el['device-name'];
      cam.slug = slugify(el['device-name'], {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.latitude = el.latitude.toString();
      cam.longitude = el.longitude.toString();
      cam.route = el['route-id'];
      cam.routeSlug = slugify(el['route-id'], {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      if (el.milepoint) {
        cam.milepoint = el.milepoint.toString();
      }
      cam.imageURL = el['cctv-url'];
      cam.description = el['cctv-other'];

      cam.sitemapItem = `<url><loc>https://road.camera/oregon/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/oregon/roads/${cam.routeSlug}</loc></url>`,
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
