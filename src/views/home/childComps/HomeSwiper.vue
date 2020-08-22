<template>
  <swiper>
      <swiper-item v-for="(item,itemIndex) in banners" :key="itemIndex">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }

  },
  data () {
    return {
      imgload:false
    };
  },
  components: {
    Swiper,SwiperItem
  },
  mounted () {},
  methods: {
    imageLoad(){
      if(!this.imgload){
         this.$emit('homeSwiperLoad')
         this.imgload = true
         
      }
     
    }
  }
}
</script>

<style  scoped>
</style>