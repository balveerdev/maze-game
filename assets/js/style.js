// document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);

// document.querySelector('body').addEventListener('click', deleteLocation);

// function getLocationInfo(e) {
//     const zip = document.querySelector('.zip').Value;

//     fetch(`http://api.zippopotam.us/us/${zip}`)
//         .then(response => {
//             if (response.status != 200) {
//                 document.querySelector(`#output`).innerHTML = `<articl class="message is-danger"><div class="message-body">Invalid Zipcode, please try again</div></article>`;
//                 throw Error(response.statusText);
//             } else {
//                 return response.json();
//             }
//         })
//         .then(data => {
//             let output = '';
//             data.places.forEach(place => {
//                 output += `<article class="message is-primary">
//                 <div class="message-header">
//                 <P>Location Info</p> 
//                 <button class="delete"></button>
//                  </div>
//                   <div class="message-body">
//                    <ul>
//                     <li><strong>City: </strong>${place['place name']} </li> 
//                      <li><strong>State: </strong>${place['state']} </li> 
//                       <li><strong>Longitude: </strong>${place['longitude']} </li> 
//                        <li><strong>Latitude: </strong>${place['latitude']} </li>
//                         </ul>
//                          </div>
//                          </article>`;
//             });

//             document.querySelector('#output').innerHTML = output;
//         })
//         .catch(err => console.log(err));

//     e.preventDefault();
// }

// function showIcon(icon) {
//     document.querySelector('.icon-remove').style.display = 'none';
//     document.querySelector('.icon-check').style.display = 'none';
//     document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
// }

// function deleteLocation(e) {
//     if (e.target.className == 'delete') {
//         document.querySelector('.message').remove();
//         document.querySelector('.zip').value = '';
//         document.querySelector('.icon-check').remove();
//     }
// }



// amazon ///////////////////////////////////////////////////////////////////////////////



// const dropdownbtn = document.querySelectorAll(".dropdownbtn")
// const dropdownbox = document.querySelectorAll(".dropdownbox")



// dropdownbtn.forEach((dropb,index)=>{
//     dropb.addEventListener("mouseover",()=>{

//         dropdownbox[index].classList.remove("active")
//     })
//     dropb.addEventListener("mouseout",()=>{

//         dropdownbox[index].classList.add("active")
//     })
// })


//// school /////////////////////////////////////////////////////////////////////////////

// const menu = document.querySelector("#mobile-menu");
// const menulinks = document.querySelector(".navbar-menu");

// //display mobile menu
// const mobilmenu = ()=>{
//     menu.classList.toggle("is-active")
//     menulinks.classList.toggle("active")

// }
// menu.addEventListener("click", mobilmenu)





// // slide image js start  
// let slideIndex = [1];
// let slideId = ["mySlides1"]
// showSlides(1, 0);
// // show

// function plusSlides(n, no) {
//   showSlides(slideIndex[no] += n, no);
// }

// function showSlides(n, no) {
//   let i;
//   let x = document.getElementsByClassName(slideId[no]);
//   if (n > x.length) {slideIndex[no] = 1}    
//   if (n < 1) {slideIndex[no] = x.length}
//   for (i = 0; i < x.length; i++) {
//      x[i].style.display = "none";  
//   }
//   x[slideIndex[no]-1].style.display = "block";  
// }
// // slide image js end  


//// game /////////////////////////////////////////////////////

const layout = [
  "1111111111111111111111111111",
  "0100010001000101000100010000",
  "0101010111011101010101110111",
  "0101010101000101010101000101",
  "0101010101010101010101011101",
  "0101000101010001010001000101",
  "0101011101011101010101110101",
  "0001010001000101010101010001",
  "0111010111011101011101010101",
  "0100010000010000010100011101",
  "0111010111010111110111010001",
  "0101010100010001010000010101",
  "0101010101111111010111110101",
  "0100000100000000010000000101",
  "1111111111111111111111111111"
];

const maze = document.getElementById("maze");
const rows = layout.length;
const cols = layout[0].length;
let cells = [];

function getIndex(r, c) {
  return r * cols + c;
}

function createMaze() {
  maze.innerHTML = "";
  cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (layout[r][c] === "1") {
        cell.classList.add("path");
      }
      maze.appendChild(cell);
      cells.push(cell);
    }
  }
}

let currentRow = 7;
let currentCol = 0;

const emoji = document.createElement("div");
emoji.className = "emoji";
emoji.textContent = "🧍";

const goal = document.createElement("div");
goal.className = "goal";
goal.textContent = "🏠";
const goalRow = 1;
const goalCol = 27;

const winMessage = document.getElementById("winMessage");
const playAgainButton = document.getElementById("playAgainButton");

const victorySound = new Audio("assets/sound/click-effect-2s.mp3");

function resetGame() {
  createMaze();

  currentRow = 7;
  currentCol = 0;
  cells[getIndex(currentRow, currentCol)].appendChild(emoji);
  cells[getIndex(goalRow, goalCol)].appendChild(goal);

  winMessage.style.display = "none";
  playAgainButton.style.display = "none";

  document.querySelectorAll(".controls button").forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = 1;
    btn.style.cursor = "pointer";
  });
}

function moveEmoji(dr, dc) {
  const newRow = currentRow + dr;
  const newCol = currentCol + dc;

  if (
    newRow >= 0 && newRow < rows &&
    newCol >= 0 && newCol < cols &&
    layout[newRow][newCol] === "0"
  ) {
    currentRow = newRow;
    currentCol = newCol;
    cells[getIndex(currentRow, currentCol)].appendChild(emoji);

    if (currentRow === goalRow && currentCol === goalCol) {
      winMessage.style.display = "block";
      playAgainButton.style.display = "inline-block";

      victorySound.play().catch((err) => {
        console.error("Audio error:", err);
      });

      document.querySelectorAll(".controls button").forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      });
    }
  }
}

createMaze();
cells[getIndex(currentRow, currentCol)].appendChild(emoji);
cells[getIndex(goalRow, goalCol)].appendChild(goal);

document.getElementById("up").addEventListener("click", () => moveEmoji(-1, 0));
document.getElementById("down").addEventListener("click", () => moveEmoji(1, 0));
document.getElementById("left").addEventListener("click", () => moveEmoji(0, -1));
document.getElementById("right").addEventListener("click", () => moveEmoji(0, 1));
playAgainButton.addEventListener("click", resetGame);

// Keyboard controls
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveEmoji(-1, 0);
      break;
    case "ArrowDown":
      moveEmoji(1, 0);
      break;
    case "ArrowLeft":
      moveEmoji(0, -1);
      break;
    case "ArrowRight":
      moveEmoji(0, 1);
      break;
  }
});
