/*
 Copyright 2012 by Johnson Controls
 __________________________________________________________________________

 Filename: vsmCtrl.js
 __________________________________________________________________________

 Project: JCI-IHU
 Language: EN
 Author: apeter9
 Date: 1-08-2013
 __________________________________________________________________________

 Description: IHU GUI vsmCtrl)
  
 Revisions: 
 v0.1 (01-08-2013)  Initial implementation (to 0.3.05 spec) (apeter9)
 v0.2 (02-20-2013)  Changes in layout and bar images (atiwarc)
 v0.3 (03-14-2013)  Implementation of UMP Control panel (atiwarc)
 v0.4 (04-24-2013)  Spec Migration to 3.56 (UMP3 support and Spec changes)(atiwarc)
 v0.5 (05-15-2013)  Go back implementation (atiwarc)
__________________________________________________________________________

 */

log.addSrcFile("vsmCtrl.js", "common");
// Alternative logging for development (avoid spew from "common")
//log.addSrcFile("vsmCtrl.js", "vsmCtrl");
//log.setLogLevel("vsmCtrl", "debug");

function vsmCtrl(uiaId, parentDiv, controlId, properties)
{    
//    log.debug("vsmCtrl constructor called...");

    this.uiaId = uiaId;
    this.parentDiv = parentDiv;
    this.controlId = controlId;
    this.divElt = null;
    /* this._switchViewButtonCtrl = null;
    this._umpPanelStatus = false; 
    this._cumulativeBarValue = null;
    
    this._initialEVMode = new Array();*/
    this._cumulativeBarValue = "NotReady";
    
    this.contextiStop = null;
    /**************************************End ofInitialization of functions********************************************/
    

    //@formatter:off
    this.properties =
    {
        "subMap"                    : null,
        "mode"                      : "",
        "fuelEfficientyTitleId"     : "",
        "fuelEfficientyTitleText"   : "",
        "switchViewLabelId"         : "",
        "switchViewLabelText"       : "",
        "switchViewButtonCallback"  : null,
        "fuelEfficiencyData"        : null,
        //"currentFuelConfig"         : null,
        "cumulativeFuelConfig"      : null,
        "umpButtonConfig" 		   :  null,
        "defaultSelectCallback"    : null,
        "defaultSlideCallback" 	   : null,
        "defaultHoldStartCallback" : null,
        "defaultHoldStopCallback"  : null,
        "dataList" 				   : null,
        "umpStyle" 				   : null,
        "hasScrubber" 			   : false,
        "umpPanelStatus"		   : false
    };
    //@formatter:on

    // Copy properties from the app
    for (var key in properties)
    {
        this.properties[key] = properties[key];
    }

	//preload images 
    this.imagesCount = 0;
	this._preload('Maintenance_EngineOilLevel_J78A_Blue.png','Maintenance_EngineOilLevel_J78A_Umber.png','Maintenance_Oil_J78A.png', 'OilLevelBar_Blue.png', 'OilLevelBar_Umber.png', 'OilLevelBarCap.png','OilLevelGraph_BG.png','ChromeArcRight.png');
	
    // Create DOM elements
    this._createStructure();
}

/*******************/
/* Private Methods */
/*******************/

vsmCtrl.prototype._init = function()
{
	
	this._changeBarValue(this._cumulativeBarValue);
}

vsmCtrl.prototype._next = function(count)
{
	this.imagesCount++;
	if(this.imagesCount >= count)
	{
		this.divElt.className = "vsmCtrl";
	}
}

vsmCtrl.prototype._preload = function()
{
	var images = new Array();
	var prefix = './apps/vsm/controls/vsm/images/';
	for(var i = 0; i < this._preload.arguments.length; i++)
	{
		images[i] = new Image();
		images[i].src = prefix + this._preload.arguments[i];
		images[i].onload = this._next.bind(this, this._preload.arguments.length);
	}
}

