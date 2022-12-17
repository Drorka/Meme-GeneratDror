'use strict'
console.log('meme controller')

let gElCanvas
let gCtx
let gStartPos
let isDrag = false
// let gIsUserImg = false

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  renderGallery()
  console.log('gmeme', gMeme)
  gElCanvas = document.getElementById('my-canvas')
  gCtx = gElCanvas.getContext('2d')
  console.log(gCtx)
  addListeners()
  resizeCanvas()
  renderUserMemeToCanvas()
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

// todo handle drag&drop and on-canvas editing
// function onDown(ev) {
//   // Get the ev pos from mouse or touch
//   const pos = getEvPos(ev)
//   // if (!isLineClicked(pos)) return
//   isDrag = true
//   //Save the pos we start from
//   gStartPos = pos
//   //   draw(pos)
//   console.log(pos)
//   console.log('down')
//   console.log(gStartPos)
//   document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {
//   // const { isDrag } = getCircle()

//   if (!isDrag) return

//   const pos = getEvPos(ev)
//   console.log('move')
//   console.log(pos)
//   // Calc the delta , the diff we moved
//   // const dx = pos.x - gStartPos.x
//   // const dy = pos.y - gStartPos.y
//   //   draw(pos)
//   // moveCircle(dx, dy)
//   // Save the last pos , we remember where we`ve been and move accordingly
//   gStartPos = pos
//   // The canvas is render again after every move
//   // renderCanvas()
// }

// function onUp(ev) {
//   isDrag = false
//   console.log('up')
//   document.body.style.cursor = 'auto'
// }

// function getEvPos(ev) {
//   // Gets the offset pos , the default pos
//   let pos = {
//     x: ev.offsetX,
//     y: ev.offsetY,
//   }
//   // Check if its a touch ev
//   if (TOUCH_EVS.includes(ev.type)) {
//     console.log('touch ev:', ev)
//     //soo we will not trigger the mouse ev
//     ev.preventDefault()
//     //Gets the first touch point
//     ev = ev.changedTouches[0]
//     //Calc the right pos according to the touch screen
//     pos = {
//       x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//       y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//     }
//   }
//   return pos
// }

// * rendering to the canvas
function renderUserMemeToCanvas() {
  // check if the gmeme storage exist and open the editor if it does
  if (loadFromStorage(GMEME_STORAGE_KEY)) openEditor()
}

function openEditor() {
  document.querySelector('.main-editor').classList.remove('hide')
}

// open img in canvas
function renderMeme() {
  // img
  renderMemeImg()

  // txt - after img is ready
  renderMemeImg().onload = () => {
    renderMemeTxt()
  }
}

function renderMemeImg() {
  let currImg = getCurrImg()
  const img = new Image()
  img.src = currImg
  const imgNatDimensions = getImgNatDimensions(img)
  setCanvasSize(imgNatDimensions)
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
  return img
}

function renderMemeTxt() {
  setLinesPos()
  const meme = getGMeme()
  meme.lines.forEach((line, idx) => {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = line.align
    gCtx.textBaseline = 'middle'
    if (idx === 0) {
      gCtx.fillText(line.txt, line.posX, line.posY)
      gCtx.strokeText(line.txt, line.posX, line.posY)
    } else if (idx === 1) {
      gCtx.fillText(line.txt, line.posX, line.posY)
      gCtx.strokeText(line.txt, line.posX, line.posY)
    } else {
      gCtx.fillText(line.txt, line.posX, line.posY)
      gCtx.strokeText(line.txt, line.posX, line.posY)
    }
  })
}

// * set canvas size and position lines
function setLinesPos() {
  const canvasCenter = getCenter()
  setGmemeLinePos(canvasCenter)
}

function getCenter() {
  const center = {
    xCenter: gElCanvas.width / 2,
    yCenter: gElCanvas.height / 2,
  }
  return center
}

function getImgNatDimensions(img) {
  var imgHeight = img.naturalHeight
  var imgWidth = img.naturalWidth
  let imgNatDimensions = [imgHeight, imgWidth]
  return imgNatDimensions
}

function setCanvasSize(imgNatDimensions) {
  let imgH = imgNatDimensions[0]
  let imgW = imgNatDimensions[1]
  gElCanvas.width = 600
  gElCanvas.height = (imgH * gElCanvas.width) / imgW
}

// * edit meme
function onInputText(ev) {
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

function onPrevNextLine(dir) {
  prevNextLine(dir)
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

function onRemoveLine() {
  removeLine()
  renderMeme()
}

// * save meme
function onSaveMeme() {
  const memeUrl = gElCanvas.toDataURL()
  saveMeme(memeUrl)
}

// * download meme
function downloadCanvas(elLink) {
  //Protect the image so attacker could not download imgs from diff domain
  const data = gElCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
  //This protects users from having private data exposed by using images
  // to pull information from remote web sites without permission.
  elLink.href = data
  elLink.download = 'my-img.jpg'
}

// * share meme
function onUploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    // Encode the instance of certain characters in the url
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    )
  }
  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}

// todo user upload
// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev) {
  console.log('on img input')
  gIsUserImg = true
  loadImageFromInput(ev, renderMeme)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
  console.log('load img from input')
  const reader = new FileReader()
  // After we read the file
  reader.onload = (event) => {
    let img = new Image() // Create a new html img element
    img.src = event.target.result // Set the img src to the img file we read
    // Run the callBack func, To render the img on the canvas
    img.onload = () => onImageReady(img)
  }

  reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

// ! drag n drop inclass
// * controller
function onDown(ev) {
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  console.log('down here', pos)
  if (!isLineClicked(pos)) return

  console.log('were on a line')
  setLineDrag(true)
  console.log('set line drag worked')
  //Save the pos we start from
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  //   const { isDrag } = getG()
  const selectedLineIdx = getSelectedLineIdx()
  console.log('on move selected line idx', selectedLineIdx)
  const isDrag = getGMeme().lines[selectedLineIdx].isDrag
  console.log('on move - id drag?', isDrag)

  if (!isDrag) return

  const pos = getEvPos(ev)
  console.log('ev pos', pos)
  // Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  console.log('deltas x y', dx, dy)
  moveLine(dx, dy)
  // Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos
  // The canvas is render again after every move
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    console.log('ev:', ev)
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
