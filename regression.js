var regression_tutorial = function(){
  // randomly generate condition: personal or impersonal.
  var added_points = [];
  var test_data = [

      {x:7,y:3.8},
      {x:6,y:4.0},
      {x:6,y:3.7},
      {x:5,y:3.1},
      {x:4,y:3.0}

    ]

  var thetitle = "Interest and Grades"

  var findLineByLeastSquares = function(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;
    var new_x =0;
    var new_y = 0;
    /*
     * We'll use those variables for faster read/write access.
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    /*
     * Nothing to do.
     */
    if (values_length === 0) {
        return [ [], [] ];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;

    /*
     * We will make the x and y result line now
     */
    var result_values_x = [];
    var result_values_y = [];

    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
    }

    return [m, b, result_values_x, result_values_y];
}

  /*all helper functions here*/
  var grab_keys_values = function(dict){
    var array_keys = new Array();
    var array_values = new Array();

    for(var val =0; val < dict.length;val++){
      array_keys.push(dict[val].x);
      array_values.push(dict[val].y);

    }
    return ([array_keys,array_values]);
  }

  function add(a, b) {
    return a + b;
  }

  var removeByValue=function(array,val){
    //console.log("DPX" + Object.keys(array));

    for( var i = 0; i < array.length-1; i++){
      if ( array[i].x == val){
     array.splice(i, 1);
   }
  }

}

  the_pic.style.display="none";
  document.getElementById("example-table").style.display="none";
  document.getElementById("chartContainer").style.display="inline-block";


/* set our globals here */
  var dPtest = [];
  var chosen_slope=0;
  var chosen_intercept=0;
  var interval = null;
  var interval_count = 0;
  var tableMade= false;
  dontComeback = false;
  var x_values=[];
  var y_values=[];
  var table= "";
  var gd_result = [];

  var opening_chart = function(){
    document.getElementById("pic_inside").src=the_pic.src;
    document.getElementById("pic_inside").style.width="400px";
    document.getElementById("pic_inside").style.paddingTop="20%";
  }
  opening_chart();



  // all the functions that make the charts in the chart script
  // TODO: change to means instead of totals
  var make_total_chart=function(){
      var x_mean = x_values.reduce(add,0)/x_values.length;
      var y_mean = y_values.reduce(add,0)/y_values.length;
      // bar chart, totals
      var total_chart = new CanvasJS.Chart(chartContainer, {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
          text: thetitle
        },
        axisY: {
          title: "Total Amount"
        },
        data: [{
          type: "column",
          showInLegend: false,
          legendMarkerColor: "grey",
          legendText: "",
          dataPoints: [
            { y: x_mean, label: "Mean Interest" },
            { y: y_mean,  label: "Mean Grade" }
          ]
        }]
      });
      total_chart.render();
  }


// demo the points in a scatter plot
  var make_scatter_chart=function(){
    //console.log(dPtest);
    var scatter_chart = new CanvasJS.Chart(chartContainer, {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: thetitle
      },
      axisY:{
        includeZero: false,
        minimum:0
      },

      data: [{
        type: "scatter",
        dataPoints: dPtest
      }],
    });
    scatter_chart.render();
  }

// this function was such a bitch!
// allows you to draw a line yourself
  var make_interactive_chart=function(){
    var interactive_chart = new CanvasJS.Chart(chartContainer, {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: thetitle
      },
      axisY:{
        includeZero: false,
        minimum:0
      },
      data: [{
        type: "scatter",
        dataPoints: dPtest
      }]
    });
    interactive_chart.render();
    added_points =[];
    var clickcount = 0;
    var okcount = 0;
    var twopointline = function(){
      //adds a point to the data on click
      //TODO: turn into drag

        jQuery(".canvasjs-chart-canvas").last().on("click",
      	function(e){
          clickcount+=1;

          if (clickcount<=2){
        		var parentOffset = $(this).parent().offset();
        		var relX = e.pageX - parentOffset.left;
        		var relY = e.pageY - parentOffset.top
        		var xValue = interactive_chart.axisX[0].convertPixelToValue(relX);
        		var yValue = interactive_chart.axisY[0].convertPixelToValue(relY);

            interactive_chart.options.data[0].dataPoints.push({x:xValue,y:yValue});
            added_points.push([xValue,yValue]);

            interactive_chart.render();

            if(clickcount==2){
              // draw line
              interactive_chart.options.data.push(
                  {type: "line",
                  dataPoints: [
                    {x:added_points[0][0], y: added_points[0][1]},
                    {x:added_points[1][0], y: added_points[1][1]}
                  ]}
              )
              interactive_chart.render();
              chosen_slope = compute_slope(added_points[0],added_points[1]);
              chosen_intercept = compute_intercept(added_points[0],chosen_slope);
              console.log(chosen_slope,chosen_intercept);

              }
          }

      	});
    }
    var compute_slope = function(a,b){
          if (a[0] == b[0]) {
              return null;
          }
          return (b[1] - a[1]) / (b[0] - a[0]);
    }
    var compute_intercept =function(point, slope) {
        if (slope === null) {
            // vertical line
            return point[0];
        }
        return point[1] - slope * point[0];
    }
    var line_count=0;
    var ok = document.getElementById("ok");
    ok.style.display="inline";

    ok.addEventListener('click', function(){
      if(clickcount==2){
        okcount+=1;
      //remove the line and get ready to draw again! can't just pop because everything gets ORDERED

        interactive_chart.options.data.pop();
        //want to delete interactive_chart.options.data[1]
        interactive_chart.render();
        //reset
        clickcount=0;
        //added_points=[];
        if (okcount>=0){
          next.disabled=false;
        }
      }
    });
    //start the event listener for twopoint line
    twopointline();
  }


  var make_regression_chart=function(){
    ok.style.display="none";
    var new_dPtest = [];
    for(i=0;i<x_values.length;i++){
      new_dPtest.push({
        x:   x_values[i],
        y: y_values[i]
      });

    }
    dPtest = new_dPtest;
    console.log("DP AFTER NEW" + dPtest);

    var regression_chart = new CanvasJS.Chart(chartContainer, {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: thetitle
      },
      axisY:{
        includeZero: false,
        minimum:0
      },
      data: [{
        type: "scatter",
        dataPoints: dPtest
      }]
    });
    regression_chart.render();
      //caluclate two points from edge of graph to other edge
      var min_x=Math.min.apply(null,x_values);
      var max_x=Math.max.apply(null,x_values);
      var y1 = (gd_result[0]*min_x)+gd_result[1];
      var y2 = (gd_result[0]*max_x)+gd_result[1];
      //plots the gd result line
      regression_chart.options.data.push(
          {type: "line",
          dataPoints: [
            {x:min_x, y:y1 },
            {x:max_x, y:y2}
          ]}
      )

      var y3=chosen_slope*min_x+chosen_intercept;
      var y4=chosen_slope*max_x+chosen_intercept;
      regression_chart.options.data.push(
          {type: "line",
          dataPoints: [
            {x:min_x, y:y3 },
            {x:max_x, y:y4}
          ]}
      )
      regression_chart.render();


  }


  var make_residual_chart = function(){


    //demonstrate the difference between your chosen line and the 'correct' line.
    var residual_chart = new CanvasJS.Chart(chartContainer, {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "y = mx + b"
      },
      axisY:{
        includeZero: false,
        minimum:0,
        maximum:Math.max.apply(null,y_values)+5
      },
      data: [{
        type: "scatter",
        dataPoints: dPtest
      }]
    }
  );
    var min_x=Math.min.apply(null,x_values);
    var max_x=Math.max.apply(null,x_values);
    var y3=chosen_slope*min_x+chosen_intercept;
    var y4=chosen_slope*max_x+chosen_intercept;
    residual_chart.options.data.push(
        {type: "line",
        dataPoints: [
          {x:min_x, y:y3 },
          {x:max_x, y:y4}
        ]}
    )
    for(var i = 0; i < x_values.length; i++){
      //add all the residual lines.
      residual_chart.options.data.push(
        {type: "line",
        dataPoints: [
          {x:x_values[i], y: y_values[i]},
          {x:x_values[i], y:chosen_slope*x_values[i]+chosen_intercept}
        ]}


      )


    }


    residual_chart.render();

  }

