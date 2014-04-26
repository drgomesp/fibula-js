/*
 * This file is part of the Fibula package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new TileMapLayer object.
 *
 * @class Fibula.TileMapLayer
 * @constructor
 * @param {string} name The name of the layer.
 * @param {Fibula.TileMap} tileMap The tile map where this layer belongs to.
 */
Fibula.TileMapLayer = function(name, tileMap)
{
    /**
     * The name of the layer.
     * @type {string}
     */
    this.name = name;
    /**
     * The tile map where this layer belongs to.
     * @type {Fibula.TileMap}
     */
    this.tileMap = tileMap;

    /**
     * The data array containing the keys for the tile set image.
     * @type {Array}
     */
    this.data = [];

    /**
     * The array of tiles of this layer.
     * @type {Array}
     */
    this.tiles = [];

    /**
     * The opacity of the layer (1 == 100%).
     * @type {number}
     */
    this.opacity = 1;

    /**
     * Weather the layer is visible or not.
     * @type {boolean}
     */
    this.visible = true;
};

/**
 * Adds a tile to the layer.
 * @param {Fibula.Tile} tile The tile to add.
 */
Fibula.TileMapLayer.prototype.addTile = function(tile)
{
    this.tiles.push(tile);
};

Fibula.TileMapLayer.prototype.constructor = Fibula.TileMapLayer;
