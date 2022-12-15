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
  renderMeme()
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

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  // Note: changing the canvas dimension this way clears the canvas
  console.log(elContainer.offsetWidth)
  gElCanvas.width = elContainer.offsetWidth - 20
  console.log(gElCanvas.width)
  // Unless needed, better keep height fixed.
  gElCanvas.height = elContainer.offsetHeight - 20
  renderMeme()
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
function renderMeme() {
  // img
  let currImg = getCurrImg()
  const img = new Image()
  img.src = currImg
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

  // txt
  renderMemeTxt()
  // line of text on top
  // const meme = getGMeme()
  // const txt0 = meme.lines[0].txt
  // const size0 = meme.lines[0].size
  // const align0 = meme.lines[0].align
  // const color0 = meme.lines[0].color
  // gCtx.lineWidth = 2
  // gCtx.strokeStyle = 'black'
  // gCtx.fillStyle = color0
  // gCtx.font = `${size0}px Impact`
  // gCtx.textAlign = align0
  // gCtx.textBaseline = 'middle'
  // gCtx.fillText(txt0, 300, 40)
  // gCtx.strokeText(txt0, 300, 40) // Draws (strokes) a given text at the given (x, y) position.

  // // line of text on bottom
  // const txt1 = meme.lines[1].txt
  // const size1 = meme.lines[1].size
  // const align1 = meme.lines[1].align
  // const color1 = meme.lines[1].color
  // gCtx.lineWidth = 2
  // gCtx.strokeStyle = 'black'
  // gCtx.fillStyle = color1
  // gCtx.font = `${size1}px Impact`
  // gCtx.textAlign = align1
  // gCtx.textBaseline = 'middle'
  // gCtx.fillText(txt1, 300, 300)
  // gCtx.strokeText(txt1, 300, 300) // Draws (strokes) a given text at the given (x, y) position.
}

function renderMemeTxt() {
  const { xCenter, yCenter } = getCenter()
  const meme = getGMeme()
  meme.lines.forEach((line, idx) => {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = line.align
    gCtx.textBaseline = 'middle'
    if (idx === 0) {
      gCtx.fillText(line.txt, xCenter, yCenter - gElCanvas.height / 3)
      gCtx.strokeText(line.txt, xCenter, yCenter - gElCanvas.height / 3)
    } else if (idx === 1) {
      gCtx.fillText(line.txt, xCenter, yCenter + gElCanvas.height / 3)
      gCtx.strokeText(line.txt, xCenter, yCenter + gElCanvas.height / 3)
    } else {
      gCtx.fillText(line.txt, xCenter, yCenter)
      gCtx.strokeText(line.txt, xCenter, yCenter)
    }
  })
}

function getCenter() {
  const center = {
    xCenter: gElCanvas.width / 2,
    yCenter: gElCanvas.height / 2,
  }
  return center
}

// edit meme
function onInputText(ev) {
  console.log(ev)
  setLineTxt(ev.target.value)
  renderMeme()
}

function onChangeTxtSize(diff) {
  console.log(diff)
  setTxtSize(diff)
  renderMeme()
}

function onChangeColor(clr) {
  console.log(clr)
  setTxtColor(clr)
  renderMeme()
}

function onSwitchLines() {
  switchLines()
  renderMeme()
}

function onChangeTxtDir(dir) {
  console.log(dir)
  setTxtDir(dir)
  renderMeme()
}

function onAddTextLine() {
  addLine()
  renderMeme()
}
