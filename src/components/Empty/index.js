import tpl from './index.ejs'

import './index.scss'

export default class Empty {
   constructor(props = {}) {
      this.name = 'Empty'
      this.$container = props.$container
      this.label = props.label || ''
   }

   init() {
      this.render()
   }

   render() {
      this.$container.append(this.tpl(this.label))
   }

   tpl(label) {
      return tpl({ label })
   }
}