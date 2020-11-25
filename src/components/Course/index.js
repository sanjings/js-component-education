import BScroll from 'better-scroll'

import tpl from './ejs/index.ejs'
import itemTpl from './ejs/item.ejs'

import Empty from 'components/Empty'

import './index.scss'

export default class Course {
   constructor(props = {}) {
      this.name = 'Course'
      this.$container = props.$container
      this.courseData = props.courseData
   }

   async init() {
      await this.render()
      this._initBScroll()
   }

   render() {
      this.$container.append(this.tpl(this.courseData))
   }

   _initBScroll() {
      new BScroll('.course-scroll', {
         scrollY: true,
         click: true,
         mouseWheel: true,
         tap: true
      })
   }

   tpl(courseData) {
      return tpl({
         list: this.itemTpl(courseData)
      })
   }

   itemTpl(data) {
      if (data && data.length) {
         return itemTpl({ data })
      } else {
         return new Empty().tpl('暂无数据')
      }
   }
}