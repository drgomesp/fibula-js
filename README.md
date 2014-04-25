Fibula
======
A tile-based HTML5 Canvas & WebGL engine with support for orthogonal and axonometric – isometric, dimetric and trimetric – projections.
 
By [Daniel Ribeiro](http://github.com/drgomesp).

Getting Started
-----

### The simplest way

The simplest way to draw a tile map is to manually create the tile set, the layers 
and the actual map itself. Those are the basic components that make a tile map at the end.

#### Orthogonal tile map

Suppose you have the following tile set:

![orthogonal-tileset](http://i1.wp.com/blog.sklambert.com/wp-content/uploads/2013/07/tileset.png?resize=512%2C512)

To get a simple example working, you first need to create a `TileSet` object. In order to do that,
you first need an `Image` object that will hold the tile set image and a `TileSize` object, that will
hold the tile size information for that tile set:

```javascript
var bg = new Image();
bg.src = "http://i1.wp.com/blog.sklambert.com/wp-content/uploads/2013/07/tileset.png";

var tileSize = new TileSize(32, 32);
var tileSet = new Fibula.TileSet(bg, 16, 16, tileSize);
```