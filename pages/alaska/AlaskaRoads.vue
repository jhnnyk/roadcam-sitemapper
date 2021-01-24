<template>
  <div>
    <h2>Alaska Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Alaska Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData from './alaskaroads.json';

export default {
  name: 'AlaskaRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.Name;
      cam.slug = slugify(el.Name + '-' + el.Id, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.latitude = el.Latitude.toString();
      cam.longitude = el.Longitude.toString();
      cam.route = el.RoadwayName;
      cam.routeSlug = slugify(el.RoadwayName, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.imageURL = el.Url;
      cam.description = el.Description;

      cam.sitemapItem = `<url><loc>https://road.camera/alaska/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/alaska/roads/${cam.routeSlug}</loc></url>`,
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

<style></style>
