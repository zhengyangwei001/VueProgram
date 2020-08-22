<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-image-info :detail-info="detailInfo" @datailImageLoad="datailImageLoad"></detail-image-info>
    <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTop"></back-top>
    <detail-buttom-bar @addCar="addToCar"></detail-buttom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImageInfo from './childComps/DetailImageInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailButtomBar from './childComps/DetailButtomBar'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,Shop} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import{debouce} from 'common/utils'

export default {
  name: 'Detail',
  mixins:[itemListenerMixin,backTopMixin],
  data () {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      temeTopYs:[],
      getTopy:null,
      currentIndex:0,
    };
  },
  created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = data.itemParams

      this.getTopy = debouce(()=>{
        this.temeTopYs = [],
        this.temeTopYs.push(0),
        this.temeTopYs.push(this.$refs.params.$el.offsetTop)
      })


    })
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImageInfo,
    DetailParamInfo,
    DetailButtomBar,
  },
  mounted () {},
  methods: {
    addToCar(){
     const product = {}
     product.image = this.topImages[0];
     product.title = this.goods.title;
     product.desc = this.goods.desc;
     product.price = this.goods.realPrice;
     product.iid = this.iid;
    
    this.$store.commit('addCar',product)
      
    },

    contentScroll(position){
    this.isShowBackTop = (-position.y) > 1000
    const positionY = -position.y
    let length = this.temeTopYs.length
    for(let i = 0; i < length; i++){
      if(this.currentIndex !==i && ((i < length -1 && positionY >= this.temeTopYs[i] && positionY < this.temeTopYs[i+1]
      ) || (i === length-1 && positionY >= this.temeTopYs[i]))){
        this.currentIndex = i
        this.$refs.nav.currentIndex = this.currentIndex
      }
    }
    
    },
    datailImageLoad(){ 
      this.newRefresh()
      this.getTopy()
    },
    titleClick(itemIndex){
      this.$refs.scroll.scrollTo(0,-this.temeTopYs[itemIndex],200)
    }
  }
}
</script>

<style  scoped>
#detail{
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
.detail-nav{
  position: relative;
  z-index: 10;
  background-color: #fff;
}
</style>