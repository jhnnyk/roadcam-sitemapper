<template>
  <div>
    <h1>Colorado Data</h1>
    <p>{{ cams.length }} cams</p>
    <ul>
      <li v-for="cam in cams" :key="cam.index">{{ cam }},</li>
    </ul>
  </div>
</template>

<script>
import slugify from 'slugify';
import data from './coloradoroads-original.json';

export default {
  name: 'ColoradoData',

  data() {
    return {
      cams: [],
    };
  },

  created() {
    data.Cameras.forEach((el) => {
      if (el.CameraView[0]) {
        el.CameraView.forEach((cv) => {
          const cam = {};

          cam.name = `${cv.CameraName} ${cv.Direction}`;
          cam.slug = slugify(`${cv.CameraName} ${cv.Direction}`, {
            remove: /[*+~.()'"!/#:@]/g,
            lower: true,
          });

          cam.latitude = el.Location.Latitude;
          cam.longitude = el.Location.Longitude;

          if (
            cv.ImageLocation.indexOf('http://') === 0 ||
            cv.ImageLocation.indexOf('https://') === 0
          ) {
            cam.imageUrl = cv.ImageLocation;
          } else {
            cam.imageUrl = `https://www.cotrip.org/${cv.ImageLocation}`;
          }

          cam.description = cv.ViewDescription;

          cam.route = cv.RoadName;
          cam.routeSlug = slugify(cv.RoadName, {
            remove: /[*+~.()'"!/#:@]/g,
            lower: true,
          });

          cam.milepoint = cv.MileMarker;

          this.cams.push(cam);
        });
      } else {
        console.log(el);
      }
    });
  },
};
</script>
