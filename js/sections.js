

var totalWidth = 595;
var totalHeight = 200;
var headerHeight = 50;


var fullCanvas = d3.select("#TEST").append("g")

//Add header
 headerSection = fullCanvas.append("svg")
    .attr("id","headerSVG")
    .attr("width", totalWidth)
    .attr("height", headerHeight)
    .append("g");

var redrect = headerSection.append("rect")
        .style("fill","red")
        .attr("x", 0)
        .attr("y", 1)
        .attr("width", 10)
        .attr("height", 28);

var redline = headerSection.append("line")
        .attr("x1",0)
        .attr("y1",1)
        .attr("x2",totalWidth)
        .attr("y2",1)
        .style("stroke", "red")
        .style("stroke-width","1px")
        .attr("shape-rendering","crispEdges")
        ;

var header = headerSection.append("text")
        .text("Election Donations - The race is one")
        .attr("x", 21)
        .attr("y", 29)
        .attr("class","header");

var header = headerSection.append("text")
        .text("Which Candidates Seem to Win the Money Race?")
        .attr("x", 21)
        .attr("y", 45)
        .attr("class","subheader");




var fullCanvas = d3.select("#TEST")
    // .select("g")
        .append("svg")
        .attr("id","bodySVG")
        .attr("width", totalWidth)
        .attr("height", totalHeight);

    svgFooter = d3.select("#footer")
    .append("svg")
    .attr("width",595);

    svgFooter
        .append("text")
        .text("Source: News.walmart.com/")
        .attr("x",580)
        .attr("text-anchor","end")
        .attr("y",120)
        .attr("class","footer")




