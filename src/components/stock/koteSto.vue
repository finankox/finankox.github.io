<template>

<q-form @submit="onSubmit" style="width: 100%">
  <div class="q-pa-md" style="width: 100%">
    <q-input filled v-model="search" label="Rechercher une action" style="width: 80%" />
    <q-btn type="submit" style='width: 20%' icon="search" />
  </div>
  </q-form>

  <div v-if="shareTook">
  <div v-for="stocks in shareTook" :key="stocks">
    <div class="card-stock">
      <q-btn :to='"/stock/" + stocks.symbol' class="cont">{{ stocks.name }}</q-btn>
      <p class="cont" style="font-size: 130%">Echangé sur le marché {{ stocks.exchangeShortName }}.</p>
    </div>
    <div style="height: 3px; width: 80%; background-color: black; margin-left: 10%; margin-right: 10%"></div>
    
  </div>
  </div>

</template>

<script setup lang="ts">

import { ref } from 'vue';
import {useApi} from 'src/hooks/useApi';
const Api = useApi();
const shareTook = ref();
const rand = ref();
const search = ref(null);

function onSubmit() {
    Api.fmpData2('search?query=' + search.value + '&').then(res => {
        shareTook.value = res;
        console.log(shareTook.value);
    });
}

</script>

<style lang="sass" scoped>
.card-stock
  max-heigth: 30px
  display: flex
  margin: 2%

.cont
  margin: 2%
</style>