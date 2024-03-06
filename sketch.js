let values = new Array(30);
let states= [];
let w = 50;
let searchInput;
let scaleX, scaleY; 
function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  searchInput = select("#input"); 
  searchButton = select("#btn"); 
  searchButton.mousePressed(search);
  scaleX = width / 1500; 
  scaleY = height / 700; 
  for(let i=0;i<values.length;i++){
    values[i] = Math.round(Math.random()*100);
    states[i] = -1;
  }
  values.sort((a,b)=> a-b);
}
let found = true;
async function BinarySearch(array,value,l,r){
  let i =l;
  let j = r;
  let mid = Math.floor((i+j)/2);
  await sleep(500);
  states[mid] = 0;
  if(i>j){
    found = false;
    setTimeout(() => {
      window.location.reload();
    }, 2000); 
      return false;
  }
  if(value > array[mid]){
     await BinarySearch(array,value,mid+1,j);
  }if(value < array[mid]){
      await BinarySearch(array,value,i,mid-1);
  }
  if(value === array[mid]){      
      states[mid] =2;
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
      return 'true';
  }
}

function windowResized() {
  let newWidth = windowWidth * 0.9; // Calculate new canvas width based on window width
  let newHeight = windowHeight * 0.9; // Calculate new canvas height based on window height
  resizeCanvas(newWidth, newHeight); // Resize canvas
  redraw(); // Redraw canvas content
  scaleX = width / 1500; // Update scaling factor for width
  scaleY = height / 700; // Update scaling factor for height
}

function search() {
  let target = parseInt(searchInput.value());
  BinarySearch(values, target, 0, values.length - 1);
}
function draw() {
  background('#112B3C');
  stroke(255);
  for(let i=0;i<values.length;i++){ 
    if(states[i]===0){
      fill("#FF4949");
    }else if(states[i]===2){
      fill("#00FFAB");
    textSize(40);
    text("Found", 80, 40);
    }else{
      fill("#7FB5FF");
    }
    rect(i * w * scaleX, height, w * scaleX, -600 * scaleY - values[i] * scaleY);
    fill(0);
    textSize(25 * scaleX); // Scale text size based on width scaling factor
    textAlign(CENTER, CENTER);
    text(values[i], i * w * scaleX + w * scaleX / 2, height - values[i] * scaleY - 10 * scaleY); // Scale text position based on scaling factors
  }
  if(found==false){
    fill('#FF4949');
    textSize(40);
    text("Not found", 100, 40);
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

