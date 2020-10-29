//changes the source of the embedded video
function changeVideo(url) {
  // window.frames['videos'].location.replace(url);
  // // document.getElementById('videos').src = "https://www.youtube-nocookie.com/embed/f7xMGTE7D5w";
  // document.getElementById('test').innerHTML = document.getElementById('videos').src;
  var frame=document.getElementById("videoHolder");
  var clone=frame.cloneNode(true);
  clone.setAttribute('src',url);
  frame.parentNode.replaceChild(clone,frame);
}

//Stores suggestions returned by autocomplete
var autocompSugg = [];

// Defines the functions and variable necessary for autcomplete suggestions
$( function() {
  // Defines all the options for autocomplete suggestions
  var options = ["Goedemorgen","Goedemiddag","Goedenavond","Tot ziens","Tot morgen","Heeft U goed geslapen?","Welterusten","Eet smakelijk","Ik kom op een later moment terug.","Ik moet even weg.","Sorry, ik heb geen tijd.","Ik moet naar de WC.", "Moet U naar de WC?", "Kan ik U helpen?", "Ik ga u wassen.", "Ik ga u helpen met douchen.","U moet in de douche op de stoel zitten.", "Wilt U videobellen?", "Zal ik u helpen videobellen?", "Dit is de alarmknop, als u hier op drukt komt er iemand naar u toe.", "Wilt u een TV met teletekst zodat u de ondertiteling aan kunt zetten?", "Wat wilt u eten?", "Wat wilt u eten, kunt u het aanwijzen op de kaart?", "Wat wilt u drinken?", "Wat wilt u drinken, kunt u het aanwijzen op de kaart?", "Heeft u het koud?", "Heeft u het warm?", "Het bed gaat nu omhoog", "Het bed gaat nu omlaag", "Wie komt u ophalen?", "Ik help u", "Wij helpen u", "Bent u ergens allergisch voor?", "Waar bent u allergisch voor?", "Gebruikt u medicijnen?", "Welke medicijnen gebruikt u?", "Kunt u iemand (thuis) een foto laten maken van de medicijnen die u gebruikt?", "Rookt u?", "Bent u wel eens eerder in het ziekenhuis geweest?", "In welk ziekenhuis bent u geweest en met welke reden?", "Wanneer bent u naar het ziekenhuis geweest?", "Zijn er mensen in uw omgeving ziek?", "Welke apotheek komt u?", "Wat is uw geboortedatum?", "Wie is uw huisarts?", "Heeft u nog speciale dieetwensen? Zoals vegetarisch of veganistisch?", "Heeft u gehoorapparaten of een CI?", "Communicatie zonder tolk?", "Electrisch dossier", "Hoe gaat het met u?", "Hoe voelt u zich?", "Bent u verdrietig?", "Bent u boos?", "Ik vind het naar dat u boos bent", "Kunt u vertellen waarom u verdrietig bent?", "Kan ik iets voor u doen?", "Bent u ergens ongerust over? Zo ja, wat?", "Waar bent u ongerust over?", "Waar maakt u zich zorgen over?", "Bent u ergens bang voor?", "Ik en mijn collega's gaan zo goed mogelijk voor u zorgen.", "U mag alles vragen.", "Nog even volhouden, het wordt beter.", "Het komt goed.", "Het gaat langzaam, maar komt goed.", "Bent u duizelig?", "Bent u misselijk?", "Bent u moe?", "Afgelopen 24 uur klachten", "Huisgenoot klachten koorts/benauwdheid", "Afgelopen 7 dagen coronatest", "Huisgenoot klachten coronavirus", "Quarantaine", "Heeft u begrepen wat ik vertel?", "Heeft u begrepen wat er gaat gebeuren?", "Kunt u in eigen woorden vertellen wat we net besproken hebben?", "Kunt u vertellen waarom u dit wel wilt?", "Kunt u vertellen waarom u dit niet wilt?", "Wilt u meer informatie?", "Wilt u met iemand, een vriend of familie, videobellen om samen te overleggen?", "Is er iemand, een vriend of familie, waarvan u graag wilt dat ik die bel? Wat er aan de hand is", "Is er iemand, een vriend of familie, waarvan u graag wilt dat ik die bel? Om te vertellen hoe het gaat?", "Is er iemand, een vriend of familie, waarvan u graag wilt dat ik die bel? Om uit te leggen wat er gaat gebeuren?", "Heeft u een voorkeur tolk?", "Mag ik uw huisarts bellen? Zodat hij/zij meer medische informatie over u kunt vertellen", "Ik ga u een infuus geven.", "De arts gaat u een nieuw infuus geven.", "De verpleegkundige gaat u een nieuw infuus geven", "Een laborant komt bloedprikken", "Een co-assisent komt bloedprikken", "Een collega komt bloedprikken", "Sorry, het lukt mij niet het infuus te prikken.", "De bloeduitslagen zijn goed.", "De bloeduitslagen zijn niet helemaal goed", "De bloeduitslagen zijn niet goed.", "De uitslag van de CT scan is goed.", "De uitslag van de CT scan is niet helemaal goed.", "De rontgenfoto is verbeterd.", "De rontgenfoto is hetzelfde gebleven.", "De rontgenfoto is verslechterd.", "De COVID-19 test is negatief, dit betekent dat u waarschijnlijk geen Corona heeft.", "Soms heeft de test het fout dus we gaan nog meer onderzoek doen.", "De COVID-19 test is positief, dit betekent dat u wel Corona heeft.", "We gaan in het bloed testen of u antistoffen tegen Corona heeft, als u antistoffen heeft betekent dit dat u nu Corona heeft of dat u dit heeft gehad in het verleden.", "De Coronatest in het bloef is negatief, u heeft geen antistoffen tegen Corona.", "De Coronatest in het bloed is positief: u heeft wel antistoffen tegen Corona.", "Met dit recept kunt u medicijnen ophalen bij de apotheek.", "Met dit recept kan iemand anders medicijnen voor u ophalen bij de apotheek."];

  // Defines the filter that searches the list of options for matches
  function customFilter(array, terms) {
    arrayOfTerms = terms.split(" ");
    punctuation = ["?",",",".",";",":","/"];
    arrayOfTerms.forEach(function (term) {
      if (punctuation.includes(term)) {
        var matcher = new RegExp("\\" + term, "i");
      }
      else{
        var matcher = new RegExp("\\b" + term, "i");
      }
      array = $.grep(array, function (value) {
       return matcher.test(value.label || value.value || value);
      });
    });
    return array;
  }

  // Activates the jquery autocomplete function when the user gives input
  $( "#mySiGML" ).autocomplete({
    // source: options,
    appendTo: "#autocomp",
    multiple: true,
    mustMatch: false,
    source: function (request, response) {
      autocompSugg = customFilter(options, request.term);
      console.log(autocompSugg);
      response(autocompSugg);
    },
  });

  //Forces the width of the autcomplete menu to fit the input field's width
  jQuery.ui.autocomplete.prototype._resizeMenu = function () {
  var ul = this.menu.element;
  ul.outerWidth(this.element.outerWidth());
  }
});



