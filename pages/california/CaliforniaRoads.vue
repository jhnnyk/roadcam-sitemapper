<template>
  <div>
    <h2>California Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>California Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData1 from './caroads1.json';
import rawData2 from './caroads2.json';
import rawData3 from './caroads3.json';
import rawData4 from './caroads4.json';
import rawData5 from './caroads5.json';
import rawData6 from './caroads6.json';
import rawData7 from './caroads7.json';
import rawData8 from './caroads8.json';
import rawData9 from './caroads9.json';
import rawData10 from './caroads10.json';
import rawData11 from './caroads11.json';
import rawData12 from './caroads12.json';

export default {
  name: 'CaliforniaRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    const rawData = [];
    // combine data from all files
    rawData1.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData2.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData3.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData4.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData5.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData6.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData7.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData8.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData9.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData10.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData11.data.forEach((cam) => {
      rawData.push(cam);
    });
    rawData12.data.forEach((cam) => {
      rawData.push(cam);
    });

    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.cctv.location.locationName;
      cam.slug = slugify(el.cctv.location.locationName, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      cam.latitude = el.cctv.location.latitude;
      cam.longitude = el.cctv.location.longitude;
      cam.route = el.cctv.location.route;
      cam.routeSlug = slugify(el.cctv.location.route, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });
      if (el.cctv.location.milepost) {
        cam.milepoint = el.cctv.location.milepost;
      }
      cam.imageURL = el.cctv.imageData.static.currentImageURL;
      cam.description = `${el.cctv.location.county} county near ${el.cctv.location.nearbyPlace}`;

      cam.sitemapItem = `<url><loc>https://road.camera/california/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/california/roads/${cam.routeSlug}</loc></url>`,
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