// demonstrate the TRUE linear regression line.
  var make_true_residual_chart = function(){

    //demonstrate the difference between your chosen line and the 'correct' line.
    var true_residual_chart = new CanvasJS.Chart(chartContainer, {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "y = mx + b"
      },
      axisY:{
        includeZero: false,
        minimum:0,
        maximum:Math.max.apply(null,y_values)+5
      },
      data: [{
        type: "scatter",
        dataPoints: dPtest
      }]
    }
  );
    console.log(dPtest);
    var min_x=Math.min.apply(null,x_values);
    var max_x=Math.max.apply(null,x_values);
    var y3=ls_result[0]*min_x+ls_result[1];
    var y4=ls_result[0]*max_x+ls_result[1];

    true_residual_chart.options.data.push(
        {type: "line",
        dataPoints: [
          {x:min_x, y:y3 },
          {x:max_x, y:y4}
        ]}
    )
    console.log(x_values);
    for(var i = 0; i < x_values.length; i++){

      //add all the residual lines.
      true_residual_chart.options.data.push(
        {type: "line",
        dataPoints: [
          {x:x_values[i], y: y_values[i]},
          {x:x_values[i], y:ls_result[0]*x_values[i]+ls_result[1]}
        ]}

      )
    }
    true_residual_chart.render();
  }

  // demonstrate a y = 0x + b line;
  var make_flatline_h = function(){
      var flatline_h = new CanvasJS.Chart(chartContainer, {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "y = 0x + 3.3"
        },
        axisY:{
          includeZero: false,
          minimum:0
        },
        data: [{
          type: "scatter",
          dataPoints: dPtest
        }]
      });
      var min_x=Math.min.apply(null,x_values);
      var max_x=Math.max.apply(null,x_values);
      var y1 = 0*min_x+3.3;
      var y2 = 0*max_x+3.3;
      //plots the gd result line
      flatline_h.options.data.push(
          {type: "line",
          dataPoints: [
            {x:min_x, y:y1 },
            {x:max_x, y:y2}
          ]}
      )
      flatline_h.render();

    }
  // demonstrate a y = mx hypothesis example
  var  make_nointercept_h = function(){
      var nointercept_h = new CanvasJS.Chart(chartContainer, {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "y = .2x + 0"
        },
        axisY:{
          includeZero: false,
          minimum:0
        },
        data: [{
          type: "scatter",
          dataPoints: dPtest
        }]
      });
      var min_x=Math.min.apply(null,x_values);
      var max_x=Math.max.apply(null,x_values);
      var y1 = .2*min_x+0;
      var y2 = .2*max_x+0;
      //plots the gd result line
      nointercept_h.options.data.push(
          {type: "line",
          dataPoints: [
            {x:min_x, y:y1 },
            {x:max_x, y:y2}
          ]}
      )
      nointercept_h.render();

    }
  //demonstrate a y = mx + b hypothesis example
  var  make_combo_h = function(){
      var combo_h = new CanvasJS.Chart(chartContainer, {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "y = .2x + 3.3"
        },
        axisY:{
          includeZero: false,
          minimum:0
        },
        data: [{
          type: "scatter",
          dataPoints: dPtest
        }]
      });
      var min_x=Math.min.apply(null,x_values);
      var max_x=Math.max.apply(null,x_values);
      var y1 = .2*min_x+3.3;
      var y2 = .2*max_x+3.3;
      //plots the gd result line
      combo_h.options.data.push(
          {type: "line",
          dataPoints: [
            {x:min_x, y:y1 },
            {x:max_x, y:y2}
          ]}
      )
      combo_h.render();

    }


