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
import rawData1 from './ohioroads1.json';
import rawData2 from './ohioroads2.json';

export default {
  name: 'OhioRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    const rawData = [];
    // combine data from both files
    rawData1.ApiResult.Results.Camera.forEach((cam) => {
      rawData.push(cam);
    });
    rawData2.ApiResult.Results.Camera.forEach((cam) => {
      rawData.push(cam);
    });

    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.Location;
      cam.slug = slugify(el.Location, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.latitude = el.Latitude.toString();
      cam.longitude = el.Longitude.toString();

      cam.imageURL = el.CameraViews.CameraView.LargeUrl;
      cam.description = el.Description;

      if (!el.CameraViews.CameraView.MainRoute) {
        console.log(el);
      }
      cam.route = el.CameraViews.CameraView.MainRoute;
      cam.routeSlug = slugify(el.CameraViews.CameraView.MainRoute, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      cam.credit = 'OHGO';
      cam.creditLink = 'https://www.ohgo.com';

      cam.sitemapItem = `<url><loc>https://road.camera/ohio/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/ohio/roads/${cam.routeSlug}</loc></url>`,
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
