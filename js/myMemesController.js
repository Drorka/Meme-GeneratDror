'use strict'
console.log('my memes controller')

function onMyMemesInit() {
  renderUserMemes()
}

function renderUserMemes() {
  const userMemes = getUserMemes()
  console.log(userMemes)
  const strHTMLs = userMemes.map(
    (userMeme) =>
      `
	  <div class="user-meme-container">
	  	<img onclick="onUserMemeClick(this)" class="card-img user-meme" data-id="${userMeme.id}" src="${userMeme.canvasImg}" />
	  	<button onclick="onRemoveUserMeme(this)" data-id="${userMeme.id}" class="remove-meme-btn"><i class="fa-solid fa-trash"></i></button>
	  </div> 
	  `
  )

  const elGalleryContainer = document.querySelector('.img-container')
  elGalleryContainer.innerHTML = strHTMLs.join('')
}

function onUserMemeClick(elMeme) {
  console.log(elMeme.dataset.id)

  const userMemes = getUserMemes()
  const userMemeToRender = userMemes.find(
    (userMeme) => userMeme.id === elMeme.dataset.id
  )
  console.log(userMemeToRender)

  gMeme = userMemeToRender
  saveToStorage(GMEME_STORAGE_KEY, gMeme)
  console.log(gMeme)

  window.location.assign('index.html')
}

function onRemoveUserMeme(elBtn) {
  console.log(elBtn)
  removeUserMeme(elBtn.dataset.id)
  renderUserMemes()
}

function removeUserMeme(userMemeId) {
  const userMemeIdx = gUserMemes.findIndex(
    (userMeme) => userMemeId === userMeme.id
  )
  console.log(userMemeIdx)
  gUserMemes.splice(userMemeIdx, 1)
  saveToStorage(STORAGE_KEY, gUserMemes)

  window.localStorage.removeItem(GMEME_STORAGE_KEY)
}
