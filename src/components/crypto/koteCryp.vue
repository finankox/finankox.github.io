<template>

  <q-form @submit="choose" style="width: 100%">
    <div class="q-pa-md" v-if="options.length > 2">
      <div class="q-gutter-y-md column">
        <q-select clearable filled color="purple-12" v-model="chosen" label="Choisissez un crypto-actif" :options="options" style="width: 80%"/>
      </div>
      <q-btn type="submit" style='width: 20%' icon="search" />
    </div>
  </q-form>

  <q-form @submit="onSubmit" style="width: 100%">
  <div class="q-pa-md" style="width: 100%" >
    <q-input filled v-model="search" label="Rechercher un crypto-actif" style="width: 80%" />
    <q-btn type="submit" style='width: 20%' icon="search" />
  </div>
  </q-form> 

  <q-card class="my-card" style="width: 30%; min-width: 200px" v-if="infodes">
      <q-card-section class="bg-green-8 text-white">
        <div class="text-h6">{{ infodes.name }} ( {{ infodes.id }} )  </div>
        <div class="text-subtitle2"> {{ infodes.details.type }} </div>
      </q-card-section>

      <q-card-actions vertical align="center">
        <div v-if="infodes.details.symbol"> <p flat>Symbol : {{ infodes.details.symbol }}</p> </div>
        <div v-if="prixUSD"> <p flat> {{ prixUSD.price }} USD</p> </div>
        <div v-if="prixEUR"> <p flat> {{ prixEUR.price }} EUR</p> </div>
        <div v-if="prixGBP"> <p flat> {{ prixGBP.price }} GBP</p> </div>
        <div v-if="prixBTC"> <p flat> {{ prixBTC.price }} BTC</p> </div>
        <div v-if="prixUSDT"> <p flat> {{ prixUSDT.price }} USDT</p> </div>
      </q-card-actions>
    </q-card>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useApi} from 'src/hooks/useApi';

const infodes = ref();
const prixUSD = ref();
const prixEUR = ref();
const prixGBP = ref();
const prixBTC = ref();
const prixUSDT = ref();

const Api = useApi();
const all = ref();
const search = ref(null);
const chosen = ref(null);
const options = [''];

Api.allAct().then(res => {
    all.value = res;
    for (let i = 0; i < all.value.length; i++) {
      options.push(all.value[i].base_currency);
    }
})

function onSubmit () {
  infodes.value = '';
  prixUSD.value = '';
  prixEUR.value = '';
  prixGBP.value = '';
  prixBTC.value = '';
  prixUSDT.value = '';
  
  Api.info('/currencies/' + search.value).then(res => {
    infodes.value = res;
  });

  Api.prix('/products/' + search.value + '-USD/ticker').then(res => {
    prixUSD.value = res;
  });

  Api.prix('/products/' + search.value + '-EUR/ticker').then(res => {
    prixEUR.value = res;
  });

  Api.prix('/products/' + search.value + '-GBP/ticker').then(res => {
    prixGBP.value = res;
  });

  Api.prix('/products/' + search.value + '-BTC/ticker').then(res => {
    prixBTC.value = res;
  });

  Api.prix('/products/' + search.value + '-USDT/ticker').then(res => {
    prixUSDT.value = res;
  });
}

function choose () {
  infodes.value = '';
  prixUSD.value = '';
  prixEUR.value = '';
  prixGBP.value = '';
  prixBTC.value = '';
  prixUSDT.value = '';
  
  Api.info('/currencies/' + chosen.value).then(res => {
    infodes.value = res;
  });

  Api.prix('/products/' + chosen.value + '-USD/ticker').then(res => {
    prixUSD.value = res;
  });

  Api.prix('/products/' + chosen.value + '-EUR/ticker').then(res => {
    prixEUR.value = res;
  });

  Api.prix('/products/' + chosen.value + '-GBP/ticker').then(res => {
    prixGBP.value = res;
  });

  Api.prix('/products/' + chosen.value + '-BTC/ticker').then(res => {
    prixBTC.value = res;
  });

  Api.prix('/products/' + chosen.value + '-USDT/ticker').then(res => {
    prixUSDT.value = res;
  });
}
</script>