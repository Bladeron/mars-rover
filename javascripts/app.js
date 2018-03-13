//UI with possible options and commands
function menu() {
	console.log("┌────────────────────────────┬──────────────────────────────────────┐");
	console.log("│     Options                │  Explanation                         │");
	console.log("├────────────────────────────┼──────────────────────────────────────┤");
	console.log("│  1. turnLeft(rover)        │  turns one Rover left                │");
	console.log("│  2. turnRight(rover)       │  turns one Rover right               │");
	console.log("│  3. moveForward(rover)     │  moves Rover forward                 │");
	console.log("│  4. moveBackwards(rover)   │  moves Rover backwards               │");
	console.log("│  5. commands(rover)        │  accepts movements 'f' 'b' 'l' 'r'   │");
	console.log("│  6. menu()                 │  shows this menu                     │");
	console.log("│  7. grid()                 │  draws the board to check items      │");
	console.log('│  8. obstacles(num)         │  adds "num" random obstacles         │');
	console.log('│  8. commandsAlternate()    │  alternates commands with each Rover │');
	console.log("└────────────────────────────┴──────────────────────────────────────┘");
}
  
//Creates grid Array with the two initial rovers
var board = [];

for (var i = 0 ; i < 10; i++) {
    board[i] = []; 						
    for (var j = 0; j < 10; j++) { 		
        board[i][j] = " ";
    }
}  

board [0][0] = "R"; // Placing roverOne in the grid
board [9][9] = "X"; // Placing roverTwo

// Rover Object Goes Here
// ======================
var roverOne = {
  name: "Rover One",
  direction : "N",
  positionX: 0,
  positionY: 0,
  travelLog: [[0,0]]
};

var roverTwo = {
  name: "Rover Two",
  direction : "N",
  positionX: 9,
  positionY: 9,
  travelLog: [[9,9]]
};

// ======================

// Turning left function
function turnLeft(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'W':
      rover.direction = 'S';
      break;
  }
  
  console.log("turnLeft was called!");
}

//Turning left function
function turnRight(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
      break;
  }
  
  console.log("turnRight was called!");
}

//Moving forward function + boundaries protection + travel log + updates board
function moveForward(rover){
  switch(rover.direction) {
	case 'N':
	if (rover.positionY <= 0) {
		console.log("Movement will be outside testing grid, stoping");						//checks if rover will go outside the board
	} else if ((board[rover.positionY-1][rover.positionX] == "@")) {						//checks if there is an obstacle in next position
		console.log("I found an obstacle in the way!");
	} else if ((board[rover.positionY-1][rover.positionX] == "R") || (board[rover.positionY-1][rover.positionX] == "X")) {  //checks if there is another rover in next position
		console.log("Wow stop! There is another rover here :)");				
	} else {
		move(rover.positionX,rover.positionY, rover.positionX, (rover.positionY)-1)	        //re-draws board position
		rover.positionY -=1;														        //modifies position in object
		rover.travelLog.push([rover.positionX,rover.positionY]);			          		//updates travelLog
	}
	break;
	case 'S':
	if (rover.positionY >= 9) {
		console.log("Movement will be outside testing grid, stoping");
	} else if ((board[rover.positionY+1][rover.positionX] == "@")) {
		console.log("I found an obstacle in the way!");
	} else if ((board[rover.positionY+1][rover.positionX] == "R") || (board[rover.positionY+1][rover.positionX] == "X")) {
		console.log("Wow stop! There is another rover here :)");		
	} else {
		move(rover.positionX,rover.positionY, rover.positionX, (rover.positionY)+1)
		rover.positionY +=1;
		rover.travelLog.push([rover.positionX,rover.positionY]);
	}
	break;
	case 'E':
	if (rover.positionX >= 9) {
		console.log("Movement will be outside testing grid, stoping");
	} else if ((board[rover.positionY][rover.positionX+1] == "@")) {
		console.log("I found an obstacle in the way! @");
	} else if ((board[rover.positionY][rover.positionX+1] == "R") || (board[rover.positionY][rover.positionX+1] == "X")) {
		console.log("Wow stop! There is another rover here :)");
	} else {
		move(rover.positionX, rover.positionY,(rover.positionX)+1,rover.positionY)  
		rover.positionX +=1;
		rover.travelLog.push([rover.positionX,rover.positionY]);
	}
	break;
	case 'W':
	if (rover.positionX <= 0) {
		console.log("Movement will be outside testing grid, stoping");
	} else if ((board[rover.positionY][rover.positionX-1] == "@")) {
		console.log("I found an obstacle in the way! @");
	} else if ((board[rover.positionY][rover.positionX-1] == "R") || (board[rover.positionY][rover.positionX-1] == "X")) {
		console.log("Wow stop! There is another rover here :)");		
	} else {
		move(rover.positionX, rover.positionY,(rover.positionX)-1,rover.positionY)		
		rover.positionX -=1;
		rover.travelLog.push([rover.positionX,rover.positionY]);
	}
	break;
	}
		console.log("moveForward was called");
		console.log(`${rover.name} actual position is:  [${rover.positionX}, ${rover.positionY}] `);
} 