// Stores the json dictionary of SiGML translations as a variable
var json = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "sentencesDictNL.json",
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });
  return json;
})();

// Stores the json dictionary of links to video translations as a variable
var jsonvideo = (function() {
  var jsonvideo = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "videoDict.json",
    'dataType': "json",
    'success': function(data) {
      jsonvideo = data;
    }
  });
  return jsonvideo;
})();

// Checks the dictionary for an entry that matches 'text' and sends the SiGML code to the avatar
function toSiGML(text){
  if(autocompSugg.includes(text) == false){
    alert("Please choose an option from the autocomplete suggestions.")
  }
  else {
    // if avatar is checked, sigml is sent
    if (document.getElementById("avatarDisplay").checked) {
      entry = json[text];
      if (entry == undefined) {
        alert("There is currently no pre-processed translation available. You can send the sentence you were trying to translate to us via the suggestions box on this page.")
      }
      else{
        playText(entry);
      }
    }
    // if video is checked, source of embedded video changes
    else if (document.getElementById("videoDisplay").checked) {
      entry = jsonvideo[text];
      if (entry == undefined) {
        alert("There is currently no pre-processed translation available. Please send the sentence you were trying to translate to us via the suggestions box on this page and/or try out the on-demand avatar translation option.")
      }
      else{
      changeVideo(entry);
      }
    }
  }
}


//Adapts the page to the chosen option
function changeFunc(myRadio) {
  if (myRadio.value == "avatar") {
    document.getElementById("avatar").setAttribute("class", "CWASAAvatar av0");
    document.getElementById("videos").setAttribute("class", "undisplayed");
    document.getElementById("play").setAttribute("class", "btn btn-primary displayed");
    document.getElementById("speedAdj").setAttribute("class", "CWASASpeed av0");
    document.getElementById("outputGloss").setAttribute("class", "txtGloss av0");
    document.getElementById("glossLabel").style.display = 'inline-block';
    document.getElementById("speedLabel").style.display = 'inline-block';
  }
  else if (myRadio.value == "video") {
    document.getElementById("avatar").setAttribute("class", "undisplayed");
    document.getElementById("videos").setAttribute("class", "prerecorded");
    document.getElementById("play").setAttribute("class", "btn btn-primary displayed");
    document.getElementById("speedAdj").setAttribute("class", "undisplayed");
    document.getElementById("outputGloss").setAttribute("class", "undisplayed");
    document.getElementById("glossLabel").style.display = 'none';
    document.getElementById("speedLabel").style.display = 'none';
  }
}

//Enables all tooltips in the document
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});


//Stores suggestions
function addSuggestion(text){
  showBusyState();
  $.ajax({
    url : '../suggestions.php',
    type : 'POST',
    data: {"input": text},
    dataType: "json",
    success : onSuccess,
    error : onError,
  });
  function onSuccess(result) {
    showBusyState(false);
  }
  function onError(xhr, error) {
    console.log ('Something went wrong. Error message: '+error);
    showBusyState(false);
  }
  function showBusyState(state) {
    $(document.body).toggleClass('busy', state===undefined?true:state);
  }
}