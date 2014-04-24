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
 * @param {Image} image The image of the tile set.
 * @param {number} rows The number of rows on the tile set.
 * @param {number} columns The number of rows on the tile set.
 * @param {Fibula.TileSize} tileSize The size of the tile on the tile set.
 */
Fibula.TileSet = function(image, rows, columns, tileSize)
{
    /**
     * The image to be used on the tile set.
     * @type {Image}
     */
    this.image = image;

    /**
     * The number of rows on the tile set.
     * @type {number}
     */
    this.rows = rows;

    /**
     * The number of columns on the tile set.
     * @type {number}
     */
    this.columns = columns;

    /**
     * The size of the tile on the tile set. 
     * @type {Fibula.TileSize}
     */
    this.tileSize = tileSize;
};

Fibula.TileSet.prototype.constructor = Fibula.TileSet;
