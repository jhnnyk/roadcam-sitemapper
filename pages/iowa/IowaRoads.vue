<template>
  <div>
    <h2>Iowa Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Iowa Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData from './iowaroads.json';

export default {
  name: 'IowaRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.ImageName;
      cam.slug = slugify(el.ImageName, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.latitude = el.X.toString();
      cam.longitude = el.Y.toString();

      cam.imageURL = el.ImageURL;
      cam.description = el.Desc_ || el.REGION;

      cam.route = el.Route;
      cam.routeSlug = slugify(el.Route, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.sitemapItem = `<url><loc>https://road.camera/iowa/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/iowa/roads/${cam.routeSlug}</loc></url>`,
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