// create the chart that we will add new hypotheses to
  var make_random_chart = function(){

    var random_chart = new CanvasJS.Chart(chartContainer, {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "y = mx + b"
      },
      axisY:{
        includeZero: false,
        minimum:0,
        maximum:Math.max.apply(null, y_values)*2
      },
      data: [{
        type: "scatter",
        dataPoints: dPtest
      }]
    });
    random_chart.render();

    interval=setInterval(function(){updateChart(random_chart)}, 600);

  }

  // to keep adding new hypotheses to the chart
  var updateChart = function(random_chart){
        interval_count = interval_count+1;
        if(interval_count>30){
          clearInterval(interval);
        }

        else{
          var min_x=Math.min.apply(null,x_values);
          var max_x=Math.max.apply(null,x_values);
          var flip = Math.random();
          var rand_slope = Math.random();
          if(flip>.5){
            rand_slope=rand_slope*-1;
          }
          var rand_intercept = Math.floor(Math.random() * 3) + 1
          var y1 = rand_slope*min_x+rand_intercept;
          var y2 = rand_slope*max_x+rand_intercept;
          var title = "y = " + rand_slope.toFixed(2) + "x + " + rand_intercept.toFixed(2);
        //plots a random m and b
        random_chart.options.data.push(
            {type: "line",
            dataPoints: [
              {x:min_x, y:y1 },
              {x:max_x, y:y2}
            ]}
        )
        random_chart.options.title.text = title;
        random_chart.render();
      }

  }

  // create the chart that we will add new hypotheses to
    var make_gd_chart = function(){

      var gd_chart = new CanvasJS.Chart(chartContainer, {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "y = mx + b"
        },
        axisY:{
          includeZero: false,
          minimum:0,
          maximum:Math.max.apply(null, y_values)*2
        },
        data: [{
          type: "scatter",
          dataPoints: dPtest
        }]
      });
      gd_chart.render();

      interval=setInterval(function(){updateGDChart(gd_chart)}, 100);

    }

    // to keep adding new hypotheses to the chart
    var updateGDChart = function(gd_chart){
          gd_params = gd_result[3].shift();

          if(gd_result[3].length==0){
            console.log(gd_result[3]);

          }

          else{
            var min_x=Math.min.apply(null,x_values);
            var max_x=Math.max.apply(null,x_values);
            var slope = gd_params[0];
            var intercept = gd_params[1];
            var y1 = slope*min_x+intercept;
            var y2 = slope*max_x+intercept;
            var title = "y = " + slope.toFixed(2) + "x + " + intercept.toFixed(2);
          //plots a random m and b
          gd_chart.options.data.push(
              {type: "line",
              lineColor:"red",
              dataPoints: [
                {x:min_x, y:y1 },
                {x:max_x, y:y2}
              ]}
          )
          gd_chart.options.title.text = title;
          gd_chart.render();
          gd_chart.options.data.pop();
        }

    }

  // for making the animation about y = mx + b
  var mxb = function(){
        //put y=mx+b animation in the chartContainer
        chartContainer.innerHTML="";
        var canvas = document.createElement('canvas');
        canvas.height=300;
        canvas.width=500;
        chartContainer.appendChild(canvas);
        chartContainer.style.height = "300px;"
        var stage = new createjs.Stage(canvas);


        var h0 = new createjs.Bitmap("img/h0.png");
        h0.x=100;
        h0.y=100;
        var mx =new createjs.Text("y = mx + b","italic 48px Arial","black");
        mx.x=150;
        mx.y=210;
        stage.addChild(mx);
        stage.addChild(h0);
        h0.image.onload = function() {
          stage.update();
        }




                            //reload frames
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener("tick", stage);

  }

  var get_new_point = function(){
    chartContainer.innerHTML="";
    var input_x_title = document.createElement('h1');
    input_x_title.id = "input_x_title";

    input_x_title.innerHTML="Interest rating";
    var input_x = document.createElement('input');
    input_x.id="inputx";



    chartContainer.appendChild(input_x_title);
    chartContainer.appendChild(input_x);

    document.getElementById('input_x_title').style.marginTop = "30px";
    document.getElementById('inputx').style.marginBottom = "70px";









  }
  var make_newpoint_regression_chart=function(new_x,new_y){


    x_values.push(new_x);

    y_values.push(new_y);

    var newpoint_regression_chart = new CanvasJS.Chart(chartContainer, {

      animationEnabled: true,
      theme: "light2",
      title:{
        text: thetitle
      },
      axisY:{
        includeZero: false,
        minimum:0
      },
      data: [{
        type: "scatter",
        dataPoints: dPtest
      }]
    });

      //caluclate two points from edge of graph to other edge
      var min_x=Math.min.apply(null,x_values);
      var max_x=Math.max.apply(null,x_values);
      var y1 = (ls_result[0]*min_x)+ls_result[1];
      var y2 = (ls_result[0]*max_x)+ls_result[1];
      //plots the gd result line
      newpoint_regression_chart.options.data.push(
          {type: "line",
          dataPoints: [
            {x:min_x, y:y1 },
            {x:max_x, y:y2}
          ]},

      );


      return newpoint_regression_chart;





  }
  var plot_new_point = function(){
    new_x = document.getElementById('inputx').value;
    //here we use our regression line to make new_y
    new_y = (gd_result[0]*new_x)+gd_result[1];
    new_x=parseFloat(new_x);
    new_y=parseFloat(new_y);
    console.log(new_x,new_y);
    document.getElementById('inputx').style.display='none';

    var chart = make_newpoint_regression_chart(new_x,new_y);
    chart.options.data.push(
      {type: "scatter",
      color:"red",
      markerSize:10,
      dataPoints: [
        {x:new_x, y:new_y}
      ]}

    );
    chart.render();


  }
  var demo_possible = function(){
        //put animation in the chartContainer
        chartContainer.innerHTML="";
        var canvas = document.createElement('canvas');
        canvas.height=500;
        canvas.width=500;
        chartContainer.appendChild(canvas);
        chartContainer.style.height = "300px;"
        var stage = new createjs.Stage(canvas);


        var h0 = new createjs.Bitmap("img/wordcloud.png");

        h0.x=0;
        h0.y=50;
        stage.addChild(h0);
        h0.image.onload = function() {
          stage.update();
        }


                            //reload frames
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener("tick", stage);

  }

  var clear_it = function(){
    chartContainer.innerHTML="";
    var canvas = document.createElement('canvas');
    canvas.height=500;
    canvas.width=500;
    chartContainer.appendChild(canvas);
    chartContainer.style.height = "300px;"
    var stage = new createjs.Stage(canvas);
    stage.update();
    document.getElementById('next').style.display="None";
    document.getElementById('back').style.display="None";
  }

  //for collecting data from the user
  var make_input_table = function(){
        var Nposts=5;
        document.getElementById("chartContainer").style.display="none";
        table = new Tabulator("#example-table", {
      	data:[],           //load row data from array
      	layout:"fitColumns",      //fit columns to width of table
      	responsiveLayout:"hide",  //hide columns that dont fit on the table
      	tooltips:true,            //show tool tips on cells
      	addRowPos:"top",          //when adding a new row, add it to the top of the table
      	history:true,             //allow undo and redo actions on the table
      	pagination:"local",       //paginate the data
      	paginationSize:Nposts,         //allow 7 rows per page of data
      	movableColumns:true,      //allow column order to be changed
      	resizableRows:true,       //allow row order to be changed
      	initialSort:[             //set the initial sort order of the data
      		{column:"name", dir:"asc"},
      	],
      	columns:[                 //define the table columns
      		{title:"Interest Rating", field:"x", editor:"input"},
      		{title:"Grade", field:"y",editor:"input"},
          {title:"Course", field:"label",editor:"input"}

      	],
      });
      for(var i = 0;i<Nposts;i++){
        table.addRow({});
      }
      tableMade=true;
  }

