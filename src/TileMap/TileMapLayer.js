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
 * @param {string} name The name of the layer.
 */
Fibula.TileMapLayer = function(name)
{
    /**
     * The data array containing the keys for the tile set image.
     * @type {Array}
     */
    this.data = [];

    /**
     * The name of the layer.
     * @type {string}
     */
    this.name = name;

    /**
     * The opacity of the layer (1 == 100%).
     * @type {number}
     */
    this.opacity = 1;

    /**
     * Weather the layer is visible or not.
     * @type {boolean}
     */
    this.visible = true;
};

Fibula.TileMapLayer.prototype.constructor = Fibula.TileMapLayer;
