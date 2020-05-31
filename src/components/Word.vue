<template>
  <div v-if="words">
    <div 
    class="word__card m-1 mb-4">
    <h4 class="mb-3">{{words.word | capitalLetter}}</h4>
    <div v-if="words.pronunciation" class="word__pronunciation mb-3 display-block">/{{words.pronunciation}}/</div>
    <div class="word__content" v-for="(definition, key) of words.definitions" :key="key">
      <div v-if="definition.image_url" class="word__image">
        <img :src="definition.image_url" alt="">
      </div>
      <div class="word__info">
      <span class="word__desc mr-3">Type:</span><span class="word__text">{{definition.type}}</span><br>
      <span class="word__desc mr-3" v-if="definition.emoji">Emoji:</span><span> {{definition.emoji}}</span><br v-if="definition.emoji">
      <span class="word__desc mr-3">Definition:</span><span> {{definition.definition}}</span><br>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import dictionary from '@/services/dictionary'

export default {
  props: {
    words: Object
  }
}
</script>

<style lang="scss">
@import '@/assets/main.scss';

.word__card {
  background-color: map_get($colors, "light-dark");
  padding: 20px 20px 40px;
  border-radius: 10px;

}

.word__content {
  display: flex;
}

.word__image {
  width: 30%;
  margin-right: 20px;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

.word__content {
  width: 104%;
  margin-left: -20px;
  background-color: map_get($colors, 'purple');
  padding: 20px;
  border-bottom: 1px solid map_get($colors, 'dark');
  border-collapse: collapse;
}

.word__pronunciation {
  color: #c5c5c5;
  font-weight: 300 !important;
}

.word__desc {
  font-weight: 600;
}


.word__text:hover {
  color: map-get($colors, 'orange');
  border-bottom: 1px dashed map-get($colors, 'orange');
}

</style>