/*
Logic for arrow routing, uses map colors to discern what that color indicates the region is for
*/

const coordinates =
{
  'discoveryPark':
  {
    wings:
    {
      'A_wing': { x: 732, y: 1244, floor: 1},
      'B_wing_firstFloor': { x: 902, y: 934, floor: 1},
      'D_wing_firstFloor': { x: 796, y: 805, floor: 1},
      'E_wing_firstFloor': { x: 376, y: 816, floor: 1},
      'F_wing_firstFloor': { x: 1052, y: 1177, floor: 1},
      'G_wing': { x: 512, y: 816, floor: 1},
      'K_wing_firstFloor': { x: 120, y: 815, floor: 1},
      'M_wing': { x: 1154, y: 1163, floor: 1},
      'J_wing': { x: 796, y: 805, floor: 1},
      'B_wing_secondFloor': { x: 1006, y: 428, floor: 2},
      'D_wing_secondFloor': { x: 905, y: 245, floor: 2},
      'E_wing_secondFloor': { x: 471, y: 248, floor: 2},
      'F_wing_secondFloor': { x: 1172, y: 624, floor: 2},
      'K_wing_secondFloor': { x: 241, y: 245, floor: 2}
    },
    stairs:
    [
      { floor1 : {x: 926, y: 826}, floor2: {x: 1031, y: 270} },
      { floor1 : {x: 622, y: 797}, floor2: {x: 706, y: 225} },
      { floor1 : {x: 153, y: 811}, floor2: {x: 230, y: 230} },
      { floor1 : {x: 828, y: 1161}, floor2: {x: 884, y: 601} },
      { floor1 : {x: 1264, y: 1164}, floor2: {x: 1382, y: 606} },
    ]
  }
};

function hallway(r, g, b) //hallways are grey, should have 211 values accross the board
{
  return Math.abs(r - 211) < 5 && Math.abs(g - 211) < 5 && Math.abs(b - 211) < 5;
}


function wall(r, g, b) //range from (224, 238, 238) to (169, 202, 201) to (114, 177, 176) to (180, 197, 197)
{
  return g > 170 && b > 170 && (g - r) > 30 && Math.abs(g - b) < 30;
}


function room(r, g, b) //rooms are white
{
  return Math.abs(r - 255) < 5 && Math.abs(g - 255) < 5 && Math.abs(b - 255) < 5;
}


function roomNumber(r, g, b) //room numbers are black, but pixelation makes them slgihtly grey sometimes
{
  return r < 80 && g < 80 && b < 80;
}


function walkable(r, g, b) //an area is walkable if its a hallway
{
  return hallway(r, g, b)
}


function logicalGrid(canvas, img) //returns a grid that contains True/False entries reflecting the walkablility of each pixel
{
  const dim = canvas.getContext('2d');
  dim.drawImage(img, 0, 0, canvas.width, canvas.height); //draws map image on the canvas so the map's pixel colors can be read

  const mapData = dim.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = mapData.data; //stores image data as an array where each entry is a (r, g, b, a) value

  const grid = []; //stores whether a pixel is walkable or not

  for (let i = 0; i < canvas.height; i++)
    {
      grid[i] = []; //initialize grid spot
      
      for (let j = 0; j < canvas.width; j++)
      {
        const index = (i * canvas.width + j) * 4; //i * canvas.width gives what row, adding j gives the column, multiply times 4 since each individual pixel takes up 4 entries in the pixels array
        const r = pixels[index]; //pixels[0] has the pixels r value, subsequent +1 and +2 values are green and blue respectively
        const g = pixels[index + 1];
        const b = pixels[index + 2];

        grid[i][j] = walkable(r, g, b); //stores either True or False to indcate whether an area is walkable
      }
    }
  return grid;
}