//combine these into dictionary with their corresponding script, you dummy.
//index: title, script, graphic
var condition = "";
if(Math.random()>.5){
  condition="Personal";
}
else{
  condition="Impersonal";
}

var feedback1 = function(){

  console.log("do nothing?");
}
//don't forget you have this here! it makes it always go to personal!
condition="Impersonal";
var fb_personal = [
['Linear Regression', "<b>Linear regression</b> is one of the basic building blocks of machine learning. We use what we already know to try to make predictions. We do this by finding a mathematical equation that 'fits' the data we already have, and seeing if it does a good job at predicting new data!",feedback1],
['Collect Data', 'Scroll through the last few posts on Facebook or Instagram. Input the number of Likes (or total reactions) on a post, and then the number of Comments on that post.',make_input_table],
['Total Likes & Comments', "Let's start to unpack some data about <b>you</b>. You're looking at your own Facebook data, for the last 20 posts (totals). Every post has some number of Likes, and some number of Comments. ", make_total_chart],
['Prediction', "Do you think there's a relationship between how many Likes you get on a post and how many Comments you get?",feedback1],
['Relationship', "This is your data, graphed on a 'scatter plot'. For every post, there is a number of Likes for that post. For that same post, there is a number of Comments that the post got. <b>What can you say about the relationship between Likes and Comments on your profile?</b>",make_scatter_chart],
['Finding Patterns', 'The idea behind Machine Learning is to find patterns in the data we already have (your Likes and Comments patterns) in order to predict new data. <b>How many Comments will a post get if it has 30 Likes?</b>',feedback1],
['Line of Best Fit', "How did you make the prediction? Well here's how machine learning makes it. You may have heard of <b>line of best fit</b>. That's how we are going to get started with Machine Learning. Because this is <i>linear</i> regression, our best fit line needs to be a straight line (that's the definition of <i>linear</i> here). <br><br> <b>Do you think your data could be <i>linear</i>?</b> Or does it not adhere to a straight line? Perhaps it is a different shape, like an exponential.",feedback1],
['Draw a Line', "What straight line fits <i>your</i> data? Draw a line that you think represents the relationship between your Likes and Comments. <b>Click anywhere to try to draw the line that 'fits' your data the best.</b> Reset to draw a different line. When you're ready, click Next.",make_interactive_chart],
["The 'True Best' Fit", "The line you chose isn't exactly right. Turns out, there's an even better 'fit', which you can now see in green. <b>",make_regression_chart],
['Residuals on your Chosen Line', "This is the line you chose to fit your Likes and Comments. The vertical lines show the vertical distance from the true points to the line you chose. Those distances are basically how 'good a fit' you chose.",make_residual_chart],
["Residuals on the 'True Best' Line", 'This is the <i>actual</i> line of best fit, with the distances shown. Finding the best line is about making those distances as small as possible.',make_true_residual_chart],
['Representing the Data', "A good fitting model would represent the true data as closely as possible (while also being able to predict new stuff!). We can't do that perfectly with a straight line, but some straight lines are closer to the data than others.",feedback1],
['Pieces of the Equation', "To really understand how machine learning works, we have to talk about how the line is computed. Before we cover <i>how</i> we got that best fit line, let's talk about the <b>parameters</b> (components) that make up a linear equation. People in Machine Learning might show it one way, but that's just a fancy way of saying: <center><br> <i>y = mx + b. </i></center><br>Finding the right <b>m</b> and finding the right <b>b</b> is what linear regression is all about.",mxb],
['Intercept', "What if we just change <b>b</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 3.3</b>. We won't touch <b>m</b> at all, and it will remain at 0. Now we have <i>y = 0x + 5</i>.",make_flatline_h],
['Slope', "What if we just change <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>m = .2</b>. We won't touch <b>b</b> at all, and it will remain at 0. Now we have <i>y = .2x + 0</i>.",make_nointercept_h],
['y= mx + b', "What if we just change both <b>b</b> and <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 3.3</b>, and <b>m = .2</b>. Now we have <i>y = .2x + 3.3</i>.",make_combo_h],
['Guess and Check?', "How do we find the right <b>m</b> and <b>b</b> for your data? What if we guessed randomly until we found the right fit? You can start to see how ineffective this would be. There are an infinite number of parameters we could try. There's gotta be a better way!",make_random_chart],
['A Better Way',"Guessing randomly isn't really feasible. There is an infinite number of slopes and intercepts, and we would have to be really lucky to match the real data very well. Remember, the whole point of doing machine learning is to find a model that reasonably fits the data we see in the world (and generalizes to new data reliably!) So we use something called a <b>gradient</b> to systematically arrive at better and better fitting lines until we find the best one.",feedback1],
['Generalization', "While finding the models that fit the data might be useful, they're the most useful if they help us predict things about <i>new</i> data. In our case, the posts could be about about a topic the user cares about, or the user asking a question. How can we predict how many y_values the post will get on the post? Especially if we care about community engagement in our posts! In this case, we are using the number of Likes to predict the number of Comments. How will it hold up on <i>new</i> data?",feedback1],
['Prediction', "Before we look at the real test point, let's try to use our model to predict the number of Comments that post got based on the number of Likes.",feedback1],
['Performance', "Here's the real post! How did our model do? Could we do better? What did we do well? Describe what happened and what we know about our model.",feedback1]

];

