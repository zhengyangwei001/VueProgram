<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content">
      <cart-list></cart-list>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import CartList from './childComps/CartList'

  import { mapGetters } from 'vuex'

	export default {
		name: "Cart",
    components: {
		  NavBar,
      Scroll,
      CartList,
    },
    computed: {
		 ...mapGetters(['cartLength'])
    }
	}
</script>

<style scoped>
 .nav-bar{
   background-color: var(--color-tint);
   color: #ffffff;
 }
 .content{
    height: calc(100% - 93px);
    overflow: hidden;
  }
#cart{
    height: 100vh;
  }
</style>
