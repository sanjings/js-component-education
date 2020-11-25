import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

import tpl from './index.ejs'

import './index.scss'

export default class Carousel {
   constructor (props = {}) {
      this.name = 'Carousel'
      this.$container = props.$container
      this.swiperData = props.swiperData
   }

   async init() {
      await this.render()
      this._initSwiper()
   }

   render() {
      this.$container.append(this.tpl(this.swiperData))
   }

   tpl(data) {
      return tpl({ data })
   }

   _initSwiper() {
      new Swiper('.swiper-container', {
         speed: 1200,
         autoplay: {
            delay: 3000, // 3秒切换一次
            disableOnInteraction: false
         },
         pagination: {
            el: '.swiper-pagination'
         },
         loop: true,
         observer: true, // 启动动态检查器
         observeParents: true // 修改swiper的父元素时，自动初始化swiper
      })
   }
}
