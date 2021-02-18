<template>
  <div>
    <h2>Michigan Routes Sitemap</h2>
    <div v-for="route in routes" :key="route.index">
      {{ route.sitemapItem }}
    </div>

    <hr />
    <h2>Michigan Cams Sitemap</h2>
    <div v-for="cam in allCams" :key="cam.index">
      {{ cam.sitemapItem }}
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import data from './michiganroads.json';

export default {
  name: 'MichiganRoads',

  data() {
    return {
      allCams: [],
    };
  },

  created() {
    data.forEach((el) => {
      const cam = {};

      cam.name = `${el.route} ${el.location}`;
      cam.slug = slugify(
        `${el.route} ${el.location}-${el.description.slice(
          el.description.length - 5
        )}`,
        {
          remove: /[*+~.()'"!/#:@]/g,
          lower: true,
        }
      );

      // cam.latitude = el.latitude.toString();
      // cam.longitude = el.longitude.toString();

      cam.route = el.route;
      cam.routeSlug = slugify(el.route, {
        remove: /[*+~.()'"!/#:@]/g,
        lower: true,
      });

      if (el.milePost) {
        cam.milepoint = el.milePost.toString();
      }

      cam.imageURL = el.image;
      cam.description = `${el.route} @ ${el.location} in ${el.county}. ${el.description}`;

      cam.credit = 'MI Drive';
      cam.creditLink = el.link;

      cam.sitemapItem = `<url><loc>https://road.camera/michigan/roads/${cam.routeSlug}/${cam.slug}</loc></url>`;

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
            sitemapItem: `<url><loc>https://road.camera/michigan/roads/${cam.routeSlug}</loc></url>`,
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
