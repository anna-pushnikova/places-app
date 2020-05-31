<template>
<div class="close-container">
  <div class="leftright"></div>
  <div class="rightleft"></div>
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '@/assets/main.scss';

.close-container{
  cursor: pointer;
  position: absolute; 
  top: 0;
  right: 11%;
}

.leftright{
  height: 2px;
  width: 20px;
  position: absolute;
  margin-top: 24px;
  background-color: map_get($colors, "white");
  border-radius: 2px;
  transform: rotate(45deg);
  transition: all .3s ease-in;
}

.rightleft{
  height: 2px;
  width: 20px;
  position: absolute;
  margin-top: 24px;
  background-color: map_get($colors, "white");
  border-radius: 2px;
  transform: rotate(-45deg);
  transition: all .3s ease-in;
}

label{
  color: map_get($colors, "white");
  font-family: Helvetica, Arial, sans-serif; 
  font-size: .6em;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all .3s ease-in;
  opacity: 0;
}

.close-container:hover .leftright{
  transform: rotate(-45deg);
  background-color: map_get($colors, "orange");
}
.close-container:hover .rightleft{
  transform: rotate(45deg);
  background-color: map_get($colors, "orange");
}

</style>