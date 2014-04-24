/*
 * This file is part of the {PACKAGE_NAME} package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new TileSize object.
 * 
 * @class TileSize
 * @constructor
 * @param {number} width
 * @param {number} height
 */
TileSize = function(width, height)
{
    /**
     * The width of the tile size.
     * @type {number}
     */
    this.width = width;

    /**
     * The height of the tile size.
     * @type {number}
     */
    this.height = height;
};

TileSize.prototype.constructor = TileSize;
