import $ from 'jquery'

import storage from 'utils/storage'
import { throttle } from 'utils/tools'

import tpl from './ejs/index.ejs'
import hotTpl from './ejs/hotSearch.ejs'
import recordsTpl from './ejs/searchRecords.ejs'

import './index.scss'

export default class Search {
   constructor(props = {}) {
      this.name = 'SearchBox'
      this.$container = props.$container
      this.hotSearchData = props.hotSearchData
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
         hotSearch: this.hotTpl(this.hotSearchData),
         searchRecords: this.recordsTpl()
      })
   }
   
   hotTpl(data) {
      return hotTpl({ data })
   }

   recordsTpl() {
      const searchRecords = storage.getItem('searchRecords');

      return recordsTpl({
         data: searchRecords ? searchRecords.slice(0, 3) : []
      })
   }

   bindEvent() {
      const $searchBox = $('.js_searchBox'),
            $search = $searchBox.find('.search'),
            $inputSearch = $searchBox.find('.input-search'),
            $hotSearch = $searchBox.find('.hot-search'),
            $clear = $searchBox.find('.clear'),
            $cancel = $searchBox.find('.cancel'),
            $delete = $searchBox.find('.delete'),
            $searchRecords = $searchBox.find('.search-records'),
            $clearRecords = $searchRecords.find('.clear-records');
      
      $search.on('click', { $inputSearch }, this.searchAction.bind(this))
      $inputSearch.on('input', { $clear }, throttle(this.inputAction.bind(this), 300))
      $cancel.on('click', { $searchBox }, this.cancelAction.bind(this))
      $hotSearch.on('click', '.hot-item', this.hotSearchAction.bind(this))
      $clear.on('click', { $inputSearch }, this.clearAction.bind(this))
      $delete.on('click', this.deleteRecordItemAction.bind(this))
      $clearRecords.on('click', { $searchRecords }, this.clearAllRecordsAction.bind(this))
      $searchRecords.on('click', '.record-item', this.searchRecordAction.bind(this))
   }

   searchAction(e) {
      const { $inputSearch } = e.data,
            keywords = $inputSearch.val();

      if (keywords) {
         const searchRecords = storage.getItem('searchRecords') || []
         storage.setItem('searchRecords', [keywords, ...searchRecords])
      }
      
      this.goList(keywords)
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

   hotSearchAction(e) {
      const $target = $(e.target),
            keywords = $target.text();

      this.goList(keywords)
   }

   searchRecordAction(e) {
      const $target = $(e.target),
            keywords = $target.find('p').text();

      this.goList(keywords)
   }

   cancelAction(e) {
      const { $searchBox } = e.data;

      $searchBox.css('display', 'none')
   }

   clearAction(e) {
      const { $inputSearch } = e.data;

      $inputSearch.val('')
      e.target.style.display = 'none'
   }

   deleteRecordItemAction(e) {
      e.stopPropagation();

      const $target = $(e.target),
            $item = $target.parent(),
            itemValue = $target.siblings('p').text(),
            searchRecords = storage.getItem('searchRecords');
      
      $item.remove()
      storage.setItem('searchRecords', searchRecords.filter(item => item !== itemValue))
   }

   clearAllRecordsAction(e) {
      const { $searchRecords } = e.data;

      storage.setItem('searchRecords', [])
      $searchRecords.html('')
   }

   goList(keywords) {
      window.location.replace(`./list.html?search=${keywords}`)
   }
}