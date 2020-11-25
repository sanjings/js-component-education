import $ from 'jquery'
import tpl from './index.ejs'

import SearchBox from 'components/SearchBox'

import './index.scss'

export default class Header {
   constructor(props = {}) {
      this.name = 'Header'
      this.$container = props.$container
      this.title = props.title
      this.hotSearchData = props.hotSearchData
   }

   async init() {
      await this.render()
      this.bindEvent()
      this._initSearchBox()
   }

   _initSearchBox() {
      new SearchBox({
         $container: this.$container,
         hotSearchData: this.hotSearchData
      }).init()
   }

   render() {
      this.$container.append(this.tpl({
         title: this.title
      }))
   }

   tpl(data) {
      return tpl(data)
   }

   bindEvent() {
      const $logo = $('.js_logo'),
            $searchBtn = $('.js_searchBtn');

      $logo.on('click', this.handleGoHome.bind(this))
      $searchBtn.on('click', this.showSearch.bind(this))
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
}