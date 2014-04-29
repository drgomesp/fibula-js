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

Fibula.OrthogonalRenderer.prototype = {
    stage: new PIXI.Stage(0xffffff, true),
    renderer: PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null),
    tileMap: null,
    viewArea: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    }
};

Fibula.OrthogonalRenderer.prototype.render = function(viewArea)
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

/**
 * Creates the tile map textures.
 * @param {Object} viewArea The object that defines the view area to render.
 */
Fibula.OrthogonalRenderer.prototype.createTileMap = function(viewArea)
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
Fibula.OrthogonalRenderer.prototype.createLayers = function(layer, viewX, viewY, viewWidth, viewHeight, tileMap, stage)
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
        
        texture = PIXI.Texture.fromImage(layer.tileSet.image.src),
    
        x, y, tile, tileSetCoordinates, orthogonalX, orthogonalY, sprite;

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
            
            sprite = new PIXI.TilingSprite(texture, tileWidth, tileHeight);
            sprite.x = orthogonalX;
            sprite.y = orthogonalY;
            sprite.tilePosition.x = -tileSetCoordinates.x;
            sprite.tilePosition.y = -tileSetCoordinates.y;

            stage.addChild(sprite);
        }
    }
};

Fibula.OrthogonalRenderer.prototype.constructor = Fibula.OrthogonalRenderer;