var fb_impersonal = [
['Linear Regression', "<b>Linear regression</b> is one of the basic building blocks of machine learning. We use what we already know to try to make predictions. We do this by finding a mathematical equation that 'fits' the data we already have, and seeing if it does a good job at predicting new data!",feedback1],
['Total Likes & Comments', "Let's start to unpack some data about a Social Media user. You're looking at their Facebook data, for the last 20 posts (totals). Every post has some number of Likes, and some number of Comments. ", make_total_chart],
['Prediction', "Do you think there's a relationship between how many Likes they get on a post and how many Comments they get?",feedback1],
['Relationship', "This is that data, graphed on a 'scatter plot'. For every post, there is a number of Likes for that post. For that same post, there is a number of Comments that the post got. <b>What can you say about the relationship between Likes and Comments on this profile?</b>",make_scatter_chart],
['Finding Patterns', 'The idea behind Machine Learning is to find patterns in the data we already have (these Likes and Comments patterns) in order to predict new data. <b>How many Comments will a post get if it has 30 Likes?</b>',feedback1],
['Line of Best Fit', "How did you make the prediction? Well here's how machine learning makes it. You may have heard of <b>line of best fit</b>. That's how we are going to get started with Machine Learning. Because this is <i>linear</i> regression, our best fit line needs to be a straight line (that's the definition of <i>linear</i> here). <br><br> <b>Do you think this data could be <i>linear</i>?</b>",feedback1],
['Draw a Line', "What straight line fits <i>your</i> data? Draw a line that you think represents the relationship between the user's Likes and Comments. <b>Click anywhere to try to draw the line that 'fits' the user's data the best.</b> Reset to draw a different line. When you're ready, click Next.",make_interactive_chart],
["The 'True Best' Fit", "The line you chose isn't exactly right. Turns out, there's an even better 'fit', which you can now see in green. <b>",make_regression_chart],
['Residuals on your Chosen Line', "This is the line you chose to fit the user's Likes and Comments. The vertical lines show the vertical distance from the true points to the line you chose. Those distances are basically how 'good a fit' you chose.",make_residual_chart],
["Residuals on the 'True Best' Line", 'This is the <i>actual</i> line of best fit, with the distances shown. Finding the best line is about making those distances as small as possible.',make_true_residual_chart],
['Representing the Data', "A good fitting model would represent the true data as closely as possible (while also being able to predict new stuff!). We can't do that perfectly with a straight line, but some straight lines are closer to the data than others.",feedback1],
['Pieces of the Equation', "To really understand how machine learning works, we have to talk about how the line is computed. Before we cover <i>how</i> we got that best fit line, let's talk about the <b>parameters</b> (components) that make up a linear equation. People in Machine Learning might show it one way, but that's just a fancy way of saying: <center><br> <i>y = mx + b. </i></center><br>Finding the right <b>m</b> and finding the right <b>b</b> is what linear regression is all about.",mxb],
['Intercept', "What if we just change <b>b</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>. We won't touch <b>m</b> at all, and it will remain at 0. Now we have <i>y = 0x + 5</i>.",make_flatline_h],
['Slope', "What if we just change <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>m = .2</b>. We won't touch <b>b</b> at all, and it will remain at 0. Now we have <i>y = .2x + 0</i>.",make_nointercept_h],
['y= mx + b', "What if we just change both <b>b</b> and <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>, and <b>m = .2</b>. Now we have <i>y = .2x + 5</i>.",make_combo_h],
['Guess and Check?', "How do we find the right <b>m</b> and <b>b</b> for the user's data? What if we guessed randomly until we found the right fit? You can start to see how ineffective this would be. There are an infinite number of parameters we could try. There's gotta be a better way!",make_random_chart],
['A Better Way',"Guessing randomly isn't really feasible. There is an infinite number of slopes and intercepts, and we would have to be really lucky to match the real data very well. Remember, the whole point of doing machine learning is to find a model that reasonably fits the data we see in the world (and generalizes to new data reliably!) So we use something called a <b>gradient</b> to systematically arrive at better and better fitting lines until we find the best one.",feedback1],
['Generalization', "While finding the models that fit the data might be useful, they're the most useful if they help us predict things about <i>new</i> data. In our case, the posts could be about about a topic the user cares about, or the user asking a question. How can we predict how many y_values the post will get on the post? Especially if we care about community engagement in our posts! In this case, we are using the number of Likes to predict the number of Comments. How will it hold up on <i>new</i> data?",get_new_point],
['Prediction', "Before we look at the real test point, let's try to use our model to predict the number of Comments that post got based on the number of Likes.",feedback1],
['Performance', "Here's the real post! How did our model do? Could we do better? What did we do well? Describe what happened and what we know about our model.",feedback1]

];

