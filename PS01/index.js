
                //import the data from the .csv file
                d3.csv('./devDist.csv', function(dataIn){

                  AllstonBrighton = dataIn.filter(function(d){
                      return d.area == "Allston/Brighton";
                  });

                  BackbayBeaconhill = dataIn.filter(function(d){
                      return d.area == "Back Bay/Beacon Hill";
                  });

                  Central = dataIn.filter(function(d){
                      return d.area == "Central";
                  });

                  Charlestown = dataIn.filter(function(d){
                      return d.area == "Charlestown";
                  });

                  EastBoston = dataIn.filter(function(d){
                      return d.area == "East Boston";
                  });

                  FenwayKenmore = dataIn.filter(function(d){
                      return d.area == "Fenway/Kenmore";
                  });

                  Hydepark = dataIn.filter(function(d){
                      return d.area == "Hyde Park";
                  });

                  Jamaicaplain = dataIn.filter(function(d){
                      return d.area == "Jamaica Plain";
                  });

                  Mattapan = dataIn.filter(function(d){
                      return d.area == "Mattapan";
                  });

                  Roslindale = dataIn.filter(function(d){
                      return d.area == "Roslindale";
                  });

                  Roxbury = dataIn.filter(function(d){
                      return d.area == "Roxbury";
                  });

                  Southboston = dataIn.filter(function(d){
                      return d.area == "South Boston";
                  });

                  Southend = dataIn.filter(function(d){
                      return d.area == "South End";
                  });

                  Westroxbury = dataIn.filter(function(d){
                      return d.area == "West Roxbury";
                  });

                  Harborislands = dataIn.filter(function(d){
                      return d.area == "Harbor Islands";
                  });

                  Dorchester = dataIn.filter(function(d){
                      return d.area == "Dorchester";
                  });

                    var loadData = dataIn;
// __      __     _____  _____          ____  _      ______  _____
// \ \    / /\   |  __ \|_   _|   /\   |  _ \| |    |  ____|/ ____|
//  \ \  / /  \  | |__) | | |    /  \  | |_) | |    | |__  | (___
//   \ \/ / /\ \ |  _  /  | |   / /\ \ |  _ <| |    |  __|  \___ \
//    \  / ____ \| | \ \ _| |_ / ____ \| |_) | |____| |____ ____) |
//     \/_/    \_\_|  \_\_____/_/    \_\____/|______|______|_____/




var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var marginLeft = 0;
var marginTop = 0;
//
var svg = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg2 = d3.select('#svg2')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var projection = d3.geoAlbers()
    .scale( 200000 )
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate( [width/2,height/2] );

    path = d3.geoPath()
          .projection(projection);

var areaLookup = d3.map();
// console.log(areaLookup);
var colorScale = d3.scaleLinear().range(['#fff','#ceef92']);

var div = d3.select("body")
		    .append("div")
    		.attr("class", "tooltip")
    		.style("opacity", 0);
        // .style('stroke','#003c50')
        // .style('stroke-width',2)

// var perc = ((d.units/53873) * 100).toFixed(1);
//     $('#pointsperc').val(perc);

// var group = svg.selectAll("g")
//     .data(data.features)
//     .enter()
//     .append("g")

// var area = group.append("path")
//     .attr("d", path)
//     .attr("class", "area")
//     .attr("stroke", "white")
//     .attr("fill", "#00a6b4"




//  _____ _    _  ____  _____   ____  _____  _      ______ _______ _    _
// / ____| |  | |/ __ \|  __ \ / __ \|  __ \| |    |  ____|__   __| |  | |
// | |   | |__| | |  | | |__) | |  | | |__) | |    | |__     | |  | |__| |
// | |   |  __  | |  | |  _  /| |  | |  ___/| |    |  __|    | |  |  __  |
// | |___| |  | | |__| | | \ \| |__| | |    | |____| |____   | |  | |  | |
// \_____|_|  |_|\____/|_|  \_\\____/|_|    |______|______|  |_|  |_|  |_|

queue()
    .defer(d3.json, "./PlanningDistrictsDorSimp.json")
    .defer(d3.csv, "./districts.csv")
    .await(function(err, mapData, unitsData){

    unitsData.forEach(function(d){
        areaLookup.set(d.area, d.units);
    });


    console.log(areaLookup.get('Allston'));

    colorScale.domain([0, d3.max(unitsData.map(function(d){return +d.units}))]);


        svg.selectAll("path")               //make empty selection
            .data(mapData.features)          //bind to the features array in the map data
            .enter()
            .append("path")                 //add the paths to the DOM
            .attr("d", path)               //actually draw them
            .attr("class", "feature")
            .attr('fill', function(d){
                return colorScale(areaLookup.get(d.properties.PD));
            })
            .attr('stroke','#000')
            .attr('stroke-width',2)
            // .on('click', function(geography) {
            //             geography.properties.PD.append('Name') .text(geography.properties.PD);})
                        // mapData.features.append('Name').text(function(d){return d.bank + '; ' + d.country});
            // .on("click", function(){
            //     document.getElementById('Neighborhood') .append('Neighborhood').text(function(d){return d.area});
            // })
              // .append('title').text(d.properties.PD});

              .on("click",function(d){
                      d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("stroke-width", 4)
                        .transition()
                        .duration(2000)
                        .attr("stroke-width", 2);

                      d3.select("#Neighborhood").text(d.properties.PD);

                      d3.format(".0%")
                      d3.select("#Percent") .html(Math.round(areaLookup.get(d.properties.PD) / 53873 * 100) + "%")

                      // figure out which neighborhood we clicked on
                      var neighborhoodIClicked  = d.properties.PD;
                      drawMyPieChart(neighborhoodIClicked);

                      d3.select("emptypie").moveToBack();

                    })

              // .on("click",function(d){
              //
              //       })

//                     d3.select.getElementById("Neighborhood")
// areaLookup.get(d.properties.PD)
            //
            // .on("mouseover", function(){
            //     document.getElementById('Name').text = (d.area);
            // })

            // PD.append('area').text(function(d){return d.area});


            .on("mouseover", function(d) {
// console.log(areaLookup.get(d.properties.PD));
                  	div.transition()
                    	   .duration(100)
                         .style("opacity", .9);
                         div.html(d.properties.PD  +  "<br/>" + areaLookup.get(d.properties.PD))
                         .style("left", (d3.event.pageX - 120) + "px")
                         .style("top", (d3.event.pageY - 120) + "px");
          	})

              // fade out tooltip on mouse out
              .on("mouseout", function(d) {
                  div.transition()
                     .duration(800)
                     .style("opacity", 0);
              });
                });


              // .on('click', function(geography) {
              //             alert(areaLookup.get(d.properties.PD);
              //         });
              var defs = svg.append("defs");

              var gradient = defs.append("linearGradient")
                 .attr("id", "svgGradient")
                 .attr("x1", "0%")
                 .attr("x2", "100%")
                 .attr("y1", "50%")
                 .attr("y2", "50%");

              gradient.append("stop")
                 .attr('class', 'start')
                 .attr("offset", "15%")
                 .attr("stop-color", "#fff")
                 .attr("stop-opacity", 1);

              gradient.append("stop")
                 .attr('class', 'end')
                 .attr("offset", "100%")
                 .attr("stop-color", "#ceef92")
                 .attr("stop-opacity", 1);

        svg.append("rect")
              .attr("stroke", "#000")
              .attr("stroke-width", 2)
              .attr("width", 250)
              .attr("height", 25)
              .attr("x", 400)
              .attr("y", 550)
              .attr("fill", "url(#svgGradient)")

        svg.append("text")
              .attr("x", 400)
              .attr("y", 540)
              .text("Affordable Units per Neighborhood")

        svg.append("text")
              .attr("x", 400)
              .attr("y", 595)
              .text("0")

        svg.append("text")
              .attr("x", 610)
              .attr("y", 595)
              .text("12,000")


 //  _____ _____ ______    _____ _    _          _____ _______
 // |  __ \_   _|  ____|  / ____| |  | |   /\   |  __ \__   __|
 // | |__) || | | |__    | |    | |__| |  /  \  | |__) | | |
 // |  ___/ | | |  __|   | |    |  __  | / /\ \ |  _  /  | |
 // | |    _| |_| |____  | |____| |  | |/ ____ \| | \ \  | |
 // |_|   |_____|______|  \_____|_|  |_/_/    \_\_|  \_\ |_|
 svg2.append("circle")
       .attr("class", "emptypie")
       .attr("cx", 130)
       .attr("cy", 130)
       .attr("r", 120)
       .attr("fill", "#ddd")
       .attr("stroke", "black")
       .attr("stroke-width", 2)

 svg2.append("circle")
       .attr("class", "emptypie")
       .attr("cx", 130)
       .attr("cy", 130)
       .attr("r", 90)
       .attr("fill", "#fff")
       .attr("stroke", "black")
       .attr("stroke-width", 2)

                var pieX = 130;
                var pieY = 130;

                var pieGroup = svg2.append('g')
                    .attr('transform', 'translate(' + pieX + ',' + pieY + ')');

                //set up scales to position circles using the data
                var scaleColor = d3.scaleOrdinal()
                    .domain(["Commercial", "Residential", "Mixed", "Other"])
                    .range(["#3894c1","#fd9457","#fff260","#77b894"]);
                //var scaleY = d3.scaleLinear().domain([0,1200]).range([400, 0]);  //remember that 0,0 is at the top of the screen! 300 is the lowest value on the y axis

                var nestedData = [];

                var pieRadius = 120;

                var makeArc = d3.arc()
                    .outerRadius(pieRadius)
                    .innerRadius(90);

                var labelArc = d3.arc()
                    .outerRadius(pieRadius -35)
                    .innerRadius(pieRadius -35);

                var makePie = d3.pie()
                    .sort(null)
                    .value(function(d) { return d.total; });



                function drawMyPieChart(neighborhood) {
                        // remove the old pie chart
                      var g = pieGroup.selectAll('.arc').remove();

                      // make the new pie chart
                      var g = pieGroup.selectAll('.arc')
                          .data(makePie(loadData.filter(function(d){return d.area==neighborhood;})  ))   //makePie makes sure that one arc gets added for each data object in the array
                          .enter()
                          .append('g')
                          .attr('class','arc')
                          .attr('stroke','#000')
                          .attr('stroke-width',2);

                      g.append('path')              //grab each group in the variable above, and add a path to it (this will be the pie wedge)
                          .attr('d',makeArc)        //call the makeArc generator function to draw the actual wedges
                          .attr('fill', function(d){ return scaleColor(d.data.type)});
                          //give the wedges a color, based on their d.age values


                      g.append("text")
                          .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })
                          .attr("dy", ".35em")
                          .attr('text-anchor','middle')
                          .attr('fill', 'black')
                          .attr("opacity", 0)
                          .attr('font-family', 'Helvetica')
                          .attr('font-weight', 'Bold')
                          .text(function(d) { return d.data.type; });
                }

                    // svg2.append('text')
                    //     .text('Age Distribution')
                    //     .attr('transform','translate(300, 20)')
                    //     .attr('text-anchor','middle')
                    //     .attr('fill', 'white');
                });



                d3.selectAll("text")
                      .attr('fill', 'black');








                      function toggleFullScreen() {
                        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                         (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                          if (document.documentElement.requestFullScreen) {
                            document.documentElement.requestFullScreen();
                          } else if (document.documentElement.mozRequestFullScreen) {
                            document.documentElement.mozRequestFullScreen();
                          } else if (document.documentElement.webkitRequestFullScreen) {
                            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                          }
                        } else {
                          if (document.cancelFullScreen) {
                            document.cancelFullScreen();
                          } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                          } else if (document.webkitCancelFullScreen) {
                            document.webkitCancelFullScreen();
                          }
                        }
                      }






    // d3.json("./bostonNeighborhoods.json", function (data) {


            // .attr('fill', function(d) { return colorScale(d.units); });


