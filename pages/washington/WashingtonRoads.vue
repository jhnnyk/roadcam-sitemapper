<template>
  <div>
    <h2>Washington Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Washington Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData from './waroads.json';

export default {
  name: 'WashingtonRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.Title;
      cam.slug = slugify(el.Title, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.latitude = el.CameraLocation.Latitude.toString();
      cam.longitude = el.CameraLocation.Longitude.toString();
      cam.route = el.CameraLocation.RoadName;
      cam.routeSlug = slugify(el.CameraLocation.RoadName, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      if (el.CameraLocation.MilePost) {
        cam.milepoint = el.CameraLocation.MilePost.toString();
      }
      cam.imageURL = el.ImageURL;
      cam.description = `${el.CameraLocation.RoadName} @ mile ${el.CameraLocation.MilePost}`;

      cam.sitemapItem = `<url><loc>https://road.camera/washington/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/washington/roads/${cam.routeSlug}</loc></url>`,
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