var fb_facts = [];
// facebook scripts



//college scripts
var col_personal = [
  ['Linear Regression', "<b>Linear regression</b> is one of the basic building blocks of machine learning. We use what we already know to try to make predictions. We do this by finding a mathematical equation that 'fits' the data we already have, and seeing if it does a good job at predicting new data!",feedback1],
  ['Collect Data', 'For the last 5 classes in college, rate your <b>interest</b> in the class and your final <b>grade</b> in the class. Input the Interest on a scale of 1-7, and then the final Grade out of 4.0 for that class.',make_input_table],
  ['Averages', "Let's start to unpack some data about <b>you</b>. You're looking at your own Interest data, for the last 5 classes at UW (averages). Every class has some interest value, and some course grade. ", make_total_chart],
  ['Prediction', "Do you think there's a relationship between your interest in a class and the grade you received?",feedback1],
  ['Relationship', "This is your data, graphed on a 'scatter plot'. For every class, there is the rating you gave for interest. For that same class, there is the grade that you got in the class. <b>What can you say about the relationship between interest and grades in your data?</b>",make_scatter_chart],
  ['Finding Patterns', 'The idea behind Machine Learning is to find patterns in the data we already have (your interest and grade patterns) in order to predict new data. <b> If you give an interest rating of 4, what grade might you get?</b>',feedback1],
  ['Line of Best Fit', "How did you make the prediction? Well here's how machine learning makes it. You may have heard of <b>line of best fit</b>. That's how we are going to get started with Machine Learning. Because this is <i>linear</i> regression, our best fit line needs to be a straight line (that's the definition of <i>linear</i> here). <br><br> <b>Do you think your data could be <i>linear</i>?</b> Or does it not adhere to a straight line? Perhaps it is a different shape, like an exponential.",feedback1],
  ['Draw a Line', "What straight line fits <i>your</i> data? Draw a line that you think represents the relationship between your Interest and Grades. <b>Click anywhere to try to draw the line that 'fits' your data the best.</b> Reset to draw a different line. When you're ready, click Next.",make_interactive_chart],
  ["The 'True Best' Fit", "The line you chose isn't exactly right. Turns out, there's an even better 'fit', which you can now see in green. <b>",make_regression_chart],
  ['Residuals on your Chosen Line', "This is the line you chose to fit your Interest and Grades. The vertical lines show the vertical distance from the true points to the line you chose. Those distances are basically how 'good a fit' you chose.",make_residual_chart],
  ["Residuals on the 'True Best' Line", 'This is the <i>actual</i> line of best fit, with the distances shown. Finding the best line is about making those distances as small as possible.',make_true_residual_chart],
  ['Representing the Data', "A good fitting model would represent the true data as closely as possible (while also being able to predict new stuff!). We can't do that perfectly with a straight line, but some straight lines are closer to the data than others.",feedback1],
  ['Pieces of the Equation', "To really understand how machine learning works, we have to talk about how the line is computed. Before we cover <i>how</i> we got that best fit line, let's talk about the <b>parameters</b> (components) that make up a linear equation. People in Machine Learning might show it one way, but that's just a fancy way of saying: <i>y = mx + b. </i> Finding the right <b>m</b> and finding the right <b>b</b> is what linear regression is all about.",mxb],
  ['Intercept', "What if we just change <b>b</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>. We won't touch <b>m</b> at all, and it will remain at 0. Now we have <i>y = 0x + 5</i>.",make_flatline_h],
  ['Slope', "What if we just change <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>m = .2</b>. We won't touch <b>b</b> at all, and it will remain at 0. Now we have <i>y = .2x + 0</i>.",make_nointercept_h],
  ['y= mx + b', "What if we just change both <b>b</b> and <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>, and <b>m = .2</b>. Now we have <i>y = .2x + 5</i>.",make_combo_h],
  ['Guess and Check?', "How do we find the right <b>m</b> and <b>b</b> for your data? What if we guessed randomly until we found the right fit? You can start to see how ineffective this would be. There are an infinite number of parameters we could try. There's gotta be a better way!",make_random_chart],
  ['A Better Way',"Guessing randomly isn't really feasible. There is an infinite number of slopes and intercepts, and we would have to be really lucky to match the real data very well. Remember, the whole point of doing machine learning is to find a model that reasonably fits the data we see in the world (and generalizes to new data reliably!) So we use something called a <b>gradient</b> to systematically arrive at better and better fitting lines until we find the best one.",make_gd_chart],
['Why Are We Doing This?'," Remember, the whole point of doing machine learning is to find a model that reasonably fits the data we see in the world and also generalizes to new data reliably!.",feedback1],
  ['Generalization', "So we found a good line that fits the data we have. What next? While finding the models that fit the data might be useful, they're the most useful if they help us predict things about <i>new</i> data. In our case, you might want to know about your grades for a course next year. How interested are you in that class? Will our model work to predict the grade you'll get? How will it hold up on <i>new</i> data?",get_new_point],
  ['Testing a New Point', "How well did our model predict on the test point? Compare your test point (red) to what the model would predict. If it performed well, can you explain why it did well? If it performed poorly, can you explain why?",plot_new_point],
  ['Adding Features',"Whether or not the model performed well, rarely does linear regression use only <i>one</i> variable to predict an outcome (Interest to Grades). You can actually take other things into account in the model. And just like the size of words in a word cloud, each feature can have a different <b>weight</b>, meaning they affect the final prediction differently. What other features should we take into account when predicting your Grades in a class?",demo_possible],
  ['Thank You', "Now you're going to critique some models from different contexts. You're finished with this part of the study!",clear_it]

];



