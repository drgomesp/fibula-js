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
        tilesPerRow = tileMap.height / tileMap.tileSize.width,
        tilesPerCol = tileMap.width / tileMap.tileSize.height;

    tileMap.layers.forEach(function(layer) {
        for (var row = 0; row < tilesPerRow; row++) {
            for (var column = 0; column < tilesPerCol; column++) {
                var tile = layer.data[row][column],
                    tileRow = Math.floor(tile / tileMap.tileSet.columns),
                    tileCol = Math.floor(tile % tileMap.tileSet.columns),
                    cartesianX = (column * tileMap.tileSize.height),
                    cartesianY = (row * tileMap.tileSize.width);
                
                ctx.drawImage(
                    tileMap.tileSet.image,
                    (tileCol * tileMap.tileSize.height),
                    (tileRow * tileMap.tileSize.width),
                    tileMap.tileSize.width,
                    tileMap.tileSize.height,
                    cartesianX,
                    cartesianY,
                    tileMap.tileSize.width,
                    tileMap.tileSize.height
                );
            }
        }
    });
};

Fibula.OrthogonalRenderer.prototype.constructor = Fibula.OrthogonalRenderer;
