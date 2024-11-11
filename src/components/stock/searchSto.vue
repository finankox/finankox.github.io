<template>
<div v-if="desShare">
    <div style="display: flex; height: 10%">
        <q-img :src="desShare.image" class="img"></q-img>
        <h3> {{ desShare.companyName }} ({{ desShare.symbol }})</h3>
    </div>
    <div>
        <h6> {{ desShare.price }} <span style="font-size: 80%"> ({{ quoteShare.changesPercentage + "%" }}) </span> </h6>
    </div>

    <p> {{ desShare.description }} </p>
</div>

<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
</div>
<!-- TradingView Widget END -->

</template>

<script lang='ts'>
import { ref } from 'vue';
import {useApi} from 'src/hooks/useApi';
const Api = useApi();
import { useRoute } from "vue-router";

const quoteShare = ref();
const rateShare = ref();
const desShare = ref();
const nameShare = useRoute().params.id;

    
Api.fmpData2('quote/' + nameShare + '?').then(res => {
    quoteShare.value = res[0];

});

Api.fmpData2('rating/' + nameShare + '?').then(res => {
    rateShare.value = res[0];

Api.fmpData2('profile/' + nameShare + '?').then(res => {
    desShare.value = res[0];

});
});


</script>

<style lang="sass" scoped>
.img
  height: 10%
  width: 10%
  margin: 2%
</style>
