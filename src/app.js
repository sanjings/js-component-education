import $ from 'jquery'

import 'assets/styles/reset.css'
import 'assets/styles/border.css'
import 'assets/fonts/iconfont.css'

import 'assets/scripts/common.js'
import '@/mock/home.js'

import Loading from 'components/Loading'

export default class App {
   constructor(getDatas) {
      this.name = 'App'
      this.$app = $('<div id="app" class="container"></div>')
      this.getDatas = getDatas

      this.init()
   }

   async init() {
      this.initLoading()
      const retData = await this.getDatas()
      $('body').html('')
      this.render(retData)
   }

   initLoading() {
      const loadingTpl = new Loading().tpl('加载中...')
      $('body').html(loadingTpl)
   }
}