/*
 * This file is part of the Fibula package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new TileSet object.
 *
 * @class Fibula.TileSet
 * @constructor
 * @param {HTMLImageElement} image The image of the tile set.
 */
Fibula.TileSet = function(image)
{
    /**
     * The image to be used on the tile set.
     * @type {HTMLImageElement}
     */
    this.image = image;

    /**
     * The width of the tile set.
     * @type {number}
     */
    this.width = image.width;

    /**
     * The height of the tile set.
     * @type {number}
     */
    this.height = image.height;
};

Fibula.TileSet.prototype = {
    image: false,
    width: false,
    height: false
};

/**
 * Finds the coordinates for a given tile on the tile set.
 * 
 * @param {number} index The tile index.
 * @param {number} tileWidth The tile width.
 * @param {number} tileHeight The tile height.
 * @returns {{x: number, y: number}}
 */
Fibula.TileSet.prototype.findCoordinates = function(index, tileWidth, tileHeight)
{
    var tilesPerColumn = this.width / tileWidth,
        tileX = Math.floor(index / tilesPerColumn),
        tileY = Math.floor(index % tilesPerColumn),
        x = tileY * tileHeight,
        y = tileX * tileWidth;
    
    return {x: x, y: y};
};

Fibula.TileSet.prototype.constructor = Fibula.TileSet;
