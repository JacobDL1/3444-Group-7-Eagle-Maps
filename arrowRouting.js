/*
Logic for arrow routing, uses map colors to discern what that color indicates the region is for
*/

const coordinates =
{
  'discoveryPark':
  {
    wings:
    {
      'A_WING': { x: 977, y: 1657, floor: 1 },
      'B_WING_FIRSTFLOOR': { x: 1203, y: 1238, floor: 1 },
      'D_WING_FIRSTFLOOR': { x: 1040, y: 1076, floor: 1 },
      'E_WING_FIRSTFLOOR': { x: 450, y: 1092, floor: 1 },
      'F_WING_FIRSTFLOOR': { x: 1413, y: 1570, floor: 1 },
      'G_WING': { x: 694, y: 1089, floor: 1 },
      'K_WING_FIRSTFLOOR': { x: 241, y: 1082, floor: 1 },
      'M_WING': { x: 1491, y: 1542, floor: 1 },
      'J_WING': { x: 1122, y: 905, floor: 1 },
      'B_WING_SECONDFLOOR': { x: 1564, y: 669, floor: 2 },
      'D_WING_SECONDFLOOR': { x: 1550, y: 371, floor: 2 },
      'E_WING_SECONDFLOOR': { x: 778, y: 386, floor: 2 },
      'F_WING_SECONDFLOOR': { x: 1845, y: 977, floor: 2 },
      'K_WING_SECONDFLOOR': { x: 399, y: 376, floor: 2 }
    },
    stairs:
    [
      { floor1 : {x: 1237, y: 1096}, floor2: {x: 1602, y: 419} },
      { floor1 : {x: 834, y: 1063}, floor2: {x: 1100, y: 353} },
      { floor1 : {x: 209, y: 1085}, floor2: {x: 359, y: 364} },
      { floor1 : {x: 1111, y: 1549}, floor2: {x: 1372, y: 940} },
      { floor1 : { x: 1692, y: 1553}, floor2: {x: 2145, y: 943} },
    ]
  }
};
const roomCoordinates =
{
    'discoveryPark':
    {
      A_wing_roomCoords:
      {
        'A101': { x: 974, y: 1788, floor: 1 },
        'A130': { x: 951, y: 1808, floor: 1 },
        'A131': { x: 950, y: 1808, floor: 1 },
        'A140': { x: 953, y: 1754, floor: 1 },
        'A160A': { x: 952, y: 1640, floor: 1 },
        'A160B': { x: 902, y: 1655, floor: 1 },
        'A160C': { x: 883, y: 1656, floor: 1 },
        'A160D': { x: 863, y: 1656, floor: 1 },
        'A160E': { x: 837, y: 1665, floor: 1 },
        'A160F': { x: 878, y: 1659, floor: 1 },
        'A160G': { x: 894, y: 1660, floor: 1 },
        'A143': { x: 861, y: 1745, floor: 1 },
        'A144': { x: 862, y: 1726, floor: 1 },
        'A145': { x: 861, y: 1706, floor: 1 },
        'A146': { x: 861, y: 1706, floor: 1 },
        'A147': { x: 887, y: 1705, floor: 1 },
        'A149': { x: 871, y: 1720, floor: 1 },
        'A151': { x: 923, y: 1723, floor: 1 },
        'A154': { x: 923, y: 1724, floor: 1 },
        'A150': { x: 922, y: 1691, floor: 1 },
        'A153': { x: 923, y: 1693, floor: 1 }
      },

      B_wing_roomCoords:
      {
        'B185': { x: 923, y: 1462, floor: 1 },
        'B185A': { x: 948, y: 1397, floor: 1 },
        'B185B': { x: 998, y: 1397, floor: 1 },
        'B156': { x: 1031, y: 1378, floor: 1 },
        'B145': { x: 1034, y: 1388, floor: 1 },
        'B186A': { x: 925, y: 1521, floor: 1 },
        'B186B': { x: 966, y: 1564, floor: 1 },
        'B187': { x: 1052, y: 1530, floor: 1 },
        'B192': { x: 1166, y: 1505, floor: 1 },
        'B190': { x: 1166, y: 1441, floor: 1 },
        'B157': { x: 924, y: 1291, floor: 1 },
        'B158': { x: 924, y: 1360, floor: 1 },
        'B155': { x: 1007, y: 1246, floor: 1 },
        'B142': { x: 1067, y: 1248, floor: 1 },
        'B140': { x: 1123, y: 1249, floor: 1 },
        'B112': { x: 987, y: 1099, floor: 1 },
        'B110': { x: 924, y: 1187, floor: 1 },
        'B111': { x: 925, y: 1220, floor: 1 },
        'B131': { x: 1165, y: 1216, floor: 1 },
        'B131A': { x: 1112, y: 1245, floor: 1 },
        'B131B': { x: 1112, y: 1244, floor: 1 },
        'B129': { x: 1163, y: 1168, floor: 1 },
        'B129A': { x: 1108, y: 1095, floor: 1 },
        'B129B': { x: 1131, y: 1093, floor: 1 },
        'B129C': { x: 1152, y: 1097, floor: 1 }
      },

      D_wing_roomCoords:
      {
      }
    }
};

const naturalWidth = {floor1: 1728, floor2: 2304}; //store width of each Discovery Park image


function scaleImg(x, y, floor, canvas) //upscales or downsacles image to match device's resolution width
{
  const scale = canvas.width / naturalWidth['floor' + floor];
  return { x: Math.round(x * scale), y: Math.round(y * scale) };
}


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
