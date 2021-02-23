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
import slugify from 'slugify';
import rawData from './coloradoroads-original.json';

export default {
  name: 'ColoradoRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    rawData.Cameras.forEach((el) => {
      const cam = {};

      cam.name = el.Name;
      cam.slug = slugify(el.Name, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.latitude = el.Location.Latitude;
      cam.longitude = el.Location.Longitude;

      if (el.CameraView[0]) {
        cam.imageURL = `https://www.cotrip.org/${el.CameraView[0].ImageLocation}`;
        cam.description = el.CameraView[0].ViewDescription;
      } else if (
        el.CameraView.ImageLocation.indexOf('http://') === 0 ||
        el.CameraView.ImageLocation.indexOf('https://') === 0
      ) {
        cam.imageURL = el.CameraView.ImageLocation;
        cam.description = el.CameraView.ViewDescription;
      } else {
        cam.imageURL = `https://www.cotrip.org/${el.CameraView.ImageLocation}`;
        cam.description = el.CameraView.ViewDescription;
      }

      if (el.CameraView[0]) {
        cam.route = el.CameraView[0].RoadName;
        cam.routeSlug = slugify(el.CameraView[0].RoadName, {
          remove: /[*+~.()'"!/#:@]/g,
          lower: true,
        });
        cam.milepoint = el.CameraView[0].MileMarker;
      } else {
        cam.route = el.CameraView.RoadName;
        cam.routeSlug = slugify(el.CameraView.RoadName, {
          remove: /[*+~.()'"!/#:@]/g,
          lower: true,
        });
        cam.milepoint = el.CameraView.MileMarker;
      }

      cam.sitemapItem = `<url><loc>https://road.camera/colorado/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/colorado/roads/${cam.routeSlug}</loc></url>`,
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
