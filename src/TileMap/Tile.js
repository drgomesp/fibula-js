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
 * @param {Fibula.TileMapLayer} layer The layer where the tile belongs to.
 * @param {number} tileSetPosition The position of the tile set of this tile.
 * @param {number} x The x coordinate of the tile on the tile map.
 * @param {number} y The y coordinate of the tile on the tile map.
 */
Fibula.Tile = function(layer, tileSetPosition, x, y)
{
    /**
     * The layer where the tile belongs to.
     * @type {Fibula.TileMapLayer}
     */
    this.layer = layer;

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

    /**
     * The width of the tile.
     * @type {number}
     */
    this.width = layer.tileMap.tileSet.tileWidth;

    /**
     * The height of the tile.
     * @type {number}
     */
    this.height = layer.tileMap.tileSet.tileHeight;
};

Fibula.Tile.prototype.constructor = Fibula.Tile;
