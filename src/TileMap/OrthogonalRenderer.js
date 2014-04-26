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
            layer.render(viewX, viewY, viewWidth, viewHeight, this.tileMap, ctx);
        }
    }, this);
};

Fibula.OrthogonalRenderer.prototype.constructor = Fibula.OrthogonalRenderer;
