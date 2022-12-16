'use strict'
console.log('controller')

// * general page functions and interactions

// todo
function onNavClick() {
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
  // reset gMeme to clean all user inputs
  resetGMeme()
  // clean gmemestorage so it won't load user existing meme
  window.localStorage.removeItem(GMEME_STORAGE_KEY)
  // update gmeme
  setImg(elImg.dataset.id)
  console.log(gMeme)
  // upload img to canvas
  renderMeme()
  //todo fit canvas size to img
  // display editor
  openEditor()
}
