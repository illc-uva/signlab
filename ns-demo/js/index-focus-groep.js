// Global variable for the language (default: English)
var globalVar={
  lang: "Nederlands",
  trainType: "trainType",
  platformNr: "platformNr",
  departTime: "departTime",
  waitTime: "waitTime",
  interStation1: "interStation1",
  interStation2: "interStation2",
  interStation3: "interStation3",
  interStation4: "interStation4",
  endStation: "endStation",
  currentSentence: "Dear passengers, the trainType to endStation from departTime is not departing.",
  currentSentenceColored: "Dear passengers, the trainType to endStation from departTime is not departing.",
  urlName: "sentences_English",
  sigmlText: '',
  playButtonClicked: false,
  playFinished: false,
  playing: false
};

var train_n = 1;
var wait_n = 1;
var depart_n = 1;
var platform_n = 1;
var end_n = 1;

var changeSent = false;
var trainTemp;
var platformTemp;
var departTemp;
var waitTimeTemp;
var endStationTemp;

var oldStationInt;

// Inter en end array moeten verschillende stations bevatten anders worden ze op elkaars plek ingevuld (kleine bug)
var interStationsArray = ["-", "Zwolle", "Arnhem", "Deventer", "Breda"]
var endStationsArray = ["Almelo", "Nijmegen", "Enschede", "Maastricht", "Schiedam", "Utrecht Centraal"]

var departTimeInput = document.getElementById('departTimeInput');
// departTimeInput = departTimeInput.value;
var departTimeInputChange;

$(departTimeInput).on("change", function(){
  departTimeInputChange = departTimeInput.value;
  replaceText(globalVar.currentSentence, departTimeInputChange, /\d{1,2}\:\d{2}/, globalVar.departTime);
  globalVar.playing ? makePlayNonClickable(av) : -1;
})

function updateGlobalVariables(name, oldValue){
    if(name === "trainType" && train_n===1){
      globalVar.trainType = trainTemp;
      train_n+=1;
      return globalVar.trainType;
    }
    if(name === "platformNr" && platform_n===1){
      globalVar.platformNr = platformTemp;
      platform_n+=1;
      return globalVar.platformNr;
    }
    if(name === "waitTime" && wait_n===1){
      globalVar.waitTime = waitTimeTemp;
      wait_n+=1;
      return globalVar.waitTime;
    }
    if(name === "departTime" && depart_n===1){
      globalVar.departTime = departTemp;
      depart_n+=1;
      return globalVar.departTime;
    }
    if(name === "endStation" && end_n===1){
      globalVar.endStation = endStationTemp;
      end_n+=1;
      return globalVar.endStation;
    }
    return oldValue;
}

/**
 * Checks whether the input sentence contains a variable and needs additional input from the user
 * @param {*} currentSentence 
 * @param {*} newValue 
 * @param {*} oldValue 
 * @param {*} name 
 */
 function replaceText(currentSentence, newValue, oldValue, name, av){
   console.log(globalVar.playing);
  globalVar.playing ? makePlayNonClickable(av) : -1;

  // Krijgt globale vars mee vanuit index.html
  // Update global var in 1st iteration (because of the auto-fill)
  oldValue = updateGlobalVariables(name, oldValue);

  console.log('oldval: ', oldValue);
  console.log('newval: ', newValue);

  globalVar.currentSentence = currentSentence.replace(oldValue, newValue);

  boxBackground = document.getElementById('currSentenceBox_' + av);
  backgroundColor = window.getComputedStyle(boxBackground).backgroundColor;
  if(name === "departTime"){
    if (currentSentence.includes(globalVar.departTime)){
      globalVar.currentSentenceColored = globalVar.currentSentenceColored.replace(globalVar.departTime, departTimeInputChange);
    } else {
      globalVar.currentSentenceColored = globalVar.currentSentenceColored.replace(/\d{2}\:\d{2}/, departTimeInputChange);
    }
  }
  // Add invisible numbers to the intermediate station names such that their position is recognized
  else if(name.match(/interStation\d{1}/)){
    var stationInt;

    if (name === "interStation1_" + av){
      oldStationInt = 1;
      stationInt = 1;
      globalVar.interStation1 = newValue;
    } else if (name === "interStation2_" + av){
      oldStationInt = 2;
      stationInt = 2;
      globalVar.interStation2 = newValue;
    } else if (name === "interStation3_" + av){
      oldStationInt = 3;
      stationInt = 3;
      globalVar.interStation3 = newValue;
    } else if (name === "interStation4_" + av){
      oldStationInt = 4;
      stationInt = 4;
      globalVar.interStation4 = newValue;
    }
    if(oldValue.match(/interStation\d{1}/) || oldValue.match(/tussenStation\d{1}/)){
      globalVar.currentSentenceColored = globalVar.currentSentenceColored.replace(oldValue, '<span style="color: ' + backgroundColor + ';">' + stationInt + '</span>' + newValue);
    } else {
      globalVar.currentSentenceColored = globalVar.currentSentenceColored.replace('<span style="color: ' + backgroundColor + ';">' + oldStationInt + '</span>' + oldValue, '<span style="color: ' + backgroundColor + ';">' + stationInt + '</span>' + newValue);
    }
  } else {
    globalVar.currentSentenceColored = globalVar.currentSentenceColored.replace(oldValue, newValue);
  }
  
  // Replace other global vars so default values are overridden
  name === "trainType" ? globalVar.trainType = newValue : -1;
  name === "platformNr" ? globalVar.platformNr = newValue : -1;
  name === "waitTime" ? globalVar.waitTime = newValue : -1;
  name === "departTime" ? globalVar.departTime = newValue : -1;
  name === "endStation" ? globalVar.endStation = newValue : -1;

  // Remove space before invisible numbers
  globalVar.currentSentenceColored = globalVar.currentSentenceColored.replace(/\s(\<[^\>]*\>\<[^\>]*\>\d{1})/, "$1");
  document.getElementById('currSentence_' + av).innerHTML = globalVar.currentSentenceColored; // => alleen voor de show
}

