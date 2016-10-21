(function($) {

    // prevent errors in IE < 8
    if (!$('<area coords=1>').attr('coords')) return;

    // find all images attached to a map
    var imgs = $('img[usemap]');

    // store initial coords of each <area>
    $('area').each(function(i, v) {
        var area = $(v);
        area.data('coords', area.attr('coords'));
    });

    // on window resize, iterate through each image
    // and scale its map areas
    $(window).bind('resize.scaleMaps', function() {
        imgs.each(function(i, v) {
            scaleMap($(v));
        });
    }).trigger('resize.scaleMaps');

    // find image scale by comparing offset width with width attribute
    // if the scale has changed or not set,
    // scale its map's areas by this factor
    // and store the new scale using $.data()
    function scaleMap(img) {

        var mapName  = img.attr('usemap').replace('#', ''),
            map      = $('map[name="' + mapName + '"]'),
            imgScale = img.width() / img.attr('width');

        if (imgScale !== img.data('scale')) {
            map.find('area').each(function(i, v) {
                var area      = $(v),
                    coords    = area.data('coords').split(','),
                    newCoords = [];
                $.each(coords, function(j, w) {
                    newCoords.push(w * imgScale);
                });
                area.attr('coords', newCoords.join(','));
            });
            img.data('scale', imgScale);
        }
    }

}(jQuery));