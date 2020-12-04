//changes the source of the embedded video
function changeVideo(url) {
  var frame=document.getElementById("videoHolder");
  var clone=frame.cloneNode(true);
  clone.setAttribute('src',url);
  frame.parentNode.replaceChild(clone,frame);
}

// Stores the json dictionary of SiGML translations as a variable
var jsonSent = (function() {
  var jsonSent = null;
  $.ajax({
    url: "sentencesDictEN.json",
    success: successS,
    error: errorF
  });
  function successS (data) {
    console.log("SentDict works!");
     jsonvideo = data;
    }
  function errorF (xhr, error){
    console.log("SentDict doesn't work");
    console.log(error);
  }
  return jsonSent;
})();


// Stores the json dictionary of links to video translations as a variable
var jsonvideo = (function() {
  var jsonvideo = null;
  $.ajax({
    url: "videoDictEN.json",
    success: successS,
    error: errorF
  });
  function successS (data) {
    console.log("videoDict works!");
    console.log(typeof data);
    console.log(data);
     jsonvideo = data;
    }
  function errorF (xhr, error){
    console.log("videoDict doesn't work");
    console.log(error);
  }
  return jsonvideo;
})();

// var json = (function() {
//   var json = null;
//   $.ajax({
//     'async': false,
//     'global': false,
//     'url': "/content.json",
//     'dataType': "json",
//     'success': function(data) {
//       json = data;
//     }
//   });
//   return json;
// })();

function startPose() {
  playText("<?xml version='1.0' encoding='UTF-8'?><sigml><hamgestural_sign gloss='STANDARD_POSE'><sign_manual both_hands='true' lr_symm='true'><handconfig extfidir='dl' /> <handconfig palmor='l' /><handconfig handshape='fist' thumbpos='across' /><location_bodyarm contact='touch' location='belowstomach' side='right_beside'><location_hand digits='1' /></location_bodyarm></sign_manual><sign_nonmanual><head_tier><head_movement movement='PB' size='small'/></head_tier></sign_nonmanual></hamgestural_sign></sigml>");
}

// $(window).on("load", function(){
//   setTimeout(startPose, 1000);
// } );

//Stores suggestions returned by autocomplete
var autocompSugg = [];

// Defines autocomplete suggestions when display by avatar is chosen
var sentOptions = (function(){
  var sentOptions = [];
  for (key in jsonSent){
    sentOptions.push(key);
  }
  return sentOptions;
})();


var videoOptions = (function(){
  var videoOptions = [];
  for (key in jsonvideo){
    videoOptions.push(key);
  }
  return videoOptions;
})();

// Defines the options for autocomplete suggestions as the avatar sentences by default
var options = sentOptions;

// Defines the functions and variable necessary for autcomplete suggestions
$( function() {
  // Defines the filter that searches the list of options for matches
  function customFilter(array, terms) {
    arrayOfTerms = terms.split(" ");
    punctuation = ["?",",",".",";",":","/"];
    arrayOfTerms.forEach(function (term) {
      if (punctuation.includes(term)) {
        var matcher = new RegExp("\\" + term, "i");
      }
      else{
        var matcher = new RegExp(term, "i");
      }
      array = $.grep(array, function (value) {
      return matcher.test(value.label || value.value || value);
      });
    });
    return array;
  }

  // Activates the jquery autocomplete function when the user gives input
  $( "#mySiGML" ).autocomplete({
    source: options,
    appendTo: "#autocomp",
    multiple: true,
    mustMatch: false,
    source: function (request, response) {
      console.log("json: " + jsonSent);
      console.log("sentOptions: " + sentOptions);
      autocompSugg = customFilter(options, request.term);
      response(autocompSugg);
    },
  });

  //Forces the width of the autcomplete menu to fit the input field's width
  jQuery.ui.autocomplete.prototype._resizeMenu = function () {
  var ul = this.menu.element;
  ul.outerWidth(this.element.outerWidth());
  }
});