var col_impersonal =  [
  ['Linear Regression', "<b>Linear regression</b> is one of the basic building blocks of machine learning. We use what we already know to try to make predictions. We do this by finding a mathematical equation that 'fits' the data we already have, and seeing if it does a good job at predicting new data!",feedback1],
  ['Averages', "Let's start to unpack some data about a student. You're looking at their Interest data, for the last 5 classes at their university (averages). Every class has some interest value, 1-7, and some course grade, 1-4.0. ", make_total_chart],
  ['Prediction', "Do you think there's a relationship between Interest in a class and the Grade received?",feedback1],
  ['Relationship', "This is their data, graphed on a 'scatter plot'. For every class, there is the rating for Interest. For that same class, there is the Grade that the student got for the class. <b>What can you say about the relationship between interest and grades in this data?</b>",make_scatter_chart],
  ['Finding Patterns', 'The idea behind Machine Learning is to find patterns in the data we already have (your Interest and Grade patterns) in order to predict new data. <b> If the student gave an Interest rating of 4, what grade might they get?</b>',feedback1],
  ['Line of Best Fit', "How did you make the prediction? Well here's how machine learning makes it. You may have heard of <b>line of best fit</b>. That's how we are going to get started with Machine Learning. Because this is <i>linear</i> regression, our best fit line needs to be a straight line (that's the definition of <i>linear</i> here). <br><br> <b>Do you think your data could be <i>linear</i></b>? Or does it not adhere to a straight line? Perhaps it is a different shape, like an exponential.",feedback1],
  ['Draw a Line', "What straight line fits this data? Draw a line that you think represents the relationship between Interest and Grades. <b>Click anywhere to try to draw the line that 'fits' your data the best.</b> Reset to draw a different line. When you're ready, click Next.",make_interactive_chart],
  ["The 'True Best' Fit", "The line you chose isn't exactly right. Turns out, there's an even better 'fit', which you can now see in green. <b>",make_regression_chart],
  ['Residuals on your Chosen Line', "This is the line you chose to fit your Interest and Grades. The vertical lines show the vertical distance from the true points to the line you chose. Those distances are basically how 'good a fit' you chose.",make_residual_chart],
  ["Residuals on the 'True Best' Line", 'This is the <i>actual</i> line of best fit, with the distances shown. Finding the best line is about making those distances as small as possible.',make_true_residual_chart],
  ['Representing the Data', "A good fitting model would represent the true data as closely as possible (while also being able to predict new stuff!). We can't do that perfectly with a straight line, but some straight lines are closer to the data than others.",feedback1],
  ['Pieces of the Equation', "To really understand how machine learning works, we have to talk about how the line is computed. Before we cover <i>how</i> we got that best fit line, let's talk about the <b>parameters</b> (components) that make up a linear equation. People in Machine Learning might show it one way, but that's just a fancy way of saying: <i>y = mx + b. </i> Finding the right <b>m</b> and finding the right <b>b</b> is what linear regression is all about.",mxb],
  ['Intercept', "What if we just change <b>b</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>. We won't touch <b>m</b> at all, and it will remain at 0. Now we have <i>y = 0x + 5</i>.",make_flatline_h],
  ['Slope', "What if we just change <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>m = .2</b>. We won't touch <b>b</b> at all, and it will remain at 0. Now we have <i>y = .2x + 0</i>.",make_nointercept_h],
  ['y= mx + b', "What if we just change both <b>b</b> and <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>, and <b>m = .2</b>. Now we have <i>y = .2x + 5</i>.",make_combo_h],
  ['Guess and Check?', "How do we find the right <b>m</b> and <b>b</b> for the data? What if we guessed randomly until we found the right fit? You can start to see how ineffective this would be. There are an infinite number of parameters we could try. There's gotta be a better way!",make_random_chart],
  ['A Better Way',"Guessing randomly isn't really feasible. There is an infinite number of slopes and intercepts, and we would have to be really lucky to match the real data very well. Remember, the whole point of doing machine learning is to find a model that reasonably fits the data we see in the world (and generalizes to new data reliably!) So we use something called a <b>gradient</b> to systematically arrive at better and better fitting lines until we find the best one.",make_gd_chart],
  ['Generalization', "While finding the models that fit the data might be useful, they're the most useful if they help us predict things about <i>new</i> data. In our case, you might want to know what Grade a student will get for a course next year. How interested is the student in that class? Will our model work to predict the grade they'll get? How will it hold up on <i>new</i> data?",get_new_point],
  ['Testing a New Point', "How well did our model predict on the test point? Compare your test point (red) to what the model would predict. If it performed well, can you explain why it did well? If it performed poorly, can you explain why?",plot_new_point],
  ['Adding Features',"Whether or not the model performed well, rarely does linear regression use only <i>one</i> variable to predict an outcome (Interest to Grades). You can actually take other things into account in the model. And just like the size of words in a word cloud, each feature can have a different <b>weight</b>, meaning they affect the final prediction differently. What other features should we take into account when predicting your Grades in a class?",demo_possible],
  ['Thank You', "Now you're going to critique some models from different contexts. You're finished with this part of the study!",clear_it]

];




