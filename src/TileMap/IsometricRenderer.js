/*
 * This file is part of the Fibula package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new IsometricRenderer object.
 *
 * @class Fibula.IsometricRenderer
 * @constructor
 * @param {HTMLCanvasElement} canvas The canvas to render on.
 */
Fibula.IsometricRenderer = function(canvas)
{
    /**
     * The canvas to render on.
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvas;
};

/**
 * Renders the tile map to the canvas.
 * @param {Fibula.TileMap} tileMap The tile map to render against the canvas.
 */
Fibula.IsometricRenderer.prototype.render = function(tileMap)
{
    var ctx = this.canvas.getContext('2d'),
        tileHeightOnTileMap = (tileMap.tileSet.tileHeight / 2),// divide the height by 2 because it's isometric 
        tilesPerRow = tileMap.height / tileHeightOnTileMap,
        tilesPerCol = tileMap.width / tileMap.tileSet.tileWidth,
        tileSetColumns = tileMap.tileSet.width / tileMap.tileSet.tileWidth;
    
    tileMap.layers.forEach(function(layer) {
        for (var row = 0; row < tilesPerRow; row++) {
            for (var column = 0; column < tilesPerCol; column++) {
                var tileSetPosition = layer.data[row][column],
                    tileRow = Math.floor(tileSetPosition / tileSetColumns),
                    tileCol = Math.floor(tileSetPosition % tileSetColumns),
                    isometricX = (row - column) * (tileMap.tileSet.tileWidth / 2),
                    isometricY = (row + column) * (tileHeightOnTileMap / 2),
                    tile = new Fibula.Tile(layer, tileSetPosition, isometricX, isometricY);

                tile.x += tileMap.width / 2; // Adjust the middle of the "camera"
                layer.addTile(tile);
                
                ctx.drawImage(
                    tileMap.tileSet.image,
                    tileCol * tileMap.tileSet.tileHeight,
                    tileRow * tileMap.tileSet.tileWidth,
                    tile.width,
                    tile.height,
                    tile.x,
                    tile.y,
                    tile.width,
                    tile.height
                );
            }
        }
    });
};

Fibula.IsometricRenderer.prototype.constructor = Fibula.IsometricRenderer;
