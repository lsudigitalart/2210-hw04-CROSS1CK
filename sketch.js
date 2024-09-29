const blockWidth = 300;
const blockHeight = 30;
let currentBlock;

let blockDir;
let blockSpeed;

let placedBlocks = [];

function setup(){
  createCanvas (600, 600);
textSize(30)
  newGame();
}

function draw(){
  background(20);
  updateBlock();
  drawBlocks();
}

function keyReleased(){
 if(key === " ") {
  placeBlock();
 }
}

function newGame(){
  currentBlock = createVector(0, height-blockHeight, blockWidth);

  blockDir = 1;
  blockSpeed = 2;

  placedBlocks = [];
}

function updateBlock(){
  currentBlock.x += blockDir * blockSpeed;

  if (currentBlock.x < 0) {
    blockDir = 1;
  }
  if (currentBlock.x + currentBlock.z > width){
    blockDir = -1;
  }
}

function drawBlocks(){
  fill("pink");
  rect(currentBlock.x, currentBlock.y, currentBlock.z, blockHeight);
  fill (50);
  for (let block of placedBlocks){
    rect(block.x, block.y, block.z, blockHeight);
  }

  text(placedBlocks.length, 30, 30);

}

function placeBlock(){
  const prevBlock = placedBlocks[placedBlocks.length - 1]

    let newWidth = blockWidth;

    if(prevBlock){
      const leftEdge = max(prevBlock.x, currentBlock.x);
      const rightEdge = min(prevBlock.x + prevBlock.z, currentBlock.x + currentBlock.z);
      
       newWidth = rightEdge - leftEdge;
       currentBlock.x = leftEdge;
       currentBlock.z = newWidth;
    }
  
    if (newWidth < 0){
      newGame();
      return;
    }
  placedBlocks.push(currentBlock);

  blockSpeed *=1.1;

  newBlock(newWidth);
}

function newBlock(newWidth){
  const blockStackHeight = (placedBlocks.length + 1) * blockHeight;

  currentBlock = createVector(0, height - blockStackHeight, newWidth);
}