function checkText(text,value=-1){
  text = text.split(" ");
  console.log(text);
  if (text.includes("...") == true){
    if (text.includes("minutes") == true){
      if (value == -1){
        document.getElementById('minutesBox').style.display = "block";
        alertMessage("info", "Please choose a number between 1 and 60 to fill in the blank", "alertZonMwTran");
        return false;
      }
      else{
        if (value == 1){
          text = text.join(" ");
          text = text.replace("minutes","minute");
          text = text.replace("...",value);
        }
        else{
         text = text.join(" ").replace("...",value);
        }
      document.getElementById('minutesBox').style.display = "none";
      }
    }
    else if (text.includes("hours") == true){
      if (value == -1){
        document.getElementById('hoursBox').style.display = "block";
        alertMessage("info", "Please choose a number between 0 and 73 to fill in the blank", "alertZonMwTran");
        return false;
      }
      else{
        if (value == 1){
          text = text.join(" ");
          text = text.replace("hours","hour");
          text = text.replace("...",value);
        }
        else{
         text = text.join(" ").replace("...",value);
        }
        if (text.split(" ").includes("...") == true){
          alertMessage("info", "Please choose another number between 0 and 73 to fill in the second blank", "alertZonMwTran");
          return false;
        }
        else{
        document.getElementById('hoursBox').style.display = "none";
        }
      }
    }
    else if (text.includes("days") == true){
      if (value == -1){
        document.getElementById('daysBox').style.display = "block";
        alertMessage("info", "Please choose a number between 0 and 15 to fill in the blank", "alertZonMwTran");
        return false;
      }
      else{
        if (value == 1){
          text = text.join(" ");
          text = text.replace("days","day");
          text = text.replace("...",value);
        }
        else{
         text = text.join(" ").replace("...",value);
        }
        document.getElementById('daysBox').style.display = "none";
      }
    }
    else if (text.includes("weeks") == true){
      if (value == -1){
        document.getElementById('weeksBox').style.display = "block";
        alertMessage("info", "Please choose a number between 0 and 11 to fill in the blank", "alertZonMwTran");
        return false;
      }
      else{
        if (value == 1){
          text = text.join(" ");
          text = text.replace("weeks","week");
          text = text.replace("...",value);
        }
        else{
         text = text.join(" ").replace("...",value);
        }
        document.getElementById('weeksBox').style.display = "none";
      }
    }
    else if (text.includes("months") == true){
      if (value == -1){
        document.getElementById('monthsBox').style.display = "block";
        alertMessage("info", "Please choose a number between 0 and 19 to fill in the blank", "alertZonMwTran");
        return false;
      }
      else{
        if (value == 1){
          text = text.join(" ");
          text = text.replace("months","month");
          text = text.replace("...",value);
        }
        else{
         text = text.join(" ").replace("...",value);
        }
        document.getElementById('monthsBox').style.display = "none";
      }
    }
    else if (text.includes("pressure") == true){
      if (value == -1){
        document.getElementById('systolicBPBox').style.display = "block";
        alertMessage("info", "Please choose a number between 69 and 191 to fill in the first blank", "alertZonMwTran");
        return false;
      }
      else{
        text = text.join(" ").replace("...",value);
        if (text.split(" ").includes("...") == true){
          document.getElementById('systolicBPBox').style.display = "none";
          document.getElementById('diastolicBPBox').style.display = "block";
          alertMessage("info", "Please choose a number between 39 and 101 to fill in the second blank", "alertZonMwTran");
          return false;
        }
        else{
        document.getElementById('diastolicBPBox').style.display = "none";
        }
      }
    }
  }
  else if (text.includes("*time*") == true){
    if (value == -1){
      document.getElementById('timeBox').style.display = "block";
      alertMessage("info", "Please choose a time to fill in the blank", "alertZonMwTran");
      return false;
    }
    else{
      value = adaptTime(value,"EN");
      text = text.join(" ").replace("*time*",value);
      document.getElementById('timeBox').style.display = "none";
    }
  }
  else{
    text = text.join(" ");
  }
  return text;
}

