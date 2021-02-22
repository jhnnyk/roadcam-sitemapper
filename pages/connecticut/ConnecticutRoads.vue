<template>
  <div>
    <h2>Connecticut Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Connecticut Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData from './connecticutroads.json';

export default {
  name: 'ConnecticutRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.description;
      cam.slug = slugify(el.description, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      // cam.latitude = el.CameraLocation.Latitude.toString();
      // cam.longitude = el.CameraLocation.Longitude.toString();

      cam.route = el.route;
      cam.routeSlug = slugify(el.route, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.milepoint = el.milepost;

      cam.imageURL = `https://cttravelsmart.org${el.imageUrl}`;
      cam.description = `${el.description} near ${el.city}`;

      cam.credit = 'CT Travel Smart';
      cam.creditLink = `https://cttravelsmart.org${el.link}`;

      cam.sitemapItem = `<url><loc>https://road.camera/connecticut/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/connecticut/roads/${cam.routeSlug}</loc></url>`,
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