vsmCtrl.prototype._createStructure = function()
{
//    log.debug("vsmCtrl: _createStructure() called...");
	
    // Create the div for control
    this.divElt = document.createElement('div');
    this.divElt.className = "vsmCtrl FuelConsumptionCtrlHiddenOpacity";
	this.parentDiv.appendChild(this.divElt);
	this.vsm = document.createElement('div');
    this.vsm.className = "vsmCtrl CarGraphic";
	this.oilLevelGraph = document.createElement('div');
    this.oilLevelGraph.className = "oilLevelGraph";
	
	/* this.MaxText = document.createElement('div');
    this.MaxText.className = "MaxText";
	this.MaxText.innerHTML = this._translateToStr("max");
	
	this.parentDiv.appendChild(this.MaxText);
	
	this.MinText = document.createElement('div');
    this.MinText.className = "MinText";
	this.MinText.innerHTML = this._translateToStr("min");
	 */
	//max box and string max
	this.Maxbox = document.createElement('div');	
	this.Maxbox.className = 'EngineOilLevel_Style01_TextBox04';
	
	this.MaxText = document.createElement('div');	
	this.MaxText.className = 'MaxText';
	this.MaxText.innerHTML = this._translateToStr("EngnOilLvl_Max");
	
	this.Maxbox.appendChild(this.MaxText);
	this.parentDiv.appendChild(this.Maxbox);
		
	//min box and string min
	this.Minbox = document.createElement('div');	
	this.Minbox.className = 'EngineOilLevel_Style01_TextBox05';
	
	this.MinText = document.createElement('div');	
	this.MinText.className = 'MinText';
	this.MinText.innerHTML = this._translateToStr("EngnOilLvl_Min");
	
	this.Minbox.appendChild(this.MinText);
	this.parentDiv.appendChild(this.Minbox);
	
	
	
	this.barVariation = document.createElement('div');	
	this.barVariation.className='barVariation';
    this.barVariation.style.zIndex = '10';
  
	 this.parentDiv.appendChild(this.barVariation);
	this.barDiv = document.createElement('div');	
	this.barDiv.className='barDiv';
	this.barDiv.style.zIndex = '10';
    this.barVariation.appendChild(this.barDiv);
	
    this.capOverBar = document.createElement('div');
    this.capOverBar.className = "capOverBar";
	this.parentDiv.appendChild(this.capOverBar);
	


	//textbox1 and inside textline1
	this.text1box = document.createElement('div');	
	this.text1box.className = 'EngineOilLevel_Style01_TextBox01';
	
	this.text1 = document.createElement('div');	
	this.text1.className = 'textline1';
	
	
	this.text1box.appendChild(this.text1);
	this.parentDiv.appendChild(this.text1box);
	
	//textbox2 and inside textline2
	this.text2box = document.createElement('div');	
	this.text2box.className = 'EngineOilLevel_Style01_TextBox02';
	
	this.text2 = document.createElement('div');	
	this.text2.className = 'textline2';
	
	
	this.text2box.appendChild(this.text2);
	this.parentDiv.appendChild(this.text2box);
	//unused textbox3
	this.text3box = document.createElement('div');	
	this.text3box.className = 'EngineOilLevel_Style01_TextBox03';
	this.parentDiv.appendChild(this.text3box);
	
	this.parentDiv.appendChild(this.oilLevelGraph);
	// Create the div for ump panel	
	this.parentDiv.appendChild(this.vsm);
  
    this._init();
}


/****************************************/
/* Translation & text utility functions */
/****************************************/

/*
 * Utility function to look up a translatable string ID and/or accept a default text string.
 */

 
vsmCtrl.prototype._changeBarValue = function(height)
{

	this._cumulativeBarValue = height;
	switch(this._cumulativeBarValue)
	{
		case "NotReady":
		case "UnderMeasurement":
			this.barVariation.style.visibility = "hidden";
			this.capOverBar.style.visibility =  "hidden";
			this.vsm.className = "vsmCtrl CarGraphic2";
			this.parentDiv.appendChild(this.vsm);
			break;
		case "LowLevel":
			this.barVariation.className='barVariation1';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '319px' ;
			this.barVariation.style.top = '322px';
			this.barVariation.style.height = '46px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic1";
			this.parentDiv.appendChild(this.vsm);
			break;
		case "Normal_Level_quarter":
			this.barVariation.className='barVariation';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '296px' ;
			this.barVariation.style.top = '299px';
			this.barVariation.style.height = '69px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic";
			this.parentDiv.appendChild(this.vsm);
			break;
		case "Normal_Level_half":
			this.barVariation.className='barVariation';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '272px';
			this.barVariation.style.top = '275px';
			this.barVariation.style.height = '94px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic";
			this.parentDiv.appendChild(this.vsm);
			
			/* this.barVariation.className='barVariation';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '272px' ;
			this.barVariation.style.top = '273px';
			this.barVariation.style.height = '95px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic";
			this.parentDiv.appendChild(this.vsm); */
			break;
		case "Normal_Level_3Quarters":
			this.barVariation.className='barVariation';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '248px' ;
			this.barVariation.style.top = '251px';
			this.barVariation.style.height = '117px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic";
			this.parentDiv.appendChild(this.vsm);
			break;
		case "Normal_Level_Full":
			this.barVariation.className='barVariation';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '225px' ;
			this.barVariation.style.top = '227px';
			this.barVariation.style.height = '141px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic";
			this.parentDiv.appendChild(this.vsm);
			break;
		case "Over_High_Level_GE":
		case "Over_High_Level_DE":
			this.barVariation.className='barVariation1';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '201px' ;
			this.barVariation.style.top = '204px';
			this.barVariation.style.height = '164px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic1";
			this.parentDiv.appendChild(this.vsm);
			break;
		case "Extreme_Low_Level":
			this.barVariation.className='barVariation1';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '343px' ;
			this.barVariation.style.top = '346px';
			this.barVariation.style.height = '22px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic1";
			this.parentDiv.appendChild(this.vsm);
			break;
		case "Extreme_High_Level":
			this.barVariation.className='barVariation1';
			this.barVariation.style.visibility = "visible";
			this.capOverBar.style.visibility =  "visible";
			this.capOverBar.style.top =  '177px' ;
			this.barVariation.style.top = '176px';
			this.barVariation.style.height = '197px';
			this.parentDiv.appendChild(this.barVariation);
			this.vsm.className = "vsmCtrl CarGraphic1";
			this.parentDiv.appendChild(this.vsm);
			break;
		case "GrayOut":
		case "systemMalfunction":
			this.barVariation.style.visibility = "hidden";
			this.capOverBar.style.visibility =  "hidden";
			this.vsm.className = "vsmCtrl CarGraphic2";
			this.parentDiv.appendChild(this.vsm);
			break;
		default:
			break;
	}
	
	/* this.barVariation.style.opacity = "1"; */
	this.MaxText.style.color = "white";
	this.MinText.style.color = "white";

};

