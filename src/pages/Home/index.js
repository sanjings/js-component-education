import $ from 'jquery'

import App from '@/app.js'
import Header from 'components/Header'
import Carousel from 'components/Carousel'
import Tab from 'components/Tab'
import Course from 'components/Course'

import { getDatas } from 'apis/home'

class Home extends App {
   constructor(getDatas) {
      super(getDatas)
      this.name = 'Home'
   }

   render(retData) {
      const { 
         fieldData,
         swiperData, 
         courseData,
         hotSearchData 
      } = retData;

      new Header({
         $container: this.$app,
         title: 'IT课堂',
         hotSearchData
      }).init()

      new Carousel({
         $container: this.$app,
         swiperData
      }).init()

      new Tab({
         $container: this.$app,
         fieldData,
         courseData
      }).init()

      new Course({
         $container: this.$app,
         courseData: courseData.filter(item => item.hot)
      }).init()

      $('body').prepend(this.$app)
   }
}

new Home(getDatas)
