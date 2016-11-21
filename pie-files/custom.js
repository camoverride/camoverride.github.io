d3.select("input[value=\"option2020\"]").property("checked", true);

var svg = d3.select("pie-wrapper")
    .append("svg")
    .append("g")

svg.append("g")
    .attr("class", "slices");
svg.append("g")
    .attr("class", "labelName");
svg.append("g")
    .attr("class", "labelValue");
svg.append("g")
    .attr("class", "lines");

function parentWidth(elem) {
    return elem.parentElement.clientWidth;
}

var width = parentWidth(document.getElementById('pie-wrapper')),
    height = 450,
    radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d.value;
    });

var arc = d3.svg.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

var legendRectSize = (radius * 0.05);
var legendSpacing = radius * 0.02;


var div = d3.select("pie-wrapper").append("div").attr("class", "toolTip");

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var colorRange = d3.scale.category20();
var color = d3.scale.ordinal()
    .range(colorRange.range());


datasetTotal = [
        {label:"North America", value:19}, 
        {label:"South America", value:5}, 
        {label:"Sub-Saharan Africa", value:13},
        {label:"Europe", value:17},
        {label:"Middle East", value:19},
        {label:"South Asia", value:27},
        {label:"East Asia", value:19},
        {label:"SE Asia and Oceania", value:19}
        ];

datasetOption1 = [
        {label:"North America", value:19}, 
        {label:"South America", value:5}, 
        {label:"Sub-Saharan Africa", value:13},
        {label:"Europe", value:17},
        {label:"Middle East", value:19},
        {label:"South Asia", value:27},
        {label:"East Asia", value:19},
        {label:"SE Asian and Oceania", value:19}
        ];

change(datasetTotal);


d3.selectAll("input")
    .on("change", selectDataset);
    
function selectDataset()
{
    var value = this.value;
    if (value == "option2020")
    {
        change(datasetTotal);
    }
    else if (value == "option2100")
    {
        change(datasetOption1);
    }
}

function change(data) {

    /* ------- PIE SLICES -------*/
    var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(data), function(d){ return d.data.label });

    slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.label); })
        .attr("class", "slice");

    slice
        .transition().duration(1000)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        })
    slice
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html((d.data.label)+"<br>"+(d.data.value)+"%");
        });
    slice
        .on("mouseout", function(d){
            div.style("display", "none");
        });

    slice.exit()
        .remove();

    if (width <= 800 ) {
        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset =  height * color.domain().length / 2;
                var horz = -3 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + ((horz/2)-(width/2.5))+ ',' + ((vert*2)-100) + ')';
            });


        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });
    };

    /* ------- TEXT LABELS -------*/

    if (width > 800) { // to detect for desktop

        var text = svg.select(".labelName").selectAll("text")
            .data(pie(data), function(d){ return d.data.label });

        text.enter()
            .append("text")
            .attr("dy", ".35em")
            .text(function(d) {
                return (d.data.label+": "+d.value+"%");
            });

        function midAngle(d){
            return d.startAngle + (d.endAngle - d.startAngle)/2;
        }

        text
            .transition().duration(1000)
            .attrTween("transform", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate("+ pos +")";
                };
            })
            .styleTween("text-anchor", function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start":"end";
                };
            })
            .text(function(d) {
                return (d.data.label+": "+d.value+"%");
            });


        text.exit()
            .remove();

        /* ------- SLICE TO TEXT POLYLINES -------*/

        var polyline = svg.select(".lines").selectAll("polyline")
            .data(pie(data), function(d){ return d.data.label });

        polyline.enter()
            .append("polyline");

        polyline.transition().duration(1000)
            .attrTween("points", function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                };
            });

        polyline.exit()
            .remove();
    };
};