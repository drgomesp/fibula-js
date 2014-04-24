/*
 * This file is part of the {PACKAGE_NAME} package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new TileMapLayer object.
 *
 * @class TileMapLayer
 * @constructor
 * @param {string} name The name of the layer.
 * @param {array} data The data array containing the keys for the tile set image.
 */
TileMapLayer = function(name)
{
    /**
     * The data array containing the keys for the tile set image.
     * @type {array}
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

TileMapLayer.prototype.constructor = TileMapLayer;
