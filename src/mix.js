

// import axios from 'axios';
// import DataService from "./services/service.js"


var c = document.getElementById("mycanvas")
var ctx = c.getContext("2d");

var wide = 400
var long = 600
var inputTextValue = 0
var d //make d ,mousePointerCol,mousePointer row all global variables because we will need to use them across multiple functions and classes
//very important to make variables global instead of local. local comes with alot of limitations.
let mousePointerCol
let mousePointerRow

let individualDot // type object


var string = JSON.stringify(window.location.pathname)
var id = string.substring(8, 44)


// dotrouter
const BASE_URL_1 = 'https://sleepy-dawn-45361.herokuapp.com' || "http://localhost:2000"
// router
const BASE_URL_2 = 'https://salty-tor-00815.herokuapp.com' || `http://localhost:${process.env.PORT_BASE}`





class Setup {
  constructor(wide, long, rows, cols) {
    this.wide = wide
    this.long = long
    this.rows = rows
    this.cols = cols
    this.gap_h = wide / cols
    this.gap_v = long / rows

  }
}

function RowSelector(y, rows, long) {
  let count = 0
  let vert = y
  while (count < rows) {
    if (100 * count <= vert && vert <= 100 * (count + 1))
      return count + 1
    else if (vert < 0 || vert > long) {
      print("Enter a valid coordinate")
      return null

    }
    count++
  }
}
function ColSelector(x, cols, wide) {
  let count = 0
  let hor = x
  while (count < cols) {
    if (100 * count <= hor && hor <= 100 * (count + 1))
      return count + 1
    else if (hor < 0 || hor > wide) {
      print("Enter a valid coordinate")
      return null

    }
    count++
  }
}

function drawCleanerLine(rows, cols, gap_h, gap_v, wide, long) {
  for (let i = 1; i <= cols - 1; i++) {
    line(gap_h * i, 0, gap_h * i, long)
  }
  for (let j = 1; j <= rows - 1; j++) {
    line(0, gap_v * j, wide, gap_v * j)
  }

}



const s = new Setup(wide, long, long / 100, wide / 100);





function setup() {
  createCanvas(s.wide, s.long);
  noLoop()


}

function draw() {
  background("grey");
  //   let mousePointerCol =ColSelector(winMouseX,s.cols,s.wide)
  // let mousePointerRow=RowSelector(winMouseY,s.rows,s.long)

  drawCleanerLine(s.rows, s.cols, s.gap_h, s.gap_v, s.wide, s.long);
  if (mouseIsPressed) {
    mousePressed()
  }

}




let grid = new Array(s.rows)

for (let i = 0; i < s.rows; i++) {
  for (let j = 0; j < s.cols; j++) {
    grid[i] = new Array(j)
  }
}


class Dot {
  constructor(row, column, gap_h, gap_v) {
    this.color = "white"
    this.row = row
    this.column = column
    this.x = (column - 1) * gap_h
    this.y = (row - 1) * gap_v
    this.gap_h = gap_h
    this.gap_v = gap_v
    this.value = 0
    // this.input=createInput("")
  }
  static checkColor(color) {
    return this.color == color
  }

  setColor() {
    if (
      this.value >= 1 && this.value <= 4) { this.color = "#f64a2b" }
    else if (this.value >= 5 && this.value <= 6) { this.color = "#686868" }
    else if (this.value >= 7 && this.value <= 10) { this.color = "#1c7220" }
    else { window.alert("Number invalid. Enter a number from 0-10 based on merit.") }

    return this.color
  }


  static checkValue(value) {
    return this.value == value
  }
  setValue(value) {

    if (value >= 1 && value <= 10)
      this.value = value
    else
      this.value = null
  }
  drawRect() {

    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.gap_h - .5, this.gap_v - .5)
  }

}





function populateGridFoundation() {


  for (let i = 1; i < s?.cols + 1; i++) {
    for (let j = 1; j < s?.rows + 1; j++) {

      //create new dot object that contains the row(j) and col(i) numbers and the gap.
      d = new Dot(j, i, s?.gap_h, s?.gap_v)
      grid[j - 1][i - 1] = d



    }
  }

}

populateGridFoundation()


function drawRectangle(row, column, x, y, color, gap_h, gap_v, value) {

  //draw rectangle
  ctx.fillStyle = color
  ctx.fillRect(x, y, gap_h - .5, gap_v - .5)

  //draw value
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(value, x + 35, y + 60); //35 and 60 are just values that make it visible


}




console.log('realid',id)



