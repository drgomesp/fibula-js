Fibula
======
A tile-based HTML5 Canvas & WebGL engine with support for orthogonal and axonometric – isometric, dimetric and trimetric – projections.
 
By [Daniel Ribeiro](http://github.com/drgomesp).

> **Notice:** Fibula is in the early stages of development. We currently don't have 
> many things implemented yet, but we have an extensive roadmap for a lot of important
> things that will come up soon enough, such as WebGL rendering, Tiled support and so on.

Dependencies
-----

- [PxLoader](https://github.com/thinkpixellab/PxLoader) – Preloader and resource downloader

Getting Started
-----

### The simplest way

The simplest way to draw a tile map is to manually create the tile set, the layers 
and the actual map itself. Those are the basic components that make a tile map at the end.

#### Orthogonal tile map

> **Notice:** This example was built using this [tutorial](http://blog.sklambert.com/create-a-canvas-tileset-background/). 
> Thanks to [Steven Lambert](https://github.com/straker) for writing such an amazing
> guide full of examples!

Suppose you have the following tile set:

![orthogonal-tileset](http://i1.wp.com/blog.sklambert.com/wp-content/uploads/2013/07/tileset.png?resize=512%2C512)

To get a simple example working, you first need to create a `TileSet` object. In order to do that,
you first need to load an image using PxLoader:

```javascript
var loader = new PxLoader(),
    tileSetImage = loader.addImage("http://i1.wp.com/blog.sklambert.com/wp-content/uploads/2013/07/tileset.png");
```

Now, we'll place our code inside of the callback function of the PxLoader library,
which will run as soon as the image is loaded and ready:

```javascript
loader.addCompletionListener(function() {
    var tileSet = new Fibula.TileSet(tileSetImage, 32, 32);
});
```

Here, we've passed the background image, the tile width and the tile height.

After having created a `TileSet` object, we need two more steps: 

1. Create the actual tile map.
2. Create the layers that will hold the background data information.
3. Render the tile map to the canvas object.

So let's create the tile map by using the `TileMap` object:

> *Notice:* All code from here will be place inside the addCompletionListener callback
function.

```javascript
loader.addCompletionListener(function() {
    var tileSet = new Fibula.TileSet(tileSetImage, 32, 32),
        tileMap = new Fibula.TileMap("my-map-name", tileSet, 640, 480, Fibula.TileMap.PROJECTION_ORTHOGONAL);
});
```

Now, let's create a first layer that will go on the tile map:

```javascript
loader.addCompletionListener(function() {
    var tileSet = new Fibula.TileSet(tileSetImage, 32, 32),
        tileMap = new Fibula.TileMap("my-map-name", tileSet, 640, 480, Fibula.TileMap.PROJECTION_ORTHOGONAL);

    var layer1 = new Fibula.TileMapLayer("Tile Layer 1", tileMap);
    layer1.data = [
        [172, 172, 172, 79, 34, 34, 34, 34, 34, 34, 34, 34, 56, 57, 54, 55, 56, 147, 67, 67, 68, 79, 79, 171, 172, 172, 173, 79, 79, 55, 55, 55],
        [172, 172, 172, 79, 34, 34, 34, 34, 34, 34, 146, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172, 159, 189, 79, 79, 55, 55, 55],
        [172, 172, 172, 79, 79, 34, 34, 34, 34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 159, 189, 79, 79, 79, 55, 55, 55],
        [188, 188, 188, 79, 79, 79, 79, 34, 34, 34, 36, 172, 172, 143, 142, 157, 79, 79, 79, 79, 79, 79, 187, 159, 189, 79, 79, 79, 55, 55, 55, 55],
        [79, 79, 79, 79, 79, 79, 79, 79, 34, 34, 36, 172, 159, 158, 172, 143, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 39, 51, 51, 51, 55, 55],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 36, 172, 143, 142, 172, 172, 143, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 55],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 52, 172, 172, 172, 172, 172, 172, 143, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 52, 172, 172, 172, 172, 172, 172, 159, 188, 189, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 188, 158, 172, 172, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 187, 158, 159, 189, 79, 79, 79],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 159, 188, 189, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
        [155, 142, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 187, 188, 188, 189, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
        [171, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
        [171, 172, 143, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 187, 189, 79, 79, 79, 79],
        [187, 188, 158, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79],
        [79, 79, 79, 188, 189, 79, 79, 79, 79, 79, 79, 155, 156, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 156],
        [34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172],
        [34, 34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172],
        [34, 34, 34, 34, 79, 79, 79, 79, 79, 79, 155, 172, 172, 159, 189, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172],
        [34, 34, 34, 34, 34, 34, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172, 172]
    ];
});
```

Here we are doing some basic 2D mapping. The `data` property is a 2D simple array that
holds 20 rows and 32 columns – which are the dimensions for our tile map, as you'll see
later. The numbers of each individual cell represents a spot on the tile set.

To understand this better, imagine you have each individual tile on the tile set
marked with a number - considering each tile having 32x32 dimensions, like the 
following image:

![orthogonal-tileset-marked](http://i2.wp.com/blog.sklambert.com/wp-content/uploads/2013/07/tileset_marked.png?resize=513%2C513)

So the next step is to actually render the tile set to the canvas object we're 
working on. That's very straightforward:

```javascript
loader.addCompletionListener(function() {
    var tileSet = new Fibula.TileSet(tileSetImage, 32, 32),
        tileMap = new Fibula.TileMap("my-map-name", tileSet, 640, 480, Fibula.TileMap.PROJECTION_ORTHOGONAL);

    var layer1 = new Fibula.TileMapLayer("Tile Layer 1", tileMap);
    layer1.data = [
        [172, 172, 172, 79, 34, 34, 34, 34, 34, 34, 34, 34, 56, 57, 54, 55, 56, 147, 67, 67, 68, 79, 79, 171, 172, 172, 173, 79, 79, 55, 55, 55],
        [172, 172, 172, 79, 34, 34, 34, 34, 34, 34, 146, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172, 159, 189, 79, 79, 55, 55, 55],
        [172, 172, 172, 79, 79, 34, 34, 34, 34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 159, 189, 79, 79, 79, 55, 55, 55],
        [188, 188, 188, 79, 79, 79, 79, 34, 34, 34, 36, 172, 172, 143, 142, 157, 79, 79, 79, 79, 79, 79, 187, 159, 189, 79, 79, 79, 55, 55, 55, 55],
        [79, 79, 79, 79, 79, 79, 79, 79, 34, 34, 36, 172, 159, 158, 172, 143, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 39, 51, 51, 51, 55, 55],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 36, 172, 143, 142, 172, 172, 143, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 55],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 52, 172, 172, 172, 172, 172, 172, 143, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 52, 172, 172, 172, 172, 172, 172, 159, 188, 189, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 188, 158, 172, 172, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 187, 158, 159, 189, 79, 79, 79],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 159, 188, 189, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
        [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
        [155, 142, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 187, 188, 188, 189, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
        [171, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
        [171, 172, 143, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 187, 189, 79, 79, 79, 79],
        [187, 188, 158, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79],
        [79, 79, 79, 188, 189, 79, 79, 79, 79, 79, 79, 155, 156, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 156],
        [34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172],
        [34, 34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172],
        [34, 34, 34, 34, 79, 79, 79, 79, 79, 79, 155, 172, 172, 159, 189, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172],
        [34, 34, 34, 34, 34, 34, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172, 172]
    ];

    var canvas = document.getElementById("main");
    tileMap.render(canvas);
});
```

Now we just need to get the canvas object and render the tile map:

Now, outside of the PxLoader callback function, we'll start to load the images and
the callback function will be triggered as soon as everything is ready:

```javascript
loader.start();
```

We should get a result like this:

![orthogonal-tilemap-ground](http://i1.wp.com/blog.sklambert.com/wp-content/uploads/2013/07/tileset_ground.png?resize=512%2C320)

As you can see, this is a one-layer tile map - which represents the ground of our 
map, and it's not very interesting. Let's create a second layer to add some objects 
on top of the ground:

```javascript
var layer2 = new Fibula.TileMapLayer("Tile Layer 2", tileMap);
layer2.data = [
    [0, 0, 32, 33, 0, 236, 0, 0, 236, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 0, 0, 32, 33],
    [0, 0, 48, 49, 0, 236, 220, 220, 236, 0, 0, 147, 72, 73, 70, 71, 72, 73, 83, 83, 84, 85, 0, 0, 0, 0, 0, 48, 49],
    [0, 0, 64, 65, 54, 0, 236, 236, 0, 0, 162, 163, 84, 89, 86, 87, 88, 89, 99, 99, 100, 101, 0, 0, 0, 0, 7, 112, 113],
    [0, 0, 80, 81, 70, 54, 55, 50, 0, 0, 0, 179, 100, 105, 102, 103, 104, 105, 0, 0, 0, 0, 0, 0, 16, 22, 23, 39],
    [0, 0, 96, 97, 86, 70, 65, 144, 193, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 49],
    [0, 0, 0, 0, 102, 86, 81, 160, 161, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 65, 174, 175, 67, 66, 54],
    [0, 0, 0, 0, 0, 102, 97, 176, 177, 0, 0, 37, 0, 252, 0, 0, 0, 201, 202, 0, 0, 0, 0, 0, 80, 81, 190, 191, 83, 82, 70, 71],
    [0, 0, 0, 0, 0, 0, 0, 48, 49, 0, 0, 53, 0, 0, 0, 0, 0, 217, 218, 0, 0, 0, 0, 0, 96, 97, 222, 223, 99, 98, 86, 87],
    [201, 202, 0, 0, 0, 0, 0, 64, 65, 66, 68, 69, 0, 0, 0, 0, 0, 233, 234, 0, 0, 0, 0, 0, 238, 239, 0, 0, 238, 239, 102, 103],
    [217, 218, 0, 0, 0, 0, 0, 80, 81, 82, 84, 85, 0, 0, 0, 0, 0, 249, 250, 0, 0, 0, 0, 0, 254, 255, 0, 0, 254, 255],
    [233, 234, 0, 0, 0, 0, 0, 96, 97, 98, 100, 101, 0, 0, 0, 0, 0, 0, 0],
    [249, 250, 0, 0, 201, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 238, 239, 0, 0, 238, 239],
    [0, 0, 0, 0, 217, 218, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 254, 255, 0, 0, 254, 255],
    [0, 0, 0, 0, 233, 234, 196, 197, 198],
    [2, 3, 4, 0, 249, 250, 228, 229, 230],
    [18, 19, 20, 8, 0, 0, 244, 245, 246, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 201, 202],
    [0, 35, 40, 24, 25, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 217, 218],
    [0, 0, 0, 40, 41, 20, 8, 9, 0, 0, 0, 0, 0, 0, 0, 16, 17, 18, 19, 20, 21, 0, 0, 0, 0, 0, 0, 0, 233, 234],
    [0, 0, 0, 0, 40, 19, 24, 25, 8, 9, 0, 0, 0, 0, 0, 48, 49, 50, 51, 52, 115, 3, 4, 0, 0, 0, 0, 0, 249, 250],
    [0, 0, 0, 0, 0, 0, 40, 41, 20, 21, 0, 0, 0, 0, 0, 64, 65, 66, 67, 52, 19, 19, 20, 21]
];
```

After the render, the result should look like this:

![orthogonal-tilemap-two-layers](http://i0.wp.com/blog.sklambert.com/wp-content/uploads/2013/07/tileset_ground_and_layer.png?resize=512%2C320)

Amazing, right?!

With the layering system, you can work with collision detection by having the ability
to decide which layer will the player collide against and which the player will not. 

#### Isometric tile map

If you want to create an isometric tile map, the code for it is almost the same as
for the orthogonal. Suppose you have the following isometric tile set:

![isometric-tileset](http://s27.postimg.org/6c9sa3s0j/isometric_grass_and_water.png)

The first thing we need to do is create the `TileSet` object, as we did on the previous example:

```javascript
var loader = new PxLoader(),
    tileSetImage = loader.addImage("http://s27.postimg.org/6c9sa3s0j/isometric_grass_and_water.png");
   
loader.addCompletionListener(function() {
    var tileSet = new Fibula.TileSet(tileSetImage, 64, 64);
});
```

In this example, the tile set has tiles of 64x64 dimensions.

The next step is to create the tile map and the first layer (and we're going to create a much smaller
map in order for the example to be cleaner):

```javascript
loader.addCompletionListener(function() {
    var tileSet = new Fibula.TileSet(tileSetImage, 64, 64),
        tileMap = new Fibula.TileMap("isometric-map", tileSet, 320, 160, Fibula.TileMap.PROJECTION_ISOMETRIC);
    
    var layer1 = new Fibula.TileMapLayer("Tile Layer 1", tileMap);
    layer1.data = [
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 0]
    ];
});
```

Now let's render our tile map:

```javascript
loader.addCompletionListener(function() {
    var tileSet = new Fibula.TileSet(tileSetImage, 64, 64),
        tileMap = new Fibula.TileMap("isometric-map", tileSet, 320, 160, Fibula.TileMap.PROJECTION_ISOMETRIC);
    
    var layer1 = new Fibula.TileMapLayer("Tile Layer 1", tileMap);
    layer1.data = [
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 0]
    ];    
    
    var canvas = document.getElementById("main");
    tileMap.render(canvas);
});
```

> Notice here the usage of a 64x32 tile size for the map, which differs from the size
> of the tiles on the tile set in this case.

Now, you start the PxLoader loader:

```javascript
loader.start();
```

The result should look like this:

![isometric-tilemap-ground](http://s27.postimg.org/nqlsh6kr7/Captura_de_Tela_2014_04_25_s_15_31_15.png)

Now, let's add a new layer and make this map a little bit more interesting:

```javascript
var layer2 = new Fibula.TileMapLayer("Tile Layer 2", tileMap);
layer2.data = [
    [],
    [],
    [],
    [4, 19, 19, 19, 19],
    [16, 23, 23, 23, 23]
];
```

After the render, the result should look something like this:

![isometric-tilemap-two-layers](http://s14.postimg.org/po0e3sic1/Captura_de_Tela_2014_04_25_s_15_34_12.png)

Amazing, right!?