// Checks the dictionary for an entry that matches 'text' and sends the SiGML code to the avatar
function toSiGML(text,value=-1){
  if(autocompSugg.includes(text) == false){
    alertMessage("error", "Please choose an option from the autocomplete suggestions", "alertZonMwTran");
  }
  else {
    text = checkText(text,value);
    if (text == false){
      return text;
    }
    else{
     // if avatar is checked, sigml is sent
     if (document.getElementById("avatarDisplay").checked) {
      document.getElementById('mySiGML').value = text;
      entry = jsonSent[text];
      if (entry == undefined) {
        alertMessage("info", "There is currently no translation available for this sentence, but you can send it to us via the suggestions box on this page", "alertZonMwTran");
      }
      else{
        playSiGMLURL(entry);
      }
     }
     // if video is checked, source of embedded video changes
     else if (document.getElementById("videoDisplay").checked) {
      entry = jsonvideo[text];
      if (entry == undefined) {
        alertMessage("info", "There is currently no translation available for this sentence, but you can send it to us via the suggestions box on this page", "alertZonMwTran");
      }
      else{
      changeVideo(entry);
      }
    }
   }
  }
}


//Adapts the base video according to the time of day
function checkToD() {
    var partofday = new Date().getHours();
    if (partofday < 12) {
        link = "https://www.youtube-nocookie.com/embed/gsFNU0RL8nI?rel=0&amp;showinfo=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=gsFNU0RL8nI";
      } else if (partofday < 18) {
        link = "https://www.youtube-nocookie.com/embed/XficFZU4PCY?rel=0&amp;showinfo=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=XficFZU4PCY";
      } else {
        link = "https://www.youtube-nocookie.com/embed/TYFSHlIdYxY?rel=0&amp;showinfo=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=TYFSHlIdYxY";
      }
    document.getElementById("videoHolder").src = link;
}


//Adapts the page to the chosen option
function changeFunc(myRadio) {
  if (myRadio.value == "avatar") {
    // document.getElementById("avatar").setAttribute("class", "CWASAAvatar av0");
    document.getElementById("avatar").style.display = 'inline-block';
    document.getElementById("videos").setAttribute("class", "undisplayed");
    document.getElementById("play").setAttribute("class", "btn btn-primary displayed");
    document.getElementById("speedAdj").setAttribute("class", "CWASASpeed av0");
    document.getElementById("outputGloss").setAttribute("class", "txtGloss av0");
    document.getElementById("glossLabel").style.display = 'inline-block';
    document.getElementById("speedLabel").style.display = 'inline-block';
    options = sentOptions;
  }
  else if (myRadio.value == "video") {
    // document.getElementById("avatar").setAttribute("class", "undisplayed");
    document.getElementById("avatar").style.display = 'none';
    document.getElementById("videos").setAttribute("class", "prerecorded");
    document.getElementById("play").setAttribute("class", "btn btn-primary displayed");
    document.getElementById("speedAdj").setAttribute("class", "undisplayed");
    document.getElementById("outputGloss").setAttribute("class", "undisplayed");
    document.getElementById("glossLabel").style.display = 'none';
    document.getElementById("speedLabel").style.display = 'none';
    options = videoOptions;
  }
}

function compare(input){
  var check = null;
  $.ajax({
   'async': false,
   'global': false,
   'url': "check.json",
   'dataType': "json",
   'success': function(data) {
    check = data;
   }
  });
  
  for (key in check){
   if(input == check[key]){
    check = true;
    break;
   }
  }

  if (check == true){
   document.getElementById("checkPage").style.display = "none";
  }
  else{
   alertMessage("error","This password is incorrect","pwdAlert");
  }
}