/**
 * =========================
 * MULTICONTROLLER
 * =========================
 * Main multicontroller handler
 * TAG: multicontroller-only, public
 * =========================
 * @param {string} - multicontroller event
 * @return {string} - event consumed
 */
vsmCtrl.prototype.handleControllerEvent = function(eventID)
{
    log.debug('CompassCtrl: handleController() called, eventID: ' + eventID);
    retValue = 'giveFocusLeft';
    return retValue;
};

vsmCtrl.prototype._greyout = function()
{
	log.debug('CompassCtrl: _greyout() called');
	this.oilLevelGraph.style.background = '../images/OilLevelBar_Umber.png';
	this.xAxisTop2.style.background = "#888";
	this.xAxisTop1.style.background = "#888";
	this.xAxisDown2.style.background = "#888";
	this.xAxisDown1.style.background = "#888";
	this.MaxText.style.color = "#888";
	this.MinText.style.color = "#888";
	
	this.barDiv.style.opacity = "0";
};

vsmCtrl.prototype.setText1Id = function(str)
{
	log.debug('CompassCtrl: setText1Id() called');
	this.text1.innerHTML =  this._translateToStr(str);

};

vsmCtrl.prototype.setText2Id = function(str)
{
	log.debug('CompassCtrl: setText2Id() called');
	this.text2.innerHTML =  this._translateToStr(str);

};
vsmCtrl.prototype._stringToHTML = function(textStr)
{
//    log.info("_stringToHTML called: textStr = " + textStr);

    var htmlText;

   if (textStr)
    {
        htmlText = textStr + "<br/>";
    }
    else
    {
        htmlText = "";
    }

    return htmlText;
};

vsmCtrl.prototype._translateToStr = function(strId){
	var str = "" ;
	if(strId !== null){
		str = framework.localize.getLocStr(this.uiaId, strId);
	}
	else{		
	}
	return str ;
};

vsmCtrl.prototype._translateString = function(strId, strText, subMap)
{
//    log.debug("_translateString called: strId = " + strId + ", strText = " + strText);

    var translatedText = null;

    if (strId)
    {
        translatedText = framework.localize.getLocStr(this.uiaId, strId, subMap);
    }
    else if (strText)
    {
        translatedText = strText;
    }

    return translatedText;
}

/*
 * Utility function to make a text string suitable for HTML block-rendering
 */
 
vsmCtrl.prototype.cleanUp = function()
{
	log.debug("cleanUp is called");
    // Clean up any capacitor level low-pass animation timer that may be running
	this.divElt.removeEventListener(this._USER_EVENT_START, this.touchHandler, false);
    document.removeEventListener(this._USER_EVENT_MOVE, this.touchHandler, false);
    document.removeEventListener(this._USER_EVENT_END, this.touchHandler, false);
    document.removeEventListener(this._USER_EVENT_OUT, this.touchHandler, false);	
}
 
vsmCtrl.prototype._stringToHTML = function(textStr)
{
//    log.debug("_stringToHTML called: textStr = " + textStr);

    var htmlText;

    if (textStr)
    {
        htmlText = textStr + "<br/>";
    }
    else
    {
        htmlText = "";
    }

    return htmlText;
}

framework.registerCtrlLoaded("vsmCtrl");
