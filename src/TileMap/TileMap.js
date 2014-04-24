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
 * @param {Fibula.TileSet} tileSet The tile set to load on the tile map.
 * @param {Fibula.TileSize} tileSize The tile size dimensions object.
 * @param {number} width The width of the tile map.
 * @param {number} height The height of the tile map.
 * @param {string} projection The projection of the tile map.
 */
Fibula.TileMap = function(key, tileSet, tileSize, width, height, projection)
{
    /**
     * The string key of the tile map.
     * @type {string}
     */
    this.key = key;
    
    /**
     * The tile set to load on the tile map.
     * @type {Fibula.TileSet}
     */
    this.tileSet = tileSet;

    /**
     * The tile size dimensions object.
     * @type {Fibula.TileSize}
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
     * The projection of the tile map (isometric, orthogonal)
     * @type {string}
     */
    this.projection = projection;

    /**
     * The array of tile map layers.
     * @type {Array}<Fibula.TileMapLayer>
     */
    this.layers = [];

    /**
     * The renderer strategy to render the tile map.
     * @type {Fibula.OrthogonalRenderer|Fibula.IsometricRenderer}
     */
    this.renderer = null;
};

/**
 * The orthogonal projection type constant.
 * @type {string}
 */
Fibula.TileMap.PROJECTION_ORTHOGONAL = "orthogonal";

/**
 * The isometric projection type constant.
 * @type {string}
 */
Fibula.TileMap.PROJECTION_ISOMETRIC = "isometric";

/**
 * Renders the tile map by looping through all layers on a given html canvas element.
 * 
 * @param {HTMLCanvasElement} canvas The canvas element to draw the tile map on.
 */
Fibula.TileMap.prototype.render = function(canvas)
{
    switch(this.projection) {
        case Fibula.TileMap.PROJECTION_ORTHOGONAL:
            this.renderer = new Fibula.OrthogonalRenderer(canvas);
            break;
        case Fibula.TileMap.PROJECTION_ISOMETRIC:
            this.renderer = new Fibula.IsometricRenderer(canvas);
            break;
    }
    
    this.renderer.render(this);
};

/**
 * Loads a json file definition of a tile map.
 * @param {string} path The path of the json file.
 */
Fibula.TileMap.prototype.loadFromJson = function(path)
{
    // @todo call parser
};

/**
 * Adds a tile map layer to the tile map.
 * 
 * @param {Fibula.TileMapLayer} layer The tile map layer to add.
 */
Fibula.TileMap.prototype.addLayer = function(layer)
{
    this.layers.push(layer);
};

Fibula.TileMap.prototype.constructor = Fibula.TileMap;
