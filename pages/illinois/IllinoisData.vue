<template>
  <div>
    <h1>Illinois</h1>

    <ul>
      <li v-for="cam in cams" :key="cam.index">
        {{ cam }}
      </li>
    </ul>
  </div>
</template>

<script>
import data from './illinoisroads-original.json';

export default {
  name: 'IllinoisData',

  data() {
    return {
      cams: [],
    };
  },

  created() {
    data.forEach((el) => {
      const cam = {};

      cam.id = el.OBJECTID;
      cam.link = el.ImgPath;
      cam.name = el.CameraLocation;
      cam.direction = el.CameraDirection;
      cam.latitude = el.y;
      cam.longitude = el.x;
      cam.imageUrl = el.SnapShot;
      // for routes, I started with the below and then did a bunch of manual work to clean up the routes
      cam.route = el.CameraLocation.match(/^([^\s]+)/g)[0];

      this.cams.push(cam);
    });
  },
};
</script>
