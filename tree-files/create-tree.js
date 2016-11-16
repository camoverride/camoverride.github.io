function expand(d){   
    var children = (d.children)?d.children:d._children;
    if (d._children) {        
        d.children = d._children;
        d._children = null;       
    }
    if(children)
      children.forEach(expand);
}

function expandAll(){
    expand(root); 
    update(root);
}

function collapseAll(){
    root.children.forEach(collapse);
    collapse(root);
    update(root);
}

var margin = {top: 20, right: 120, bottom: 20, left: 130},
    width = 1200 - margin.right - margin.left,
    height = 1000 - margin.top - margin.bottom;
    
var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("tree-structure").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var flare = 
  {
    "name": "Proto-Canaanite",
    "parent": "null",
    "children": [
          {
          "name": "Phonecian",
          "parent": "Proto-Canaanite",
          "children": [
        {
        "name": "Greek",
        "parent": "Proto-Canaanite",
        "children": [
          {
          "name": "Latin",
          "parent": "Greek",
          "children": [
            {
            "name": "English",
            "parent": "Latin"
            },
            {
            "name": "Spanish",
            "parent": "Latin"
            },
            {
            "name": "German",
            "parent": "Latin"
            },
            {
            "name": "French",
            "parent": "Latin"
            },
            {
            "name": "Hungarian",
            "parent": "Latin"
            },
            {
            "name": "Turkish",
            "parent": "Latin"
            }
          ]
          },
          {
          "name": "Cyrillic",
          "parent": "Greek",
          "children": [
            {
            "name": "Russian",
            "parent": "Cyrillic"
            },
            {
            "name": "Abaza",
            "parent": "Cyrillic"
            },
            {
            "name": "Ukrainian",
            "parent": "Cyrillic"
            }
          ]
          },          
          {
          "name": "Coptic",
          "parent": "Greek"
          },
          {
          "name": "Armenian",
          "parent": "Greek"
          },
          {
          "name": "Georgian",
          "parent": "Greek"
          }
        ]
        },
        {
        "name": "Persian",
        "parent": "Proto-Canaanite"
        },
        {
        "name": "Hebrew",
        "parent": "Proto-Canaanite"
        },
        {
        "name": "Aramean",
        "parent": "Proto-Canaanite",
        "children": [
          {
          "name": "Arabic",
          "parent": "Aramean"
          },
          {
          "name": "Syriac",
          "parent": "Aramean"
          },
          {
          "name": "Modern Hebrew",
          "parent": "Aramean"
          },
          {
          "name": "Brahmic",
          "parent": "Aramean",
          "children": [
            {
            "name": "North Brahmic",
            "parent": "Brahmic",
            "children": [
              {
              "name": "Meithei",
              "parent": "North Brahmic"
              },
              {
              "name": "Gupta",
              "parent": "North Brahmic",
              "children": [
                {
                "name": "Bhaiksuki",
                "parent": "Gupta"
                },
                {
                "name": "Tocharian",
                "parent": "Gupta"
                },
                {
                "name": "Khotanese",
                "parent": "Gupta"
                },
                {
                "name": "Sarada",
                "parent": "Gupta",
                "children": [
                  {
                  "name": "Landa",
                  "parent": "Sarada",
                  "children": [
                    {
                    "name": "Gurmukhi",
                    "parent": "Landa"
                    },
                    {
                    "name": "Khojki",
                    "parent": "Landa"
                    },
                    {
                    "name": "Khudabadi",
                    "parent": "Landa"
                    },
                    {
                    "name": "Multani",
                    "parent": "Landa"
                    },
                    {
                    "name": "Mahajani",
                    "parent": "Landa"
                    }
                  ]
                  },
                  {
                  "name": "Devasesa",
                  "parent": "Sarada",
                  "children": [
                    {
                    "name": "Takri",
                    "parent": "Devasesa"
                    },
                    {
                    "name": "Dogra",
                    "parent": "Devasesa"
                    }
                  ]
                  }
                ]
                },
                {
                "name": "Siddham",
                "parent": "Gupta",
                "children": [
                  {
                  "name": "Tibetan",
                  "parent": "Siddham",
                  "children": [
                    {
                    "name": "Phags-pa",
                    "parent": "Tibetan"
                    },
                    {
                    "name": "Pungs-chen",
                    "parent": "Tibetan"
                    },
                    {
                    "name": "Pungs-chung",
                    "parent": "Tibetan"
                    },
                    {
                    "name": "Marchen",
                    "parent": "Tibetan"
                    },
                    {
                    "name": "Marchung",
                    "parent": "Tibetan"
                    },
                    {
                    "name": "Square Script",
                    "parent": "Tibetan"
                    },
                    {
                    "name": "Soyombo",
                    "parent": "Tibetan"
                    },
                    {
                    "name": "Lepcha",
                    "parent": "Tibetan",
                    "children": [
                      {
                      "name": "Loyombo",
                      "parent": "Lepcha"
                      }
                    ]
                    }
                  ]
                  }
                ]
                },
                {
                "name": "Nagari",
                "parent": "Gupta",
                "children": [
                  {
                  "name": "Devanagari",
                  "parent": "Nagari",
                  "children": [
                    {
                    "name": "Gujarati",
                    "parent": "Devanagari"
                    },
                    {
                    "name": "Modi",
                    "parent": "Devanagari"
                    }
                  ]
                  },
                  {
                  "name": "Nandinagari",
                  "parent": "Nagari"
                  },
                  {
                  "name": "Kaithi",
                  "parent": "Nagari",
                  "children": [
                    {
                    "name": "Sylheti",
                    "parent": "Kaithi"
                    }
                  ]
                  }
                ]
                },
                {
                "name": "Kalinga",
                "parent": "Gupta",
                "children": [
                  {
                  "name": "Odia",
                  "parent": "Kalinga"
                  }
                ]
                },
                {
                "name": "Gaudi",
                "parent": "Gupta",
                "children": [
                  {
                  "name": "Bengali",
                  "parent": "Gaudi"
                  },
                  {
                  "name": "Tirhuta",
                  "parent": "Gaudi"
                  },
                  {
                  "name": "Bhujinmol",
                  "parent": "Gaudi"
                  },
                  {
                  "name": "Newar",
                  "parent": "Gaudi"
                  },
                  {
                  "name": "Ranjana",
                  "parent": "Gaudi"
                  }
                ]
                }
              ]
              }               
            ]
            },
            {
            "name": "South Brahmic",
            "parent": "Brahmic",
            "children": [
              {
              "name": "Tamili",
              "parent": "South Brahmic",
              "children": [
                {
                "name": "Vattelettu",
                "parent": "Tamili",
                "children": [
                  {
                  "name": "Kolezhuthu",
                  "parent": "Vattelettu"
                  }
                ]
                }
              ]
              },
              {
              "name": "Tamil",
              "parent": "South Brahmic"
              },
              {
              "name": "Grantha",
              "parent": "South Brahmic",
              "children": [
                {
                "name": "Malayalam",
                "parent": "Grantha"
                },
                {
                "name": "Tigalari",
                "parent": "Grantha"
                },
                {
                "name": "Sinhala",
                "parent": "Grantha"
                },
                {
                "name": "Dhives Akuru",
                "parent": "Grantha"
                },
                {
                "name": "Saurashtra",
                "parent": "Grantha"
                },
                {
                "name": "Khmer",
                "parent": "Grantha",
                "children": [
                  {
                  "name": "Thai",
                  "parent": "Khmer"
                  },
                  {
                  "name": "Lao",
                  "parent": "Khmer"
                  }
                ]
                },
                {
                "name": "Cham",
                "parent": "Grantha"
                },
                {
                "name": "Ahom",
                "parent": "Grantha"
                },
                {
                "name": "Kawi",
                "parent": "Grantha",
                "children": [
                  {
                  "name": "Balinese",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Javanese",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Baybayin",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Batak",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Buhid",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Hanuno-o",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Tagbanwa",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Sundanese",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Lontara",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Makasar",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Rejang",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Mon",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Burmese",
                  "parent": "Kawi"
                  },
                  {
                  "name": "Chakma",
                  "parent": "Kawi"
                  }
                ]
                },
                {
                "name": "Tai Tham",
                "parent": "Grantha"
                }
              ]
              },
              {
              "name": "Bhattiprolu",
              "parent": "South Brahmic",
              "children": [
                {
                "name": "Kadamba",
                "parent": "Bhattiprolu",
                "children": [
                  {
                  "name": "Kannada",
                  "parent": "Kadamba"
                  },
                  {
                  "name": "Telugu",
                  "parent": "Kadamba"
                  }
                ]
                }
              ]
              },
              {
              "name": "Tai Le",
              "parent": "South Brahmic",
              "children": [
                {
                "name": "New Tai Lue",
                "parent": "Tai Le" 
                }
                ]
              }
            ]
            }
          ]
          }
        ]
        }
        ]
      },
      {
      "name": "Amharic",
      "parent": "Proto-Canaanite"
      },
    ]
  }









root = flare;
root.x0 = height / 2;
root.y0 = 0;

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 120; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
      document.getElementById("info-box").innerHTML = d.name;

  update(d);
}

// Toggle children on hover
function mouseover(d) {
    // d3.select(this).append("text")
    //     .attr("class", "hover")
    //     .attr('transform', function(d){ 
    //         return 'translate(5, -10)';
    //     })
    //     .text(d.name + ": " + d.id);

    document.getElementById("info-box").innerHTML = d.name;
}

function mouseout(d) {
    // d3.select(this).select("text.hover").remove();
    // document.getElementById("info-box").innerHTML = '&nbsp;';
}

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

update(root);

d3.select(self.frameElement).style("height", "800px");

