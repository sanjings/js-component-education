import $ from 'jquery'

import Course from '../Course'

import storage from 'utils/storage'
import { throttle } from 'utils/tools'
import { sortData } from 'utils/filters'

import tpl from './ejs/index.ejs'
import recordsTpl from './ejs/searchRecords.ejs'

import './index.scss'

export default class Search {
   constructor(props = {}) {
      this.name = 'SearchBox'
      this.$container = props.$container
      this.courseData = props.courseData
   }

   async init() {
      await this.render()
      this.bindEvent()
   }

   render() {
      this.$container.append(this.tpl())
   }

   tpl() {
      return tpl({
         searchRecords: this.recordsTpl()
      })
   }

   recordsTpl() {
      const searchRecords = storage.getItem('searchRecords');

      return recordsTpl({
         data: searchRecords ? searchRecords.slice(0, 6) : []
      })
   }

   bindEvent() {
      this.$searchBox = $('.js_searchBox');
      const $searchBox = this.$searchBox,
            $search = $searchBox.find('.search'),
            $inputSearch = $searchBox.find('.input-search'),
            $clear = $searchBox.find('.clear'),
            $cancel = $searchBox.find('.cancel'),
            $searchRecords = $searchBox.find('.search-records');
            
      $search.on('click', { $inputSearch }, this.searchAction.bind(this))
      $inputSearch.on('input', { $clear }, throttle(this.inputAction.bind(this), 300))
      $cancel.on('click', this.hiddenSearchBox.bind(this))
      $clear.on('click', { $inputSearch }, this.clearAction.bind(this))
      $searchRecords.on('click', '.record-item', this.searchRecordAction.bind(this))
   }

   searchAction(e) {
      const { $inputSearch } = e.data,
            keywords = $inputSearch.val();

      if (keywords) {
         const searchRecords = storage.getItem('searchRecords') || []
         storage.setItem('searchRecords', [keywords, ...searchRecords])
      }
      
      this.setSearchTip(keywords)
      this.initList(keywords)
   }

   inputAction(e) {
      const { $clear } = e.data,
            keywords = e.target.value;
      if (keywords) {
         $clear.css('display', 'inline-block')
      } else {
         $clear.css('display', 'none')
      }
   }

   searchRecordAction(e) {
      const $target = $(e.target),
            keywords = $target.text();

      this.setSearchTip(keywords)
      this.initList(keywords)
   }

   clearAction(e) {
      const { $inputSearch } = e.data;

      $inputSearch.val('')
      e.target.style.display = 'none'
   }

   setSearchTip(value) {
      const $searchTip = $('.js_searchtip');

      $searchTip.text(value)
   }

   hiddenSearchBox() {
      this.$searchBox.css('display', 'none')
   }

   initList(keywords) {
      const $courseList = $('.js_courseList')
      const filterData = this.filterData(this.courseData, keywords)
      const listStr = new Course().itemTpl(filterData)
      
      $courseList.html(listStr)
      this.hiddenSearchBox()
   }

   filterData(data, value) {
      const currentSort = $('.js_currentSort').text();
      let filterData = [];

      if (!value) filterData = data;
      filterData = data.filter(item => item.name.includes(value))

      return sortData(filterData, currentSort)
   }
}