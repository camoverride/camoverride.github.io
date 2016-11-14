---
layout: post
title: Sample Post
categories: []
comments: true
published: false
---

She withdrew from her pocket a piece of blue cloth and pressed it into my hand. She asked me to think about the meaning of the item. 'When a chance encounter resolves itself,' she said, 'it becomes fate.'

I understood that two seperate time-lines -- two lives -- can wind themselves together like the filaments of a fabric: one as the warp, the other as the weft. As each life grows so do the number of intersections between threads, each intersection representing a shared memory, knotting into a tapestry of increasing size.

To me this seemed to represent how our relationship had grown despite turmoil. It was a representation of the family that had disapproved of me, the frequent bouts of depression, and every cold anxious morning. She pressed my fingers closed around the cloth and left.

I didn't see her for a week. Telephone calls were unanswered and letters unreturned. The week, as it always does, turned into a month, and then a year. Her name shrunk from an exhortation to an exhallation to a single syllable that barely escaped my lips. Her face became an outline, its pencil shading attacked by a slow but persistant eraser. I could no longer remember her smell.

I grew older. I became entangled in auxiliary relationships, unknitting as soon as they seemed to coalesce. Time passed in its endless cycle, seasons returning as a reminder that your body ages even as the earth renews itself every year.

But then she appeared again. It was a public park during the beginning of spring, just as the snow begins to melt and the earth turns to mud. She stood next to me near a willow tree. In front of us was a pont with small fish darting back and forth just beneath the surface. For a long moment no words were exchanged.

'I still have it,' I told her. She took the cloth from my hand and looked at it.

She pulled out one string and then another. No single subtraction changed the overall appearance of the cloth. Every thread had a meaning and existence independant of the others. The existence of the whole was an illusion predicated on the intersection of meaningless elements. When the final strings were seperated the formless mass that resulted could not be described as damaged.

The Gordian Knot

<!--more-->




	
<link rel="stylesheet" href="files/leaflet.css">
<script src="files/leaflet.js"></script>

<style>
	#map { width: 800px; height: 500px; }
.info { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } .info h4 { margin: 0 0 5px; color: #777; }
.legend { text-align: left; line-height: 18px; color: #555; } .legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }
</style>
</head>
<body>

<div id="map" class="leaflet-container leaflet-fade-anim leaflet-grab leaflet-touch-drag" style="position: relative;" tabindex="0"></div>

<script type="text/javascript" src="files/nations.js"></script>

<script type="text/javascript">

	var map = L.map('map').setView([25, 0], 1.5);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	});


	// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Population Density in 2100</h4>' +  (props ?
			'<b>' + props.name + '</b><br />' + props.density + ' people / km<sup>2</sup>'
			: 'hover over a country');
	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 1000 ? '#800026' :
				d > 500  ? '#BD0026' :
				d > 200  ? '#E31A1C' :
				d > 100  ? '#FC4E2A' :
				d > 50   ? '#FD8D3C' :
				d > 20   ? '#FEB24C' :
				d > 10   ? '#FED976' :
							'#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 0.8,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 1,
			fillColor: getColor(feature.properties.density)
		};
	}

	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 0.8,
			color: 'white',
			dashArray: '',
			fillOpacity: 0.85
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	map.attributionControl.addAttribution('Population data &copy; <a href="https://esa.un.org/unpd/wpp/Download/Standard/Population/">United Nations</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10, 20, 50, 100, 200, 500, 1000],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);

</script>































### Ordered Lists

1. Item one
   1. sub item one
   2. sub item two
   3. sub item three
2. Item two

### Unordered Lists

* Item one
* Item two
* Item three

## Tables

| Header 1 | Header 2 | Header 3 |
|:--------|:-------:|--------:|
| cell 1   | cell 2   | cell 3   |
| cell 4   | cell 5   | cell 6   |
|----
| cell 1   | cell 2   | cell 3   |
| cell 4   | cell 5   | cell 6   |
|=====
| Foot 1   | Foot 2   | Foot 3   |

## Code Snippets

{% highlight css %}
#container {
  float: left;
  margin: 0 -240px 0 0;
  width: 100%;
}
{% endhighlight %}

## Buttons

Make any link standout more when applying the `.btn` class.

{% highlight html %}
<a href="#" class="btn btn-success">Success Button</a>
{% endhighlight %}

<div markdown="0"><a href="#" class="btn">Primary Button</a></div>
<div markdown="0"><a href="#" class="btn btn-success">Success Button</a></div>
<div markdown="0"><a href="#" class="btn btn-warning">Warning Button</a></div>
<div markdown="0"><a href="#" class="btn btn-danger">Danger Button</a></div>
<div markdown="0"><a href="#" class="btn btn-info">Info Button</a></div>

## Notices

**Watch out!** You can also add notices by appending `{: .notice}` to a paragraph.
{: .notice}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help