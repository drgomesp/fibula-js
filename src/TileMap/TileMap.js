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
            this.renderOrthogonal(canvas);
            break;
        case Fibula.TileMap.PROJECTION_ISOMETRIC:
            this.renderIsometric(canvas);
            break;
    }
};

Fibula.TileMap.prototype.renderOrthogonal = function(canvas)
{
    var ctx = canvas.getContext('2d'),
        tilesPerRow = this.height / this.tileSize.height,
        tilesPerCol = this.width / this.tileSize.width;
    
    this.layers.forEach(function(layer) {
        for (var row = 0; row < tilesPerRow; row++) {
            for (var column = 0; column < tilesPerCol; column++) {
                var tile = layer.data[row][column],
                    tileRow = Math.floor(tile / this.tileSet.columns),
                    tileCol = Math.floor(tile % this.tileSet.columns),
                    cartesianX = (column * this.tileSize.height),
                    cartesianY = (row * this.tileSize.width);

                ctx.drawImage(
                    this.tileSet.image,
                    (tileCol * this.tileSize.height),
                    (tileRow * this.tileSize.width),
                    this.tileSize.width,
                    this.tileSize.height,
                    cartesianX,
                    cartesianY,
                    this.tileSize.width,
                    this.tileSize.height
                );
            }
        }
    }, this);
};

Fibula.TileMap.prototype.renderIsometric = function(canvas)
{
    var ctx = canvas.getContext('2d'),
        tilesPerRow = this.height / this.tileSize.height,
        tilesPerCol = this.width / this.tileSize.width;
    
    console.log(this.tileSize.width, this.tileSize.height);

    this.layers.forEach(function(layer) {
        for (var row = 0; row < tilesPerRow; row++) {
            for (var column = 0; column < tilesPerCol; column++) {
                var tile = layer.data[row][column],
                    tileRow = Math.floor(tile / this.tileSet.columns),
                    tileCol = Math.floor(tile % this.tileSet.columns),
                    isometricX = (row - column) * (this.tileSize.width / 2),
                    isometricY = (row + column) * (this.tileSize.height / 2);
                
                ctx.drawImage(
                    this.tileSet.image,
                    tileCol * this.tileSet.tileSize.height,
                    tileRow * this.tileSet.tileSize.width,
                    this.tileSet.tileSize.width,
                    this.tileSet.tileSize.height,
                    isometricX,
                    isometricY,
                    this.tileSet.tileSize.width,
                    this.tileSet.tileSize.height
                );
            }
        }
    }, this);
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
