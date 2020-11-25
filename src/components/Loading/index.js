import tpl from './index.ejs'

import './index.scss'

export default class Loading {
   constructor(props = {}) {
      this.name = 'Loading'
      this.$container = props.$container
      this.label = props.label
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