var scrollVis = function (dataMap) {


var margin = {top: 10, left: 90, bottom: 40, rigth: 150};

  var width = 595;
  var height = 500;


  // D3 MapSetup
      var projection = d3.geo.albersUsa()
          .scale(800)
          .translate([width / 2, height / 2]);

      var path = d3.geo.path()
          .projection(projection);

      var donorsRating = d3.map();

      var quantize = d3.scale.quantize()
          .domain([0, 100000])
          .range([0, 10, 20, 30, 40, 50]);




// scatterplot sclaes and axes (will need to be simplyfied, but works)
  var xscatter = d3.scale.linear().range([margin.left, 500]);
  var yscatter = d3.scale.ordinal().rangeRoundBands([height, 0]);
  var yscatter2 = d3.scale.ordinal().rangeRoundBands([height, 0]);
  var yscatter3 = d3.scale.ordinal().rangeRoundBands([height, 0]);
  var yscatter4 = d3.scale.ordinal().rangeRoundBands([height, 0]);

  var xAxisScatter = d3.svg.axis().scale(xscatter).orient("bottom").ticks(5, "$");
  var yAxisScatter = d3.svg.axis().scale(yscatter).orient("left");
  var yAxisScatter2 = d3.svg.axis().scale(yscatter2).orient("left");
  var yAxisScatter3 = d3.svg.axis().scale(yscatter3).orient("left");
  var yAxisScatter4 = d3.svg.axis().scale(yscatter4).orient("left");

// var colors = ['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7','#e0e0e0','#bababa','#878787','#4d4d4d','#1a1a1a'];

// Chart Hist Scales (will need to be simplyfied, but works)
  var colorscale = d3.scale.linear().range([0, 10]);
  var xhist = d3.scale.linear().range([0, width - margin.rigth]);
  var yhist = d3.scale.ordinal().rangeRoundBands([height, 0]);
  var xhist2 = d3.scale.linear().range([0, width - margin.rigth]);
  var yhist2 = d3.scale.ordinal().rangeRoundBands([height, 0]);
  var xhist3 = d3.scale.linear().range([0, width - margin.rigth]);
  var yhist3 = d3.scale.ordinal().rangeRoundBands([height, 0]);


  // AxesHist
  var xAxisHist = d3.svg.axis().scale(xhist).orient('bottom');
  var yAxisHist = d3.svg.axis().scale(yhist).orient('right').ticks(10, "");

  var xAxisHist2 = d3.svg.axis().scale(xhist2).orient('bottom');
  var yAxisHist2 = d3.svg.axis().scale(yhist2).orient('right').ticks(10, "");

  var xAxisHist3 = d3.svg.axis().scale(xhist3).orient('bottom');
  var yAxisHist3 = d3.svg.axis().scale(yhist3).orient('right').ticks(10, "");

  var lastIndex = -1;
  var activeIndex = 0;

  var svg = null;
  var g = null;


// time parser function
  var parseDate = d3.time.format("%d-%b-%y").parse;


//   // D3 Map
// Projections
  var donorsRating = d3.map();

  var quantize = d3.scale.quantize()
          .domain([0, .15])
          .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));


  var projection = d3.geo.albersUsa()
          .scale(850)
          .translate([width / 2, height / 2]);


  var path = d3.geo.path()
          .projection(projection);




  var activateFunctions = [];

  // Empty update function so far
  var updateFunctions = [];


  var chart = function (selection) {

    selection.each(function(dataCharts) {

    // find solution to import here all data (for map and for charts)
      svg = d3.select(this).selectAll("svg").data([EcoData]);
      svg.enter().append("svg").append('g');

      svg.attr("width", width + margin.left + margin.rigth);
      svg.attr("height", height + margin.top + margin.bottom);

      g = svg.selectAll("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var EcoData = getData(dataCharts);
      var MapData = jsonData(dataMap);

      console.log(EcoData);
      console.log(MapData);

      // Call setupVis and setupSections functions here
        setupVis(EcoData, MapData);
        setupSections();
      // comment out to see sections again

    })
  };



  var setupVis = function (EcoData, us) {


  // d3Map
  var d3map = g
    .append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(
      topojson.feature(us[0], us[0].objects.counties).features
    )
    .enter()
    .append("path")
    .style("stroke", "none")
    .attr("fill", function (d) {return "rgb("+ (quantize(donorsRating.get(d.id)) * 20) +", 0, 0)"})
    .attr("d", path)
    .attr("opacity", 0);




// hist (domains)
  xhist.domain([0, d3.max(EcoData, function (d) { return +d.Most_donations})]);
  yhist.domain(EcoData.map(function(d) { return d.Candidates}), .1 );

  xhist2.domain([0, d3.max(EcoData, function (d) { return +d.Highest_per_head_donations})]);
  yhist2.domain(EcoData.map(function(d) { return d.Candidates}), .1 );

  xhist3.domain([0, d3.max(EcoData, function (d) { return +d.Most_number_of_donors})]);
  yhist3.domain(EcoData.map(function(d) { return d.Candidates}), .1 );



// Setup Hist Chart
  var hist = g.selectAll(".histChart")
  .data(EcoData);

  hist.enter()
      .append("rect")
        .attr("class", "histChart")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", margin.left)
        .attr("y", function(d) { return yhist(d.Candidates); })
        .sort(function(a, b) { return yhist(a.Most_donations) - yhist(b.Most_donations); })
        .attr("height", yhist.rangeBand()/1.2)
        .attr("width", 0)
        .attr("fill", "red")
        .on("mouseover", function () {
          d3.select(this).attr("stroke", "yellow");
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration(200).attr("stroke", "white");
        })


    hist
        .enter()
        .append("text")
        // .attr("text-anchor", "end")
        .attr("class", "textCounties")
        .attr("x", function(d) {
              return xhist(d.Most_donations) + margin.left + 20;
            })
        .attr("y", function(d) { return yhist(d.Candidates) + 35; })
        .attr("dy", ".35em")
        .text(function(d) { return d.county_Most_donations; })
        .attr("opacity", 0);



   var y_xis = g.append('g')
              .attr("transform", "translate(0,0)")
              .attr('class','y axisHist')
              .call(yAxisHist)
              .attr("opacity", 1);

    var x_xis = g.append('g')
              .attr("transform", "translate(0," + height + ")")
              .attr('class','x axis')
              .call(xAxisHist)
              .attr("opacity", 0);




// ------------------------Skatter---------------------------

  xscatter.domain([0, d3.max(EcoData, function(d) { return d.Trump_donations})]);
  yscatter.domain(EcoData.map(function(d) { return d.state_name_Trump}));
  yscatter2.domain(EcoData.map(function(d) { return d.state_name_Bush}));
  yscatter3.domain(EcoData.map(function(d) { return d.state_name_Sanders}));
  yscatter4.domain(EcoData.map(function(d) { return d.state_name_Clinton}));


  colorscale.domain([0, d3.max(EcoData, function(d) { return d.Trump_donations})]);


var scatter = g.selectAll(".scatterplot").data(EcoData);

  scatter.enter()
      .append("circle")
        .attr("class", "scatterplot")
        .attr("r", 5)
        .attr("cx", 0)
        .attr("cy", height)
        .attr("fill", function (d) {
          return "rgb(" + (Math.floor(colorscale(d.Trump_donations)) * 20) + ",0,0)";
        })
        .attr("opacity", 0)
        .on("mouseover", function () {
          d3.select(this).attr("stroke", "yellow");
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration(200).attr("stroke", "white");
        });

    var x_xis = g.append('g')
              .attr("transform", "translate(0," + height + ")")
              .attr('class','x axisScatter')
              .call(xAxisScatter)
              .attr("opacity", 0);

    var y_xis_Scatter = g.append('g')
              .attr("transform", "translate("+ margin.left +",0)")
              .attr('class','y axisScatter')
              .call(yAxisScatter)
              .attr("opacity", 0);


// Heading for the visualisation
    g.append("text")
      .attr("class", "title openvis-title")
      .attr("x", width / 2)
      .attr("y", height / 3)
      .text("The Cash Race");

    g.append("text")
      .attr("class", "sub-title openvis-title")
      .attr("x", width / 2)
      .attr("y", (height / 3) + (height / 5) )
      .text("The Economist")
      .attr("opacity", 0);


    g.select(".openvis-title").attr("opacity", 0);

    var parseDate = d3.time.format("%d-%b-%y").parse;


    // Other Titles:

    g.append("text")
      .attr("class", "sectionHeading")
      .attr("x", width / 2)
      .attr("y", height / 10)
      .text("The Highest Donations from Counties");



  };




  setupSections = function() {
    activateFunctions[0] = Title;
    activateFunctions[1] = BarChart;
    activateFunctions[2] = showLineChartX;
    activateFunctions[3] = showLineChart1;
    activateFunctions[4] = showLineChart2;
    activateFunctions[5] = showLineChart3;
    activateFunctions[6] = showChart4;
    activateFunctions[7] = showChart5;
    activateFunctions[8] = d3Map;



    for(var i = 0; i < 9; i++) {
              updateFunctions[i] = function() {};
              }

    };

   function Title() {

    g.selectAll(".title.openvis-title")
      .transition()
      .duration(1000)
      .attr("opacity", 1.0);

    g.selectAll(".sub-title.openvis-title")
      .text("The Economist")
      .transition()
      .duration(4000)
      .attr("opacity", 1);


    g.selectAll(".histChart").transition()
    .duration(500)
    .attr("x", 0)
    .attr("opacity", 0);

    g.selectAll('.y.axisHist')
    .transition()
    .duration(0)
    .attr("opacity", 0);

    g.selectAll('.x.axis')
    .transition()
    .duration(0)
    .attr("opacity", 0);

    g.selectAll(".textCounties")
    .transition()
    .duration(0)
    .attr("opacity", 0);

// text sections Heading
  g.selectAll(".sectionHeading")
      .transition()
      .duration(500)
      .attr("opacity", 0);
  }






  function BarChart () {

// sectionHeading Text
    g.selectAll(".sectionHeading")
      .transition()
      .duration(500)
      .text("These counties donated most:")
      .attr("opacity", 1.0);


    g.selectAll('.y.axisHist')
          .transition()
          .duration(500)
          // .attr('class','y axis')
          .attr("opacity", 1);

    g.selectAll('.x.axis')
          .transition()
          .duration(500)
          .attr("transform", "translate(" + margin.left +"," + height + ")")
          // .attr('class','x axis')
          .call(xAxisHist)
          .attr("opacity", 1);



    g.selectAll(".histChart")
      .transition()
      .transition(500)
      // .delay(function (d, i) { return i * 10})
      // .sort(d3.ascending)
      .attr("y", function(d) { return yhist(d.Candidates); })
      .attr("x", margin.left)
      .attr("width", function(d) {
                return xhist(d.Most_donations);
              })
      .attr("y", function(d) { return yhist(d.Candidates); })
      .attr("height", yhist.rangeBand()/1.2)
      .attr("fill", "red")
      .attr("opacity", 1);

   g.selectAll(".textCounties")
    .transition()
    .duration(1000)
    .attr("x", function(d) {
          return xhist(d.Most_donations) + margin.left + 20;
        })
    .attr("y", function(d) { return yhist(d.Candidates) + 35; })
    .attr("dy", ".35em")
    .text(function(d) { return d.county_Most_donations; })
    .attr("opacity", 1);

    g.selectAll(".openvis-title")
      .transition()
      .duration(600)
      .attr("opacity", 0.2);



  }

  function showLineChartX () {


  g.selectAll(".sectionHeading")
      .transition()
      .duration(500)
      .attr("y", height / 10)
      .text("The highest per head donations came from...")
      .attr("opacity", 1);

  g.selectAll('.x.axis')
              .transition()
              .duration(500)
              // .attr("transform", "translate(0," + height + ")")
              // .attr('class','x axis')
              .attr("transform", "translate(" + margin.left +"," + height + ")")
              .call(xAxisHist2)
              .attr("opacity", 1);



  g.selectAll(".histChart")
    .sort(function(a, b) {
                            return d3.ascending(a, b);
                          })
    .transition()
    .duration(1000)
    .attr("x", margin.left)
    .attr("y", function(d) { return yhist(d.Candidates); })
    .attr("width", function(d) {
              return xhist2(d.Highest_per_head_donations);
            })
    .attr("fill", "navy")
    .attr("opacity", 1);

  g.selectAll(".textCounties")
    .transition()
    .duration(1000)
    .attr("x", function(d) {
          return xhist2(d.Highest_per_head_donations) + margin.left + 20;
        })
    .attr("y", function(d) { return yhist2(d.Candidates) + 35; })
    .attr("dy", ".35em")
    .text(function(d) { return d.county_name; })
    .attr("opacity", 1);
  }




  function showLineChart1() {


  g.selectAll(".sectionHeading")
      .transition()
      .duration(500)
      .attr("y", height / 10)
      .text("The most number of donors came from...")
      .attr("opacity", 1);



  g.selectAll('.x.axis')
            .transition()
            .duration(500)
            .attr("transform", "translate(" + margin.left +"," + height + ")")
            // .attr('class','x axis')
            .call(xAxisHist3)
            .attr("opacity", 1);


  g.selectAll(".histChart")
    .transition()
    .duration(1000)
    .sort(function(a, b) { return yhist3(a.Most_number_of_donors) - yhist3(b.Most_number_of_donors); })
    .attr("x", margin.left)
    .attr("width", function(d) {
              return xhist3(d.Most_number_of_donors);
            })
    .attr("fill", "grey")
    .attr("opacity", 1);

  g.selectAll(".textCounties")
    .transition()
    .duration(1000)
    .attr("x", function(d) {
          return xhist3(d.Most_number_of_donors) + margin.left + 20;
        })
    .attr("y", function(d) { return yhist3(d.Candidates) + 35; })
    .attr("dy", ".35em")
    .text(function(d) { return d.county_most_donors; })
    .attr("opacity", 1);



    g.selectAll(".scatterplot")
            .transition()
            .duration(1000)
            .attr("cx", 0)
            .attr("cy", height)
            .attr("opacity", 0);


// AxisHist An
    g.selectAll(".x.axisHist")
    .transition()
    .duration(300)
    .attr("opacity", 1);

    g.selectAll(".y.axisHist")
    .transition()
    .duration(300)
    .attr("opacity", 1);

// Axis Skatter Aus
    g.selectAll(".x.axisScatter")
    .transition()
    .duration(300)
    .attr("opacity", 0);

    g.selectAll(".y.axisScatter")
    .transition()
    .duration(300)
    .attr("opacity", 0);

  }

  function showLineChart2() {

// Skatterplot
  g.selectAll(".sectionHeading")
      .transition()
      .duration(500)
      .attr("y", height / 30)
      .text("States that donated most to Trump")
      .attr("opacity", 1);

  g.selectAll(".textCounties")
    .transition()
    .duration(0)
    .attr("opacity", 0);


// AxisHist Aus
    g.selectAll('.y.axisHist')
    .transition()
    .duration(0)
    .attr("opacity", 0);

    g.selectAll('.x.axis')
    .transition()
    .duration(0)
    .attr("opacity", 0);



    g.selectAll(".histChart")
    .transition()
    .duration(300)
    .attr("width", 0)
    .attr("opacity", 0);


    g.selectAll(".scatterplot")
            // .sort(function(a, b){return b.Trump_donations-a.Trump_donations})
            .transition()
            .duration(1000)
            .delay(function (d, i) { return i * 20})
            .attr("cx", function(d) { return xscatter(d.Trump_donations);})
            .attr("cy", function(d) { return yscatter(d.state_name_Trump); })
            .attr("fill", function (d) {
                return "rgb(" + (Math.floor(colorscale(d.Trump_donations)) * 20) + ",0,0)";
                })
            .attr("opacity", 1);

    g.selectAll(".x.axisScatter")
            .transition()
            .duration(300)
            .attr("opacity", 1);

    g.selectAll(".y.axisScatter")
            .transition()
            .duration(300)
            .attr("opacity", 1);

  }

  function showLineChart3() {


  g.selectAll(".y.axisScatter")
    .transition()
    .duration(300)
    .call(yAxisScatter2)
    .attr("opacity", 1);

  // Skatterplot
  g.selectAll(".sectionHeading")
      .transition()
      .duration(500)
      .attr("y", height / 40)
      .text("States that donated most to Bush")
      .attr("opacity", 1);


  g.selectAll("circle.scatterplot")
      .sort(function(a, b){return b.Bush_donations-a.Bush_donations})
      .transition()
      .duration(1000)
      .attr("cx", function(d) { return xscatter(d.Bush_donations); })
      .attr("cy", function(d) { return yscatter2(d.state_name_Bush); })
      .attr("fill", function (d) {
          return "rgb(" + (Math.floor(colorscale(d.Bush_donations)) * 20) + ",0,0)";
          })
      .attr("opacity", 1);



}

  function showChart4 () {

// ScatterAxis
  g.selectAll(".y.axisScatter")
      .transition()
      .duration(300)
      .call(yAxisScatter3)
      .attr("opacity", 1);

    // Skatterplot
  g.selectAll(".sectionHeading")
      .transition()
      .duration(500)
      .attr("y", height / 40)
      .text("States that donated most to Sanders")
      .attr("opacity", 1);

  g.selectAll(".scatterplot")
      .transition()
      .duration(1000)
      .attr("cx", function(d) { return xscatter(d.Sanders_donations); })
      .attr("cy", function(d) { return yscatter3(d.state_name_Sanders); })
      .attr("fill", function (d) {
          return "rgb(" + (Math.floor(colorscale(d.Sanders_donations)) * 20) + ",0,0)";
          })
      .sort(function(a, b) {
      return d3.descending(a, b);
      })
      .attr("opacity", 1);

   }

  function showChart5 () {

  g.selectAll(".y.axisScatter")
      .transition()
      .duration(1500)
      .call(yAxisScatter4)
      .attr("opacity", 1);


  // Skatterplot
  g.selectAll(".sectionHeading")
      .transition()
      .duration(500)
      .attr("y", height / 40)
      .text("States that donated most to Clinton")
      .attr("opacity", 1);

    g.selectAll(".scatterplot")
      .transition()
      .duration(1000)
      .attr("cx", function(d) { return xscatter(d.Clinton_donations); })
      .attr("cy", function(d) { return yscatter4(d.state_name_Clinton); })
      .attr("fill", function (d) {
          return "rgb(" + (Math.floor(colorscale(d.Clinton_donations)) * 20) + ",0,0)";
          })
      .attr("opacity", 1);

}

  function d3Map () {

// d3Map Show
    g.selectAll(".counties")
      .transition()
      .duration(100)
      .attr("opacity", 1);


  // Hide Axis
    g.selectAll(".x.axisScatter")
      .transition()
      .duration(100)
      .attr("opacity", 0);

    g.selectAll(".y.axisScatter")
      .transition()
      .duration(100)
      .attr("opacity", 0);

    g.selectAll(".scatterplot")
      .transition()
      .duration(1000)
      .attr("opacity", 0);

  }


  function jsonData(dataMap) {
    return dataMap;
  }



    // set up the data and update functions
  function getData(dataCharts) {

        var parseDate = d3.time.format("%d-%b-%y").parse;

        return dataCharts.map(function (d, i) {

          d.Candidates = d.Candidates;
          d.Most_donations = +d.Most_donations;
          d.county_Most_donations = d.county_Most_donations;
          d.Highest_per_head_donations = +d.Highest_per_head_donations;
          d.state_name_per_head_donations = d.state_name_per_head_donations;
          d.county_name = d.county_name;
          d.Most_number_of_donor = +d.Most_number_of_donor;
          d.county_most_donors = d.county_most_donors;
          d.state_most_donors = d.state_most_donors;
          d.Marco_Rubio = +d.Marco_Rubio;
          d.Marco_Rubio_State = d.Marco_Rubio_State;
          d.Ted_Cruz   = +d.Ted_Cruz;
          d.Ted_Cruz_State   = d.Ted_Cruz_State;
          d.Hillary_Clinton  = +d.Hillary_Clinton;
          d.Hillary_Clinton_state  = d.Hillary_Clinton_state;
          d.Bernie_Sanders   = +d.Bernie_Sanders;
          d.Bernie_Sanders_state   = d.Bernie_Sanders_state;
          d.Jeb_Bush   = +d.Jeb_Bush;
          d.Jeb_Bush_State   = d.Jeb_Bush_State;
          d.Donald_Trump   = +d.Donald_Trump;
          d.Donald_Trump_State = d.Donald_Trump_State;
          d.state_name  = d.state_name;
          d.state_ini = d.state_ini;
          d.id_state  = +d.id_state;
          d.Rubio_donations = +d.Rubio_donations;
          d.Cruz_donations  = +d.Cruz_donations;
          d.Clinton_donations = +d.Clinton_donations;
          d.Sanders_donations = +d.Sanders_donations;
          d.Bush_donations  = +d.Bush_donations;
          d.Trump_donations = +d.Trump_donations;

          d.state_name_Rubio = d.state_name_Rubio;
          d.state_name_Cruz  = d.state_name_Cruz;
          d.state_name_Clinton   = d.state_name_Clinton;
          d.state_name_Sanders   = d.state_name_Sanders;
          d.state_name_Bush  = d.state_name_Bush;
          d.state_name_Trump  = d.state_name_Trump;

          return d;
        })

      }

  // function sortData(data) {
  //   return data.sort(function (a, b) { return b.Bush_donations - a.Bush_donations})
  //   console.log(getSortedData);
  //    };


  chart.activate = function(index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function(i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  chart.update = function(index, progress) {
    updateFunctions[index](progress);
  };


  return chart;
} //end of scrollVis function




function display(error, dataCharts, dataMap) {
  console.log(error);


// How to insert data for data Map too?
  var plot = scrollVis(dataMap);
  d3.select("#vis")
    .datum(dataCharts, dataMap)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
    .transition().duration(100)
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; })
      .style('font-color',  function(d,i) { return i == index ? "red" : "black"; });
;

    // activate current section
    plot.activate(index);
  });


    scroll.on('progress', function(index, progress){
      plot.update(index, progress);
    });
  }




d3.jsonp = function(a, b) {
   function c() {
       for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", b = "", c = -1; ++c < 15;) b += a.charAt(Math.floor(52 * Math.random()));
       return b
   }

   function d(a) {
       var d = a.match(/callback=d3.jsonp.(\w+)/),
           e = d ? d[1] : c();
       return d3.jsonp[e] = function(a) {
           b(a), delete d3.jsonp[e], f.remove()
       }, "d3.jsonp." + e
   }
   var e = d(a),
       f = d3.select("head").append("script").attr("type", "text/javascript").attr("src", a.replace(/(\{|%7B)callback(\}|%7D)/, e))
};



var x = 1e7 * Math.random();

queue()
    .defer(d3.csv, "data/datadummy2.csv")
    .defer(d3.json, "data/usp.json")
    .defer(d3.tsv, "data/data_final.tsv")
    .await(display);


// loading the data
// d3.csv("data/datadummy2.csv", display);
// d3.jsonp("http://cdn.static-economist.com/sites/default/files/external/minerva_assets/ec-USLand/usp.json?callback=d3.jsonp.paint&x=" + x, display);
// d3.tsv("data/rate.tsv", display);

// console.log(us)
