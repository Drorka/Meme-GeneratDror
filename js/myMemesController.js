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
      `<img onclick="onUserMemeClick(this)" class="card-img" data-id="${userMeme.id}" src="${userMeme.canvasImg}" />`
  )

  const elGalleryContainer = document.querySelector('.img-container')
  elGalleryContainer.innerHTML = strHTMLs.join('')
}
