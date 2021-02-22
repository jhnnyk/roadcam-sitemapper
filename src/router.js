import Vue from 'vue';
import VueRouter from 'vue-router';

import AlabamaRoads from '../pages/alabama/AlabamaRoads.vue';
import AlaskaRoads from '../pages/alaska/AlaskaRoads.vue';
import AlbertaRoads from '../pages/alberta/AlbertaRoads.vue';
import ArizonaRoads from '../pages/arizona/ArizonaRoads.vue';
import BCRoads from '../pages/british-columbia/BCRoads.vue';
import CaliforniaRoads from '../pages/california/CaliforniaRoads.vue';
import ColoradoRoads from '../pages/colorado/ColoradoRoads.vue';
import ConnecticutRoads from '../pages/connecticut/ConnecticutRoads.vue';
import IllinoisData from '../pages/illinois/IllinoisData.vue';
import IllinoisRoads from '../pages/illinois/IllinoisRoads.vue';
import IowaRoads from '../pages/iowa/IowaRoads.vue';
import MichiganRoads from '../pages/michigan/MichiganRoads.vue';
import MinnesotaRoads from '../pages/minnesota/MinnesotaRoads.vue';
import NationalParks from '../pages/nationalparks/NationalParks.vue';
import OhioRoads from '../pages/ohio/OhioRoads.vue';
import OntarioRoads from '../pages/ontario/OntarioRoads.vue';
import OregonRoads from '../pages/oregon/OregonRoads.vue';
import WashingtonRoads from '../pages/washington/WashingtonRoads.vue';
import WisconsinRoads from '../pages/wisconsin/WisconsinRoads.vue';
import WyomingData from '../pages/wyoming/WyomingData.vue';
import WyomingRoads from '../pages/wyoming/WyomingRoads.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/alabama',
    name: 'AlabamaRoads',
    component: AlabamaRoads,
  },
  {
    path: '/alaska',
    name: 'AlaskaRoads',
    component: AlaskaRoads,
  },
  {
    path: '/alberta',
    name: 'AlbertaRoads',
    component: AlbertaRoads,
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
    path: '/connecticut',
    name: 'ConnecticutRoads',
    component: ConnecticutRoads,
  },
  {
    path: '/illinoisdata',
    name: 'IllinoisData',
    component: IllinoisData,
  },
  {
    path: '/illinois',
    name: 'IllinoisRoads',
    component: IllinoisRoads,
  },
  {
    path: '/iowa',
    name: 'IowaRoads',
    component: IowaRoads,
  },
  {
    path: '/michigan',
    name: 'MichiganRoads',
    component: MichiganRoads,
  },
  {
    path: '/minnesota',
    name: 'MinnesotaRoads',
    component: MinnesotaRoads,
  },
  {
    path: '/nationalparks',
    name: 'NationalParks',
    component: NationalParks,
  },
  {
    path: '/ohio',
    name: 'OhioRoads',
    component: OhioRoads,
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
  {
    path: '/wyomingdata',
    name: 'WyomingData',
    component: WyomingData,
  },
  {
    path: '/wyoming',
    name: 'WyomingRoads',
    component: WyomingRoads,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});

export default router;
