var tutorial = "";
var tutorial_name=document.getElementById('tutorial_name');
var the_pic=document.getElementById('the_pic');
var the_text=document.getElementById('the_text');
var chartContainer = document.getElementById("chartContainer");
var haveform=false;

var populate = function(tutorial){
  document.getElementById('stage').style.display="inline";
  if (tutorial == "testing"){
    document.getElementById('container').style.display="inline";
  }
  else {
    document.getElementById('container').style.display="none";
  }
  switch(tutorial){
    //stage will populate with the right tutorial based on click
    case 'cnn':
      tutorial_name.innerHTML="CNN Image Classification";
      the_pic.src="img/cnn.png";
      cnn_tutorial();

      break;

    case 'kmeans':

      tutorial_name.innerHTML="K-Means";
      the_pic.src="img/kmeans.png";
      kmeans_tutorial();

      break;

    case 'regression':

      tutorial_name.innerHTML="Linear Regression";
      the_pic.src="img/linreg.png";

      regression_tutorial();

      break;

    case 'testing':
    //I'd like to set up some infrastructure for myself as a researcher. The testing condition allows me to assign conditions and record subject data.
    //Should assign unique SubjectID and generate txt file of responses.

      tutorial_name.innerHTML="Experimental"
      testing_tutorial();
      break;


  }

}

//each of the following tutorials should contain all of the pieces: data constraints,educational content, target algorithm
var cnn_tutorial = function(){
  chartContainer.style.display="none";
  the_pic.style.display="inline";

}
var kmeans_tutorial = function(){
  chartContainer.style.display="none";
  the_pic.style.display="inline";

}

/*
//given someone's provided data and selected tutorial, we need to constrain the space. Constraint Solver?
var constrain_data(){

}

//need a way to talk to the Facebook GraphAPI
var connectGraphAPI(){

}

*/



