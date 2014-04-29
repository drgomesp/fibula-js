/*
 * This file is part of the Fibula package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new OrthogonalRenderer object.
 *
 * @class Fibula.OrthogonalRenderer
 * @constructor
 * @param {Object} settings The settings object
 */
Fibula.OrthogonalRenderer = function(settings)
{
    /**
     * The settings object.
     * @type {Object}
     */
    settings = settings || this.settings;

    /**
     * The HTML canvas object.
     * @type {HTMLCanvasElement}
     */
    this.canvas = settings.canvas || this.canvas;

    /**
     * The tile map object.
     * @type {Fibula.TileMap}
     */
    this.tileMap = settings.tileMap || this.tileMap;

    /**
     * The view area object.
     * @type {Object}
     */
    this.viewArea = {
        x: this.viewArea.x,
        y: this.viewArea.y,
        width: this.viewArea.width,
        height: this.viewArea.height
    };
};

Fibula.OrthogonalRenderer.prototype = {
    canvas: null,
    tileMap: null,
    viewArea: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    }
};

/**
 * Renders the tile map to the canvas.
 * @param {Object} viewArea The object that defines the view area to render.
 */
Fibula.OrthogonalRenderer.prototype.render = function(viewArea)
{
    var ctx = this.canvas.getContext("2d"),
        viewX = viewArea.x || this.viewArea.x,
        viewY = viewArea.y || this.viewArea.y,
        viewWidth = viewArea.width || this.viewArea.width,
        viewHeight = viewArea.height || this.viewArea.height;

    this.tileMap.layers.forEach(function(layer) {
        if (layer.visible) {
            this.renderLayer(layer, viewX, viewY, viewWidth, viewHeight, this.tileMap, ctx);
        }
    }, this);
};

/**
 * Renders the layer to the specific context using a rendering area.
 *
 * @param {Fibula.TileMapLayer} layer The layer to render.
 * @param {number} viewX The x point from where to start rendering.
 * @param {number} viewY The y point from where to start rendering.
 * @param {number} viewWidth The width of the rendering area.
 * @param {number} viewHeight The height of the rendering area.
 * @param {Fibula.TileMap} tileMap The tile map.
 * @param {CanvasRenderingContext2D} ctx The canvas context to draw on.
 */
Fibula.OrthogonalRenderer.prototype.renderLayer = function(layer, viewX, viewY, viewWidth, viewHeight, tileMap, ctx)
{
    var tileWidth = tileMap.tileWidth,
        tileHeight = tileMap.tileHeight,
        tileOffsetX = Math.ceil(viewX / tileWidth),
        tileOffsetY = Math.ceil(viewY / tileHeight),

        viewTileWidth = Math.ceil(viewWidth / tileWidth),
        viewTileHeight = Math.ceil(viewHeight / tileHeight),

        // Set min and max to have one more tile for half visible tiles
        visibleTileMinX = tileOffsetX - 1,
        visibleTileMaxX = tileOffsetX + viewTileWidth + 1,

        visibleTileMinY = tileOffsetY - 1,
        visibleTileMaxY = tileOffsetY + viewTileHeight + 1,

        x, y, tile, tileSetCoordinates, orthogonalX, orthogonalY;

    for(x = visibleTileMinX; x < visibleTileMaxX; x++) {
        for(y = visibleTileMinY; y < visibleTileMaxY; y++) {

            if (typeof layer.tiles[x] !== "undefined") {
                tile = layer.tiles[x][y];
            }

            if (!tile) {
                continue;
            }

            tileSetCoordinates = layer.tileSet.findCoordinates(tile.tileSetPosition, tileWidth, tileHeight);

            orthogonalX = x * tileWidth;
            orthogonalY = y * tileHeight;
            
            ctx.drawImage(
                layer.tileSet.image,
                tileSetCoordinates.x,
                tileSetCoordinates.y,
                tileWidth,
                tileHeight,
                orthogonalX,
                orthogonalY,
                tileWidth,
                tileHeight
            );
        }
    }
};

Fibula.OrthogonalRenderer.prototype.constructor = Fibula.OrthogonalRenderer;
