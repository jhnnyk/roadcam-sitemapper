import Vue from 'vue';
import VueRouter from 'vue-router';

import AlaskaRoads from '../pages/alaska/AlaskaRoads.vue';
import ArizonaRoads from '../pages/arizona/ArizonaRoads.vue';
import BCRoads from '../pages/british-columbia/BCRoads.vue';
import CaliforniaRoads from '../pages/california/CaliforniaRoads.vue';
import ColoradoRoads from '../pages/colorado/ColoradoRoads.vue';
import IowaRoads from '../pages/iowa/IowaRoads.vue';
import NationalParks from '../pages/nationalparks/NationalParks.vue';
import OntarioRoads from '../pages/ontario/OntarioRoads.vue';
import OregonRoads from '../pages/oregon/OregonRoads.vue';
import WashingtonRoads from '../pages/washington/WashingtonRoads.vue';
import WisconsinRoads from '../pages/wisconsin/WisconsinRoads.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/alaska',
    name: 'AlaskaRoads',
    component: AlaskaRoads,
  },
  {
    path: '/arizona',
    name: 'ArizonaRoads',
    component: ArizonaRoads,
  },
  {
    path: '/british-columbia',
    name: 'BCRoads',
    component: BCRoads,
  },
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
    path: '/iowa',
    name: 'IowaRoads',
    component: IowaRoads,
  },
  {
    path: '/nationalparks',
    name: 'NationalParks',
    component: NationalParks,
  },
  {
    path: '/ontario',
    name: 'OntarioRoads',
    component: OntarioRoads,
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
  {
    path: '/wisconsin',
    name: 'WisconsinRoads',
    component: WisconsinRoads,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});

export default router;
