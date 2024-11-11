<template>
    <q-card class="my-card" style="width: 99%; margin: 8px; text-align: center">
    <q-card-section class="bg-blue-5 text-white">

    <div id="resultat" class="text-h3" style="text-align: center"></div>

    <div class="text-h5" style="text-align: left">Notre ETF crypto</div>
    <div class="text-h6" style="text-align: left">Valeur au lancement le 31/08 : 2 274,88</div>
  </q-card-section>

  <q-card-actions vertical align="center">
    <q-btn style="width: 40%; font-size: 100%" label="actualiser" @click="onSubmit ()" />
    <div class="text-h6" v-if="link">Composition de l'ETF :
    <q-markup-table style="font-size: 100%">
        <thead>
          <tr>
            <th class="text-left">Nom</th>
            <th class="text-right">Identifiant</th>
            <th class="text-right">Prix</th>
            <th class="text-right">Pondération (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Bitcoin</td>
            <td class="text-right">(BTC)</td>
            <td class="text-right"> {{ btc }} </td>
            <td class="text-right">15</td>
          </tr>
          <tr>
            <td class="text-left">Ether</td>
            <td class="text-right">(ETH)</td>
            <td class="text-right"> {{ eth.price }} </td>
            <td class="text-right">14</td>
          </tr>
          <tr>
            <td class="text-left">Tether</td>
            <td class="text-right">(USDT)</td>
            <td class="text-right"> {{ usdt }} </td>
            <td class="text-right">13</td>
          </tr>
          <tr>
            <td class="text-left">Solalna</td>
            <td class="text-right">(SOL)</td>
            <td class="text-right"> {{ sol }} </td>
            <td class="text-right">12</td>
          </tr>
          <tr>
            <td class="text-left">Ripple</td>
            <td class="text-right">(XRP)</td>
            <td class="text-right"> {{ xrp }} </td>
            <td class="text-right">11</td>
          </tr>
          <tr>
            <td class="text-left">Dogecoin</td>
            <td class="text-right">(DOGE)</td>
            <td class="text-right"> {{ doge }} </td>
            <td class="text-right">9</td>
          </tr>
          <tr>
            <td class="text-left">Cardano</td>
            <td class="text-right">(ADA)</td>
            <td class="text-right"> {{ ada }} </td>
            <td class="text-right">8</td>
          </tr>
          <tr>
            <td class="text-left">Avalanche</td>
            <td class="text-right">(AVAX)</td>
            <td class="text-right"> {{ avax }} </td>
            <td class="text-right">7</td>
          </tr>
          <tr>
            <td class="text-left">Shiba Inu</td>
            <td class="text-right">(SHIB)</td>
            <td class="text-right"> {{ shib }} </td>
            <td class="text-right">6</td>
          </tr>
          <tr>
            <td class="text-left">Chainlink</td>
            <td class="text-right">(LINK)</td>
            <td class="text-right"> {{ link }} </td>
            <td class="text-right">5</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-card-actions>
</q-card>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import {useApi} from 'src/hooks/useApi';
const Api = useApi();

const eth = ref();
const btc = ref();
const usdt = ref();
const sol = ref();
const xrp = ref();
const doge = ref();
const ada = ref();
const avax = ref();
const shib = ref();
const link = ref();

const reg = ref();

const Mbtc = ref();
const Musdt = ref();
const Msol = ref();
const Mxrp = ref();
const Mdoge = ref();
const Mada = ref();
const Mavax = ref();
const Mshib = ref();
const Mlink = ref();

function getAll() {
    const derieth = (Number(eth.value.price) * 14) / 100;

    Mbtc.value = Number(btc.value) * (Number(eth.value.price) / 59129.53);
    Mbtc.value = (Number(Mbtc.value) * 15) / 100;

    Musdt.value = Number(usdt.value) * (Number(eth.value.price) / 0.9999);
    Musdt.value = (Number(Musdt.value) * 13) / 100;

    Msol.value = Number(sol.value) * (Number(eth.value.price) / 137.1);
    Msol.value = (Number(Msol.value) * 12) / 100;

    Mxrp.value = Number(xrp.value) * (Number(eth.value.price) / 0.5704);
    Mxrp.value = (Number(Mxrp.value) * 11) / 100;

    Mdoge.value = Number(doge.value) * (Number(eth.value.price) / 0.00000171);
    Mdoge.value = (Number(Mdoge.value) * 9) / 100;

    Mada.value = Number(ada.value) * (Number(eth.value.price) / 0.348);
    Mada.value = (Number(Mada.value) * 8) / 100;

    Mavax.value = Number(avax.value) * (Number(eth.value.price) / 23.06);
    Mavax.value = (Number(Mavax.value) * 7) / 100;

    Mshib.value = Number(shib.value) * (Number(eth.value.price) / 0.00001394);
    Mshib.value = (Number(Mshib.value) * 6) / 100;

    Mlink.value = Number(link.value) * (Number(eth.value.price) / 11.176);
    Mlink.value = (Number(Mlink.value) * 5) / 100;
    
    resultat.innerHTML = '';
    const reg = Number(derieth) + Number(Mbtc.value) + Number(Musdt.value) + Number(Msol.value) + Number(Mxrp.value) + Number(Mdoge.value) + Number(Mada.value) + Number(Mavax.value) + Number(Mshib.value) + Number(Mlink.value);
    console.log(reg);
    return reg.toFixed(2);
}

function onSubmit() { 
    Api.prix('/products/ETH-USD/ticker').then(res => {
    eth.value = res;

    Api.prix('/products/BTC-USD/ticker').then(res => {
        btc.value = res;
        btc.value = btc.value.price;

    Api.prix('/products/USDT-USD/ticker').then(res => {
        usdt.value = res;
        usdt.value = usdt.value.price;

    Api.prix('/products/SOL-USD/ticker').then(res => {
        sol.value = res;
        sol.value = sol.value.price;

    Api.prix('/products/XRP-USD/ticker').then(res => {
        xrp.value = res;
        xrp.value = xrp.value.price;

    Api.prix('/products/DOGE-BTC/ticker').then(res => {
        doge.value = res;
        doge.value = doge.value.price;

    Api.prix('/products/ADA-USD/ticker').then(res => {
        ada.value = res;
        ada.value = ada.value.price;

    Api.prix('/products/AVAX-USD/ticker').then(res => {
        avax.value = res;
        avax.value = avax.value.price;

    Api.prix('/products/SHIB-USD/ticker').then(res => {
        shib.value = res;
        shib.value = shib.value.price;

    Api.prix('/products/LINK-USD/ticker').then(res => {
        link.value = res;
        link.value = link.value.price;
    
    resultat.innerHTML = getAll();
}); }); }); }); }); }); }); }); }); });
}
</script>