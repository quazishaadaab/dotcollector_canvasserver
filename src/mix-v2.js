
// import sandbox from "../server.js"

//make this a class and make all these variables its instance variables
//initiate this class also
  // "http:localhost2000/"

   const BASE_URL_1="https://backend-static-canvas.fly.dev"
  // router
  // `http://localhost:${process.env.PORT_BASE}`
  // const BASE_URL_2 = "https://base-backend.fly.dev"

  // const BASE_URL_2 = `http://localhost:8001`
  // const BASE_URL_1 = `http://localhost:2000`

 //connects to restaurant API

   const BASE_URL_2 = "https://base-backend.fly.dev"


  var speaker=''
  var attribute_id=''
  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext("2d");

  let scaling_factor = 1.75

  let pixel_width = 100 / scaling_factor
  //this scaling factor will be used to divide/shrink the dots if number of attributes is over 7

  var wide
  var long

  //make it 15px if greater than 700
  let font_size = 15

  //dovo
  let fill_text_x = 30 / scaling_factor
  let fill_text_y = 60 / scaling_factor

  var inputTextValue = 0
  var d //make d ,mousePointerCol,mousePointer row all global variables because we will need to use them across multiple functions and classes
  //very important to make variables global instead of local. local comes with alot of limitations.
  let mousePointerCol
  let mousePointerRow

  var string = JSON.stringify(window.location.pathname)
  console.log('str',string)
  var id = string.substring(8, 44)



let s = null
let grid =[]

  //prelim function that populates all global variables above by calling apis.
  async function helper() {
    console.log('helper is using this roomid : ',id)

    try{
    const { data: { roomdata: { attributeid, users, speakerid } } } = await axios.post(`${BASE_URL_2}/getRoomById`, { roomid: id })
    

    speaker = speakerid
    console.log(`helper retrived this speakerid : ${attributeid} , ${users} , ${speakerid}`)

    attribute_id=attributeid
    const response = await axios.post(`${BASE_URL_2}/getAttribute`, { attributeid: attributeid })
    console.log('mithu', response?.data?.attributes?.length)

    // this is the retrived attribute length being pulled from the database
    const number_of_attributes = Object.keys(users)?.length
    const number_of_rows = response?.data?.attributes?.length



    // testing set
    // const number_of_attributes = 13
    // const number_of_rows = 25


    wide = (number_of_attributes) * pixel_width
    long = (number_of_rows) * pixel_width
    // long = 15*pixel_width
    }catch(e){
      console.log('couldnt get speaker',e)
    }

  }
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
      if (pixel_width * count <= vert && vert <= pixel_width * (count + 1))
        return count + 1
      else if (vert < 0 || vert > long) {
        alert("Enter a valid coordinate")
        return null

      }
      count++
    }
  }
  function ColSelector(x, cols, wide) {
    // x is the event.mouse pointer value ( dont change)
    //cols is the number of rows( 1-25)
    //wide is the pixel width ( 25 rows = 2500px)

    let count = 0
    let hor = x
    while (count < cols) {
      if (pixel_width * count <= hor && hor <= pixel_width * (count + 1))
        return count + 1
      else if (hor < 0 || hor > wide) {
        alert("Enter a valid coordinate")
        return null

      }
      count++
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
    //we need the below code to insert a new intial grid that is populated(allwhite) for us to manipulate
    // axios.put(`${BASE_URL_2}/updateDotInRoom`, { roomid: id, dot: grid })

    //the code below was just used to send the grid to our frontend through our api but we couldnt get it working
    // sandbox.get("/passInitialGrid",(req,res)=>{

    //   res.json({initialGrid:grid})

    // })
  }

  function drawRectangle(row, column, x, y, color, gap_h, gap_v, value) {

    //draw rectangle
    ctx.fillStyle = color
    ctx.fillRect(x, y, gap_h - .5, gap_v - .5)

    //draw value
    ctx.font = `${font_size}px Arial`;
    ctx.fillStyle = "white";
    ctx.fillText(value, x + fill_text_x, y + fill_text_y); //35 and 60 are just values that make it visible


  }


  async function loadDotsbyRoomId() {

    console.log("shake", speaker)
    let dotarray ={}
    try{
    await axios.post(`${BASE_URL_2}/getUserById`, { userid: speaker }).then((response) => {

//TRY SHOULD GO HERE
       dotarray = response?.data?.dotCollection[id].dot
      console.log('TRY_SUCCESS:kanyeresponse', response)
      // console.log('kanyend',dotarray)
      retrivedDotArray = dotarray

      console.log('dotarrray', dotarray)
      //dont use map . its buggy, use a for loop instead .
      for (let colum in dotarray) {
        for (let row in dotarray[colum]) {

          let dict = dotarray[colum][row]
          if (dict) {
            drawRectangle(dict?.row, dict?.column, dict?.x, dict?.y, dict?.color, dict?.gap_h, dict?.gap_v, dict?.value)


          }
        }
      }

    })
  }
    catch(e){
      console.log("CATCH : There is no dot array in database to load",e)
      try{
        //still calls this upon reboot 
        const { data: { roomdata: { attributeid, users, speakerid } } } = await axios.post(`${BASE_URL_2}/getRoomById`, { roomid: id })

        axios.put(`${BASE_URL_1}/updateDotInUser`, { userid: speakerid, roomid: id, dot: {},attribute_id:attribute_id })
  
        console.log("TRY_SUCCESS:There is no dot array in database to load , skipping",speakerid,id,attribute_id)
        }
        catch(e){console.log('REBOOT_STAGE',e)}
  
  }

  
  }


//   {"userid":"e92de71e5fa32c18f6f256c45f950452ebc222bd","roomid":"324ee231-7027-4180-ac31-2ec328452dc2", "dot":{
//     "color": "#1c7220",
//     "row": 1,
//     "column": 1,
//     "x": 0,
//     "y": 0,
//     "gap_h": 57.142857142857146,
//     "gap_v": 57.142857142857146,
//     "value": "7"
// }}

  async function postDotbyRowandCol(tempDot) {

try{
  console.log(`TRY_SUCCESS DOT POSTED ${speaker} ${id}`, tempDot)
    await axios.put(`${BASE_URL_2}/updateDotRowandCol`, { userid: speaker, roomid: id, dot: tempDot })
main() 

}catch(e){
  console.log(`CATCH: cant post dot ${speaker} ${id} ${tempDot}`,e)
}
  }
  function drawInput(x, y) {
    var input = document.createElement("input")//will create a new input tag each time clicked.
    input.type = "text"

    input.name = "input"
    input.style.position = "absolute"
    input.style.border = 'border-radius: 25px;'
    // input.style.marginLeft='5px'
    // input.style.marginTop='5px'

    // input.style.opacity='0.5'
    input.addEventListener("keydown", (e) => { //eventListener listens to any change in the input field and if its is a keydown change, the following function will execute.
      //e is the change that happened. target gives the element responsible for change. value gives you value of that element
      //e returns keyboardEvent
      //e.target returns the input tag.<input type="text" name="input" size="2'" style="positon: fixed ; left:199px;toppixel_widthpx;"></input>






      //access dot in grid 
      const tempDot = grid[x - 1][y - 1]
      console.log('tempdot', tempDot)
      if (e.keyCode === 13) { //13 in ENTER key

        inputTextValue = e.target.value


        tempDot.setValue(inputTextValue)
        tempDot.setColor()
        //for changing the color when you click and input a value
        tempDot.drawRect()


        grid[x - 1][y - 1] = tempDot; //put grid and d.value in this eventlistener because we only want to update the grid when enter is pressed.

        postDotbyRowandCol(tempDot)
        // Need to reset the input once enter has been hit and a value has been set. This was included when we added in the user switch functionality where we change the grid load based off the speaker chosen.
        input.value = null

        console.log(e.target.value)
      }
    })


    input.style.left = (y - 1) * pixel_width + "px"

    input.style.top = (x - 1) * pixel_width + "px"
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
      ctx.lineWidth = 1;

      ctx.moveTo(gap_h * i, 0)
      ctx.lineTo(gap_h * i, long)

      ctx.strokeStyle = "#ffffff";

      ctx.stroke()
    }
    for (let j = 1; j <= rows - 1; j++) {

      ctx.moveTo(0, gap_v * j)
      ctx.lineTo(wide, gap_v * j)
      ctx.strokeStyle = "#ffffff";

      ctx.stroke()
    }
  }
