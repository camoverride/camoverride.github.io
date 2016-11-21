function createMap2() {

	var map = L.map('map2').setView([20, 0], 1.5);

	var southWest = L.latLng(200, -200),
    	northEast = L.latLng(-200, 200),
    	bounds = L.latLngBounds(southWest, northEast);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	});
	map.setMaxBounds(bounds);

	// control that shows state info on hover
	// write something better than an if-then... maybe viewport size?
	var info = L.control();

	var selecttext = 'select a country'

	if (navigator.userAgent.match(/Android/i) 
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		|| window.innerWidth <= 800) {
		var selecttext = ''
	}

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Density in 2100</h4>' +  (props ?
			'<b>' + props.name + '</b><br />' + ((parseInt(props.density_2100) < 1) ? "<1" : props.density_2100.toFixed(0)) + ' people/km<sup>2'
			: selecttext);
	};

	info.addTo(map);


	// get color depending on population value
	function getColor(d) {
		return d > 500 ? '#800026' :
				d > 300  ? '#BD0026' :
				d > 200  ? '#E31A1C' :
				d > 120  ? '#FC4E2A' :
				d > 80   ? '#FD8D3C' :
				d > 50   ? '#FEB24C' :
				d > 20   ? '#FED976' :
							'#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 0.8,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 1,
			fillColor: getColor(feature.properties.density_2100)
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

	map.attributionControl.addAttribution('Population data &copy; <a href="https://esa.un.org/unpd/wpp/Download/Standard/Population/">UN Population Division</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 20, 50, 80, 120, 200, 300, 500],
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
}

createMap2()