async function loadDotsbyRoomId() {


  await axios.post(`${BASE_URL_2}/getRoomById`, { roomid: id }).then((response) => {

    const dotarray = response?.data?.roomdata?.dot
    console.log(dotarray)

    //assign grid variable to dotarray(pulled grid from database)
    dotarray?.map(cols => {
      cols?.map(rows => {

        if (rows) {
          drawRectangle(rows?.row, rows?.column, rows?.x, rows?.y, rows?.color, rows?.gap_h, rows?.gap_v, rows?.value)


        }
      })

    })


  })
}


loadDotsbyRoomId()

console.log('the grid', grid)







//drawInput : 
//x: is the PIXEL value of where horizontal dot should be placed
//y: is the PIXEL value of where vertical dot should be placed
//h: is the PIXEL value of horizontal gap used to draw the rectange
//v: is the PIXEL value of vertical gap used to draw the rectange
//d: is the dot object that we will mutate and change

function drawInput(x, y) {
  var input = document.createElement("input")//will create a new input tag each time clicked.
  input.type = "text"

  input.name = "input"
  input.style.position = "fixed"
  input.addEventListener("keydown", (e) => { //eventListener listens to any change in the input field and if its is a keydown change, the following function will execute.
    //e is the change that happened. target gives the element responsible for change. value gives you value of that element
    //e returns keyboardEvent
    //e.target returns the input tag.<input type="text" name="input" size="2'" style="positon: fixed ; left:199px;top100px;"></input>







    const tempDot = grid[x - 1][y - 1]
    console.log('tempdot', tempDot)
    console.log('frid', grid[x - 1][y - 1])
    if (e.keyCode === 13) { //13 in ENTER key

      inputTextValue = e.target.value


      tempDot.setValue(inputTextValue)
      tempDot.setColor()
      //for changing the color when you click and input a value
      tempDot.drawRect()


      grid[x - 1][y - 1] = tempDot; //put grid and d.value in this eventlistener because we only want to update the grid when enter is pressed.

      postDotbyRowandCol(tempDot)
      console.log(e.target.value)
    }
  })


  input.style.left = (y - 1) * 100 + "px"

  input.style.top = (x - 1) * 100 + "px"
  input.size = 2
  document.body.appendChild(input)//must put this to insert into the html body. can also use append() for multiple dom elements/elements in general.
  input.focus()
  //optional
  // ctx.document.write("hello");

  //  this.input.position(this.x, this.y);
  //  this.input.size(this.gap_h/5);
  // this.value=this.input.value();
}





function drawLine(rows, cols, gap_h, gap_v, wide, long) {
  for (let i = 1; i <= cols - 1; i++) {
    ctx.moveTo(gap_h * i, 0)
    ctx.lineTo(gap_h * i, long)
    ctx.stroke()
  }
  for (let j = 1; j <= rows - 1; j++) {
    ctx.moveTo(0, gap_v * j)
    ctx.lineTo(wide, gap_v * j)
    ctx.stroke()
  }
}



function mousePressed(e) {

  var xCoord = e.clientX
  var yCoord = e.clientY

  mousePointerCol = ColSelector(xCoord, wide / 100, wide)
  mousePointerRow = RowSelector(yCoord, long / 100, long)

  // get numerical input from the user 
  //decide upon the color-number value (if 8-10 : green, if 0-4: red, if 5-7: good )
  //create new object passing its value and color 

  // d = new Dot(mousePointerRow, mousePointerCol, s.gap_h, s.gap_v)

  //takes in pixel value when referreing to x and y, so like 300,600

  drawInput(mousePointerRow, mousePointerCol)
  console.log(mousePointerRow, mousePointerCol)
}




window.mousePressed = mousePressed;




drawLine(6, 4, 100, 100, 400, 600)






console.log(id, grid)










var buffer
let speakerid
// let sid=  await (r?.data?.roomdata?.speakerid)

async function promiseSpeaker() {

  await axios.post(`${BASE_URL_2}/getRoomById`, { roomid: id }).then(async r => {


    let x = await r?.data?.roomdata?.speakerid
    speakerid = x


    await axios.put(`${BASE_URL_1}/updateDotInUser`, { userid: speakerid, roomid: id, dot: grid })

  }
  )
}


// getSpeaker().then(async r=>{ speakerid=await r })


async function postGrid(e) {

  console.log("submitted")
  console.log(grid)
  console.log('id', id)
  await axios.put(`${BASE_URL_2}/updateDotInRoom`, { roomid: id, dot: grid })
  promiseSpeaker()


  // need to specify the speaker/user id for this to work 

  // await import('./services/service.js').then((response)=>{
  // response.postDot(gridDoc);
  // })


}



async function postDotbyRowandCol(tempDot){


await axios.put(`https://salty-tor-00815.herokuapp.com/updateDotRowandCol`,{roomid:id, dot:tempDot})

}
// DataService.postDot(gridDoc)













