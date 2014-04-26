/*
 * This file is part of the Fibula package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new TileMap object.
 *
 * @class Fibula.TileMap
 * @constructor
 * @param {string} key The string key of the tile map.
 * @param {number} tileWidth The width of a tile in pixels.
 * @param {number} tileHeight The height of a tile in pixels.
 * @param {array}<Fibula.TileMapLayer> layers the TileMapLayers of this TileMap
 */
Fibula.TileMap = function(settings)
{

    settings = settings || {};

    this.tileWidth = settings.tileWidth || this.tileWidth;
    this.tileHeight = settings.tileHeight || this.tileHeight;

    /**
     * The array of tile map layers.
     * @type {Array}<Fibula.TileMapLayer>
     */
    this.layers = settings.layers || [];
    /**
     * The string key of the tile map.
     * @type {string}
     */
    this.key = settings.key || this.key;

};

Fibula.TileMap.prototype = {
    constructor: Fibula.TileMap,
    tileWidth: 32,
    tileHeight: 32,
    layers: false, // []
    key: 'no_key'
};

