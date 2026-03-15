/*
Logic for arrow routing, uses map colors to discern what that color indicates the region is for
*/

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
  dim.drawImage(img, 0, 0, canvas.width, canvas.height); //draws map image on top of the canvas so the arrow can be drawn on the map

  const mapData = dim.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = mapData.data; //stores image data as an array where each entry is a (r, g, b, a) value

  const grid = []; //stores whether a pixel is walkable or not

  for (let i = 0; i < canvas.height; y++)
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
