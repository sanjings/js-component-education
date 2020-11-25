import FastClick from 'fastclick'

document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px'

window.addEventListener('load', () => {
   FastClick.attach(document.body)
}, false)

document.documentElement.addEventListener('touchmove', (event) => {
   if (event.touches.length > 1) {
      event.preventDefault()
   }
}, false)