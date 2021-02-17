<template>
  <div>
    <h2>Minnesota Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Minnesota Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import data from './minnesotaroads.json';

export default {
  name: 'MinnesotaRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    data.forEach((el) => {
      el.views.forEach((v) => {
        const cam = {};

        if (el.views.length > 1) {
          cam.name = `${el.name}-${v.name}`;
          cam.slug = slugify(`${el.name}-${v.name}`, {
            remove: /[*+~.()'"!/#:@]/g,
            lower: true,
          });
        } else {
          cam.name = el.name;
          cam.slug = slugify(`${el.name}-${el.id}`, {
            remove: /[*+~.()'"!/#:@]/g,
            lower: true,
          });
        }

        cam.latitude = el.location.latitude.toString();
        cam.longitude = el.location.longitude.toString();

        cam.imageURL = v.videoPreviewUrl || v.url;
        cam.description = el.location.cityReference;

        // if (!el.location.routeId) {
        //   console.log(el);
        // }
        cam.route = el.location.routeId;
        cam.routeSlug = slugify(el.location.routeId, {
          remove: /[*+~.()'"!/#:@]/g,
          lower: true,
        });

        cam.credit = '511MN.org';
        cam.creditLink = 'https://511mn.org';

        cam.sitemapItem = `<url><loc>https://road.camera/minnesota/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

        this.allCams.push(cam);
      });
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
            sitemapItem: `<url><loc>https://road.camera/minnesota/roads/${cam.routeSlug}</loc></url>`,
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
