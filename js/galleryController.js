'use strict'
console.log('controller')

let gElCanvas
let gCtx
let gStartPos
let isDrag = false

// * general page functions and interactions
function onInit() {
  renderGallery()
  gElCanvas = document.getElementById('my-canvas')
  gCtx = gElCanvas.getContext('2d')
  console.log(gCtx)
  addListeners()
  // resizeCanvas()
}

// todo
function onNavClick() {
  // gallery:
  // go to gallery page
  // close editor if open
  // logo
  // go to gallery page
  // close editor if open
  // my memes
  // go to my memes page
  // about
  // go to about page
}

// * gallery interactions

function renderGallery() {
  const imgs = getGImgs()
  const strHTMLs = imgs.map(
    (img) =>
      `<img onclick="onImgClick(this)" class="card-img" data-id="${img.id}" data-kws="${img.keywords}" src="${img.url}" />`
  )

  const elGalleryContainer = document.querySelector('.img-container')
  elGalleryContainer.innerHTML = strHTMLs.join('')
}

// todo
function onSearchTxt() {
  // filter imgs by keywords matching the input
}

// todo
function onTagFilter() {
  // filter imgs by keywords matching the tag keyword
}

// todo
function onImgClick(elImg) {
  console.log(elImg)
  // todo display editor
  // update gmeme
  setImg(elImg.dataset.id)
  // upload img to canvas
  renderMeme(elImg.src)
  //todo fit canvas size to img
}

// * canvas
// Handle the listeners
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  // Listen for resize ev
  window.addEventListener('resize', () => {
    resizeCanvas()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onMove() {}
function onDown() {}
function onUp() {}

// open img in canvas
function renderMeme(src) {
  const elImg = new Image() // Create a new html img element
  elImg.src = src // Send a network req to get that image, define the img src
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  // line of text on top
  const meme = getGMeme()
  const { txt, size, align, color } = meme.lines[0]
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.font = `${size}px Impact`
  gCtx.textAlign = align
  gCtx.textBaseline = 'middle'
  gCtx.fillText(txt, 300, 40)
  gCtx.strokeText(txt, 300, 40) // Draws (strokes) a given text at the given (x, y) position.
}

// edit meme
function onInputText(ev) {
  console.log(ev)
  console.log(ev.data)
  setLineTxt(ev.data)
  renderMeme()
}
