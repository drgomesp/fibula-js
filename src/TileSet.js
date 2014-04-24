/*
 * This file is part of the {PACKAGE_NAME} package.
 *
 * (c) Daniel Ribeiro <drgomesp@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Creates a new TileSet object.
 * 
 * @class TileSet
 * @constructor
 * @param {Image} image The image of the tile set.
 * @param {number} tilesPerRow The amount of tiles per row on the tile set.
 */
TileSet = function(image, tilesPerRow)
{
    /**
     * The image to be used on the tile set.
     * @type {Image}
     */
    this.image = image;

    /**
     * The number of tiles per row on the image.
     * @type {number}
     */
    this.tilesPerRow = tilesPerRow;
};

TileSet.prototype.constructor = TileSet;