function path(grid, x1, y1, x2, y2) //finds path from start postion (x1, y1) to end position (x2, y2), uses A* pathfinding method
{
  const needVisit = []; //unvisited pixels
  const visited = new Set(); //visited pixels, not to visited again
  const firstNode = { x: x1, y: y1, steps: 0, remaining: 0, total: 0, prev: null}; //the starting node based on what wing the user selected, steps tracks now many steps have been taken toward the destination, remaining tracks how many estimated remaining steps there are, total tracks the combined total of steps and remaining, previous tacks origin of current step

  needVisit.push(firstNode);

  while (needVisit.length > 0) //loops as long as there are pixels that need visiting
  {
    let index = 0; //used to track the index of the best node in needVisit

    for (let i = 1; i < needVisit.length; i++) //start at 1 since index tracks zero
    {
      if (needVisit[i].total < needVisit[index].total) //if i has a more efficient route, index defaults to i
      {
        index = i;
      }
    }
    const curr = needVisit.splice(index, 1)[0]; //removes the best node for explation and stores it in curr
    visited.add(`${curr.x},${curr.y}`); //add visited pixel's x, y value to visited so the code knows its already been there

    if (curr.x === x2 && curr.y ===y2) //checks if desination has been reached, and returns path used to reach destination if so
    {
      const completePath = []; //stores path used to reach desination for returning
      let node = curr;
      while (node) //reverses path using prev to reconstruct path
      {
        completePath.unshift({ x: node.x, y: node.y }); //prepends each value to array so the path comes out as start to finish instead of finish to start
        node = node.prev; //moves to previous node in path
      }
      return completePath;
    }

    const neighbor = [{x: curr.x, y: curr.y - 1}, {x: curr.x, y: curr.y + 1}, {x: curr.x - 1, y: curr.y}, {x: curr.x + 1, y: curr.y}]; //tracks the neighbors of curr, in the order of up, down, left, and right respectively

    for (let i = 0; i < neighbor.length; i++)
    {
      if (neighbor[i].x < 0 || neighbor[i].y < 0 || neighbor[i].x >= grid[0].length || neighbor[i].y >= grid.length) //skips out of bounds
      {
        continue;
      }
  
      if (!grid[neighbor[i].y][neighbor[i].x]) //skips unwalkable
      {
        continue;
      }
  
      if (visited.has(`${neighbor[i].x},${neighbor[i].y}`)) //skips already visited
      {
        continue;
      }
  
      const steps = curr.steps + 1; //current step count plus 1
      const remaining = Math.abs(neighbor[i].x - x2) + Math.abs(neighbor[i].y - y2); //straight line to destination for esitmation of remaing distance
      const total = steps + remaining; //estimation of total remaining steps
  
      let exists = null; //used to check if a neighboring pixel is already in needVisit
  
      for (let j = 0; j < needVisit.length; j++)
      {
        if (needVisit[j].x === neighbor[i].x && needVisit[j].y === neighbor[i].y) //searches through needVisit to see if neighboring pixel is already in needVisit
        {
          exists = needVisit[j];
          break;
        }
      }
  
      if (!exists) //pixel hasn't been dsicovered yet, add to needVist
      {
        needVisit.push({ x: neighbor[i].x, y: neighbor[i].y, steps: steps, remaining: remaining, total: total, prev: curr });
      }
      else if (steps < exists.steps) //if a neighbor has a shorter path, use it and update steps and total
      {
        exists.steps = steps;
        exists.total = total;
      }
    }
  }
  return null;
}


function drawPath(canvas, path) //draws path on the canvas
{
  const arrow = canvas.getContext('2d'); //allows program to draw on the canvas

  arrow.strokeStyle = 'green';
  arrow.lineWidth = 2;
  arrow.beginPath();
  arrow.moveTo(path[0].x, path[0].y); //moves to starting position

  for (let i = 1; i < path.length; i++) //goes through path and connects all of its dots to create the arrow
  {
    arrow.lineTo(path[i].x, path[i].y);
  }
  arrow.stroke(); //draws the arrow based on the lineTo commands from the for loop
}
