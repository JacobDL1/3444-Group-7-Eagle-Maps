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
      A_wingFirstFloor_roomCoords:
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

      B_wingFirstFloor_roomCoords:
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

      D_wingFirstFloor_roomCoords:
      {
        'D115': { x: 952, y: 1052, floor: 1 },
        'D133': { x: 942, y: 915, floor: 1 },
        'D132': { x: 1023, y: 912, floor: 1 },
        'D130': { x: 1055, y: 911, floor: 1 },
        'D120': { x: 1165, y: 936, floor: 1 },
        'D126': { x: 1167, y: 982, floor: 1 },
        'D111': { x: 1167, y: 1013, floor: 1 },
        'D110': { x: 1165, y: 1036, floor: 1 },
        'D112': { x: 1098, y: 1052, floor: 1 },
        'D113': { x: 1053, y: 1054, floor: 1 },
        'D114': { x: 1025, y: 1051, floor: 1 },
        'D155': { x: 1003, y: 901, floor: 1 },
        'D144': { x: 1072, y: 898, floor: 1 },
        'D142': { x: 1142, y: 896, floor: 1 },
        'D140': { x: 1207, y: 899, floor: 1 },
        'D190': { x: 1215, y: 913, floor: 1 }
        
      },

      E_wingFirstFloor_roomCoords:
      {
        'E103': { x: 317, y: 1101, floor: 1 },
        'E111': { x: 451, y: 1101, floor: 1 },
        'E110': { x: 431, y: 1101, floor: 1 },
        'E108': { x: 409, y: 1101, floor: 1 },
        'E106': { x: 383, y: 1101, floor: 1 },
        'E104': { x: 361, y: 1100, floor: 1 },
        'E102': { x: 340, y: 1101, floor: 1 },
        'E124': { x: 670, y: 1101, floor: 1 },
        'E123': { x: 648, y: 1100, floor: 1 },
        'E121': { x: 627, y: 1102, floor: 1 },
        'E120': { x: 605, y: 1099, floor: 1 },
        'E119': { x: 581, y: 1100, floor: 1 },
        'E118': { x: 559, y: 1100, floor: 1 },
        'E117': { x: 536, y: 1101, floor: 1 },
        'E132': { x: 321, y: 1153, floor: 1 },
        'E132A': { x: 363, y: 1152, floor: 1 },
        'E132B': { x: 407, y: 1153, floor: 1 },
        'E132H': { x: 309, y: 1198, floor: 1 },
        'E132G': { x: 330, y: 1198, floor: 1 },
        'E132F': { x: 352, y: 1198, floor: 1 },
        'E132E': { x: 379, y: 1198, floor: 1 },
        'E132D': { x: 399, y: 1198, floor: 1 },
        'E132C': { x: 425, y: 1198, floor: 1 },
        'E138A': { x: 449, y: 1152, floor: 1 },
        'E138': { x: 451, y: 1266, floor: 1 },
        'E136': { x: 373, y: 1267, floor: 1 },
        'E141': { x: 488, y: 1266, floor: 1 },
        'E140': { x: 486, y: 1155, floor: 1 },
        'E142': { x: 532, y: 1153, floor: 1 },
        'E142A': { x: 522, y: 1266, floor: 1 },
        'E142B': { x: 548, y: 1267, floor: 1 },
        'E144': { x: 574, y: 1153, floor: 1 },
        'E146': { x: 619, y: 1154, floor: 1 },
        'E148': { x: 662, y: 1155, floor: 1 },
        'E147': { x: 616, y: 1267, floor: 1 },
        'E149': { x: 662, y: 1265, floor: 1 },
        'E128': { x: 702, y: 1184, floor: 1 },
        'E129': { x: 700, y: 1272, floor: 1 },
        'E150': { x: 663, y: 1339, floor: 1 },
        'E151': { x: 691, y: 1369, floor: 1 },
        'E145': { x: 628, y: 1339, floor: 1 },
        'E143': { x: 589, y: 1338, floor: 1 },
        'E139': { x: 539, y: 1338, floor: 1 },
        'E154': { x: 504, y: 1362, floor: 1 },
        'E155': { x: 506, y: 1419, floor: 1 },
        'E137': { x: 450, y: 1338, floor: 1 },
        'E135': { x: 356, y: 1337, floor: 1 },
        'E199C': { x: 702, y: 1388, floor: 1 },
        'E199B': { x: 703, y: 1440, floor: 1 },
        'E152': { x: 690, y: 1410, floor: 1 },
        'E156': { x: 453, y: 1451, floor: 1 },
        'E157': { x: 496, y: 1386, floor: 1 },
        'E167': { x: 382, y: 1454, floor: 1 },
        'E166': { x: 320, y: 1453, floor: 1 },
        'E163': { x: 293, y: 1399, floor: 1 },
        'E160': { x: 291, y: 1363, floor: 1 },
        'E164': { x: 353, y: 1407, floor: 1 },
        'E165': { x: 353, y: 1407, floor: 1 },
        'E161': { x: 352, y: 1366, floor: 1 },
        'E162': { x: 393, y: 1343, floor: 1 },
        'E168': { x: 288, y: 1387, floor: 1 },
        'E169': { x: 288, y: 1441, floor: 1 },
        'E100F': { x: 369, y: 1466, floor: 1 },
        'E179': { x: 290, y: 1500, floor: 1 },
        'E186': { x: 286, y: 1600, floor: 1 },
        'E180E': { x: 317, y: 1575, floor: 1 },
        'E180C': { x: 316, y: 1583, floor: 1 },
        'E180G': { x: 351, y: 1575, floor: 1 },
        'E180B': { x: 348, y: 1584, floor: 1 },
        'E180J': { x: 386, y: 1575, floor: 1 },
        'E180Z': { x: 380, y: 1583, floor: 1 },
        'E180L': { x: 420, y: 1575, floor: 1 },
        'E180X': { x: 410, y: 1584, floor: 1 },
        'E180N': { x: 450, y: 1576, floor: 1 },
        'E180V': { x: 450, y: 1584, floor: 1 },
        'E180C': { x: 318, y: 1637, floor: 1 },
        'E180A': { x: 352, y: 1637, floor: 1 },
        'E180P': { x: 470, y: 1540, floor: 1 },
        'E178Q': { x: 512, y: 1477, floor: 1 },
        'E178R': { x: 510, y: 1514, floor: 1 },
        'E178E': { x: 557, y: 1467, floor: 1 },
        'E178C': { x: 519, y: 1575, floor: 1 },
        'E178D': { x: 517, y: 1527, floor: 1 },
        'E178B': { x: 519, y: 1625, floor: 1 },
        'E180U': { x: 508, y: 1625, floor: 1 },
        'E180T': { x: 510, y: 1602, floor: 1 },
        'E180S': { x: 509, y: 1582, floor: 1 },
        'E180R': { x: 508, y: 1561, floor: 1 },
        'E180Q': { x: 509, y: 1533, floor: 1 },
        'E178': { x: 574, y: 1637, floor: 1 },
        'E178P': { x: 612, y: 1636, floor: 1 },
        'E178N': { x: 650, y: 1636, floor: 1 },
        'E178M': { x: 693, y: 1626, floor: 1 },
        'E178L': { x: 684, y: 1602, floor: 1 },
        'E178K': { x: 693, y: 1566, floor: 1 },
        'E175': { x: 691, y: 1513, floor: 1 },
        'E199A': { x: 702, y: 1587, floor: 1 },
        'E170': { x: 679, y: 1461, floor: 1 },
        'E171': { x: 662, y: 1463, floor: 1 },
        'E172': { x: 651, y: 1463, floor: 1 },
        'E173': { x: 641, y: 1462, floor: 1 },
        'E178G': { x: 586, y: 1464, floor: 1 },
        'E178H': { x: 557, y: 1467, floor: 1 },
        'E178J': { x: 557, y: 1467, floor: 1 },
        'E133': { x: 290, y: 1183, floor: 1 },
        'E134': { x: 289, y: 1271, floor: 1 }
      },

      J_wing_roomCoords:
      {
        'J101': { x: 1189, y: 897, floor: 1 },
        'J130': { x: 1189, y: 897, floor: 1 },
        'J105': { x: 1189, y: 897, floor: 1 },
        'J115': { x: 1201, y: 894, floor: 1 }
      }
    }
};

const naturalWidth = {floor1: 1728, floor2: 2304}; //store width of each Discovery Park image


function scaleImg(x, y, floor, canvas) //upscales or downsacles image to match device's resolution width
{
  const scale = canvas.width / naturalWidth['floor' + floor];
  return { x: Math.round(x * scale), y: Math.round(y * scale) };
}


function getRoomCoords(building, roomNum) //checks if room exists and returns its coordiantes if it does
{
  const wing = roomNum[0].toUpperCase() + '_wing_roomCoords'; //stores name of wing as it will be stored in roomCoordinates
  const room = roomCoordinates[building]; //stores data of rooms in specified building

  if (!room[wing]) //wing does not exist
  {
    return null;
  }

  if (!room[wing][roomNum.toUpperCase()]) //room does not exist
  {
    return null;
  }

  if (room[wing][roomNum.toUpperCase()]) //room exists
  {
    return room[wing][roomNum.toUpperCase()];
  }
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