//drawInput->postDotByRowandCol->
  function mousePressed(e) {

    var xCoord = e.clientX
    var yCoord = e.clientY

    console.log('armored', xCoord, yCoord)
    mousePointerCol = ColSelector(xCoord, wide / pixel_width, wide)
    mousePointerRow = RowSelector(yCoord, long / pixel_width, long)
    console.log('pointer', mousePointerCol, mousePointerRow)
    // get numerical input from the user 
    //decide upon the color-number value (if 8-10 : green, if 0-4: red, if 5-7: good )
    //create new object passing its value and color 

    // d = new Dot(mousePointerRow, mousePointerCol, s.gap_h, s.gap_v)

    //takes in pixel value when referreing to x and y, so like 300,600

    drawInput(mousePointerRow, mousePointerCol)
    console.log(mousePointerRow, mousePointerCol)
  }





//a prelim function that sets up the grid, the arrays, and the mouse click functionality
  function setUp() {
    s = new Setup(wide, long, long / (pixel_width), wide / (pixel_width));
    grid = new Array(s.rows)
   window.mousePressed = mousePressed;
 
    if (wide > 600) {

      canvas.width = wide;
      canvas.height = long;

      //when the number of participants and the attributes are double digit (40-90 attributes/users), we need to change below(style.width/style.height)
      //we dont manipulate the above ( canvas.width/height)
      //we need an if statement that adjusts the grid based on the size 

      //divide the wide by an integer that suits the size ( for example wide=4000 : wide/4)

      // DIVIDE by 2 is there is 14 blocks(1400) : 2:1400
      // DIVIDE by 3.5 is there is 25 blocks(2500) : 3.5:2500
      canvas.style.width = `${wide}px`;
      canvas.style.height = `${long}px`;
    }
    else {
      canvas.width = wide;
      canvas.height = long;

      //when the number of participants and the attributes are double digit (40-90 attributes/users), we need to change below(style.width/style.height)
      //we dont manipulate the above ( canvas.width/height)
      //we need an if statement that adjusts the grid based on the size 

      //divide the wide by an integer that suits the size ( for example wide=4000 : wide/4)
      canvas.style.width = `${wide}px`;
      canvas.style.height = `${long}px`;
    }

    for (let i = 0; i < s.rows; i++) {
      for (let j = 0; j < s.cols; j++) {
        grid[i] = new Array(j)
      }
    }
  }

  //prelim function that populates all global variables above by calling apis.

  //a prelim function that sets up the grid, the arrays, and the mouse click functionality
   async function main (){ 
    console.log('error')

    await helper()

     setUp();

     drawLine(long / pixel_width, wide / pixel_width, pixel_width, pixel_width, wide, long);
  
     populateGridFoundation();


    await loadDotsbyRoomId()

  
  }

// try{
//   jQuery(document).ready(function(){
//     $.getScript('../dao/controllerDAO.js');

//     const n = new ControllerDAO();
//     n.listener()
// });
// }catch(e){
//   console.log(e)
// }
main()
 
console.log('soop')


