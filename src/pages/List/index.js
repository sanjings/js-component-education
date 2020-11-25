import $ from 'jquery'

import { getUrlParam } from 'utils/tools'
import { filterSearchData } from 'utils/filters'

import App from '@/app.js'
import Header from './Header'
import Course from './Course'

import { getDatas } from 'apis/home'

class List extends App {
   constructor(getDatas) {
      super(getDatas)
      this.name = 'List'
      this.searchWord = getUrlParam('search')
   }

   render(retData) {
      const { courseData } = retData;
      const searchData = filterSearchData(courseData, this.searchWord)

      new Header({
         $container: this.$app,
         searchWord: this.searchWord,
         courseData
      }).init()

      new Course({
         $container: this.$app,
         searchData
      }).init()

      $('body').prepend(this.$app)
   }
}

new List(getDatas)