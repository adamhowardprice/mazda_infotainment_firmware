/*
Copyright 2012 by Johnson Controls
__________________________________________________________________________

Filename: vsmApp.js
__________________________________________________________________________

Project: JCI-IHU
Language: EN
Author: Jinesh
Date: 08-04-2015
__________________________________________________________________________

Description: IHU GUI vsm application

Revisions:
v0.1 (08-04-2015)  Initial development
v0.2 (08-05-2015)  Updated .css file and vsmCtrl.js file(SC0329)
v0.3 (30-07-2015)  Updated .css file and vsmCtrl.js file(SC0375)
v0.4 (31-07-2015)  Removing dead code / SC0375 - (CI-1628) GUI - Vehicle Status Monitor layer changed (master)(SW00168709)

__________________________________________________________________________

*/

log.addSrcFile("vsmApp.js", "vsm");
log.setLogLevel("vsm", "debug");

function vsmApp(uiaId)
{
	log.info("Constructor called.");
	// Base application functionality is provided in a common location via this call to baseApp.init().
	// See framework.js/BaseApp.js for details.
	baseApp.init(this, uiaId);
}

/***********************************************************/
/* App Init is a standard function called by the framework */
/***********************************************************/

/*
* Called just after the app is instantiated by framework.
* All variables local to this app should be declared in this function
*/
vsmApp.prototype.appInit = function()
{
	if (framework.debugMode) 
	{
		utility.loadScript("apps/vsm/test/vsmAppTest.js");
	}


	var readyCbFuelConsumption                = this._fuelConsumptionReady.bind(this);            

	this._barValue = "NotReady"; //Cache variable used to get msgdata get from the signal and "NotReady" is set as default value
	this._cachedSpeed = null;//Cache variable used to get speed restriction value from framework
	// Context table
	//@formatter:off
	/*******************Contexts data Lists *******************/
	//Data list of Vehicle Status Monitor

	this._contextTable = {

		"EngineOilLevel" :
		{
			"leftBtnStyle"          : "goBack",
			"sbNameId"              : "system.EngineOilLevel",
			"template"              : "vsmTmplt",
			"templatePath"          : "apps/vsm/templates/vsm",
			"controlProperties" :
			{
				"vsmCtrl" : 
				{

				}
			}, // end of list of controlProperties
			"readyFunction"             : readyCbFuelConsumption,
			"noLongerDisplayedFunction" : this._preparingNoLongerDisplayed.bind(this)
		}, // end of "EngineOilLevel"


	}; // end of this.contextTable object
	
	//Message Table
	this._messageTable = 
	{
		"Global.AtSpeed"                      : this._AtSpeedMsgHandler.bind(this),
		"Global.NoSpeed"                      : this._AtSpeedMsgHandler.bind(this),     
		"FluidlevelGauge"					  : this._fluidlevelgauge.bind(this),
	};

};

/*****************/
/* App Functions */
/*****************/


vsmApp.prototype._fuelConsumptionReady = function(msg)
{
	log.info("_fuelConsumptionReady() called...");
	if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "EngineOilLevel")
	{
		this._updateCurrentData(); //call update function to modify bar format as per the latest value
	}

};


vsmApp.prototype._preparingNoLongerDisplayed = function(msg)
				{
	log.info("_fuelConsumptionReady() called...");
};



// fluidlevelgauge Message handler
vsmApp.prototype._fluidlevelgauge = function(msg)
{
	log.info("_fluidlevelgauge() message handler is called...");
	if(msg && msg.params && msg.params.payload && msg.params.payload.Level)
	{
		this._barValue = msg.params.payload.Level; //get latest value of oil condition
		this._updateCurrentData();//call update function to modify bar format as per the latest value
	}
	
};



vsmApp.prototype._AtSpeedMsgHandler = function()
{
	log.info("_AtSpeedMsgHandler() called...");
	if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "VehicleStatusMonitor")
	{	
		this._updateCurrentData();
	}

};

/*************************  Handlers for FuelConsumption Starts ************************************/
/***************************************************************************************************/


vsmApp.prototype._updateCurrentData  = function()
{
	log.info("_updateCurrentData() called");
	log.info("Update function to modify bar format as per the latest value");
	if (this._currentContext && this._currentContext.ctxtId)
	{    
		if (this._currentContext.ctxtId  === "EngineOilLevel")
		{
			log.info("this._currentContext.ctxtId :"+this._currentContext.ctxtId);
			if (this._currentContextTemplate && this._currentContextTemplate.vsmCtrl)
			{    
				this._currentContextTemplate.vsmCtrl._changeBarValue(this._barValue);             

				switch(this._barValue)
				{
					case "NotReady":
					this._currentContextTemplate.vsmCtrl.setText1Id("EngnOilLvl_Preparing"); 
					//this._currentContextTemplate.vsmCtrl.setText2Id(null);
					break;

					case "UnderMeasurement":
					this._currentContextTemplate.vsmCtrl.setText1Id("EngnOilLvl_Measuring"); 
					//this._currentContextTemplate.vsmCtrl.setText2Id(null);
					break;
					
					case "Normal_Level_quarter":
					case "Normal_Level_half":
					case "Normal_Level_3Quarters":
					case "Normal_Level_Full":
					this._currentContextTemplate.vsmCtrl.setText1Id("EngnOilLvl_Ok"); 
					//this._currentContextTemplate.vsmCtrl.setText2Id(null); 
					break;

					case "LowLevel":
					this._currentContextTemplate.vsmCtrl.setText1Id("EngnOilLvl_Low"); 
					//this._currentContextTemplate.vsmCtrl.setText2Id("AddOil"); 
					break;
					
					case "Over_High_Level_GE":
					this._currentContextTemplate.vsmCtrl.setText1Id("EngnOilLvl_High"); 
					//this._currentContextTemplate.vsmCtrl.setText2Id("VehicleCheckedByDealer"); 
					break;
					
					case "Over_High_Level_DE":
					case "Extreme_Low_Level":
					this._currentContextTemplate.vsmCtrl.setText1Id(null); 
					//this._currentContextTemplate.vsmCtrl.setText2Id(null); 
					break;

					case "Extreme_High_Level":
					this._currentContextTemplate.vsmCtrl.setText1Id("EngnOilLvl_tooHigh"); 
					//this._currentContextTemplate.vsmCtrl.setText2Id("ReplaceOil"); 
					break;
					
					case "GrayOut"://B-F
					this._currentContextTemplate.vsmCtrl.setText1Id(null); 
				//	this._currentContextTemplate.vsmCtrl.setText2Id(null); 
					break;
					
					case "systemMalfunction":
					this._currentContextTemplate.vsmCtrl.setText1Id("EngnOilLvl_SysMalf"); 
//					this._currentContextTemplate.vsmCtrl.setText2Id("VehicleCheckedByDealer"); 
					break;
					
					default:
					log.info("Invalid value...");
					break;
				}
			}
		}
	}
};

framework.registerAppLoaded("vsm", null, true);
