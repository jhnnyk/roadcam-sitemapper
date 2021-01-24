import Vue from 'vue';
import VueRouter from 'vue-router';

import WashingtonRoads from '../pages/washington/WashingtonRoads.vue';
import OregonRoads from '../pages/oregon/OregonRoads.vue';
import CaliforniaRoads from '../pages/california/CaliforniaRoads.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/california',
    name: 'CaliforniaRoads',
    component: CaliforniaRoads,
  },
  {
    path: '/oregon',
    name: 'OregonRoads',
    component: OregonRoads,
  },
  {
    path: '/washington',
    name: 'WashingtonRoads',
    component: WashingtonRoads,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});

export default router;
