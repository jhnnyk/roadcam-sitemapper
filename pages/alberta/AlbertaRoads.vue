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
import rawData from './albertaroads.json';

export default {
  name: 'AlbertaRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.Name;
      cam.slug = slugify(`${el.Name}-${el.Id}`, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.latitude = el.Latitude.toString();
      cam.longitude = el.Longitude.toString();

      cam.imageURL = el.Url;
      cam.description = el.Description;

      cam.route = el.RoadwayName;
      cam.routeSlug = slugify(el.RoadwayName, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.credit = '511 Alberta';
      cam.creditLink = 'https://511.alberta.ca';

      cam.sitemapItem = `<url><loc>https://road.camera/alberta/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/alberta/roads/${cam.routeSlug}</loc></url>`,
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