var col_facts = [

  ['Linear Regression', "<b>Linear regression</b> is one of the basic building blocks of machine learning. We use what we already know to try to make predictions. We do this by finding a mathematical equation that 'fits' the data we already have, and seeing if it does a good job at predicting new data!",feedback1],
  ['Scenario', "Let's start by thinking about some data about a student. A student rated how interested they were in a course, and then the final grade they got in that course.Every class has some Interest value between 1-7, and some course Grade, up to 4.0. ", make_total_chart],
  ['Prediction', "Do you think there's a relationship between Interest in a class and the Grade received?",feedback1],
  ['Relationship', "A machine learning model could find that relationship between Interest and Grade, computing how much Interest in a class affects the Grade the student receives.",make_scatter_chart],
  ['Finding Patterns', 'The idea behind Machine Learning is to find patterns in the data we already have (your Interest and Grade patterns) in order to predict new data. <b> If the student gave an Interest rating of 2, what grade might they get?</b>',feedback1],
  ['Line of Best Fit', "How did you make the prediction? Well here's how machine learning makes it. You may have heard of <b>line of best fit</b>. That's how we are going to get started with Machine Learning. Because this is <i>linear</i> regression, our best fit line needs to be a straight line (that's the definition of <i>linear</i> here). <br><br> <b>Do you think your data could be <i>linear</i>?</b> Or does it not adhere to a straight line? Perhaps it is a different shape, like an exponential." ,feedback1],
  ["Residuals on the 'True Best' Line", 'The machine learning algorithm finds the <i>line of best fit</i>. You can judge how good  the line is by measuring the distance from each point to the line, and minimizing the sum of the square of those distances. Basically, getting a line that tries to generally fit the trend in the data.',make_true_residual_chart],
  ['Representing the Data', "A good fitting model would represent the true data as closely as possible (while also being able to predict new stuff!). We can't do that perfectly with a straight line, but some straight lines are closer to the data than others.",feedback1],
  ['Pieces of the Equation', "To really understand how machine learning works, we have to talk about how the line is computed. Before we cover <i>how</i> we got that best fit line, let's talk about the <b>parameters</b> (components) that make up a linear equation. People in Machine Learning might show it one way, like this: <br><img> but that's just a fancy way of saying: <center><br> <i>y = mx + b. </i></center><br>Finding the right <b>m</b> and finding the right <b>b</b> is what linear regression is all about.",mxb],
  ['Intercept', "What if we just change <b>b</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>. We won't touch <b>m</b> at all, and it will remain at 0. Now we have <i>y = 0x + 5</i>.",make_flatline_h],
  ['Slope', "What if we just change <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>m = .2</b>. We won't touch <b>b</b> at all, and it will remain at 0. Now we have <i>y = .2x + 0</i>.",make_nointercept_h],
  ['y= mx + b', "What if we just change both <b>b</b> and <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>, and <b>m = .2</b>. Now we have <i>y = .2x + 5</i>.",make_combo_h],
  ['Guess and Check?', "How do we find the right <b>m</b> and <b>b</b> for the data? What if we guessed randomly until we found the right fit? You can start to see how ineffective this would be. There are an infinite number of parameters we could try. There's gotta be a better way!",make_random_chart],
  ['A Better Way',"Guessing randomly isn't really feasible. There is an infinite number of slopes and intercepts, and we would have to be really lucky to match the real data very well. Remember, the whole point of doing machine learning is to find a model that reasonably fits the data we see in the world (and generalizes to new data reliably!) So we use something called a <b>gradient</b> to systematically arrive at better and better fitting lines until we find the best one.",feedback1],
  ['Generalization', "While finding the models that fit the data might be useful, they're the most useful if they help us predict things about <i>new</i> data. In our case, you might want to know what Grade a student will get for a course next year. How interested is the student in that class? Will our model work to predict the grade they'll get? How will it hold up on <i>new</i> data?",feedback1],
  ['Adding Features',"Rarely does linear regression use only <i>one</i> variable to predict an outcome (Interest to Grades). You can actually take other things into account in the model. In math, we can represent this by adding more theta terms (remember those?). What other features should we take into account when predicting Grades in a class?",feedback1]



];
if (condition == "Personal"){
      var script = col_personal;
      //console.log(script);
}
if(condition == "Impersonal"){
//impersonal script
    var script = col_impersonal;
    //console.log(script);
}
if(condition == "Facts"){
    var script = fb_facts;



}


var current = 0;
  //starter
  var next_script = script[current];
  if(next_script!=undefined){
    tutorial_name.innerHTML= next_script[0];
    the_text.innerHTML = next_script[1];
    next_script[2].call();
  }



  //moves through the tutorial and populates the stage
  var back = document.getElementById('back');
  var next = document.getElementById('next');

  back.style.display="inline";
  next.style.display="inline";

  back.addEventListener('click',function(){
    current = current -1;
    next_script = script[current];
    if(next_script!=undefined){
      tutorial_name.innerHTML= next_script[0];
      the_text.innerHTML = next_script[1];
      next_script[2].call();
    }
  });

  next.addEventListener('click', function(){
    current += 1;
    if(condition=="Personal"){
        if(tableMade == true){
          data_grab = table.getData();
          for(var j = 0; j<data_grab.length;j++){
            dPtest.push(
              {x:parseFloat(data_grab[j].x),y:parseFloat(data_grab[j].y)}
            );

            console.log(dPtest);
          }
          if(isNaN(dPtest[0].x)){

            dPtest =test_data;
              //console.log(dPtest);

          }

          document.getElementById("example-table").style.display="none";
          document.getElementById("chartContainer").style.display="inline-block";
        }

      }
          //if x_values/y_values contains Nan:
      if (condition=="Impersonal" & tableMade==false & dontComeback==false) {
              console.log("called");
              dPtest =test_data;
              x_values_and_y_values = grab_keys_values(dPtest);
              x_values = x_values_and_y_values[0];
              y_values = x_values_and_y_values[1];

              tableMade = true;
              dontComeback = true;

          }
          if(tableMade==true){
            var data = grab_keys_values(dPtest);
            x_values=data[0];
            y_values=data[1];
            //precompute gradient_descent...
            gd_result = gradient_descent(x_values,y_values);
            console.log("THE PARAMS "+ gd_result[3].length);

            //console.log("Gradient Descent Result:" + gd_result);
            ls_result = findLineByLeastSquares(x_values,y_values);
            //console.log("Least Squares Result" + ls_result[0],ls_result[1]);
            tableMade=false; // turn it back off so this doesn't call again
        }


        var next_script = script[current];


        //console.log(next_script[2]);
        if(next_script!=undefined){
          tutorial_name.innerHTML= next_script[0];
          the_text.innerHTML = next_script[1];
          next_script[2].call();
        }



      });





}
