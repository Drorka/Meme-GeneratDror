'use strict'

console.log('service')

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

var gMeme = {
  selectedImgId: '000',
  selectedLineIdx: '0',
  lines: [
    {
      txt: 'Enter text',
      size: 40,
      align: 'center',
      color: 'white',
    },
  ],
}

// set and update gMeme
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

// get stuff
function getCurrImg() {
  let currImg = gImgs.find((img) => img.id === gMeme.selectedImgId)
  return currImg.url
}

function getGImgs() {
  const imgs = gImgs
  return imgs
}

function getGMeme() {
  const meme = gMeme
  return meme
}
