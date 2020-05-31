<template>
<div v-if="countries">
  <div 
    class="country__card m-1 mb-4"
    v-for="(country, key) in countries"
    :key="'N' + key">
    <h5 class="mb-3">{{country.name}}</h5>
    <div class="country__content">
      <div class="country__flag">
        <img :src="country.flag" alt="">
      </div>
      <div class="country__info">
      <b>Area: </b><span class="country__text">{{country.area | number}} <span>km<sup>2</sup></span></span><br>
      <b>Capital: </b><span class="country__text">{{country.capital}}</span><br>
      <b>Population: </b><span class="country__text">{{country.population | number}}</span><br>
      <b>Currencies: </b> 
        <span 
        class="country__text"
        v-for="(currency, key) in country.currencies" 
        :key="'A' + key">{{currency.name }}
      </span>
      <br>
      <b>Languages: </b> 
        <span 
        class="country__text"
        v-for="(language, key) in country.languages" 
        :key="'B' + key">{{language.name }}
      </span><br>
      <b>Region: </b><span class="country__text">{{country.region}}</span><br>
      
      <b>Regional Blocs: </b> 
        <span 
        class="country__text"
        v-for="(bloc, key) in country.regionalBlocs" 
        :key="'C' + key">{{bloc.name }}
      </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    countries: Array
  }
}
</script>

<style lang="scss">
@import '@/assets/main.scss';

.navbar {
  background-color: map_get($colors, "light-dark");
  border-radius: 10px;
  margin: 10px 4px;
}

.country__card {
  background-color: map_get($colors, "light-dark");
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.country__content {
  display: flex;
  align-items: center;
  width: 100%;
}

.country__flag {
  width: 33.3%;
  margin-right: 50px;
}

.country__flag img {
  width: 100%;
}

.country__info {
  text-align: left;
}

.country__text:hover {
  text-decoration: underline;
  color: map_get($colors, "orange");
}
</style>