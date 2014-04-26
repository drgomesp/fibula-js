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
    this.visible = settings.visible || this.visible;

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
    tiles: null,
    opacity: 1,
    visible: true,
    tileSet: null,
    width: null,
    height: null
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
    this.width = data[0].length;
    
    for(var x = 0; x < this.width; x++) {
        if (typeof this.tiles[x] === "undefined") {
            this.tiles[x] = [];
        }
        
        for(var y = 0; y < this.height; y++) {
            this.tiles[x][y] = new Fibula.Tile(x, y, data[y][x]);
        }
    }
};

/**
 * Renders the layer to the specific context using a rendering area.
 * 
 * @param {number} viewX The x point from where to start rendering.
 * @param {number} viewY The y point from where to start rendering.
 * @param {number} viewWidth The width of the rendering area.
 * @param {number} viewHeight The height of the rendering area.
 * @param {Fibula.TileMap} tileMap The tile map.
 * @param {CanvasRenderingContext2D} ctx The canvas context to draw on.
 */
Fibula.TileMapLayer.prototype.render = function(viewX, viewY, viewWidth, viewHeight, tileMap, ctx)
{
    var tileWidth = tileMap.tileWidth,
        tileHeight = tileMap.tileHeight,
        tileOffsetX = Math.ceil(viewX / tileWidth),
        tileOffsetY = Math.ceil(viewY / tileHeight),

        viewTileWidth = Math.ceil(viewWidth / tileWidth),
        viewTileHeight = Math.ceil(viewHeight / tileWidth),

        // Set min and max to have one more tile for half visible tiles
        visibleTileMinX = tileOffsetX - 1,
        visibleTileMaxX = tileOffsetX + viewTileWidth + 1,

        visibleTileMinY = tileOffsetY - 1,
        visibleTileMaxY = tileOffsetY + viewTileHeight + 1,

        pxOffsetRemainderX = tileOffsetX * tileWidth - Math.floor(viewX),
        pxOffsetRemainderY = tileOffsetY * tileHeight - Math.floor(viewY),

        tilePxX, tilePxY, x, y, tile, tileSetPosition, tileSetCoordinates;

    for(x = visibleTileMinX; x < visibleTileMaxX; x++) {
        for(y = visibleTileMinY; y < visibleTileMaxY; y++) {

            tilePxX = pxOffsetRemainderX + (x * tileWidth) - (tileOffsetX * tileWidth);
            tilePxY = pxOffsetRemainderY + (y * tileHeight) - (tileOffsetY * tileHeight);

            if (typeof this.tiles[x] !== "undefined") {
                tile = this.tiles[x][y];
            }

            if (!tile) {
                continue;
            }
            
            tileSetPosition = tile.tileSetPosition;
            tileSetCoordinates = this.tileSet.findCoordinates(tileSetPosition, tileWidth, tileHeight);

            ctx.drawImage(
                this.tileSet.image,

                tileSetCoordinates.x,
                tileSetCoordinates.y,


                tileWidth,
                tileHeight,

                tilePxX,
                tilePxY,

                tileWidth,
                tileHeight
            );
        }
    }
};

Fibula.TileMapLayer.prototype.constructor = Fibula.TileMapLayer;
