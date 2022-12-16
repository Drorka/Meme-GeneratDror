'use strict'
console.log('controller')

function renderGallery() {
  console.log('render gallery')
  const imgs = getGImgs()
  const strHTMLs = imgs.map(
    (img) =>
      `<img onclick="onImgClick(this)" class="card-img" data-id="${img.id}" data-kws="${img.keywords}" src="${img.url}" />`
  )

  const elGalleryContainer = document.querySelector('.img-container')
  elGalleryContainer.innerHTML = strHTMLs.join('')
}

// recieve user search input
function onSetFilterByTxt(val) {
  console.log(val)
  const searchTxt = val.toLowerCase()
  onSetFilterBy({ searchTxt: searchTxt })
  renderGallery()
}

// recieve user tag click
function onSetFilterByTag(elTag) {
  if (elTag.innerText === '#All') {
    onSetFilterBy({ searchTxt: '' })
    renderGallery()
  } else {
    const tag = elTag.innerText.substring(1).toLowerCase()
    console.log(tag)
    onSetFilterBy({ searchTxt: tag })
    renderGallery()
  }
}

function onImgClick(elImg) {
  console.log(elImg)
  // reset gMeme to clean all user inputs
  resetGMeme()
  // clean gmemestorage so it won't load user existing meme
  window.localStorage.removeItem(GMEME_STORAGE_KEY)
  // update gmeme
  setImg(elImg.dataset.id)
  console.log(gMeme)
  // upload img to canvas
  renderMeme()
  // display editor
  openEditor()
}

// mobile - hamburger menu
function toggleMenu() {
  document.body.classList.toggle('menu-open')
}
