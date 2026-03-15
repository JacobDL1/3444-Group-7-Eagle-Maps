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