//Moving backwards function + boundaries protection + travel log
function moveBackwards(rover){
	switch(rover.direction) {
	case 'N':
	if (rover.positionY >= 9) {
		console.log("Movement will be outside testing grid, stoping");
	} else if ((board[rover.positionY+1][rover.positionX] == "@")) {
		console.log("I found an obstacle in the way! @");
	} else if ((board[rover.positionY+1][rover.positionX] == "R") || (board[rover.positionY+1][rover.positionX] == "X")) {
		console.log("Wow stop! There is another rover here :)");		
	} else {
		move(rover.positionX, rover.positionY, rover.positionX,(rover.positionY)+1)
		rover.positionY +=1;
		rover.travelLog.push([rover.positionX,rover.positionY]);
	}
	break;
	case 'S':
	if (rover.positionY <= 0) {
		console.log("Movement will be outside testing grid, stoping");
	} else if ((board[rover.positionY-1][rover.positionX] == "@")) {
		console.log("I found an obstacle in the way! @");
	} else if ((board[rover.positionY-1][rover.positionX-1] == "R") || (board[rover.positionY-1][rover.positionX] == "X")) {
		console.log("Wow stop! There is another rover here :)");		
	} else {
		move(rover.positionX, rover.positionY,rover.positionX,(rover.positionY)-1)
		rover.positionY -=1;
		rover.travelLog.push([rover.positionX,rover.positionY]);
	}
	break;
	case 'E':
	if (rover.positionX <= 0) {
		console.log("Movement will be outside testing grid, stoping");
	} else if ((board[rover.positionY][rover.positionX-1] == "@")) {
		console.log("I found an obstacle in the way! @");
	} else if ((board[rover.positionY][rover.positionX-1] == "R") || (board[rover.positionY][rover.positionX-1] == "X")) {
		console.log("Wow stop! There is another rover here :)");		
	} else {
		move(rover.positionX, rover.positionY,(rover.positionX)-1,rover.positionY)
		rover.positionX -=1;
		rover.travelLog.push([rover.positionX,rover.positionY]);
	}
	break;
	case 'W':
	if (rover.positionX >= 9) {
		console.log("Movement will be outside testing grid, stoping");
	} else if ((board[rover.positionY][rover.positionX+1] == "@")) {
		console.log("I found an obstacle in the way! @");
	} else if ((board[rover.positionY][rover.positionX+1] == "R") || (board[rover.positionY][rover.positionX+1] == "X")) {
		console.log("Wow stop! There is another rover here :)");		
	} else {
		move(rover.positionX, rover.positionY,(rover.positionX)+1,rover.positionY)
		rover.positionX +=1;
		rover.travelLog.push([rover.positionX,rover.positionY]);
	}
	break;
	}
	console.log("moveBackwards was called");
	console.log(`Rover actual position is:  [${rover.positionX}, ${rover.positionY}] `);
}

//Command function accepting user input as movement string
function commands(rover) {
  
  var movements = prompt("Which movements do you want to send to the rover?");
  
  for (i = 0; i <= movements.length-1; i++) {
    switch (movements[i]) {
	  case "f":
		  moveForward(rover);
		  break;
	  case "b":
		  moveBackwards(rover);
		  break;
	  case "r":
		  turnRight(rover);
		  break;
	  case "l":
		  turnLeft(rover);
		  break;
		default:
		console.log('This command is not available and will break the rover');
    }
  }
  console.log("\nThe visited positions were: " +JSON.stringify(rover.travelLog));
} 

//Command function accepting user input as movement string for each rover
function commandsAlternate() {
  
  var movements = prompt("Which movements do you want to send to the rover?");
  
  for (i = 0; i <= movements.length-1; i++) {

    if (i % 2 == 0) {							//This part alternates between roverOne and roverTwo
      var rover = roverOne; 
      } else {
        var rover = roverTwo;
      }  

      switch (movements[i]) {
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackwards(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      default:
      console.log('This command is not available and will break the rover');
      }
    }  
  //Prints both rovers travel log
  console.log("\nThe visited positions were: \n\nRover One: " +JSON.stringify(roverOne.travelLog) + "\n\nRover Two: " +JSON.stringify(roverTwo.travelLog)  );
} 


//Function to place obstacles avoiding the rovers
function obstacles(num) {
  
  for (i=0; i<=num; i++) {
    var x= Math.floor(Math.random()*10); 				//Generates random places for the obstacles
    var y= Math.floor(Math.random()*10); 				//Generates random places for the obstacles
    
    if( board[x][y] == "R" || board[x][y] == "X" ){ 	//Protection to avoid smashing a rover with an obstacle
      i--;
    } else {
      board[x][y] = "@";
    }
  }  
  console.log(`\n ${num} random obstacles have been placed "\@"\n`);
}

//Function to draw the grid board 
function grid() {
  console.log(board.join('\n'));
}

//Re-draws object on the grid converting position property to array system
function move(oldX,oldY,newX,newY) {
	board[newY][newX] = board[oldY][oldX];
	board[oldY][oldX] = ' ';
}


menu();		  //Prompts the menu to see available options at the start
obstacles(4); //Sets 4 obstacles in the grid