// var areaLookup = d3.map(areaData, function(d){
//   return d.units
// });
// //
// var colorScale = d3.scaleLinear().range(['white',"#00a6b4"]);
// //
// queue()
//     .defer(d3.json, "./bostonNeighborhoods.json")
//     .defer(d3.csv, "./affordableUnits.csv";)
//     .await(function(err, mapData, unitsData){
//
//     unitsData.forEach(function(d){
//         areaLookup.set(d.area, d.units);
//     });
//
// //
//     colorScale.domain([0, d3.max(unitsData.map(function(d){return +d.units}))]);
//

//
// var canvas = d3.select("body").append("svg")
//     .attr("width", 700)
//     .attr("height", 700)

// var usChart = dc.geoChoroplethChart("#map");

// var colorScale = d3.scale.threshold()
//         .domain([0, 2000, 4000, 6000, 8000, 10000, 12000])
//          .range(["#cccccc", "#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f",]);

// var color = d3.scale.threshold()
//       .domain([1000, 3000, 5000, 7000, 9000, 11000, 13000])
//       .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f", "#eafdff"]);
//
// d3.json("bostonNeighborhoods.json", function(error, boston) {
//             d3.csv("affordableUnits.csv", function(error, units) {
//                 var rateById = {};
//
//                 areaLookup.forEach(function(d) {
//                     rateById[d.id] = +d.id;
//                 });

// d3.csv("./affordableUnits.csv", function(error,data){
//   var facts = crossfilter(data);
// })



        // .attr("stroke", "white")
        // .attr("fill", "#00a6b4")
        // .colors(d3.scale.quantize().range("#00a6b4", "#35d0dd", "#73dae2", "#91dbe0", "#c6fbff"))
        // .colorDomain(0,200)
        // .colorCalculator(function(d){return d ? usChart.color() })
        // .overlayGeoJson(bostonNeighborhoods.json,"area",function(d){
        //   return d.properties.PD;
        // })


// });
    //
    // svg.selectAll("path")               //make empty selection
    //     .data(mapData.features)          //bind to the features array in the map data
    //     .enter()
    //     .append("path")                 //add the paths to the DOM
    //     .attr("d", path)                //actually draw them
    //     .attr("class", "feature")
    //     .attr('stroke','black')
    //     .attr('stroke-width',.2);
