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
 * @param {Object} settings The settings object.
 */
Fibula.TileMap = function(settings)
{
    /**
     * The settings object.
     * @type {Object}
     */
    settings = settings || {};

    /**
     * The tile width for this tile map.
     * @type {number}
     */
    this.tileWidth = settings.tileWidth || this.tileWidth;

    /**
     * The tile height of this tile map.
     * @type {number}
     */
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
    tileWidth: false,
    tileHeight: false,
    layers: false,
    key: 'no_key'
};