/**
 * Changes the varBox names and creates dropdown menu's, depending on the chosen language
 * @param {*} language 
 */
 function startUp(currentSentence, changeSent, av) {
  train_n=1;
  platform_n=1;
  depart_n=1;
  wait_n=1;
  end_n=1;
  globalVar.urlName = "sentences_" + globalVar.lang;

  if(changeSent){
    document.getElementById('currSentence_' + av + '').innerHTML = currentSentence;
    resetBoxes(currentSentence, av);
    colorKeywords(currentSentence, av);
  } else {
    $.getJSON("json/" + globalVar.urlName + ".json", function(json) {
    createDropdown(Object.keys(json), 'sentenceOptions_' + av);
    globalVar.currentSentence = Object.keys(json)[0];
    
    createDropdown(waitElementsArray, 'waitTimeOptions_' + av);
    createDropdown(interStationsArray, 'interStation1Options_' + av);
    createDropdown(interStationsArray, 'interStation2Options_' + av);
    createDropdown(interStationsArray, 'interStation3Options_' + av);
    createDropdown(interStationsArray, 'interStation4Options_' + av);
    createDropdown(endStationsArray, 'endStationOptions_' + av);

    document.getElementById('currSentence_' + av + '').innerHTML = globalVar.currentSentence;
    resetBoxes(globalVar.currentSentence, av);
    colorKeywords(globalVar.currentSentence, av);
    document.querySelector('button[data-id="sentenceOptions_'+ av + '"]').title = globalVar.currentSentence;
    document.querySelector('button[data-id="endStationOptions_' + av + '"]').title = endStationsArray[0];
    $('.selectpicker').selectpicker('refresh');
  }).fail(function() {
    console.log("Could not get JSON file");
  });
  }
  // Save initial dropdown menu values temporarily
    trainTemp =  document.getElementById('trainTypeOptions_' + av).value;
    platformTemp =  document.getElementById('platformNrOptions_' + av).value;
    departTemp =  document.getElementById('departTimeInput_' + av).value;
    waitTimeTemp =  document.getElementById('waitTimeOptions_' + av).value;
    endStationTemp =  document.getElementById('endStationOptions_' + av).value;
  
    var waitElementsArray = ["enkele minuten", "ongeveer 5 minuten", "ongeveer 35 minuten", "ongeveer anderhalf uur", "een nog onbekende tijd"];
}

/**
 * Displays the variable boxes
 * @param {*} text 
 */
function displayVarBox(text, av){

  text.includes(globalVar.trainType) ? document.getElementById('trainTypeBox_' + av).style.display = "block" : -1;
  text.includes(globalVar.platformNr) ? document.getElementById('platformBox_' + av).style.display = "block" : -1;
  text.includes(globalVar.departTime) ? document.getElementById('departTimeBox_' + av).style.display = "block" : -1;
  text.includes(globalVar.waitTime) ? document.getElementById('waitTimeBox_' + av).style.display = "block" : -1;
  text.includes(globalVar.interStation1) ? document.getElementById('interStationBox1_' + av).style.display = "block" : -1;
  text.includes(globalVar.interStation2) ? document.getElementById('interStationBox2_' + av).style.display = "block" : -1;
  text.includes(globalVar.interStation3) ? document.getElementById('interStationBox3_' + av).style.display = "block" : -1;
  text.includes(globalVar.interStation4) ? document.getElementById('interStationBox4_' + av).style.display = "block" : -1;
  text.includes(globalVar.endStation) ? document.getElementById('endStationBox_' + av).style.display = "block" : -1;
}

/**
 * 
 * @param {*} language 
 */
function resetGlobalVariables(){
    globalVar.trainType = "treinType"
    globalVar.platformNr = "spoorNr"
    globalVar.departTime = "vertrekTijd"
    globalVar.waitTime = "wachtTijd"
    globalVar.interStation1 = "tussenStation1",
    globalVar.interStation2 = "tussenStation2",
    globalVar.interStation3 = "tussenStation3",
    globalVar.interStation4 = "tussenStation4",
    globalVar.endStation = "eindStation"
}

