<template>
  <div>
    <h2>Ontario Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Ontario Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import rawData1 from './ontarioroads1.json';
import rawData2 from './ontarioroads2.json';

export default {
  name: 'OntarioRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    // combine data from all files
    const rawData = [];
    rawData1.forEach((cam) => {
      rawData.push(cam);
    });
    rawData2.forEach((cam) => {
      rawData.push(cam);
    });

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

      cam.source = '511on.ca';
      cam.sourceLink = 'https://511on.ca';

      cam.sitemapItem = `<url><loc>https://road.camera/ontario/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/ontario/roads/${cam.routeSlug}</loc></url>`,
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
