import Vue from 'vue';
import VueRouter from 'vue-router';

import CaliforniaRoads from '../pages/california/CaliforniaRoads.vue';
import ColoradoRoads from '../pages/colorado/ColoradoRoads.vue';
import OregonRoads from '../pages/oregon/OregonRoads.vue';
import WashingtonRoads from '../pages/washington/WashingtonRoads.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/california',
    name: 'CaliforniaRoads',
    component: CaliforniaRoads,
  },
  {
    path: '/colorado',
    name: 'ColoradoRoads',
    component: ColoradoRoads,
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
