
function startPose() {
  playText("<?xml version='1.0' encoding='UTF-8'?><sigml><hamgestural_sign gloss='STANDARD_POSE'><sign_manual both_hands='true' lr_symm='true'><handconfig extfidir='dl' /> <handconfig palmor='l' /><handconfig handshape='fist' thumbpos='across' /><location_bodyarm contact='touch' location='belowstomach' side='right_beside'><location_hand digits='1' /></location_bodyarm></sign_manual><sign_nonmanual></sign_nonmanual></hamgestural_sign></sigml>");
}
 
// var jsonData;
// var jsonKeys;

// function callBack(json){
//   jsonData = json;
//   jsonKeys = Object.keys(jsonData);
// }


  // $.getJSON(globalVar.urlName, function(json) {
  //   callBack(json);
  // });
  
  
  /**
   * // Checks the dictionary for an entry that matches 'text' and sends the SiGML code to the avatar
   * @param {*} text 
   * @param {*} alert 
   */
  function toSiGML(text, alert="alertMainTran"){
    console.log("input: " + text);
      if (text.includes(globalVar.trainType) || text.includes(globalVar.platformNr) || text.includes(globalVar.departTime) || text.includes(globalVar.waitTime) 
        || text.includes(globalVar.endStation)){
          if(globalVar.lang=="Nederlands"){
            alertMessage("info", "Vul eerst alle variabelen in.", alert);
          } else {
            alertMessage("info", "Please fill in the variables.", alert);
          }
      } else{
        // Checks regular sentences dict for translation
        entry = document.querySelector('button[data-id="sentenceOptions"]').title;
        
        if (entry == undefined) {
          if(globalVar.lang=="Nederlands"){
            alertMessage("info", "Er is momenteel geen vertaling beschikbaar voor deze zin.", alert);
          } else {
            alertMessage("info", "There is currently no translation available for this sentence.", alert);
          }
        } else {
          $.getJSON(globalVar.urlName, function(json) {
            sigml = json[entry];
            // Send sigml to avatar
            playURL(sigml);
            document.getElementById("replayButton").setAttribute("name", sigml);
            document.getElementById("replayButton").style.display = 'inline-block';
            document.getElementById("play").setAttribute("class", "btn btn-primary no-click-button");
          });
        }
    }
  }
  