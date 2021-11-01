const rand = function (min, max) {
  return Math.floor(Math.random() * max)
}

const Confetti = function (element, options) {
  if (!options) options = {}

  this.minSize = options.minSize || 15
  this.maxSize = options.maxSize || 17
  this.frequency = options.frequency || 15
  this.palettes = options.palettes || [
    '#EF2964',
    '#00C09D',
    '#2D87B0',
    '#48485E',
    '#EFFF1D'
  ]
  this.speeds = options.speeds || ['low', 'medium', 'high']
  this.element = element
  this.setup()
}

Confetti.prototype.setup = function () {
  this.containerEl = document.createElement('div')
  this.containerEl.classList.add('confetti-container-inner')
  this.element.style.position = 'realtive'
  this.element.appendChild(this.containerEl)
}

Confetti.prototype.start = function () {
  this.interval = setInterval(this.render.bind(this), this.frequency)
}

Confetti.prototype.stop = function () {
  clearInterval(this.interval)
}

Confetti.prototype.render = function () {
  const item = document.createElement('div')
  const speed = this.speeds[rand(0, this.speeds.length)]
  const palette = this.palettes[rand(0, this.palettes.length)]
  const size = rand(this.minSize, this.maxSize)
  const startOffset = rand(0, this.containerEl.offsetWidth)
  const isCircle = rand(0, 3) === 0

  let timeout = 1700

  if (speed === 'low') {
    timeout = 2900
  } else if (speed === 'medium') {
    timeout = 2200
  }

  item.classList.add('confetti-item', speed)
  item.style.backgroundColor = palette
  item.style.width = size + 'px'
  item.style.height = size + 'px'
  item.style.left = startOffset + 'px'

  if (isCircle) {
    item.classList.add('circle')
  }

  this.containerEl.appendChild(item)

  setTimeout(() => {
    this.containerEl.removeChild(item)
  }, timeout)
}

const conf = new Confetti(document.querySelector('.confetti-container'))

conf.start()
