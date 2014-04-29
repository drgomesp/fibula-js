/*
 * This file is part of the Fibula package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new IsometricRenderer object.
 *
 * @class Fibula.IsometricRenderer
 * @constructor
 * @param {Object} settings The settings object
 */
Fibula.IsometricRenderer = function(settings)
{
    /**
     * The settings object.
     * @type {Object}
     */
    settings = settings || this.settings;

    /**
     * The PIXI Stage object, which is the root of the display tree. If you don't provide this, it will be auto-created.
     * @type {PIXI.Stage}
     */
    this.stage = settings.stage || this.stage;

    /**
     * The PIXI renderer object. If you don't provide this, it will be auto-detected.
     * @type {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
     */
    this.renderer = settings.renderer || this.renderer;

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

Fibula.IsometricRenderer.prototype = {
    stage: new PIXI.Stage(0xffffff, true),
    renderer: PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null),
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
Fibula.IsometricRenderer.prototype.render = function(viewArea)
{
    document.body.appendChild(this.renderer.view);

    this.createTileMap(viewArea);
    var me = this;

    function animate()
    {
        requestAnimFrame(animate);
        me.renderer.render(me.stage);
    }

    requestAnimFrame(animate);
};

Fibula.IsometricRenderer.prototype.createTileMap = function(viewArea)
{
    var viewX = viewArea.x || this.viewArea.x,
        viewY = viewArea.y || this.viewArea.y,
        viewWidth = viewArea.width || this.viewArea.width,
        viewHeight = viewArea.height || this.viewArea.height;

    this.tileMap.layers.forEach(function(layer) {
        if (layer.visible) {
            this.createLayers(layer, viewX, viewY, viewWidth, viewHeight, this.tileMap, this.stage);
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
 * @param {PIXI.DisplayObjectContainer} stage The PIXI Stage object.
 */
Fibula.IsometricRenderer.prototype.createLayers = function(layer, viewX, viewY, viewWidth, viewHeight, tileMap, stage)
{
    var tileWidth = tileMap.tileWidth,
        tileHeight = tileMap.tileHeight * 2,
        tileOffsetX = Math.ceil(viewX / tileWidth),
        tileOffsetY = Math.ceil(viewY / tileHeight),

        viewTileWidth = Math.ceil(viewWidth / tileWidth),
        viewTileHeight = Math.ceil(viewHeight / tileHeight),

        // Set min and max to have one more tile for half visible tiles
        visibleTileMinX = tileOffsetX - 1,
        visibleTileMaxX = tileOffsetX + viewTileWidth + 1,

        visibleTileMinY = tileOffsetY - 1,
        visibleTileMaxY = tileOffsetY + viewTileHeight + 1,

        texture = PIXI.Texture.fromImage(layer.tileSet.image.src),
        
        x, y, tile, tileSetCoordinates, isometricX, isometricY, sprite;

    for(x = visibleTileMinX; x < visibleTileMaxX; x++) {
        for(y = visibleTileMinY; y < visibleTileMaxY; y++) {

            if (typeof layer.tiles[x] !== "undefined") {
                tile = layer.tiles[x][y];
            }
            
            if (!tile) {
                continue;
            }

            tileSetCoordinates = layer.tileSet.findCoordinates(tile.tileSetPosition, tileWidth, tileHeight);

            isometricX = (x - y) * (tileWidth / 2);
            isometricY = (x + y) * (tileHeight / 4); // Divide by 4 to get the 2:1 ratio (i.e.: 64x32)
            
            isometricX += tileWidth * 2; // Adjust the center of the "camera"

            sprite = new PIXI.TilingSprite(texture, tileWidth, tileHeight);
            sprite.x = isometricX;
            sprite.y = isometricY;
            sprite.tilePosition.x = -tileSetCoordinates.x;
            sprite.tilePosition.y = -tileSetCoordinates.y;
            
            stage.addChild(sprite);
        }
    }
};

Fibula.IsometricRenderer.prototype.constructor = Fibula.IsometricRenderer;
