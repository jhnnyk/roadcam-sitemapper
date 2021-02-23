<template>
  <div>
    <h1>North Dakota</h1>

    <ul>
      <li v-for="cam in cams" :key="cam.index">{{ cam }},</li>
    </ul>
  </div>
</template>

<script>
import rawData from './north-dakotaroads-original.json';

export default {
  name: 'NorthDakotaData',

  data() {
    return {
      cams: [],
    };
  },

  created() {
    rawData.forEach((el) => {
      const cam = {};

      cam.name = el.name;
      cam.imageUrl = el.imageUrl;
      cam.description = el.description;

      // matches everything between the parentheses
      // el.name.match(/(?<=\()(.*?)(?=\))/g);
      cam.route = el.name.match(/(?<=\()(.*?)(?= M)/g);
      cam.milepost = el.name.match(/(?<=MP )(.*?)(?=\))/g);

      this.cams.push(cam);
    });
  },
};
</script>