/**
 * Changes the chosen sentence text
 * @param {*} text 
 */
 function changeSentence(currentSentence, av){
  document.getElementById('repetitionBar_' + av).style.display = "none";
  // Disable play button when previous animation is still playing
  globalVar.playing ? makePlayNonClickable(av) : -1;
  resetGlobalVariables();
  startUp(currentSentence, true, av);
}
  
function resetBoxes(currentSentence, av){
  makeVarBoxInvisible(av);
  displayVarBox(currentSentence, av);
}

function colorKeywords(currentSentence, av){
  // Color keywords
  if(currentSentence.includes(globalVar.trainType)){
    currentSentence = currentSentence.replace(globalVar.trainType, '<span style="color: orange;">' + document.getElementById('trainTypeOptions_' + av).value + '</span>');
  } if (currentSentence.includes(globalVar.platformNr)){
    currentSentence = currentSentence.replace(globalVar.platformNr, '<span style="color: orange;">' + document.getElementById('platformNrOptions_' + av).value + '</span>');
  } if (currentSentence.includes(globalVar.departTime)){
    currentSentence = currentSentence.replace(globalVar.departTime, '<span style="color: orange;">' + document.getElementById('departTimeInput_' + av).value + '</span>');
  } if (currentSentence.includes(globalVar.waitTime)){
    currentSentence = currentSentence.replace(globalVar.waitTime, '<span style="color: orange;">' + document.getElementById('waitTimeOptions_' + av).value + '</span>');
  } if (currentSentence.includes(globalVar.endStation)){
    currentSentence = currentSentence.replace(globalVar.endStation, '<span style="color: orange;">' + document.getElementById('endStationOptions_' + av).value + '</span>');
  }
  currentSentence.includes(globalVar.interStation1) ? currentSentence = currentSentence.replaceAll(globalVar.interStation1, '<span style="color: orange;">' + globalVar.interStation1 + '</span>') : -1;
  currentSentence.includes(globalVar.interStation2) ? currentSentence = currentSentence.replaceAll(globalVar.interStation2, '<span style="color: orange;">' + globalVar.interStation2 + '</span>') : -1;
  currentSentence.includes(globalVar.interStation3) ? currentSentence = currentSentence.replaceAll(globalVar.interStation3, '<span style="color: orange;">' + globalVar.interStation3 + '</span>') : -1;
  currentSentence.includes(globalVar.interStation4) ? currentSentence = currentSentence.replaceAll(globalVar.interStation4, '<span style="color: orange;">' + globalVar.interStation4 + '</span>') : -1;
  
  globalVar.currentSentenceColored = currentSentence;
  document.getElementById('currSentence_' + av + '').innerHTML = globalVar.currentSentenceColored;
 
  // Reset default box values
  $("select[name=interStation1" + av + "]").val("-");
  $("select[name=interStation1" + av + "]").selectpicker("refresh");
  $("select[name=interStation1" + av + "]").val("-");
  $("select[name=interStation2" + av + "]").selectpicker("refresh");
  $("select[name=interStation1" + av + "]").val("-");
  $("select[name=interStation3" + av + "]").selectpicker("refresh");
  $("select[name=interStation1" + av + "]").val("-");
  $("select[name=interStation4" + av + "]").selectpicker("refresh");

}

/**
 * Creates dropdown menus
 * @param {*} elements 
 * @param {*} selectType 
 */
function createDropdown(elements, id){
  $("#"+ id + ' option').remove();

  for(i=0; i < elements.length; i++){
    $("#" + id).append('<option value="' + elements[i] + '" id="' + id + i + '">' + elements[i] + '</option>');
  }
  
  // Set default value and refresh
  $('.selectpicker').selectpicker('refresh');
 
}

/**
 * Password function first page
 * @param {} input 
 */
function compare(input){
  var check = null;
  $.ajax({
   'async': false,
   'global': false,
   'url': "json/check.json",
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

/**
 * Enable play button when 'stop' is clicked
 */
function makePlayClickable(av){
  globalVar.playButtonClicked = false;
  document.getElementById("play_" + av).setAttribute("class", "btn btn-primary");
}

function makePlayNonClickable(av){
  globalVar.playButtonClicked = true;
  document.getElementById("play_" + av).setAttribute("class", "no-click-button btn btn-primary");
}

/**
 * Changes language when translator menu is clicked
 */
$(window).on("load", function(){
  if (document.getElementById('Translator')) {
    resetGlobalVariables('av0');
    startUp(globalVar.currentSentence, false, 'av0');
    resetGlobalVariables('av1');
    startUp(globalVar.currentSentence, false, 'av1');
    resetGlobalVariables('av2');
    startUp(globalVar.currentSentence, false, 'av2');
  }
} );
