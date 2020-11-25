import $ from 'jquery'
import { sortData, filterSearchData } from 'utils/filters'

import SearchBox from '../SearchBox'
import Course from '../Course'

import tpl from './ejs/index.ejs'
import sortTpl from './ejs/sort.ejs'

import './index.scss'

export default class Header {
   constructor(props = {}) {
      this.name = 'Header'
      this.$container = props.$container
      this.searchWord = props.searchWord
      this.courseData = props.courseData
   }

   async init() {
      await this.render()
      this.bindEvent()
      this._initSearchBox()
   }

   _initSearchBox() {
      new SearchBox({
         $container: this.$container,
         courseData: this.courseData
      }).init()
   }

   render() {
      this.$container.append(this.tpl())
   }

   tpl() {
      return tpl({
         searchWord: this.searchWord,
         sort: this.sortTpl()
      })
   }

   sortTpl() {
      return sortTpl()
   }

   bindEvent() {
      const $logo = $('.js_logo'),
            $searchBtn = $('.js_searchBtn'),
            $sort = $('.js_sort'),
            $sortMenu = $sort.find('.sort-menu');

      $logo.on('click', this.handleGoHome.bind(this))
      $searchBtn.on('click', this.showSearch.bind(this))
      $sort.on('click', { $sortMenu }, this.showSortMenu.bind(this))
      $sort.on('click', '.menu-item', this.sortAction.bind(this))
   }

   handleGoHome() {
      window.location.replace('index.html')
   }

   showSearch() {
      const $searchBox = $('.js_searchBox'),
            $inputSearch = $searchBox.find('.input-search');

      $searchBox.css('display', 'block')
      $inputSearch.focus()
   }

   showSortMenu(e) {
      const $target = $(e.currentTarget),
            $arrow = $target.find('.arrow-down'),
            { $sortMenu } = e.data,
            menuHeight = $sortMenu.height(),
            $sortItem = $sortMenu.find('.menu-item'),
            len = $sortItem.length;

      
      if (menuHeight === 0) {
         $arrow.addClass('rotate')
         $sortMenu.css('height', 50 * len / 100  + 'rem')
      } else {
         $arrow.removeClass('rotate')
         $sortMenu.css('height', '0')
      }
   }

   sortAction(e) {
      const $target = $(e.target),
            value = $target.text(),
            $currentSort = $('.js_currentSort');

      $currentSort.text(value)
      $target.addClass('active')
             .siblings('.menu-item')
             .removeClass('active')

      this.initList(value)
   }

   initList(value) {
      const $courseList = $('.js_courseList'),
            search = $('.js_searchtip').text();

      const filterData = filterSearchData(this.courseData, search),
            listStr = new Course().itemTpl(sortData(filterData, value))
      
      $courseList.html(listStr)
   }
}