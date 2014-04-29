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
 * @param {Object} settings The settings object.
 */
Fibula.TileMapLayer = function(settings)
{
    /**
     * The settings object.
     * @type {Object}
     */
    settings = settings || {};

    /**
     * The name of the layer.
     * @type {string}
     */
    this.name = settings.name || this.name;

    /**
     * The opacity of the layer (1 == 100%).
     * @type {number}
     */
    this.opacity = settings.opacity || this.opacity;

    /**
     * Weather the layer is visible or not.
     * @type {boolean}
     */
    this.visible = typeof settings.visible !== "undefined" ? settings.visible : this.visible; 

    /**
     * The tile set to be used with this layer.
     * @type {Fibula.TileSet}
     */
    this.tileSet = settings.tileSet || this.tileSet;
    
    /**
     * The array of tiles of this layer.
     * @type {Array}
     */
    this.tiles = [];

    /**
     * The width of the layer.
     * @type {number}
     */
    this.width;

    /**
     * The height of the layer.
     * @type {number}
     */
    this.height;

    if (settings.data) {
        this.fillTiles(settings.data);
    }
};

Fibula.TileMapLayer.prototype = {
    name: 'no_name',
    tiles: false,
    opacity: 1,
    visible: true,
    tileSet: null,
    width: false,
    height: false
};

/**
 * Fills the layer with tiles using the data information of the tile set.
 * 
 * @param {Array} data The tile set data array for the layer.
 */
Fibula.TileMapLayer.prototype.fillTiles = function(data)
{
    this.tiles = [];
    this.height = data.length;
    this.width= data[0].length;
    
    var pos;
    
    for(var x = 0; x < data.length; x++) {
        if (typeof this.tiles[x] === "undefined") {
            this.tiles[x] = [];
        }
        
        for(var y = 0; y < this.height; y++) {
            pos = data[y][x] != null ? data[y][x] : NaN;
            this.tiles[x][y] = new Fibula.Tile(x, y, pos);
        }
    }
};

Fibula.TileMapLayer.prototype.constructor = Fibula.TileMapLayer;
