/*
 * This file is part of the Fibula package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new Tile object.
 *
 * @class Fibula.Tile
 * @constructor
 * @param {number} x The x coordinate of the tile on the tile map.
 * @param {number} y The y coordinate of the tile on the tile map.
 * @param {number} tileSetPosition The position of the tile set of this tile.
 */
Fibula.Tile = function(x, y, tileSetPosition)
{
    /**
     * The position of the tile set of this tile.
     * @type {number}
     */
    this.tileSetPosition = tileSetPosition;

    /**
     * The x coordinate of the tile on the tile map.
     * @type {number}
     */
    this.x = x;

    /**
     * The y coordinate of the tile on the tile map.
     * @type {number}
     */
    this.y = y;
};

Fibula.Tile.prototype.constructor = Fibula.Tile;
