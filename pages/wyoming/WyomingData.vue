<template>
  <div>
    <h1>Wyoming</h1>

    <ul>
      <li v-for="cam in cams" :key="cam.index">
        {{ cam }}
      </li>
    </ul>
  </div>
</template>

<script>
import rawData from './wyomingdata.json';

export default {
  name: 'WyomingData',

  data() {
    return {
      cams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      el.swcamimages.forEach((i) => {
        const cam = {};

        cam.name = i.title;
        cam.imageUrl = i.imageUrl;
        cam.description = i.description;
        cam.route = el.swroute;
        cam.nearestTown = el.swlocation;
        cam.milepost = el.swmilepost;

        this.cams.push(cam);
      });
    });
  },
};
</script>
