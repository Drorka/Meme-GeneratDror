'use strict'
console.log('gallery service')

const STORAGE_KEY = 'userMemes'
const GMEME_STORAGE_KEY = 'gMeme'

let gUserMemes = loadFromStorage(STORAGE_KEY) || []
let gFilterBy = { searchTxt: '' }

var gImgs = [
  {
    id: '001',
    url: 'imgs/001.jpg',
    keywords: ['tutit', 'maher', 'ronando', 'תותית', 'מהר', 'רוננדו'],
  },
  { id: '002', url: 'imgs/002.jpg', keywords: ['lirom', 'לירום'] },
  {
    id: '003',
    url: 'imgs/003.jpg',
    keywords: ['tutit', 'nu', 'phone', 'תותית', 'נו', 'טלפון'],
  },
  {
    id: '004',
    url: 'imgs/004.jpg',
    keywords: ['milel', 'pizza', 'pita', 'מלעיל', 'פיצה', 'פיתה'],
  },
  {
    id: '005',
    url: 'imgs/005.jpg',
    keywords: ['tutit', 'magilim', 'ba li gam', 'תות', 'מגעילים', 'בא לי גם'],
  },
  {
    id: '006',
    url: 'imgs/006.jpg',
    keywords: ['tutit', 'milel', 'shkarim', 'תותית', 'מלעיל', 'שקרים'],
  },
  {
    id: '007',
    url: 'imgs/007.jpg',
    keywords: ['tutit', 'isha', 'hazaka', 'תותית', 'אישה', 'חזקה'],
  },
  {
    id: '008',
    url: 'imgs/008.jpg',
    keywords: [
      'tutit',
      'omedet lamut',
      'tzhok batzad',
      'תותית',
      'עומדת למות',
      'צחוק בצד',
    ],
  },
  {
    id: '009',
    url: 'imgs/009.jpg',
    keywords: ['tutit', 'nitahonchu', 'hahamaj', 'תותית', 'חחמז', 'ביטחונצו'],
  },
  {
    id: '010',
    url: 'imgs/010.jpg',
    keywords: ['ronando', 'hahaha', 'רוננדו', 'חהחה'],
  },
  {
    id: '011',
    url: 'imgs/011.jpg',
    keywords: ['milel', 'tovaat', 'מלעיל', 'טובעת'],
  },
  {
    id: '012',
    url: 'imgs/012.jpg',
    keywords: ['tutit', 'wake up', 'תותית', 'מתעוררת'],
  },
  {
    id: '013',
    url: 'imgs/013.jpg',
    keywords: ['tutit', 'bdidim', 'תותית', 'בדידים'],
  },
  { id: '014', url: 'imgs/014.jpg', keywords: ['adi bitti', 'עדי ביטי'] },
  {
    id: '015',
    url: 'imgs/015.jpg',
    keywords: ['tutit', 'ugiot', 'תותית', 'חלום עם עוגיות'],
  },
  {
    id: '016',
    url: 'imgs/016.jpg',
    keywords: ['milel', 'teuna', 'hogegim', 'מלעיל', 'חוגגים', 'תאונה'],
  },
]

var gMeme = loadFromStorage(GMEME_STORAGE_KEY) || {
  selectedImgId: '000',
  selectedLineIdx: '0',
  lines: [
    {
      txt: 'Enter text',
      size: 40,
      align: 'center',
      color: 'white',
      posX: 0,
      posY: 0,
    },
    {
      txt: 'Enter text',
      size: 40,
      align: 'center',
      color: 'white',
      posX: 0,
      posY: 0,
    },
  ],
}

// set and update gMeme
function setGmemeLinePos(canvasCenter) {
  const { xCenter, yCenter } = canvasCenter
  gMeme.lines.forEach((line, idx) => {
    if (idx === 0) {
      line.posX = xCenter
      line.posY = yCenter / 3
    } else if (idx === 1) {
      line.posX = xCenter
      line.posY = yCenter * 1.6
    } else {
      line.posX = xCenter
      line.posY = yCenter
    }
  })
}

function resetGMeme() {
  gMeme = loadFromStorage(GMEME_STORAGE_KEY) || {
    selectedImgId: '000',
    selectedLineIdx: '0',
    lines: [
      {
        txt: 'Enter text',
        size: 40,
        align: 'center',
        color: 'white',
        posX: 0,
        posY: 0,
      },
      {
        txt: 'Enter text',
        size: 40,
        align: 'center',
        color: 'white',
        posX: 0,
        posY: 0,
      },
    ],
  }
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineTxt(char) {
  gMeme.lines[gMeme.selectedLineIdx].txt = char
}

function setTxtSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setTxtColor(clr) {
  gMeme.lines[gMeme.selectedLineIdx].color = clr
}

function switchLines() {
  if (!gMeme.lines.length) return
  // On last line go back to first line
  if (gMeme.selectedLineIdx > gMeme.lines.length) gMeme.selectedLineIdx = 0
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  } else {
    // Move to next line
    gMeme.selectedLineIdx++
  }
  console.log(gMeme.selectedLineIdx)
}

function setTxtDir(dir) {
  gMeme.lines[gMeme.selectedLineIdx].align = dir
}

function addLine() {
  const linesCount = gMeme.lines.length
  console.log(linesCount)

  const line = {
    txt: 'Enter text',
    fontSize: 40,
    align: 'center',
    color: 'white',
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
  const currLineIdx1 = gMeme.lines[gMeme.selectedLineIdx]
  const currLineIdx2 = gMeme.selectedLineIdx
  const lines = gMeme.lines
  console.log(currLineIdx1)
  console.log(currLineIdx2)
  console.log(lines)
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

// get stuff galley
function getCurrImg() {
  let currImg = gImgs.find((img) => img.id === gMeme.selectedImgId)
  return currImg.url
}

function getGImgs() {
  const imgs = gImgs
  if (!gFilterBy.searchTxt) return imgs
  let filteredImgs = gImgs.filter((img) =>
    img.keywords.find((kw) => kw.includes(gFilterBy.searchTxt))
  )
  return filteredImgs
}

// get stuff meme
function getGMeme() {
  const meme = gMeme
  return meme
}

// user memes
// save meme
function saveMeme(memeUrl) {
  gMeme.id = makeId()
  gMeme.canvasImg = memeUrl
  let currUserMeme = { ...gMeme }
  gUserMemes.push(currUserMeme)
  saveToStorage(STORAGE_KEY, gUserMemes)
}

// get user memes
function getUserMemes() {
  const userMemes = gUserMemes
  return userMemes
}

// share meme
function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)
  console.log('formData:', formData)
  // Send a post req with the image to the server
  fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
    .then((res) => res.text())
    .then((url) => {
      console.log('url:', url)
      onSuccess(url)
    })
}

// * gallery filters
// set filter
function onSetFilterBy(filterBy) {
  filterBy = setMemesFilter(filterBy)
  renderGallery()
}

function setMemesFilter(filterBy = {}) {
  if (filterBy.searchTxt !== undefined) gFilterBy.searchTxt = filterBy.searchTxt
  return gFilterBy
}
