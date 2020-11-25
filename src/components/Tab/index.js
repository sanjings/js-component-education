import $ from 'jquery'

import tpl from './ejs/index.ejs'
import itemTpl from './ejs/item.ejs'

import Course from 'components/Course'

import './index.scss'

export default class Tab {
   constructor(props) {
      this.name = 'Tab'
      this.$container = props.$container
      this.fieldData = props.fieldData
      this.courseData = props.courseData
   }

   async init () {
      await this.render()
      this.bindEvent()
   }

   render() {
      this.$container.append(this.tpl(this.fieldData))
   }

   tpl(fieldData) {
      const len = fieldData.length,
            tabWidth = len * 75 / 100 + 'rem';

      return tpl({
         tabWidth,
         list: this.itemTpl(fieldData)
      })
   }

   itemTpl(data) {
      return itemTpl({ data })
   }

   bindEvent() {
      const $tabList = $('.js_tabList')
      $tabList.on('click', '.tab-item', this.clickAction.bind(this))
   }

   clickAction(e) {
      const $target = $(e.target),
            field = e.target.dataset.type;

      this.changeStyle($target)
      this.initList(field)
      this.scrollAction($target)
   }

   changeStyle($target) {
      $target.addClass('active')
             .siblings('.tab-item')
             .removeClass('active')
   }

   scrollAction($target) {
      const offsetLeft = $target.offset().left
      const $tabScroll = $('.js_tabScroll')

      $tabScroll.animate({ scrollLeft: offsetLeft }, 300);
   }

   initList(field) {
      const $courseList = $('.js_courseList')
      const filterData = this.filterData(this.courseData, field)
      const listStr = new Course().itemTpl(filterData)
      
      $courseList.html(listStr)
   }

   filterData(data, field) {
      if (!field) return data;
      if (field === 'HOT') return data.filter(item => item.hot);
      return data.filter(item => item.type === field)
   }
}