var testing_tutorial = function(){
  the_pic.style.display="none";

  var preTest = function(){


    $('#stage').empty();
    document.getElementById('stage').appendChild(document.getElementById('preTest'));
    document.getElementById('preTest').style.display="inline";

    var btn = document.getElementById('next');
    btn.addEventListener('click', function(){
      var whatis = ["whatis",document.getElementById('whatis').value];
      var experience = ["experience",document.getElementById('experience').value];
      var interested = ["interested",document.getElementById('interested').value];
      var socialmedia = ["socialmedia",document.getElementById('socialmedia').value];
      var preTestDATA = collect_response([whatis,experience,interested,socialmedia]);
      const url="http://localhost:3000/submit"
      $.post( url, preTestDATA, function(postTestDATA){
         console.log(preTestDATA );
      } );

      if (preTestDATA!=undefined){
        postTest();
      }
    });
  }

  var postTest = function(){
    $('#stage').empty();
    document.getElementById('stage').appendChild(document.getElementById('postTest'));
    document.getElementById('postTest').style.display="inline";

    var btn = document.getElementById('next');
    $('#next').click(function() {
         var relevant = ["relevant",$("input[name='relevant']:checked").val()];
         var interesting = ["interesting",$("input[name='interesting']:checked").val()];
         var learnmore = ["learnmore",$("input[name='learnmore']:checked").val()];
         var hard = ["hard",$("input[name='hard']:checked").val()];
         var enjoy = ["enjoy",$("input[name='enjoy']:checked").val()];
         var postTestDATA = collect_response([relevant,interesting,learnmore,hard,enjoy]);
         console.log(postTestDATA);
         const url="http://localhost:3000/submit"
         $.post( url, postTestDATA, function(postTestDATA){
            console.log(postTestDATA );
         } );

         if (postTestDATA!=undefined){
           //finish();
           social_portion();
         }

       });
  }

  var finish = function(){
    $('#stage').empty();

    var thanks=document.createElement('h3');
    thanks.appendChild(document.createTextNode("Thank you for participating!"));
    thanks.style.textAlign = "center"
    document.getElementById('stage').appendChild(thanks);

  }
  var check_length = function(my_arr){

    for(var i=0;i<my_arr.length;i++){
       if(my_arr[i][1] == "" | my_arr[i][1]== undefined){
          return false;
        }
      }
      return true;
  }

  var collect_response = function(array){
    'use strict';
    // if they missed a question!
    if(check_length(array)){
        var responses = {};
        for(var i = 0;i<array.length;i++){
          //make the dictionary from the array
          responses[array[i][0]]= array[i][1];
        }
        let data = JSON.stringify(responses);
        return data;
      }
      else{
        window.alert("Please fill out all of the questions before moving on!");
      }
  }
  var maketable = function(){
    console.log("make a table");
    var div = document.getElementById('myDiv');
    div.style.display="inline";
    var table = document.getElementById('myTable');
    var submit = document.getElementById('sub');
    submit.onclick=function(){grab_cells(table)};


  }
  var grab_cells = function(table){
    var ar = [];
    //gets rows of table
    var rowLength = table.rows.length;
    for (i = 0; i < rowLength; i++){
      //gets cells of current row
       var cells = table.rows.item(i).cells;
       //gets amount of cells of current row
       var cellLength = cells.length;
       //loops through each cell in current row
       for(var j = 0; j < cellLength; j++){
              // get your cell info here
              var cellVal = cells.item(j).innerHTML;
              ar.push(cellVal);
           }
    }
    console.log(ar);
  }
  var social_portion = function(){
    //clear the stage
    $('#stage').empty();

    //ask, are you interested in Social Media relationships?
    var smq=document.createElement('h3');
    smq.appendChild(document.createTextNode("Are you interested in seeing a regression relationship from your own social media data?"));
    smq.style.textAlign = "center"

    var yes = document.createElement("button");
    yes.appendChild(document.createTextNode("Yes"));
    yes.className="btn btn-primary btn-x2 rounded-pill mt-3";
    yes.value="Yes";

    yes.onclick=maketable;

    var no = document.createElement("button");
    no.appendChild(document.createTextNode("No"));
    no.className="btn btn-primary btn-x2 rounded-pill mt-3";
    no.value="No";
    no.onclick=finish;
    var answerbox = document.createElement("div");
    answerbox.appendChild(yes);
    answerbox.appendChild(no);

    answerbox.style.margin="0 0 0 50%";

    var stage = document.getElementById("stage");
    stage.appendChild(smq);
    stage.appendChild(document.createElement("br"));
    stage.appendChild(answerbox);

    //if yes:
      //generate table.
      //generate plot w/linear regression
      //generate textarea for "intuitions, comments, etc"
  }
  //assign to Condition (manual?)
  if (haveform == false){
    var condition_div = document.createElement("div");
    var textarea = document.createElement("input");
    textarea.cols="3";
    textarea.value=Math.floor(Math.random() * 3);
    var label = document.createTextNode("Condition:");
    condition_div.appendChild(label);
    condition_div.appendChild(document.createElement("br"));
    condition_div.appendChild(textarea);
    document.getElementById('container').appendChild(condition_div);

    //assign Subject ID (manual?)
    var subID_div = document.createElement("div");
    var textarea = document.createElement("input");
    textarea.cols="3";
    var label = document.createTextNode("Participant ID:");
    subID_div.appendChild(label);
    subID_div.appendChild(document.createElement("br"));
    subID_div.appendChild(textarea);
    document.getElementById('container').appendChild(subID_div);

    var button = document.createElement("button");
    button.appendChild(document.createTextNode("Go"));
    button.className="btn btn-primary btn-x2 rounded-pill mt-3"
    button.onclick=preTest;
    document.getElementById('container').appendChild(button);


    haveform=true;

  }



  //preTest questions
  //if not socialmedia condition: no form
  //if socialmedia condition: generate form
  //if vanillaSM: generate form, not questions
  //if sprinklesSM: generate form and questions
  //postTest questions
}
