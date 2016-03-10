/* global mapboxgl */
mapboxgl.accessToken = 'pk.eyJ1IjoibmVsZW5zY2h1dXJtYW5zIiwiYSI6ImhkXzhTdXcifQ.3k2-KAxQdyl5bILh_FioCw';
var map = new mapboxgl.Map({
  container: 'map',
  center: [4.3039236,51.9482355],
  attributionControl: false,
  zoom: 13,
  pitch: 60, // pitch in degrees
  bearing: 0, // bearing in degrees
  style: 'mapbox://styles/mapbox/streets-v8'
});
map.addControl(new mapboxgl.Navigation());

map.once('style.load', function() {

  map.addSource('threedi-source', {
    type: 'video',
    // urls: ['video/dancer1.webm'],
    urls: ['video/duifpolder.webm', 'video/duifpolder.mp4'],
    // urls: ['video/duifpolder2.webm', 'video/duifpolder2.mp4'],
    coordinates: [
      [4.312798976898193,51.95407831656533],
      [4.295053482055663,51.95407831656533],

      [4.295053482055663,51.94238659091772],
      [4.312798976898193,51.94238659091772]
    ]
  });

  map.addLayer({
    "id": "lizard",
    "type": "raster",
    "source": "threedi-source",
    "source-layer": "lizard"
  }, 'water');

  map.style.sources['threedi-source'].once('change', function() {
    var video = map.style.sources['threedi-source'].getVideo();

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
  map.setPaintProperty('lizard', prop, parseFloat(elem.value));
}