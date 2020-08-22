<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control ref="tabControl1" class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"
     v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" 
    :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @homeSwiperLoad="homeSwiperLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"
      :class="{fixed:isTabFixed }" v-show="!isTabFixed"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debouce} from 'common/utils'
  

  export default {
		name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
		  return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,

      }
    },
    computed: {
		
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getscrollY()
    },



    mounted(){

      const refresh = debouce(this.$refs.scroll.refresh,500)

      this.$bus.$on('itemImageLoad',() =>{
        refresh()            
      })
    },
    
    methods: {
      homeSwiperLoad(){
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
       
      },
      
      /*
      事件监听
      */
     tabClick(index){
       switch(index){
         case 0:
           this.currentType = 'pop'
           break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
       }
       this.$refs.tabControl1.currentIndex = index
       this.$refs.tabControl2.currentIndex = index
     },
     loadMore(){
       this.getHomeGoods(this.currentType)
     },

     backClick(){
       this.$refs.scroll.scrollTo(0,0,500)
     },

     contentScroll(position){
       this.isShowBackTop = (-position.y) > 1000
       this.isTabFixed = (-position.y) > (this.tabOffsetTop)
     },

    
      
      /* 
      网络请求
      */
      getHomeMultidata(){
         getHomeMultidata().then(res =>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
       })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res =>{
          console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
         })
       }
      },
     
	}
</script>

<style scoped>
.fixed{
   position: fixed;
   left: 0;
   right: 0;
   top: 0px;
}
 #home{
   /* padding-top: 44px; */
   height: 100vh;
 }
 .home-nav{
   background-color: var(--color-tint);
   color: #ffffff;

   /* position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 9; */
  }
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
