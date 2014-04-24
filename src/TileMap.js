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
 * @class TileMap
 * @constructor
 * @param {string} projection The projection of the tile map.
 * @param {TileSet} tileSet The tile set to load on the tile map.
 * @param {TileSize} tileSize The tile size dimensions object.
 * @param {number} width The width of the tile map.
 * @param {number} height The height of the tile map.
 */
TileMap = function(key, tileSet, tileSize, width, height)
{
    /**
     * The projection of the tile map (isometric, orthogonal)
     * @type {string}
     */
    this.projection = null;

    /**
     * The string key of the tile map.
     * @type {string}
     */
    this.key = key;
    
    /**
     * The tile set to load on the tile map.
     * @type {TileSet}
     */
    this.tileSet = tileSet;

    /**
     * The tile size dimensions object.
     * @type {TileSize}
     */
    this.tileSize = tileSize;

    /**
     * The width of the tile map.
     * @type {number}
     */
    this.width = width;

    /**
     * The height of the tile map.
     * @type {number}
     */
    this.height = height;

    /**
     * The array of tile map layers.
     * @type {Array}<TileMapLayer>
     */
    this.layers = [];

    /**
     * Boolean flag for controlling the grid display.
     * @type {boolean}
     */
    this.showGrid = false;
};

/**
 * The orthogonal projection type constant.
 * @type {string}
 */
TileMap.PROJECTION_ORTHOGONAL = "orthogonal";

/**
 * The isometric projection type constant.
 * @type {string}
 */
TileMap.PROJECTION_ISOMETRIC = "isometric";

/**
 * Renders the tile map by looping through all layers on a given html canvas element.
 * 
 * @param {HTMLCanvasElement} canvas The canvas element to draw the tile map on.
 */
TileMap.prototype.render = function(canvas)
{
    var ctx = canvas.getContext('2d'),
        tilesPerRow = this.height / this.tileSize.height,
        tilesPerCol = this.width / this.tileSize.width;
    
    this.layers.forEach(function(layer) {
        for (var x = 0; x < tilesPerRow; x++) {
            for (var y = 0; y < tilesPerCol; y++) {
                var tile = layer.data[x][y],
                    tileRow = Math.floor(tile / this.tileSet.tilesPerRow),
                    tileCol = Math.floor(tile % this.tileSet.tilesPerRow),
                    posCol = (y * this.tileSize.height),
                    posRow = (x * this.tileSize.width);

                ctx.drawImage(
                    this.tileSet.image,
                    (tileCol * this.tileSize.height),
                    (tileRow * this.tileSize.width),
                    this.tileSize.width,
                    this.tileSize.height,
                    posCol,
                    posRow,
                    this.tileSize.width,
                    this.tileSize.height
                );

                if (this.showGrid) {
                    ctx.strokeStyle = "#FF00FF";
                    ctx.lineWidth = 1;
                    ctx.strokeRect(posCol, posRow, this.tileSize.width, this.tileSize.height);
                }
            }
        }
    }, this);
};

/**
 * Loads a json file definition of a tile map.
 * @param {string} path The path of the json file.
 */
TileMap.prototype.loadFromJson = function(path)
{
    // @todo call parser
};

/**
 * Changes the control flag for showing the grid.
 * @param {boolean} flag Weather to show the grid or not.
 */
TileMap.prototype.setShowGrid = function(flag)
{
    this.showGrid = flag;
};

/**
 * Adds a tile map layer to the tile map.
 * 
 * @param {TileMapLayer} layer The tile map layer to add.
 */
TileMap.prototype.addLayer = function(layer)
{
    this.layers.push(layer);
};

TileMap.prototype.constructor = TileMap;
