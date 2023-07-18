
import './index.html';
import './index.scss';
import my from './img/my.mp3'

// import {mult, sum } from './modules/calc';
// import bike from './img/bike.jpg'

// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = bike;
// img.width = 500;
// imgWrap.append(img);

// console.log( sum(4, 5))
// console.log( mult(4, 5))

const body = document.querySelector("body");
const title = document.createElement('h1');
const blockBtn = document.createElement('div');
const btnShuffle = document.createElement('button');
const btnStop = document.createElement('button');
const btnSave = document.createElement('button');
const btnResults = document.createElement('button');
const arrAllBtns = [];
const dataGame = document.createElement('div');

function create(varName, className, text){
   varName.classList.add(className);
   varName.textContent = text;
}
function putElemToBody (elem, parent){
  parent.appendChild(elem);
}
// Title
create(title,'title', 'Gem Puzzle')
putElemToBody (title, body);

//Block buttons manage
create(blockBtn,'buttons',)        //
putElemToBody (blockBtn, body);

arrAllBtns.push(btnShuffle,btnStop,btnSave,btnResults);
create(btnShuffle,'btnShuffle', 'Shuffle and start')
create(btnStop,'btnStop', 'Stop')
create(btnSave,'btnSave', 'Save')
create(btnResults,'btnResults', 'Results')

arrAllBtns.forEach((element) => {
   blockBtn.appendChild(element)
});

//Block data Game
create(dataGame, 'datagame',)
putElemToBody(dataGame, body);

const itemMoves = document.createElement('p')
const numberMoves = document.createElement('p')
const itemTime = document.createElement('p')
const numberTime = document.createElement('p')

const arrCurStatus = [];
arrCurStatus.push(itemMoves,numberMoves,itemTime,numberTime);
arrCurStatus.forEach(element => dataGame.appendChild(element))

create(itemMoves, 'current-status', "Moves:")
create(numberMoves, 'clicks', '0')
create(itemTime, 'current-status', "Time:")
create(numberTime, 'curTime', '00:00'  )



//Block Pazzle
const pazzleBlock = document.createElement('div')
putElemToBody(pazzleBlock, body);
create(pazzleBlock, 'pazzle-block',)
let size = 16;

function createPazzlez(size){
   const pazzles = new Array(size).fill(0).map( (item, index) => index + 1);

   pazzleBlock.insertAdjacentHTML('beforeend', pazzles
     .map(index => `<button class ="item" data-matrix-id="${index}"><span>${index}</span></button>`)
     .join('')
   );
   const item = Array.from(document.querySelectorAll('.item'))
   item.forEach( (elem) =>{
      elem.style.width =  100 / Math.sqrt(item.length) + '%';
      elem.style.height =  100 / Math.sqrt(item.length) + '%';
   })
}
createPazzlez(size);


//Blok Frame
const itemFrame = document.createElement('p');
const itemCurSize = document.createElement('span');
create(itemFrame, 'itemFrame', "Frame size:")
create(itemCurSize, 'itemCurSize', '4x4')
putElemToBody(itemFrame, body);
putElemToBody(itemCurSize, itemFrame);

//
const sizeBlock = document.createElement('div')
putElemToBody(sizeBlock, body);
create(sizeBlock, 'sizeBlock')

const sizeText = document.createElement('p')
putElemToBody(sizeText, sizeBlock);
create(sizeText, 'sizeText', 'Other size:')


const itemsInput = new Array(6).fill(0).map( (item, index) => index + 1);
sizeBlock.insertAdjacentHTML('beforeend', itemsInput
  .map(index => `<label for="${index}">${index + 2}x${index + 2}</label>
  <input class="input-item" type="checkbox" id="${index}" value="${Math.pow(index + 2, 2)}">`)
  .join('')
);

//Choice size


let winFlatArr = new Array(size).fill(0).map((item, i) => i +1);
startGame ()
const inputItems = Array.from(document.querySelectorAll('.input-item'));
inputItems.forEach((elem) =>{
   elem.addEventListener('input', () => {
      clearTimeout(t);
      curTime.textContent = "00:00";
      document.querySelector('.itemCurSize').textContent = Math.sqrt(elem.value) +'x'+ Math.sqrt(elem.value);
      
      const item = document.querySelectorAll('.item')
      item.forEach( (elem) =>{
         elem.remove();
      } )
       size = Number(elem.value)
      createPazzlez(size);
      startGame ();
      winFlatArr = new Array(size).fill(0).map((item, i) => i +1);

   } )
})

//Set position-----------------------



