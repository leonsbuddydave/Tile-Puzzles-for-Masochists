var width;
var height;
var img;
var tiles;
var tileorder;
var c;
var tile_w;
var tile_h;
var tiles_y;
var tiles_x;

var clicked_tile_x;
var clicked_tile_y;

var EmptyTile;

function MakeTileGame(canvas, imgSrc, puzzleWidth, puzzleHeight)
{
	canv = document.getElementById(canvas);
	c = canv.getContext('2d');

	tiles_x = puzzleWidth;
	tiles_y = puzzleHeight;
	
	img = new Image();
	img.src = imgSrc;

	img.onload = function()
	{
		width = img.width;
		height = img.height;
		$("#" + canvas).attr( { width: width, height: height } );
		c.drawImage(img, 0, 0);
		GetTiles();
		tileorder = RandomizeTilePosition();
		DrawBoard();
	}

	$("#" + canvas).click( MoveTile );	
}

function MoveTile(event)
{
	x = event.clientX;
	y = event.clientY;

	clicked_tile_x = ( x - x % tile_w ) / tile_w;
	clicked_tile_y = ( y - y % tile_h ) / tile_h;

	ClickedTile = tileorder[clicked_tile_x * tiles_y + clicked_tile_y];

	console.log( "ClickX: " + clicked_tile_x + ", ClickY: " + clicked_tile_y + " Clicked ID: " + ClickedTile + " ClickLocation: " + ( clicked_tile_x * tiles_y + clicked_tile_y) );

	// Check all around the clicked area for the blank tile

	swap = false;

	Right = ( clicked_tile_x + 1 ) * tiles_y + clicked_tile_y;
	Above = clicked_tile_x * tiles_y + clicked_tile_y - 1;
	Left = ( clicked_tile_x - 1 ) * tiles_y + clicked_tile_y;
	Below = clicked_tile_x * tiles_y + clicked_tile_y + 1;

	console.log( "Right: " + Right + " with ID " + tileorder[ Right ] );
	console.log( "Above: " + Above + " with ID " + tileorder[ Above ] );
	
	ClickedIndex = clicked_tile_x * tiles_y + clicked_tile_y;

	// Above
	if ( tileorder [ Above ] === ( tiles_x * tiles_y - 1) )
	{
		SwapTiles(Above, ClickedIndex);
	}
	// Right
	if (tileorder [ Right ] === ( tiles_x * tiles_y - 1 ) )
	{
		SwapTiles(Right, ClickedIndex);
	}
	// Below
	if (tileorder [ Below ] === ( tiles_x * tiles_y - 1) )
	{
		SwapTiles(Below, ClickedIndex);
	}
	// Left
	if (tileorder [ Left ] === ( tiles_x * tiles_y - 1) )
	{
		SwapTiles(Left, ClickedIndex);
	}

	DrawBoard();
}

function SwapTiles(tile1, tile2)
{
	console.log("Swapping " + tile1 + " and " + tile2);
	temp = tileorder[tile1];
	tileorder[tile1] = tileorder[tile2];
	tileorder[tile2] = temp;
}

function RandomizeTilePosition()
{
	tileorder = new Array(tiles_x * tiles_y);

	// Populate the array with sequential order
	for (i = 0; i < tiles_x * tiles_y; i++) { tileorder[i] = i; }

	// FUCK IT UP
	tileorder.sort( function(a, b) { return 0.5 - Math.random() } );

	// YEAH FUCK IT
	return tileorder;
}

function DrawBoard()
{
	c.fillStyle = "#0000FF";
	c.fillRect(0, 0, width, height);

	for (i = 0; i < tiles_x; i++)
	{
		for (ii = 0; ii < tiles_y; ii++)
		{
			// Last tile, don't draw
			if ( tileorder[ i * tiles_y + ii ] === tiles_x * tiles_y - 1)
				continue;

			c.putImageData(tiles[ tileorder[i * tiles_y + ii] ], i * tile_w, ii * tile_h);
			//c.fillText( (i * tiles_y + ii), i * tile_w + tile_w / 2, ii * tile_h + tile_h / 2);
		}
	}
}

function GetTiles()
{
	tiles = new Array();

	tile_w = Math.ceil(width / tiles_x);
	tile_h = Math.ceil(height / tiles_y);
	
	for (i = 0; i < tiles_x; i++)
	{
		for (ii = 0; ii < tiles_y; ii++)
		{
			tiles[i * tiles_y + ii] = c.getImageData(i * tile_w, ii * tile_h, tile_w, tile_h);
		}
	}
}

function DrawRandomTile()
{
	context = document.getElementById("testBuffer").getContext('2d');
	context.putImageData(tiles[ Math.floor(Math.random() * 9) ], 0, 0);
}
