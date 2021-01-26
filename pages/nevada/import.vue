<template>
  <div>
    <button @click="getData">import</button>
  </div>
</template>

<script>
// http://<user id>:<user password>@dataexchange.your511.com/rest/json/<data type>[?<parameters>]
// http://Jhnnyk:klom1SCIS@yosk!kors@dataexchange.511nv.com/rest/json/linkConfigXML_Native

// http://<dataexchange.your511.com>/data/DataExchange?wsdl
// http://dataexchange.511nv.com/data/DataExchange?wsdl
// https://dataexchange.511nv.com/rest/getData/cctvConfigXML

// https://Jhnnyk:klom1SCIS@yosk!kors@dataexchange.511nv.com/rest/json/eventXML

import axios from 'axios';

export default {
  name: 'NevadaImport',

  methods: {
    async getData() {
      const response = await axios.get(
        'https://Jhnnyk:klom1SCIS@yosk!kors@dataexchange.511nv.com/rest/getData',
        {
          withCredentials: true,
          auth: {
            username: 'Jhnnyk',
            password: 'klom1SCIS@yosk!kors',
          },
        }
      );
      console.log(response);
    },
  },
};
</script>