function startGame (){

   
   let clicks = 0;
const arrPazzleItem = Array.from(document.querySelectorAll('.item'));
arrPazzleItem[arrPazzleItem.length - 1].style.display = 'none';
function getMatrix(arr) {
       const size = Math.sqrt(arr.length) 
      const res = []; 
      for( let i=0; i < arr.length; i = i + size)
      res.push(arr.slice(i,i+size));
      return res;
    }

    let matrix = getMatrix(arrPazzleItem.map((item) => Number(item.dataset.matrixId)));
    setPositionItem(matrix);

function setPositionItem(matrix){
   for( let y = 0; y < matrix.length; y++){
      for( let x = 0; x < matrix[y].length; x++){
         const value = matrix[y][x];
         const item = arrPazzleItem[value - 1]
         setItemStyles(item, x, y,)
      }
   }
}

function setItemStyles(elem, x, y,){
   const offset = 100;
   elem.style.transform = `translate3D( ${ x * offset}%, ${ y * offset}%, 0)`
}

const maxShuffleCount = 300;
let timer;

btnShuffle.addEventListener('click', shuffle);

function shuffle (){
clicks = 0;
document.querySelector('.clicks').textContent = clicks;


clearInterval(timer);
  let shuffleCount = 0;
     if(shuffleCount === 0){
        timer = setInterval(() =>{
           randomSwap(matrix);
           setPositionItem(matrix);

           shuffleCount += 1;

           if(shuffleCount > maxShuffleCount ){
              clearInterval(timer);
           }
        }, 5)
     }
  }

shuffle ()

 let blockedCoords = null;
function randomSwap(matrix){
   const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
   const validCoords = findValidCoords({
      blankCoords,
      matrix,
      blockedCoords
   })
   const swapCoords = validCoords[
      Math.floor(Math.random() * validCoords.length )
   ]
   swap(blankCoords, swapCoords, matrix );
   blockedCoords = blankCoords
}
function findValidCoords({blankCoords, matrix, blockedCoords}){
   const validCoords = [];
   for( let y = 0; y < matrix.length; y++){
      for( let x = 0; x < matrix[y].length; x++){
         if(isValidForSwap({x ,y}, blankCoords)){
            if( !blockedCoords || !(blockedCoords.x === x && blockedCoords.y === y)  ){
               validCoords.push({x, y})
            }
         }
      }
   }
   return validCoords;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
 }

// Change position

const blankNumber = arrPazzleItem.length;

pazzleBlock.addEventListener('click', (event) =>{
   
   const buttonItem = event.target.closest('button');
   if(!buttonItem) return;

   const buttonNumber = Number(buttonItem.dataset.matrixId);
   const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
   const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
   const isValid = isValidForSwap(buttonCoords, blankCoords);
   if(isValid){
      playAudio();
      swap(blankCoords, buttonCoords, matrix);
      setPositionItem(matrix);
      clicks += 1;
      document.querySelector('.clicks').textContent = clicks;
      if(clicks == 1){

         timerr();
      }
   }
});

function findCoordinatesByNumber( number, matrix){
   for( let y = 0; y < matrix.length; y++){
      for( let x = 0; x < matrix[y].length; x++){
         if( matrix[y][x] === number){
            return {x, y};
          }
         }
      }
      return null;
   }

function isValidForSwap(coords1, coords2){
      const diffX = Math.abs(coords1.x - coords2.x )
      const diffY = Math.abs(coords1.y - coords2.y )
      return (diffX === 1 || diffY === 1 ) && (coords1.x === coords2.x || coords1.y === coords2.y )
   }
function swap(coords1, coords2, matrix ){
      const coords1Number = matrix[coords1.y][coords1.x]
      matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
      matrix[coords2.y][coords2.x] =  coords1Number;

      if(isWon(matrix)){
         setTimeout(() =>{
            const curTime = document.querySelector('.curTime')
            const textTime = curTime.textContent
            alert(`«Ура! Вы решили головоломку за ${textTime} и ${clicks} ходов!»`);
            
           
            clearTimeout(t);
            curTime.textContent = "00:00";
            sec = 0;
            min = 0;
            clicks = 0;
            document.querySelector('.clicks').textContent = clicks;
         }, 300)
      }
   }

}

function isWon(matrix){
   const flatMatrix = matrix.flat();
      for( let i = 0; i < winFlatArr.length; i++){
         if( flatMatrix[i] !== winFlatArr[i]){
            return false
         }
      }
   return true
}

//Timer
let curTime = document.querySelector('.curTime')
let t;
let sec = 0;
let min = 0;

   function tick(){
      sec++;
      if (sec >= 60) {
          sec = 0;
          min++;
      }
  }

  function add() {
      tick();
      curTime.textContent =  (min > 9 ? min : "0" + min)+ ":" + (sec > 9 ? sec : "0" + sec);
      timerr();
  }
  function timerr() {
      t = setTimeout(add, 1000);
  }


document.querySelector('.btnShuffle').addEventListener('click', function() {
clearTimeout(t);
 sec = 0;
 min = 0;
 curTime.textContent = "00:00";

 })
const inputItemSize = document.querySelectorAll('.input-item');
inputItemSize.forEach((elem) =>{
   elem.addEventListener('click', function() {
      clearTimeout(t);
      sec = 0;
      min = 0;
      curTime.textContent = "00:00";
    })
})



//-------------
dataGame.insertAdjacentHTML('beforeend', `<input type="checkbox" id="checkbox"><label for="rbtn">on off sound</label>`);
const audio = new Audio();
audio.src = my;
const checkBox = document.querySelector('#checkbox');
function playAudio(){
   if(checkBox.checked) audio.play(); 
}
//---------


