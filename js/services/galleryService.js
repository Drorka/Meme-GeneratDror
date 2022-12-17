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
  {
    id: '017',
    url: 'imgs/017.jpg',
    keywords: ['tutit', 'titbey bayarden', 'תותית', 'תטבעי בירדן'],
  },
  {
    id: '018',
    url: 'imgs/018.jpg',
    keywords: ['milel', 'et haneshima', 'מלעיל', 'ניקח את הנשימה'],
  },
  {
    id: '019',
    url: 'imgs/019.jpg',
    keywords: ['tutit', 'window', 'תותית', 'ווינדו'],
  },
  {
    id: '020',
    url: 'imgs/020.jpg',
    keywords: [
      'tutit',
      'milel',
      'darkey noam',
      'lo bematzav',
      'תותית',
      'מלעיל',
      'בדרכי נועם ובנתיבות יפות',
      'לא במצב כרגע',
    ],
  },
  {
    id: '021',
    url: 'imgs/021.jpg',
    keywords: ['tutit', 'sabich', 'תותית', 'סביח יעשה לי טוב'],
  },
  {
    id: '022',
    url: 'imgs/022.jpg',
    keywords: ['tutit', 'mitporeret', 'תותית', 'מתפוררת'],
  },
  {
    id: '023',
    url: 'imgs/023.jpg',
    keywords: [
      'tutit',
      'mefageret kazot',
      'תותית',
      'מפגרת כזאת סתומה אין מילים',
    ],
  },
  {
    id: '024',
    url: 'imgs/024.jpg',
    keywords: ['tutit', 'lo hevanti', 'תותית', 'לא הבנתי'],
  },
  {
    id: '025',
    url: 'imgs/025.jpg',
    keywords: [
      'tutit',
      'milel',
      'energiot',
      'תותית',
      'מלעיל',
      'אנרגיות על הפנים',
    ],
  },
  {
    id: '026',
    url: 'imgs/026.jpg',
    keywords: ['tutit', 'milel', 'isha kashs', 'תותית', 'מלעיל', 'את אישה קשה'],
  },
  {
    id: '027',
    url: 'imgs/027.jpg',
    keywords: [
      'tutit',
      'milel',
      'tona osher tona sars',
      'תותית',
      'מלעיל',
      'מאחלת לך טונה אושר טונה סארס',
    ],
  },
  {
    id: '028',
    url: 'imgs/028.jpg',
    keywords: ['tutit', 'ma kashur lamut', 'תותית', 'מה קשור למות עכשיו'],
  },
  {
    id: '029',
    url: 'imgs/029.jpg',
    keywords: [
      'tutit',
      'milel',
      'darel',
      'humor berama gvoha',
      'תותית',
      'מלעיל',
      'דראל',
      'הומור כזה ברמה גבוהה',
    ],
  },
  {
    id: '030',
    url: 'imgs/030.jpg',
    keywords: [
      'tutit',
      'hamakom hashafel haze',
      'תותית',
      'חשבתי סיימתי עם המקום השפל הזה',
    ],
  },
  {
    id: '031',
    url: 'imgs/031.jpg',
    keywords: ['milel', 'benny goren li', 'מלעיל', 'זה בני גורן לי'],
  },
  {
    id: '032',
    url: 'imgs/032.jpg',
    keywords: ['tutit', 'sliha', 'תותית', 'תסלחי לי סליחה'],
  },
  {
    id: '033',
    url: 'imgs/033.jpg',
    keywords: ['tutit', 'lo', 'תותית', 'לא'],
  },
  {
    id: '034',
    url: 'imgs/034.jpg',
    keywords: ['ronando', 'רוננדו'],
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
      width: 200,
      isDrag: false,
    },
    {
      txt: 'Enter text',
      size: 40,
      align: 'center',
      color: 'white',
      posX: 0,
      posY: 0,
      width: 200,
      isDrag: false,
    },
  ],
}

// * set and update gMeme
function setGmemeLinePos(canvasCenter) {
  //   if (gMeme.lines[0].posx !== null) return
  if (gMeme.lines[gMeme.selectedLineIdx].isDrag) return
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
        width: 200,
        isDrag: false,
      },
      {
        txt: 'Enter text',
        size: 40,
        align: 'center',
        color: 'white',
        posX: 0,
        posY: 0,
        width: 200,
        isDrag: false,
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

function prevNextLine(dir) {
  if (!gMeme.lines.length) return

  if (dir === 'next') {
    // On last line go back to first line
    if (gMeme.selectedLineIdx > gMeme.lines.length) gMeme.selectedLineIdx = 0
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
      gMeme.selectedLineIdx = 0
    } else {
      // Move to next line
      gMeme.selectedLineIdx++
    }
  } else if (dir === 'prev') {
    // On first line go back to last line
    if (gMeme.selectedLineIdx < 0)
      gMeme.selectedLineIdx = gMeme.lines.length - 1
    else gMeme.selectedLineIdx--
  }
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

// * get stuff
// galley
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

// meme
function getGMeme() {
  const meme = gMeme
  return meme
}

function getSelectedLineIdx() {
  const selectedLineIdx = gMeme.selectedLineIdx
  return selectedLineIdx
}

// * user memes
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

// * drag n drop
//Check if the click is on the line
function isLineClicked(clickedPos) {
  const posX = gMeme.lines[gMeme.selectedLineIdx].posX
  const posY = gMeme.lines[gMeme.selectedLineIdx].posY
  console.log('isLineClicked. gMeme line pos:', posX, posY)
  // Calc the distance between two dots
  const distance = Math.sqrt(
    (posX - clickedPos.x) ** 2 + (posY - clickedPos.y) ** 2
  )
  console.log('distance', distance)
  console.log('line width', gMeme.lines[gMeme.selectedLineIdx].width)

  //If its smaller then the line we are inside
  if (distance <= 200) {
    return true
  } else {
    return false
  }
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
  console.log('is line drag?', gMeme.lines[gMeme.selectedLineIdx].isDrag)
}

// Move the line in a delta, diff from the pervious pos
function moveLine(dx, dy) {
  console.log('were in move line', dx, dy)
  console.log('gMeme X', gMeme.lines[gMeme.selectedLineIdx].posX)
  console.log('gMeme Y', gMeme.lines[gMeme.selectedLineIdx].posY)
  gMeme.lines[gMeme.selectedLineIdx].posX += dx
  gMeme.lines[gMeme.selectedLineIdx].posY += dy
  console.log('gMeme X', gMeme.lines[gMeme.selectedLineIdx].posX)
  console.log('gMeme Y', gMeme.lines[gMeme.selectedLineIdx].posY)
}
