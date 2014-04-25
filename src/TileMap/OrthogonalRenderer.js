/*
 * This file is part of the Fibula package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new OrthogonalRenderer object.
 *
 * @class Fibula.OrthogonalRenderer
 * @constructor
 * @param {HTMLCanvasElement} canvas The canvas to render on.
 */
Fibula.OrthogonalRenderer = function(canvas)
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
Fibula.OrthogonalRenderer.prototype.render = function(tileMap)
{
    var ctx = this.canvas.getContext('2d'),
        tilesPerRow = tileMap.height / tileMap.tileSet.tileWidth,
        tilesPerCol = tileMap.width / tileMap.tileSet.tileHeight,
        tileSetColumns = tileMap.tileSet.width / tileMap.tileSet.tileWidth;

    tileMap.layers.forEach(function(layer) {
        for (var row = 0; row < tilesPerRow; row++) {
            for (var column = 0; column < tilesPerCol; column++) {
                var tile = layer.data[row][column],
                    tileRow = Math.floor(tile / tileSetColumns),
                    tileCol = Math.floor(tile % tileSetColumns),
                    cartesianX = (column * tileMap.tileSet.tileHeight),
                    cartesianY = (row * tileMap.tileSet.tileWidth);
                
                ctx.drawImage(
                    tileMap.tileSet.image,
                    (tileCol * tileMap.tileSet.tileHeight),
                    (tileRow * tileMap.tileSet.tileWidth),
                    tileMap.tileSet.tileWidth,
                    tileMap.tileSet.tileHeight,
                    cartesianX,
                    cartesianY,
                    tileMap.tileSet.tileWidth,
                    tileMap.tileSet.tileHeight
                );
            }
        }
    });
};

Fibula.OrthogonalRenderer.prototype.constructor = Fibula.OrthogonalRenderer;
