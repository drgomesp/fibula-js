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
        tilesPerRow = tileMap.height / tileMap.tileSize.height,
        tilesPerCol = tileMap.width / tileMap.tileSize.width;
    
    tileMap.layers.forEach(function(layer) {
        for (var row = 0; row < tilesPerRow; row++) {
            for (var column = 0; column < tilesPerCol; column++) {
                var tile = layer.data[row][column],
                    tileRow = Math.floor(tile / tileMap.tileSet.columns),
                    tileCol = Math.floor(tile % tileMap.tileSet.columns),
                    isometricX = (row - column) * (tileMap.tileSize.width / 2),
                    isometricY = (row + column) * (tileMap.tileSize.height / 2);

                isometricX += tileMap.width / 2; // Adjust the middle of the "camera"
                
                ctx.drawImage(
                    tileMap.tileSet.image,
                    tileCol * tileMap.tileSet.tileSize.height,
                    tileRow * tileMap.tileSet.tileSize.width,
                    tileMap.tileSet.tileSize.width,
                    tileMap.tileSet.tileSize.height,
                    isometricX,
                    isometricY,
                    tileMap.tileSet.tileSize.width,
                    tileMap.tileSet.tileSize.height
                );
            }
        }
    });
};

Fibula.IsometricRenderer.prototype.constructor = Fibula.IsometricRenderer;
