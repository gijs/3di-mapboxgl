/* global mapboxgl */
mapboxgl.accessToken = 'pk.eyJ1IjoibmVsZW5zY2h1dXJtYW5zIiwiYSI6ImhkXzhTdXcifQ.3k2-KAxQdyl5bILh_FioCw';
var map = new mapboxgl.Map({
    container: 'map',
    center: [ -100, 32 ],
    attributionControl: false,
    zoom: 3,
    style: {
    "version": 8,
    "sources": {
        "satellite": {
            "type": "raster",
            "url": "mapbox://mapbox.satellite",
            "tileSize": 256
        },
        "video": {
            "type": "video",
            "urls": ["video/duifpolder.webm", "video/duifpolder.mp4"],
            "coordinates": [
              [5.0131194592, 52.5288024961],
              [5.0131194592, 52.1031311859],
              [5.7631194592, 52.1031311859],
              [5.7650756836, 52.5288024961]
            ]
        }
    },
    "layers": [{
        "id": "background",
        "type": "background",
        "paint": {
            "background-color": "rgb(4,7,14)"
        }
    }, {
        "id": "satellite",
        "type": "raster",
        "source": "satellite"
    }
    , {
        "id": "video",
        "type": "raster",
        "source": "video"
    }
    ]
	}
});


map.fitBounds([
	[5.0131194592,52.1031311859],
	[5.0131194592,52.5288024961],
	[5.7650756836,52.5288024961],
	[5.0131194592,52.1031311859]
], { duration: 0 });


// 474521.07159437414,6788831.104176215,480636.03385718825,6794946.066439027


map.once('style.load', function() {

    map.batch(function() {
      map.addSource('storm-source', {
        type: 'video',
        urls: ['video/duifpolder.mp4'],
        coordinates: [	
    			[5.0131194592, 52.5288024961],
    			[5.0131194592, 52.1031311859],
    			[5.7631194592, 52.1031311859],
    			[5.7650756836, 52.5288024961]
        ]
      });

      map.addLayer({
        type: 'raster',
        id: 'storm-layer',
        source: 'storm-source',
        paint: {
          'raster-contrast': 0.3,
          'raster-hue-rotate': -4
        }
      },
      'country_label_small');
    });

    map.style.sources['storm-source'].once('change', function() {
      var video = map.style.sources['storm-source'].getVideo();

      window.playPause = function(elem) {
        if (elem.innerHTML == 'Play') {
          video.play();
          elem.innerHTML = 'Pause';
        } else {
          video.pause();
          elem.innerHTML = 'Play';
        }
      };

      window.setSpeed = function(elem) {
        video.playbackRate = parseFloat(elem.value);
      };
    });
});

function changeprop(prop, elem) {
  map.setPaintProperty('storm-layer', prop, parseFloat(elem.value));
}