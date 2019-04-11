
/*
 Copyright 2012 by Johnson Controls
 __________________________________________________________________________

 Filename: vehsettingsApp.js
 __________________________________________________________________________

 Project: JCI-IHU
 Language: EN
 Author: apopoval
 Date: 02.10.2012
 __________________________________________________________________________

 Description:   IHU GUI vehsettings App

 Revisions:
 v0.1 (02-Oct-2012) vehsettingsApp created for initial testing of active panel content (HUD Tab only)  
 v0.2 (08-Oct-2012) Added message handlers according to the latest json file (HUD Tab only)  
 v0.3 (15-Oct-2012) tabsConfig appData and style changed (preview image), Range and increment of sliders is set 
 v0.4 (17-Oct-2012) HudTab renamed to HUDTab, empty tabs removed from tabctrl, removed slideCallback from sliders
 v0.5 (18-Oct-2012) +VehicleSettingsTab
 v0.6 (19-Oct-2012) disable/enable controls on atSpeed msg and depending on other control's value, Sound and Volume tabs added
 v0.7 (23-Oct-2012) Tabs appdata changed
 v0.8 (24-Oct-2012) MIDisplay renamed to MultiInfoDisplay
 v0.9 (29-Oct-2012) Removed slideEndCallback
 v1.1 (31-Oct-2012) Added HudInstalled message handling, added missing contexts
 v1.2 (01-Nov-2012) Added inSpeed message handling, added missing contexts
 v1.3 (02-Nov-2012) AutoDoorLockRelockTime renamed to AutoRelockTimer, inSpeed updated
 v1.4 (05-Nov-2012) Added {vehicleSetting}_Installed message handlers
 v1.5 (09-Nov-2012) Added many missing message handlers
 v1.6 (13-Nov-2012) Added BSM_Volume, RVM_Volume, localization, inSpeed replaced with AtSpeed and NoSpeed
 v1.7 (19-Nov-2012) Added LDWS reset and LDWSmode
 v1.8 (20-Nov-2012) _tabsConfig changedvv 
 v1.9 (26-Nov-2012) Added range labels to Position and Intensity sliders
 v2.0 (27-Nov-2012) KeyboardCtrl changes, added status bar text indicating where you are, switched from "Global.SelectSettingsTab" to "Global.IntentSettingsTab"
 v2.1 (29-Nov-2012) Added RSSSensitivity slider ranges
 v2.2 (06-Dec-2012) Added dynamic showing/hiding Buzzer settings in LDWS ctxt
 v2.3 (07-Dec-2012) Using LaneDepartureWarningSystem RVMBuzzerVolume and BSMBuzzerVolume textIDs
 v2.4 (11-Dec-2012) Removed MultiInfoDisplay from VehicleSettingsTab due to 3.8 UI specs
 v2.5 (02-Jan-2013) Changed text labels for DRSS and SBS
 v2.6 (08-Jan-2013) Started implementing UI Specs v3.55
 v2.7 (09-Jan-2013) HUDtab implemented according UI Specs v3.55
 v2.7 (10-Jan-2013) VehicleSettingsTab implemented according UI Specs v3.55
 v2.8 (12-Jan-2013) Contexts and messages updated
 v2.9 (14-Jan-2013) UI Specs v3.55 updates
 v3.0 (15-Jan-2013) UI v3.55 stabilzed
 v3.1 (17-Jan-2013) Removed HUD Tilt control placeholder to match the new UI specs, DoorLockMode label on/off bugfix, Slider ranges updated, reset dialogs send global events
 v3.2 (18-Jan-2013) Removed obselete contexts and functions
 v3.3 (24-Jan-2013) SafetyTab issue fixed by setting all msg payload names to "evData"
 v3.4 (24-Jan-2013) SetAutoWiper renamed to SetRainSensingWiper, SetDRSSWarningSensitivity renamed to SetDRSSDistance, Added Set and GetDaytimeRunningLights, Golighting fixed
 v3.5 (25-Jan-2013) Message names matched to MMUI, removed obselete contexts and messages
 v3.6 (02-Feb-2013) Added off option in Keyless lock beep volume
 v3.7 (02-Feb-2013) Add SBSSCBS
 v3.8 (04-Feb-2013) Corrected "SetLDWSSound" to "SetBuzzerSetting".
 v3.9 (04-Feb-2013) Disable Vehicle Settings when ignition is off.
 v4.0 (04-Feb-2013) Added support for AutoTransmission in Door Lock Mode.
 v4.1 (05-Feb-2013) Added dynamic list handling in Lighting Context.
 v4.2 (11-Feb-2013) Added event id when brightness is auto mode
 v4.3 (11-Feb-2013) Added support for dynamic list in Turn & Safety Tab
 v4.3.1 (22-Feb-2013) LDWS Timing & Warning setting values corrected as per PFS(SW00108927)
 v4.3.2 (22-Feb-2013) Handled scenarios when both SBS & SCBS are installed
 v4.4 (25-Feb-2013) Handled Reset screens
 v4.5 (25-Feb-2013) Vehicle speed handling
 v4.6 (26-Feb-2013) Corrected message ids for HUD tab, added handler for calibration
 v4.7 (05-Mar-2013) Grey out settings based on public can bus unless ignition is on for 2 second
 v4.8 (06-Mar-2013) At speed handling
 v4.9 (07-Mar-2013) Correcting HUD tab message Id ans HUD Open/close behavior
 v5.0 (08-Mar-2013) Corrected handling of getAdjustedValueforDataListSafetyTab & 
                    getAdjustedValueforDataListLighting for boundary check
 v5.1 (08-Mar-2013) corrected slider style for brighness, height & calibration of HUD Tab
 v5.2 (20-Mar-2013) corrected handling of menu removable settings
 v5.3 (20-Mar-2013) Handling of HUD control available message
 v5.4 (20-Mar-2013) Handling initial values under radio button selection lists
 v5.5 (25-Mar-2013) Removed loading of deprecated controls causing GUI to crash.
 v5.6 (26-Mar-2013) Removal of reset option when all other setting entries have been removed for the context in focus.
 v5.7 (26-Mar-2013) Corrected to update the mode, warning distance & volume settings under SBS/SCBS settings.
 v5.8 (10-Apr-2013) Added support for Clock Tab
 v5.9 (16-Apr-2013) Added support for HUDInstalled shared data
 v6.0 (16-Apr-2013) Added support for CanStatus message shared data
 v6.1 (16-Apr-2013) Sending Ignition status to other GUI app
 v6.2 (17-Apr-2013) Support for speed restriction
_v7.0 (23-Apr-2013) Using string id's of common dictionary______________________________________________________________________________________
 v7.1 (24-Apr-2013) Updated atSpeed behaviour of the vehicle tab 
 v8.0 (9-May-2013) Updated HUD error message
 v8.1 (13-May-2013) Removal of HUD tab
 v8.2 (13-May-2013) Global Go back implementation.
 v9.1 (5-June-2013) Tabs group implementation
 v10.1(6-June-2013) Default options for the reset set to "No"
 v10.2(6-June-2013)sbNameId changed to settings inplace of Tooltip ICNUmpsettings
 v10.3(7-June-2013)voltage status message added for safety and vehicle tab enabling/disabling
 v10.4(7-June-2013)Door Lock Mode On/Off texts corrected
 v11.1(14-June-2013)HUD controlled allowed message's operation altered.
 v12.0(21-June-2013)Truncation issue fixed:small item text and new toggle behaviour added.
 v13.0(2-July-2013)Menuitemselectcallback's implementation changed as per the requirement of the latest common.
 v14.0(4-July-2013)Dialog3 implementation.
 v15.0(10-July-2013)Corrected loading meter in the Safety tab.
 v16.0(22-Aug-2013)removed speed restriction in HUD tab, warning speed is not supported in EU region for SBS & SBS/SCBS
 v16.1(27-Aug-2013)Corrected toggle behaviour
 v16.2(27-Aug-2013)Corrected toggle behaviour for LDWS
 v16.3(05-Sep-2013)Logic implemented in GUI to prevent two same messages from menu calls to the lower layer
 v16.4(24-Sep-2013)Corrected missing braces in getAdjustedValueForDataListDoorLock()
 v16.5(01-Oct-2013)Corrected label Ids under Door Locks for Unlock mode setting(SW00133928)
 v16.6(01-Oct-2013)Added checks in messagehandlers of installed messages to avoid menu flickering
 v16.7(07-Oct-2013)Initialized the default auto doorlock cache values to 0 and indentation corrections
 v16.8(27-June-2014) AutoDoorLock priority implementation ( AT6, AT5 and MT)
 v16.9(11-July-2014) Timing and Warning values corrected
 v17.0(11-July-2014) When 'Low' is clicked on LAS and LDWS screen for 'Vibration / Beep' value should go as 3 instead of 2
 v17.1(11-July-2014) Changes done for error 'Lane-KeepAssistSystem' string id not found in dictionary
 v17.2(6-Aug-2014) Changes done for Sensitivity string id in LAS screen depending on region and Intervention settings.
 v17.3(8-Aug-2014) On - Off display of Auto Door Lock Mode in Door Lock Settings corrected.
 v17.4(12-Aug-2014) Parking Sensor Indication added on Safety tab.
 v17.5(13-Aug-2014) LASEarly and LASLate strings used from dictionary for LAS screen.
 v17.6(27-Aug-2014) Switching Btw Sensitivity and Warning by Intervention Status in LAS.
 v17.7(10-Sep-2014) Speed restriction applied for CHLT screen
 v17.8(1-Nov-2014) Updated enabling of items for Ignition On while AtSpeed
*/


log.addSrcFile("vehsettingsApp.js", "vehsettings");

function vehsettingsApp(uiaId)
{   
    log.debug("Constructor called.");

    // Base application functionality is provided in a common location via this call to baseApp.init().
    // See framework/js/BaseApp.js for details.
    baseApp.init(this, uiaId);
}


/**************************
 * App Init is standard function called by framework *
 **************************/

/*
 * Called just after the app is instantiated by framework.
 * All variables local to this app should be declared in this function
 */
vehsettingsApp.prototype.appInit = function()
{
    log.debug("vehsettingsApp appInit  called...");
    
    if (framework.debugMode)
    {
        utility.loadScript("apps/vehsettings/test/vehsettingsAppTest.js");
    }
    /* 
     * NOTE:
     * Every time a function is bound (using bind()), a new
     * function is created in memory. Whenever possible,
     * only bind the same function once and use reference.
     */
    this.statusArraySafetyTab = new Array();
    this.statusArrayVehicleTab = new Array();
    this.statusArrayTurn = new Array();
    this.statusArrayDoorLock = new Array();
    this.statusArray = new Array();
    this.listItemClick = this._menuItemSelectCallback.bind(this);
    this.listItemSlide = this._menuItemSlideCallback.bind(this); 
    this.dialogBtnClick = this._dialogDefaultSelectCallback.bind(this);
    this.tabClick = this._tabClickCallback.bind(this);
    this.populateListCtrl = this._populateListCtrl.bind(this);
     
    // Safety Tab
    this._cachedDRSS_DRSS = "DRSS_Off";
    this._cachedDRSS_DRSSSensitivity = "DRSS_Distance_Short";
    this._cached_SBS_SCBS_BrakeSupport = "SBS_Off";
    this._cached_SBS_SCBS_Distance = "SBS_Distance_Short";
    this._cached_SBS_SCBS_BuzzerVolume = "SBS_Vol_No_Alarm";
    this._cached_SBS_SCBS_BrakeSupport = "SCBS_Off";
    this._cachedFOW_Warning = "FOW_Off";
    this._cachedFOW_Distance = "FOW_Distance_Short";
    this._cachedFOW_BuzzerVolume = "FOW_Vol_No_Alarm";
    this._cachedRVMBuzzerVolume = "RVM_Vol_No_Alarm";
    this._cachedBSMBuzzerVolume = "BSM_Vol_No_Alarm";
    this._cached_LAS_LDWSTiming = "LDWS_Timing_Online";
    this._cached_LAS_LDWS_Warning = "LDWS_Warning_Rare";
    this._cachedLDWSSound_Installed = 0;
    this._cached_LAS_LDWS_SoundSetting = "LDWS_Sound_Buzzer";
    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_High";
    this._cachedIntervention = "LAS_Intervention_Off";
    this._cachedLASAlert = "LAS_Alert_Off";
    this._cachedDA = "DA_Off";
    this._cachedPSI = "Off";
    this._cachedSpeedLimitCaution = "SLC_Sign";
    this._cachedGetSpeedUnit = framework.localize.getDistanceUnit();
    this._cachedSpeed1  = "SLCS_0";
    this._cachedSpeed2  = "SLCS_5";
    this._cachedSpeed3  = "SLCS_10";
    this._cachedSpeed   = this._cachedSpeed1;
    this._cached_SBS_SCBS_J36IPM = "SBS_Off";
    this._cached_SCBSDistance_J36IPM = "SCBSDistance_Short";
    this._cachedBSMSystem = "BSM_On";
    this._cachedBSMvolume = "BSM_Vol_No_Alarm";
    
    this._cachedCautionSpeed = this._cachedSpeed + framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
    this._cachedHUDVal = null;
    this._cachedCDVal = null;
    this._cachedSpeedLimitCheck = 0;
    this._specialSLIcheck = 0;
    
    this._distanceAlarm = 50;
	this._cachedTVMStatus = 0;
	this._cachedTVMAVSStatus = 1;
	this._cachedTVMVPLStatus = 1;
	this._cachedTVMFVDStatus = 2;
	
    //HUD Tab
    this._cachedHudOnOffStatus = null; 
    this._cachedHudTilt = null; 
    this._cachedHudAutoIntensityOnOff = null; 
    this._cachedHudIntensity = null; 
    this._cachedHudIntensityAuto = null;
    this._cachedHudCalibration = null;
    this._cachedRotationVal = null;
    this._cachedHudError = 0;
    this._cachedNaviVal = 1;
    
    this._cachedVehicleType = framework.getSharedData("syssettings","VehicleType");     
     
    this._latestValueHudNavigation = 2;
    this._latestValueAutoDoorLock = 3;
    this._latestValueAHBC = 1;
    this._latestValueCHLT = "CHL_120_SEC";
    this._latestValueLHL = "LHL_Off";
    this._latestValueLDWSTiming = 1;
    this._latestValueHudHeight = 0;
    this._latestValueHudDispInfo = null ;
    this._latestValueHudRotation = 0;
    this._latestValueHudBrightnessCalibration = 0;
    this._latestValueHudBrightness = 0;
    this._latestValueHudBrightnessControl = 1;
    this._cachedStreetInfoindex = "Street_On_Demand";
    this._cachedStreetLabel = "CHudNav_Maneuver";   
	this._cachedSDcardStatus = "Off";
	this._cachedCHudNavindex = "Navigation_Maneuver";
    this._cachedCHudNavLabel = "AdaptiveLaneStreetTurn";  
    this._HudFlagRegion = 0;
    
    //Vehicle Tab
    
    this._cachedSpeedalarm = "Off";
    // this._SpeedAlarmTime is used to keep track of If "SpeedAlarm" dataList is updated on basis of On/Off - RTC-6068
	this._SpeedAlarmTime = false;
    
    //Lighting
    this._cachedSafety_AutoWiper = "RSW_Off";
    this._cachedSafety_InterioLightTimeoutDoorOpen = "ILTDO_10_Min";
    this._cachedSafety_InterioLightTimeoutDoorClosed = "ILTDC_7_5_Sec";
    this._cachedHeadlight_HighBeamControll = "HBC_Off";
    this._cachedHeadlight_HeadlightOnWaring = "HOW_Off";
    this._cachedHeadlight_HeadlightOffTimer = "HOT_OFF";
    this._cachedHeadlight_AutoHeadlightsSensitivity = "AHS_Standard";
    this._cachedHeadlight_DaytimeLights = "DRL_Off";
    this._cachedAFS = "AFS_Off";    
    this._cachedILB = "ILB_Medium";
    this._cachedalarmTime = 100;
    //Door Locks
    this._cachedVehicle_AutoDoorLockInstalledAT = 0;
    this._cachedVehicle_AutoDoorLockInstalledAT6 = 0;
    this._cachedVehicle_AutoDoorLockInstalledMT = 0;
    this._cachedGet_AutoDoorLockAT6 = "AT6_Off";
    this._cachedGet_AutoDoorLockAT = "AT5_Off";
    this._cachedGet_AutoDoorLockMT = "MT_Off";
    this._cachedSafety_AutoDoorLockChimeVolume = "KBV_Off";
    this._cachedSafety_AutoRelockTimer = "Door_Relock_30_Sec"; 
    this._cachedKeyless_UnlockMode = "Unlock_DriverSeat";
    this._cachedKeyless_WalkAwayLock = "WalkAwayLock_Off";
    //Turn
    this._cachedSafety_3flashTurnSignal = "Three_Flash_Off";
    this._cachedSafety_TurnSignalIndicatorVolume = "Turn_Volume_Small";
 
    //INSTALLED
    this._cachedDRSS_Installed = null;
    this._cachedSBS_Installed = null;
    this._cachedSCBS_Installed = null;
    this._cachedLAS_Installed = null;
    this._cachedDA_Installed = null;
    this._cachedPSI_Installed = null;
    this._cachedFOW_Installed = null;
    this._cachedRVM_Installed = null;
    this._cachedBSM_Installed = null;
    this._cachedLDW_Installed = null;
    this._cachedHeadlight_Installed = null; 
    this._cachedSafety_Installed = null;
    this._cachedAutoWiper_Installed = null;
    this._cachedAutoDoorLock_Installed = null;
    this._cachedHeadOffTimer_Installed = null;
    this._cachedHeadlightAutoSensitivity_Installed = null;
    this._cachedThreeFlash_Installed = null;
    this._cachedTurnSignalVolume_Installed = null;
    this._cachedHBC_Installed = null;
    this._cachedAHBC_Installed = null;
    this._cachedHeadlightON_Installed = null;
    this._cachedAutoDoorRelock_Installed = null;
    this._cachedWalkAway_Installed = null;
    this._cachedAutoRelockTimer_Installed = null;
    this._cachedUnlockMode_Installed = null;
    this._cachedBuzzerAnswerback_Installed = null;
    this._cachedUnlockModeValue_Installed = null;
    this._cachedWalkAwayValue_Installed = null;
    this._cachedDoorReLockValue_Installed = null;
    this._cachedHeadLightOnValue_Installed = null;
    this._cachedHBCValue_Installed = null;
    this._cachedAHBCValue_Installed = null;
    this._cachedHeadAutoValue_Installed = null;
    this._cachedHeadOffTimerValue_Installed = null;
    this._cachedLightTimeoutDoorClosed_Installed = null;
    this._cachedDayTimeRunningLight_Installed = null;
    this._cachedLightTimeoutDoorOpen_Installed = null;
    this._InteriorLightiningBrightinessInstalled = null;
    this._SpeedAlarmInstalled = null;
    this._cachedNewBSM_Installed = null;
    
    this._currentValue = 1; //default will be 1 for Off
    
    // other cache 
    this._latestValueHudOpenClose = 2;
    this._indexSound = null;
    this._indexWarning = null;
    this._indexTiming = null;
    this._cachedListLength = null;
    this._isListChanged = false; 
    this._currentListItemIndex = null;
    this._ignitionStatus = 1;
    this._delayStatus = "disabled";
    this._CANStatus = true;    
	this._HudType = "Default";    
	this._TSRStatus = "Default";      
    this._HUDInstalledStatus = false;
    this._cachedvoltageStatus = 1;
    this._cachedHudControlAllowed = 1;
    //this._cachedSpeedAlarmInstalled = 0;
    //Vehicle
    this._autoWiperToggleIndex = 0;
    //slider tick and label
    var vehSettings_TM01 = {
            tickIncrement : 1,
            showCenterMark : true,
            showNumbers : false,
        };
        
    var vehSettings_LM01 = {
            leftLabelText : "-",
            centerLabelText : "0",
            rightLabelText : "+",
        };
    var vehSettings_TM03 = {
                tickIncrement : 1,
                showCenterMark : true,
                showNumbers : false,
        };
            
    var vehSettings_LM03 = {
                leftLabelText : "-",
                centerLabelText : "0",
                rightLabelText : "+",
        };
    var vehSettings_TM04 = {
            tickIncrement : 1,
            showCenterMark : true,
            showNumbers : false,
        };
        
    var vehSettings_LM04 = {
            leftLabelText : "-",
            centerLabelText : "0",
            rightLabelText : "+",
        };
    
    //When you want to add/remove item update here with index value, and use it whereever required across this files.
    this._SafetyTabIndex = {
                                        "DRSS" : 0,
                                        "SBS" : 1,
                                        "SBS/SCBS" : 2,
                                        "SCBS_J36IPM" : 3,
                                        "SBS_SCBS_J36IPM" :4,
                                        "SCBS" : 5,
                                        "FOW" : 6,
                                        "RVMBuzzerVolume" : 7,
                                        "BSMBuzzerVolume" : 8,
                                        "BSMSystem" : 9,
                                        "LaneDepartureWarning" : 10,
                                        "LAS" : 11,
                                        "SpeedLimitInformation" : 12,
                                        "DA" : 13,
                                        "ParkingSensor" : 14,
					"Camera360View" : 15,
                                    };
    
    //Speed Handling in HUD Tab
    this.cachedSpeed = null;
    //HUD TAB 
    this._HUDTabCtxtDataListBrightnessControlOn = {
        itemCountKnown : true,
        itemCount : 6,
        items: [ 
            { appData : 'SetHudHeight', text1Id : 'Height', hasCaret : false, itemStyle : 'style12', tickMarkObject:vehSettings_TM01, labelObject:vehSettings_LM01, showLabels:true, showTickMarks:true, value : 0, increment: 1, min:-13, max: 13 }, 
            { appData : 'SetHudBrightnessControl', text1Id : 'BrightnessControl', button1Id : "Auto", button2Id : "Manual", hasCaret : false, itemStyle : 'style10', value : 1},  
            { appData : 'SetHudBrightness', text1Id : 'Brightness', hasCaret : false, itemStyle : 'style12', tickMarkObject:vehSettings_TM03, labelObject:vehSettings_LM03, showLabels:true, showTickMarks:true, value : 0, increment: 1, min:-20, max: 20 }, 
            { appData : 'SetHudNavigation', text1Id : 'Navigation', hasCaret : false, itemStyle : 'styleOnOff', value : 2},
            { appData : 'SetHudOpenClose', text1Id : 'HeadsUpDisplay', hasCaret : false, itemStyle : 'styleOnOff', value : 2},
            { appData : 'GoHUDReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},  
        ]
    };
    this._HUDTabCtxtDataListBrightnessControlOff = {
        itemCountKnown : true,
        itemCount : 6,
        items: [ 
            { appData : 'SetHudBrightness', text1Id : 'Brightness', hasCaret : false, itemStyle : 'style12', tickMarkObject : vehSettings_TM03, labelObject : vehSettings_LM03, showLabels : true, showTickMarks : true, value : 0, increment: 1, min:-20, max: 20 }, 
            { appData : 'SetHudBrightnessCalibration', text1Id : 'Calibration', hasCaret : false, itemStyle : 'style12', tickMarkObject : vehSettings_TM04, labelObject : vehSettings_LM04, showLabels : true, showTickMarks:true, value : 0, increment: 1, min:-2, max: 2 },  
        ]
    };

    //HUDJ78A
    this._HUDJ78TabCtxtDataListBrightnessControlOn = {
        itemCountKnown : true,
        itemCount : 7,
        items: [ 
            { appData : 'SetHudHeight', text1Id : 'Height', hasCaret : false, itemStyle : 'style12', tickMarkObject:vehSettings_TM01, labelObject:vehSettings_LM01, showLabels:true, showTickMarks:true, value : 0, increment: 1, min:-13, max: 13 }, 
            { appData : 'SetHudBrightnessControl', text1Id : 'BrightnessControl', button1Id : "Auto", button2Id : "Manual", hasCaret : false, itemStyle : 'style10', value : 1},  
            { appData : 'SetHudBrightness', text1Id : 'Brightness', hasCaret : false, itemStyle : 'style12', tickMarkObject:vehSettings_TM03, labelObject:vehSettings_LM03, showLabels:true, showTickMarks:true, value : 0, increment: 1, min:-20, max: 20 }, 
            { appData : 'SetHUDRotation', text1Id : 'Rotation', hasCaret : false, itemStyle : 'style12', tickMarkObject:vehSettings_TM03, labelObject:vehSettings_LM03, showLabels:true, showTickMarks:true, value : 0, increment: 1, min:-3, max: 3},
            { appData : 'SelectDisplayInformation', text1Id : 'DisplayInformation', hasCaret : true,itemStyle : 'style01'},
            { appData : 'SetHudOpenClose', text1Id : 'HeadsUpDisplay', hasCaret : false, itemStyle : 'styleOnOff', value : 2},           
            { appData : 'GoHUDReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},  
        ]
    };  
	    //CHUDJ36
    this._CHUDJ36CtxtDataListBrightnessControlOn = {
        itemCountKnown : true,
        itemCount : 6,
        items: [ 
            { appData : 'SetHudHeight', text1Id : 'Height', hasCaret : false, itemStyle : 'style12', tickMarkObject:vehSettings_TM01, labelObject:vehSettings_LM01, showLabels:true, showTickMarks:true, value : 0, increment: 1, min:-13, max: 13 }, 
            { appData : 'SetHudBrightnessControl', text1Id : 'BrightnessControl', button1Id : "Auto", button2Id : "Manual", hasCaret : false, itemStyle : 'style10', value : 1},  
            { appData : 'SetHudBrightness', text1Id : 'Brightness', hasCaret : false, itemStyle : 'style12', tickMarkObject:vehSettings_TM03, labelObject:vehSettings_LM03, showLabels:true, showTickMarks:true, value : 0, increment: 1, min:-20, max: 20 }, 
            { appData : 'SelectDisplayInformationJ36', text1Id : 'DisplayInformation', hasCaret : true,itemStyle : 'style01'},
            { appData : 'SetHudOpenClose', text1Id : 'HeadsUpDisplay', hasCaret : false, itemStyle : 'styleOnOff', value : 2},           
            { appData : 'GoHUDReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},  
        ]
    };
        //HUDDispInfo
    this._HUDDispInfoCtxtList = {
        itemCountKnown : true,
       itemCount : 3,
        items : [
            { appData : 'SetHudNavigation', text1Id : 'NavigationSignal', hasCaret : false, itemStyle : 'styleOnOff', value : this._cachedNaviVal },
            { appData : 'SelectHUDStreet', text1Id : 'StreetInformation',  hasCaret : true,itemStyle : 'style06', label1Id :    this._cachedStreetLabel, labelWidth : 'wide'},
            { appData : 'SelectDisplayReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},
        ]
    };
         //CHUDDispInfoJ36
    this._CHUDDispInfoJ36List = {
        itemCountKnown : true,
       itemCount : 2,
        items : [
            { appData : 'SelectHUDNavigationScreen', text1Id : 'Navigation', hasCaret : false, itemStyle : 'style06', label1Id : this._cachedCHudNavLabel },
            { appData : 'SelectDisplayReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},
        ]
    };
    this._StreetInfoCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SetHUDStreet', text1Id : 'Always', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetHUDStreet', text1Id : 'CHudNav_Maneuver', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetHUDStreet', text1Id : 'Streetinfo_off', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
        ]
    }; 
	//CHUDNavigation
	this._CHUDNavigationInfoCtxtDataList = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SelectHUDNavigation', text1Id : 'CHudNav_Off', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SelectHUDNavigation', text1Id : 'AdaptiveLaneStreetTurn', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SelectHUDNavigation', text1Id : 'CHudNav_TBT_Lane', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
			{ appData : 'SelectHUDNavigation', text1Id : 'CHudNav_TBT_Street', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
        ]
    }; 
    
   //SAFETY TAB

    this._SafetyTabCtxtDataList = {
        itemCountKnown : true,
        itemCount : 16,
        items: [ 
            { appData : 'SelectDRSS', text1Id : 'DRSS',hasCaret : false, itemStyle : 'style01'}, 
            { appData : 'GoSBS', text1Id : 'SmartBrakeSupport',hasCaret : false, itemStyle : 'style01', disabled : false},  
            { appData : 'GoSBS_SCBS', text1Id : 'SBSSCBS',hasCaret : false, itemStyle : 'style01', disabled : false}, 
            { appData : 'SetSCBS_J36IPM', text1Id : 'SCBS', hasCaret : false, itemStyle : 'style01', disabled : false},
            { appData : 'GoSBS_SCBS_J36IPM', text1Id : 'SBSSCBS',hasCaret : false, itemStyle : 'style01', disabled : false}, 
            { appData : 'SetSCBS', text1Id : 'SCBS', hasCaret : false, itemStyle : 'styleOnOff', value : 2},
            { appData : 'GoFOW', text1Id : 'ForwardObstructionWarning',hasCaret : false, itemStyle : 'style01'},  
            { appData : 'SelectRVMBuzzerVolume', text1Id : 'RVMBuzzerVolume', label1Id : 'Low', hasCaret : true, itemStyle : 'style06' , disabled : false}, 
            { appData : 'SelectBSMBuzzerVolume', text1Id : 'BSMBuzzerVolume',label1Id : 'Low', hasCaret : true, itemStyle : 'style06' , disabled : false}, 
            { appData : 'SelectBSMSystem', text1Id : 'BSMSystem', hasCaret : false, itemStyle : 'style01', disabled : false}, 
            { appData : 'SelectLaneDepartureWarning' , text1Id : 'LaneDepartureWarningSystem',hasCaret : false, itemStyle : 'style01'}, 
            { appData : 'GoLAS' , text1Id : 'LaneKeepAssistSystem',hasCaret : false, itemStyle : 'style01'},
            { appData : 'SpeedLimitInformation' , text1Id : 'SpeedLimitInformation',hasCaret : true, itemStyle : 'style01', disabled : false},          
            { appData : 'SetDA' , text1Id : 'DriverAlert',hasCaret : false, itemStyle : 'styleOnOff', value : 1},
            { appData : 'SetParkingSensor' , text1Id : 'ParkingSensorIndication',hasCaret : false, itemStyle : 'styleOnOff', value : 1},
	    { appData : 'GoCamera360View' , text1Id : '360ViewCamera',hasCaret : false, itemStyle : 'style01'},
        ]
    };
    this._SafetyTabCtxtDataListImmutable = {
            itemCountKnown : true,
            itemCount : 16,
            items: [ 
                { appData : 'SelectDRSS', text1Id : 'DRSS',hasCaret : false, itemStyle : 'style01'}, 
                { appData : 'GoSBS', text1Id : 'SmartBrakeSupport',hasCaret : false, itemStyle : 'style01', disabled : false},  
                { appData : 'GoSBS_SCBS', text1Id : 'SBSSCBS',hasCaret : false, itemStyle : 'style01', disabled : false}, 
                { appData : 'SetSCBS_J36IPM', text1Id : 'SCBS', hasCaret : false, itemStyle : 'style01', disabled : false},
                { appData : 'GoSBS_SCBS_J36IPM', text1Id : 'SBSSCBS',hasCaret : false, itemStyle : 'style01', disabled : false},
                { appData : 'SetSCBS', text1Id : 'SCBS', hasCaret : false, itemStyle : 'styleOnOff', value : 2},
                { appData : 'GoFOW', text1Id : 'ForwardObstructionWarning',hasCaret : false, itemStyle : 'style01'},  
                { appData : 'SelectRVMBuzzerVolume', text1Id : 'RVMBuzzerVolume', label1Id : 'Low', hasCaret : true, itemStyle : 'style06' , disabled : false}, 
                { appData : 'SelectBSMBuzzerVolume', text1Id : 'BSMBuzzerVolume',label1Id : 'Low', hasCaret : true, itemStyle : 'style06' , disabled : false}, 
                { appData : 'SelectBSMSystem', text1Id : 'BSMSystem', hasCaret : false, itemStyle : 'style01', disabled : false}, 
                { appData : 'SelectLaneDepartureWarning' , text1Id : 'LaneDepartureWarningSystem',hasCaret : false, itemStyle : 'style01'}, 
                { appData : 'GoLAS' , text1Id : 'LaneKeepAssistSystem',hasCaret : false, itemStyle : 'style01'},
                { appData : 'SpeedLimitInformation' , text1Id : 'SpeedLimitInformation',hasCaret : true, itemStyle : 'style01', disabled : false},              
                { appData : 'SetDA' , text1Id : 'DriverAlert',hasCaret : false, itemStyle : 'styleOnOff', value : 1},         
                { appData : 'SetParkingSensor' , text1Id : 'ParkingSensorIndication',hasCaret : false, itemStyle : 'styleOnOff', value : 1},
		{ appData : 'GoCamera360View' , text1Id : '360ViewCamera',hasCaret : false, itemStyle : 'style01'},
        ]
        }; 
   //VEHICLE SETTINGS TAB
    this._VehicleSettingsTabCtxtDataList = {
        itemCountKnown : true,
        itemCount : 5,
        items: [ 
            { appData : 'SetRainSensingWiper', text1Id : 'AutoWiper', itemStyle : 'styleOnOff', hasCaret : false, value : 2},
            { appData : 'GoDoorLock', text1Id : 'DoorLock',hasCaret : false, itemStyle : 'style01', disabled : false},  
            { appData : 'GoTurnSettings', text1Id : 'Turn',hasCaret : false, itemStyle : 'style01', disabled : false},  
            { appData : 'GoLighting', text1Id : 'Lighting',hasCaret : false, itemStyle : 'style01', disabled : false},  
            { appData : 'SpeedAlarm', text1Id : 'SpeedAlarm', label1 : framework.localize.getLocStr(this.uiaId, this._cachedSpeedalarm), itemStyle : 'style06'},
        ]
    };
    this._VehicleSettingsTabCtxtDataListImmutable = {
        itemCountKnown : true,
        itemCount : 5,
        items: [ 
            { appData : 'SetRainSensingWiper', text1Id : 'AutoWiper', itemStyle : 'styleOnOff', hasCaret : false, value : 2},
            { appData : 'GoDoorLock', text1Id : 'DoorLock',hasCaret : false, itemStyle : 'style01', disabled : false},  
            { appData : 'GoTurnSettings', text1Id : 'Turn',hasCaret : false, itemStyle : 'style01', disabled : false},  
            { appData : 'GoLighting', text1Id : 'Lighting',hasCaret : false, itemStyle : 'style01', disabled : false},  
            { appData : 'SpeedAlarm', text1Id : 'SpeedAlarm', label1 : framework.localize.getLocStr(this.uiaId, this._cachedSpeedalarm), itemStyle : 'style06'},
        ]
    };
   //TURN SETTINGS
    this._TurnSettingsCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'Set3FlashTurnSignal', text1Id : 'ThreeFlashTurnSignal',hasCaret : false,itemStyle : 'styleOnOff', value : 2}, 
            { appData : 'SetTurnSignalIndicatorVolume', text1Id : 'TurnSignalIndicatorVolume',button1Id : "High", button2Id : "Low", hasCaret : false, itemStyle : 'style10', value : 1},  
            { appData : 'GoTurnReset', text1Id : "common.Tooltip_IcnUmpReset", hasCaret : false, itemStyle : 'style01'},  
        ]
    };
    
    this._TurnSettingsCtxtDataListImmutable = {
    itemCountKnown : true,
    itemCount : 3,
    items: [ 
        { appData : 'Set3FlashTurnSignal', text1Id : 'ThreeFlashTurnSignal',hasCaret : false,itemStyle : 'styleOnOff',value : 2}, 
        { appData : 'SetTurnSignalIndicatorVolume', text1Id : 'TurnSignalIndicatorVolume', button1Id : "High", button2Id : "Low", hasCaret : false, itemStyle : 'style10', value : 1}, 
        { appData : 'GoTurnReset', text1Id : "common.Tooltip_IcnUmpReset", hasCaret : false, itemStyle : 'style01'},  
      ]
    };

    this._speedTransition = new Array();
    this._speedTransition["SLCS_0"] = "+0";
    this._speedTransition["SLCS_5"] = "+5";
    this._speedTransition["SLCS_10"] = "+10";
    
    this._cachedCautionSpeed = this._speedTransition[this._cachedSpeed]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
    
    //LIGHTING : 
    this._LightingCtxtDataList = {
        itemCountKnown : true,
        itemCount : 12,
        items: [ 
            { appData : 'InteriorLightingBrightness', text1Id : 'InteriorLightingBrightness', label1Id : this._cachedILB , hasCaret : true, itemStyle : 'style06'},
            { appData : 'SelectInteriorLightTimeoutDoorOpen', text1Id : 'InterioLightsTimeOutDoorsOpen', label1Id : '_30m', hasCaret : true, itemStyle : 'style06' },
            { appData : 'SelectInteriorLightTimeoutDoorClosed', text1Id : 'InterioLightsTimeOutDoorsClosed', label1Id : '_30s', hasCaret : true, itemStyle : 'style06' },  
            { appData : 'SetHBC', text1Id : 'HighBeamControl',hasCaret : false,itemStyle : 'styleOnOff', value : 2},
            { appData : 'SetAFS', text1Id : 'AdaptiveFront-lightingSystem',hasCaret : false,itemStyle : 'styleOnOff', value : 2},
            { appData : 'SetHeadlightOnWarning', text1Id : 'LightOnReminderVolume',  button1Id : "High", button2Id : "Low" , button3Id : "common.Off", hasCaret : false, itemStyle : 'style11', value : 1},  
            { appData : 'SelectHeadlightOffTimer', text1Id : 'HeadlightOffTimer', label1Id : '_90s', hasCaret : true, itemStyle : 'style06' },
            { appData : 'GoCHLT', text1Id : 'ComingHomeLightsTimer', label1Id : '_90s', hasCaret : true, itemStyle : 'style06' },
            { appData : 'SetLHL', text1Id : 'LeavingHomeLights',hasCaret : false, itemStyle : 'styleOnOff', value : 2},
            { appData : 'SetDaytimeRunningLights', text1Id : 'DaytimeRunningLights',hasCaret : false,itemStyle : 'styleOnOff', value : 2},
            { appData : 'GoAutoHeadlightOn', text1Id : 'AutoHeadlightOn',  label1Id : 'Medium', hasCaret : true, itemStyle : 'style06'},
            { appData : 'GoLightingReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},  
            
        ]
    }; 
    this._LightingCtxtDataListImmutable =  {
            itemCountKnown : true,
            itemCount : 12,
            items: [ 
                { appData : 'InteriorLightingBrightness', text1Id : 'InteriorLightingBrightness', label1Id : this._cachedILB ,hasCaret : true, itemStyle : 'style06'},
                { appData : 'SelectInteriorLightTimeoutDoorOpen', text1Id : 'InterioLightsTimeOutDoorsOpen', label1Id : '_30m', hasCaret : true, itemStyle : 'style06' },
                { appData : 'SelectInteriorLightTimeoutDoorClosed', text1Id : 'InterioLightsTimeOutDoorsClosed', label1Id : '_30s', hasCaret : true, itemStyle : 'style06' },  
                { appData : 'SetHBC', text1Id : 'HighBeamControl',hasCaret : false,itemStyle : 'styleOnOff', value : 2},
                { appData : 'SetAFS', text1Id : 'AdaptiveFront-lightingSystem',hasCaret : false,itemStyle : 'styleOnOff', value : 2},
                { appData : 'SetHeadlightOnWarning', text1Id : 'LightOnReminderVolume',  button1Id : "High", button2Id : "Low" , button3Id : "common.Off", hasCaret : false, itemStyle : 'style11', value : 1},  
                { appData : 'SelectHeadlightOffTimer', text1Id : 'HeadlightOffTimer', label1Id : '_90s', hasCaret : true, itemStyle : 'style06' },
                { appData : 'GoCHLT', text1Id : 'ComingHomeLightsTimer', label1Id : '_90s', hasCaret : true, itemStyle : 'style06' },
                { appData : 'SetLHL', text1Id : 'LeavingHomeLights',hasCaret : false, itemStyle : 'styleOnOff', value : 2},
                { appData : 'SetDaytimeRunningLights', text1Id : 'DaytimeRunningLights',hasCaret : false,itemStyle : 'styleOnOff', value : 2},
                { appData : 'GoAutoHeadlightOn', text1Id : 'AutoHeadlightOn',  label1Id : 'Medium', hasCaret : true, itemStyle : 'style06' },
                { appData : 'GoLightingReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},  
            ]
        };
        
    this._SelectILBCtxtDataList=  {
            itemCountKnown : true,
            itemCount : 4,
            items: [ 
                { appData : 'ILBSetting', text1Id : 'ILB_Bright', itemStyle : 'style03',image1: 'tick', checked : false, hasCaret: false},
                { appData : 'ILBSetting', text1Id : 'ILB_Medium', itemStyle : 'style03',image1: 'tick', checked : true, hasCaret: false},
                { appData : 'ILBSetting', text1Id : 'ILB_Dark', itemStyle : 'style03',image1: 'tick', checked : false, hasCaret: false},
                { appData : 'ILBSetting', text1Id : 'ILB_Off', itemStyle : 'style03',image1: 'tick', checked : false, hasCaret: false},
            ]
        };
   //DOOR LOCK
    this._DoorLockCtxtDataList = {
        itemCountKnown : true,
        itemCount : 6,
        items: [  
            { appData : 'GoDoorLockMode', text1Id : 'DoorLockMode', label1Id : 'common.On', hasCaret : true, itemStyle : 'style06' },  
            { appData : 'GoKeylessLockBeepVol', text1Id : 'KeylessLockBeepVol', label1Id : 'Med', hasCaret : true, itemStyle : 'style06' },  
            { appData : 'GoDoorRelockTime', text1Id : 'DoorRelockTime', label1Id : '_60s', hasCaret : true, itemStyle : 'style06' },               
            { appData : 'GoUnlockMode', text1Id : 'UnlockMode',  label1Id : "_Driver'sDoor", hasCaret : true, itemStyle : 'style06' }, 
            { appData : 'SetWalkAwayLock', text1Id : 'WalkAwayLock',hasCaret : false,itemStyle : 'styleOnOff',value : 2},
            { appData : 'GoDoorLockReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
   
        ]
    };
    this._DoorLockCtxtDataListImmutable = {
            itemCountKnown : true,
            itemCount : 6,
            items: [  
                { appData : 'GoDoorLockMode', text1Id : 'DoorLockMode', label1Id : 'common.On', hasCaret : true, itemStyle : 'style06' },  
                { appData : 'GoKeylessLockBeepVol', text1Id : 'KeylessLockBeepVol', label1Id : 'Med', hasCaret : true, itemStyle : 'style06' },  
                { appData : 'GoDoorRelockTime', text1Id : 'DoorRelockTime', label1Id : '_60s', hasCaret : true, itemStyle : 'style06' },               
                { appData : 'GoUnlockMode', text1Id : 'UnlockMode',  label1Id : "_Driver'sDoor", hasCaret : true, itemStyle : 'style06' }, 
                { appData : 'SetWalkAwayLock', text1Id : 'WalkAwayLock',hasCaret : false,itemStyle : 'styleOnOff',value : 2},
                { appData : 'GoDoorLockReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
            ]
        };
    //DoorLockMode
    this._DoorLockModeAutoTransmission6CtxtDataList = {
        itemCountKnown : true,
        itemCount : 6,
        items: [  
            { appData : 'SetAutoDoorLockAT6', text1Id : 'LockShiftFromPUnlockInPark', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoDoorLockAT6', text1Id : 'LockShiftFromP', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},
            { appData : 'SetAutoDoorLockAT6', text1Id : 'LockUnlock', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoDoorLockAT6', text1Id : 'LockWhenDrivingUnlockIGNoff', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoDoorLockAT6', text1Id : 'LockWhenDriving', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
            { appData : 'SetAutoDoorLockAT6', text1Id : 'common.Off', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
        ] 
    };
    this._DoorLockModeAutoTransmissionCtxtDataList = {
        itemCountKnown : true,
        itemCount : 5,
        items: [  
            //for automatic transmissions >>>>>
            { appData : 'SetAutoDoorLockAT', text1Id : 'LockShiftFromPUnlockInPark', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoDoorLockAT', text1Id : 'LockShiftFromP', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},   
            //for automatic transmissions <<<<<
            { appData : 'SetAutoDoorLockAT', text1Id : 'LockWhenDrivingUnlockIGNoff', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoDoorLockAT', text1Id : 'LockWhenDriving', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
            { appData : 'SetAutoDoorLockAT', text1Id : 'common.Off', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
        ] 
    };
    //DoorLockMode
    this._DoorLockModeManualTransmissionCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [  
            //for manual transmissions >>>>>
            { appData : 'SetAutoDoorLockMT', text1Id : 'LockWhenDrivingUnlockIGNoff', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoDoorLockMT', text1Id : 'LockWhenDriving', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
            { appData : 'SetAutoDoorLockMT', text1Id : 'common.Off', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
        ] 
    };
  //DoorLockMode
    this._DoorLockModeNullDataList = {
        itemCountKnown : true,
        itemCount : 0,
        items: []
     };
    
    //KeylessLockBeepVol
    this._KeylessLockBeepVolCtxtDataList = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SetKeylessLockBeepVol', text1Id : 'High', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetKeylessLockBeepVol', text1Id : 'Medium', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetKeylessLockBeepVol', text1Id : 'Low', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
            { appData : 'SetKeylessLockBeepVol', text1Id : 'common.Off', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
        ]
    };
    //DoorRelockTime
    this._DoorRelockTimeCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [  
            { appData : 'SetAutoRelockTimer', text1Id : '_90seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoRelockTimer', text1Id : '_60seconds', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoRelockTimer', text1Id : '_30seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},   
        ] 
    };
   //UnlockMode
    this._UnlockModeCtxtDataList = {
        itemCountKnown : true,
        itemCount : 2,
        items: [ 
            { appData : 'SetUnlockMode', text1Id : 'OnceAllDoors', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetUnlockMode', text1Id : 'OnceDriversDoorTwiceAllDoors', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'},   
        ]
    };
   //DRSS SETTINGS 
    this._DistanceRecoSupportSystemCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SetDRSS', text1Id : 'Mode', hasCaret : false, itemStyle : 'styleOnOff', value : 1}, 
            { appData : 'SetDRSSDistance', text1Id : 'WarningDistance', button1Id : "Far", button2Id : "Middle" , button3Id : "Near", hasCaret : false, itemStyle : 'style11', value : 1}, 
            { appData : 'GoDRSSReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
        ]
    };
    
    //LAS
    this._LASCtxtDataList = {
            itemCountKnown : true,
            itemCount : 7,
            items: [ 
                { appData : 'SetLASIntervention', text1Id : 'Intervention',hasCaret : false, itemStyle : 'styleOnOff', value : 2},
                { appData : 'GoLASTiming', text1Id : 'AlertTiming', label1Id : 'Adaptive', hasCaret : true, itemStyle : 'style06' }, 
                { appData : 'SetLDWSWarning', text1Id : 'Sensitivity', button1Id : "Often", button2Id : "Med" , button3Id : "Rare", hasCaret : false, itemStyle : 'style11', value : 1},
                { appData : 'SetLASAlert', text1Id : 'LaneDepartureAlert',hasCaret : false, itemStyle : 'styleOnOff', value : 1},               
                { appData : 'GoLASSound', text1Id : 'LASSound', label1Id : 'Vibration',hasCaret : true, itemStyle : 'style06'}, 
                { appData : 'SetLASSoundVibration', text1Id : 'VibrationStrength', button1Id : "High_Vibration", button2Id : "Low_Vibration", hasCaret : false, itemStyle : 'style10', value : 1},
                { appData : 'GoLASReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
           ]
        };

    //LAS
    //Intervention timing is removed from NA J78A - SC0402
    this._LAS_NA_J78CtxtDataList = {
            itemCountKnown : true,
            itemCount : 6,
            items: [ 
                { appData : 'SetLASIntervention', text1Id : 'Intervention',hasCaret : false, itemStyle : 'styleOnOff', value : 2},
                { appData : 'SetLDWSWarning', text1Id : 'Sensitivity', button1Id : "Often", button2Id : "Med" , button3Id : "Rare", hasCaret : false, itemStyle : 'style11', value : 1},
                { appData : 'SetLASAlert', text1Id : 'LaneDepartureAlert',hasCaret : false, itemStyle : 'styleOnOff', value : 1},               
                { appData : 'GoLASSound', text1Id : 'LASSound', label1Id : 'Vibration',hasCaret : true, itemStyle : 'style06'}, 
                { appData : 'SetLASSoundVibration', text1Id : 'VibrationStrength', button1Id : "High_Vibration", button2Id : "Low_Vibration", hasCaret : false, itemStyle : 'style10', value : 1},
                { appData : 'GoLASReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
           ]
        };

    this._LASCtxtDataListHelper = {
            itemCountKnown : true,
            itemCount : 7,
            items: [ 
                { appData : 'GoLASTiming', text1Id : 'Timing', label1Id : 'Adaptive', hasCaret : true, itemStyle : 'style06' }, 
                { appData : 'SetLDWSTiming', text1Id : 'Timing', button1Id : "AtLine", button2Id : "BeforeLine", hasCaret : false, itemStyle : 'style10', value : 1},
                { appData : 'SetLDWSWarning', text1Id : 'Sensitivity', button1Id : "Often", button2Id : "Med" , button3Id : "Rare", hasCaret : false, itemStyle : 'style11', value : 1},
                { appData : 'SetLDWSWarning', text1Id : 'Sensitivity', button1Id : "High_SensitivityLAS", button2Id : "Low_SensitivityLAS" , hasCaret : false, itemStyle : 'style10', value : 1},
                { appData : 'SetLASSoundBeep', text1Id : 'BeepVolume', button1Id : "High", button2Id : "Low", hasCaret : false, itemStyle : 'style10', value : 1},
                { appData : 'SetLASSoundRumble', text1Id : 'RumbleVolume', button1Id : "High", button2Id : "Mid" , button3Id : "Low", hasCaret : false, itemStyle : 'style11', value : 1},
                { appData : 'SetLASSoundVibration', text1Id : 'VibrationStrength', button1Id : "High_Vibration", button2Id : "Low_Vibration", hasCaret : false, itemStyle : 'style10', value : 1},
           ]
        };

    //Intervention not enabled
    this._InterventiondisabledCtxtDataList = {
            itemCountKnown : true,
            itemCount : 6,
            items: [ 
                { appData : 'SetLASIntervention', text1Id : 'Intervention',hasCaret : false, itemStyle : 'styleOnOff', value : 2},
                { appData : 'GoLASTiming', text1Id : 'Timing', label1Id : 'Adaptive', hasCaret : true, itemStyle : 'style06' }, 
                { appData : 'SetLDWSWarning', text1Id : 'Sensitivity', button1Id : "Often", button2Id : "Med" , button3Id : "Rare", hasCaret : false, itemStyle : 'style11', value : 1},
                { appData : 'GoLASSound', text1Id : 'LASSound', label1Id : 'Vibration',hasCaret : false, itemStyle : 'style06'}, 
                { appData : 'SetLASSoundVibration', text1Id : 'VibrationStrength', button1Id : "High_Vibration", button2Id : "Low_Vibration", hasCaret : false, itemStyle : 'style10', value : 1},
                { appData : 'GoLASReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
           ]
        };
    
    //Intervention not enabled Sound not installed
    this._InterventiondisabledNoSoundCtxtDataList = {
            itemCountKnown : true,
            itemCount : 6,
            items: [ 
                { appData : 'SetLASIntervention', text1Id : 'Intervention',hasCaret : false, itemStyle : 'styleOnOff', value : 1},
                { appData : 'GoLASTiming', text1Id : 'Timing', label1Id : 'Adaptive', hasCaret : true, itemStyle : 'style06' }, 
                { appData : 'SetLDWSWarning', text1Id : 'Sensitivity', button1Id : "Often", button2Id : "Med" , button3Id : "Rare", hasCaret : false, itemStyle : 'style11', value : 1},
                { appData : 'GoLASReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
           ]
        };

    //LAS Timing Data List
    this._LASTimingCtxtDataList = {
            itemCountKnown : true,
            itemCount : 4,
            items: [ 
                { appData : 'SetLDWSTiming', text1Id : 'Adaptive', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
                { appData : 'SetLDWSTiming', text1Id : 'LASEarly', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
                { appData : 'SetLDWSTiming', text1Id : 'Med', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
                { appData : 'SetLDWSTiming', text1Id : 'LASLate', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
            ]
        };
    
    //Forward Obstruction Warning settings 
    this._ForwardObstructionWarningCtxtDataList = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SetFOW', text1Id : 'Mode',hasCaret : false, itemStyle : 'styleOnOff', value : 1},
            { appData : 'SetFOWDistance', text1Id : 'WarningDistance', button1Id : "Near", button2Id : "Far", hasCaret : false, itemStyle : 'style10', value : 1},
            { appData : 'SetFOWBuzzerVolume', text1Id : 'Volume', button1Id : "High", button2Id : "Low" , button3Id : 'common.Off', hasCaret : false, itemStyle : 'style11', value : 1},
            { appData : 'ResetFOWSettings', text1Id : 'common.Tooltip_IcnUmpReset',hasCaret : false, itemStyle : 'style01'}, 
        ]
    };
    
    
    this._SelectSpeedLimitInformationCtxtDataList = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SpeedLimitSign', text1Id : 'SpeedLimitSign',hasCaret : true, itemStyle : 'style01', disable : false},
            { appData : 'SpeedLimitCaution', text1Id : 'SpeedLimitCaution', label1Id : this._cachedSpeedLimitCaution , itemStyle : 'style06', labelWidth : 'wide'},
            { appData : 'CautionSpeed', text1Id : 'CautionSpeed', label1 : this._cachedCautionSpeed, itemStyle : 'style06'},
            { appData : 'GoSLIReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
        ]
    };
    //TSR/WHUD
	this._SelectSpeedLimitInformationCtxtDataListCHud = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
	        { appData : 'SpeedLimitSignWHUD', text1Id : 'SpeedLimitSign', itemStyle : 'styleOnOff', value:0, hasCaret:false },
            { appData : 'SpeedLimitCaution', text1Id : 'SpeedLimitCaution', label1Id : this._cachedSpeedLimitCaution , itemStyle : 'style06', labelWidth : 'wide'},
            { appData : 'CautionSpeed', text1Id : 'CautionSpeed', label1 : this._cachedCautionSpeed, itemStyle : 'style06'},
            { appData : 'GoSLIReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
        ]
    };
	
    this._SelectSpeedLimitSignCtxtDataList = {
        itemCountKnown : true,
        itemCount : 2,
        items: [ 
            { appData : 'HeadUpDisplay', text1Id : 'SLI_HeadUpDisplay', itemStyle : 'styleOnOff', value:0, hasCaret:false },
            { appData : 'CenterDisplay', text1Id : 'CenterDisplay', itemStyle : 'styleOnOff', value:0, hasCaret:false},
        
        ]
    };
    
    this._SelectSpeedLimitCautionCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SLCSetting', text1Id : 'SLC_Off', itemStyle : 'style03', image1: 'tick', checked : false, hasCaret:false},
            { appData : 'SLCSetting', text1Id : 'SLC_Sign', itemStyle : 'style03',image1: 'tick', checked : true, hasCaret: false},
            { appData : 'SLCSetting', text1Id : 'SLC_Sign_Buzzer', itemStyle : 'style03',image1: 'tick', checked : false , hasCaret: false},
        ]
    };
    
    this._SelectCautionSpeedCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'CSSetting', text1 : this._speedTransition[this._cachedSpeed1]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit), itemStyle : 'style03', image1: 'tick', checked : true, hasCaret:false},
            { appData : 'CSSetting', text1 : this._speedTransition[this._cachedSpeed2]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit), itemStyle : 'style03',image1: 'tick', checked : false, hasCaret: false},
            { appData : 'CSSetting', text1 : this._speedTransition[this._cachedSpeed3]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit), itemStyle : 'style03',image1: 'tick', checked : false, hasCaret: false},
        ]
    };
    
    //SpeedAlarm
    this._SelectSpeedAlarmCtxtDataList = {
    itemCountKnown : true,
        itemCount : 1,
        items: [ 
             { appData : 'GoToSetting', text1Id : 'Setting', itemStyle : 'styleOnOff', value:0, hasCaret:false}          
        ]
    };
    
    //LDWS settings 
    this._LDWSCtxtDataList = {
        itemCountKnown : true,
        itemCount : 5,
        items: [ 
            { appData : 'GoLDWSTiming', text1Id : 'Timing', label1Id : 'Adaptive', hasCaret : true, itemStyle : 'style06'},
            { appData : 'SetLDWSWarning', text1Id : 'Warning', button1Id : "Often", button2Id : "Med" , button3Id : "Rare", hasCaret : false, itemStyle : 'style11', value : 3}, 
            { appData : 'SetBuzzerSetting', text1Id : 'Sound', button1Id : "Beep", button2Id : "RumbleStrips", hasCaret : false, itemStyle : 'style10', value : 2},
            { appData : 'SetLDWSBuzzerVolume', text1Id : 'BeepVolume', button1Id : "High", button2Id : "Low", hasCaret : false, itemStyle : 'style10', value : 2},
            { appData : 'GoLDWSReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
        ]
    };
    
    this._LDWSCtxtDataListNotInstalled = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'GoLDWSTiming', text1Id : 'Timing', label1Id : 'Adaptive', hasCaret : true, itemStyle : 'style06'},
            { appData : 'SetLDWSWarning', text1Id : 'Warning', button1Id : "Often", button2Id : "Med" , button3Id : "Rare", hasCaret : false, itemStyle : 'style11', value : 3}, 
            { appData : 'SetLDWSBuzzerVolume', text1Id : 'BeepVolume', button1Id : "High", button2Id : "Low", hasCaret : false, itemStyle : 'style10', value : 2},
            { appData : 'GoLDWSReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'}, 
        ]
    };
    
    this._LDWSCtxtDataListHelper = {
        itemCountKnown : true,
        itemCount : 6,
        items: [ 
            { appData : 'GoLDWSTiming', text1Id : 'Timing', label1Id : 'Adaptive', hasCaret : true, itemStyle : 'style06'},
            { appData : 'SetLDWSTiming', text1Id : 'Timing', button1Id : "AtLine", button2Id : "BeforeLine", hasCaret : false, itemStyle : 'style10', value : 2 },
            { appData : 'SetLDWSWarning', text1Id : 'Warning', button1Id : "Often", button2Id : "Med" , button3Id : "Rare", hasCaret : false, itemStyle : 'style11', value : 3}, 
            { appData : 'SetLDWSWarning', text1Id : 'Warning', button1Id : "High", button2Id : "Low", hasCaret : false, itemStyle : 'style10', value : 2},
            { appData : 'SetLDWSBuzzerVolume', text1Id : 'BeepVolume', button1Id : "High", button2Id : "Low", hasCaret : false, itemStyle : 'style10', value : 2},
            { appData : 'SetLDWSRumbleVolume', text1Id : 'RumbleVolume', button1Id : "High", button2Id : "Mid" , button3Id : "Low", hasCaret : false, itemStyle : 'style11', value : 3},
            
        ]
    };
    //LDWS Timing
    this._LDWSTimingCtxtDataList = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SetLDWSTiming', text1Id : 'Adaptive', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetLDWSTiming', text1Id : 'Early', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetLDWSTiming', text1Id : 'Medium', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetLDWSTiming', text1Id : 'Late', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
        ]
    };
    
    this._LASSoundCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
               { appData : 'SetLASSound', text1Id : 'Vibration_Line', image1:'tick', checked:false,hasCaret : false, itemStyle : 'style03'}, 
               { appData : 'SetLASSound', text1Id : 'Beep_Line', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'},
               { appData : 'SetLASSound', text1Id : 'RumbleStrips_line', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},
        ]
    };

    //HeadlightOffTimer
    this._HeadlightOffTimerCtxtDataList = {
        itemCountKnown : true,
        itemCount : 5,
        items: [ 
            { appData : 'SetHeadlightOffTimer', text1Id : '_120seconds', image1:'tick', checked:false,hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetHeadlightOffTimer', text1Id : '_90seconds', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetHeadlightOffTimer', text1Id : '_60seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
            { appData : 'SetHeadlightOffTimer', text1Id : '_30seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetHeadlightOffTimer', text1Id : 'common.Off', image1:'tick', checked:false,  hasCaret : false, itemStyle : 'style03'}, 
        ] 
    };
    
    //CHLT
    this._CHLTCtxtDataList = {
        itemCountKnown : true,
        itemCount : 5,
        items: [ 
            { appData : 'SetCHLT', text1Id : '_120seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetCHLT', text1Id : '_90seconds', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetCHLT', text1Id : '_60seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
            { appData : 'SetCHLT', text1Id :'_30seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetCHLT', text1Id :'common.Off', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
        ] 
    };
    
    //AutoHeadlightSensitivity
    this._AutoHeadlightOnCtxtDataList = {
        itemCountKnown : true,
        itemCount : 5,
        items: [ 
            { appData : 'SetAutoHeadlightSensitivity', text1Id : 'Light', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoHeadlightSensitivity', text1Id : 'MediumLight', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoHeadlightSensitivity', text1Id : 'Medium', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'},  
            { appData : 'SetAutoHeadlightSensitivity', text1Id : 'MediumDark', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetAutoHeadlightSensitivity', text1Id : 'Dark', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
        ] 
    };
 
    //SmartBrakeSupport
    this._SmartBrakeSupportCtxtDataList = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SetSBS', text1Id : 'Mode', hasCaret : false, itemStyle : 'styleOnOff', value : 2},
            { appData : 'SetSBSDistance', text1Id : 'WarningDistance', button1Id : "Near", button2Id : "Far", hasCaret : false, itemStyle : 'style10', value : 1},
            { appData : 'SetSBSBuzzerVolume', text1Id : 'Volume', button1Id : "High", button2Id : "Low" , button3Id : "common.Off", hasCaret : false, itemStyle : 'style11', value : 1},  
            { appData : 'GoSBSReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01' },  
        ] 
    };
    
    //SmartCityBreakSystem
    this._SmartCityBreakSystemCtxtDataList = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SetSCBS', text1Id : 'Mode',hasCaret : false, itemStyle : 'styleOnOff', value : 2},
            { appData : 'SetSBSDistance', text1Id : 'WarningDistance', button1Id : "Near", button2Id : "Far", hasCaret : false, itemStyle : 'style10', value : 1},
            { appData : 'SetSBSBuzzerVolume', text1Id : 'Volume', button1Id : "High", button2Id : "Low" , button3Id : "common.Off", hasCaret : false, itemStyle : 'style11', value : 1},  
            { appData : 'GoSBS_SCBSReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01' },  
        ] 
    };
    
  //SmartBrakeSupport
    this._SmartBrakeSupportHelperCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SetSBS', text1Id : 'Mode', hasCaret : false, itemStyle : 'styleOnOff', value : 2},
            { appData : 'SetSBSBuzzerVolume', text1Id : 'Volume', button1Id : "High", button2Id : "Low" , button3Id : "common.Off", hasCaret : false, itemStyle : 'style11', value : 1},  
            { appData : 'GoSBSReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01' },  
        ] 
    };
    this._SmartCityBreakSystemHelperCtxtDataList = {
            itemCountKnown : true,
            itemCount : 3,
            items: [ 
                { appData : 'SetSCBS', text1Id : 'Mode',hasCaret : false, itemStyle : 'styleOnOff', value : 2},
                { appData : 'SetSBSBuzzerVolume', text1Id : 'Volume', button1Id : "High", button2Id : "Low" , button3Id : "common.Off", hasCaret : false, itemStyle : 'style11', value : 1},  
                { appData : 'GoSBS_SCBSReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01' },  
            ] 
        };
    
    //SBS_SCBS_J36IPM
    this._SmartCityBreakSystemJ36IPMCtxtDataList = {
            itemCountKnown : true,
            itemCount : 4,
            items: [ 
                { appData : 'SetSCBSMode_J36IPM', text1Id : 'Mode',hasCaret : false, itemStyle : 'styleOnOff', value : 2},
                { appData : 'SetSCBSDistance_J36IPM', text1Id : 'WarningDistance', button1Id : "Far", button2Id : "Middle", button3Id : "Near", hasCaret : false, itemStyle : 'style11', value : 1},
                { appData : 'SetSBSBuzzerVolume', text1Id : 'Volume', button1Id : "High", button2Id : "Low" , button3Id : "common.Off", hasCaret : false, itemStyle : 'style11', value : 1},  
                { appData : 'GoSBS_SCBS_J36IPMReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01' },  
            ] 
        };
    
    //RearviewMonitorBuzzerVolume
    this._RearviewMonitorBuzzerVolumeCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SetRVMBuzzerVolume', text1Id : 'High', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetRVMBuzzerVolume', text1Id : 'Low', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetRVMBuzzerVolume', text1Id : 'common.Off', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
        ]
    };
	
    //360TopViemMonitor
    this._TopViewMonitorCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SetTVMAutoViewStart', text1Id : 'IgONAutoDisplay',  hasCaret : false, itemStyle : 'styleOnOff', value:this._cachedTVMAVSStatus}, 
            { appData : 'SetTVMVehiclePathLine', text1Id : 'GuidelineDisplay',  hasCaret : false, itemStyle : 'styleOnOff',value:this._cachedTVMVPLStatus}, 
            { appData : 'SetTVMFrontViewDisplay', text1Id : 'FrontCameraView',  hasCaret : false, itemStyle : 'styleOnOff',value:this._cachedTVMFVDStatu},  
        ]
    };	

    //BlindSpotMonitorBuzzerVolume
    this._BlindSpotMonitorBuzzerVolumeCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SetBSMBuzzerVolume', text1Id : 'High', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetBSMBuzzerVolume', text1Id : 'Low', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetBSMBuzzerVolume', text1Id : 'common.Off', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
        ]
    };
     
    //BSMSystem Context
    this._BlindSpotMonitorSystemCtxtDataList = {
        itemCountKnown : true,
        itemCount : 2,
        items: [ 
            { appData : 'SetBSMSystem', text1Id : 'System',hasCaret : false, itemStyle : 'styleOnOff', value : 2}, 
            { appData : 'SetBSMVolume', text1Id : 'Volume', button1Id : "High", button2Id : "Low", button3Id : "common.Off", hasCaret : false, itemStyle : 'style11', value : 1},
        ]
    };

    //IntLightTimeoutDoorClosed
    this._IntLightTimeoutDoorClosedCtxtDataList = {
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SetInteriorLightTimeoutDoorClosed', text1Id : '_60seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetInteriorLightTimeoutDoorClosed', text1Id : '_30seconds', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetInteriorLightTimeoutDoorClosed', text1Id : '_15seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
            { appData : 'SetInteriorLightTimeoutDoorClosed', text1Id :'_7p5seconds', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
        ] 
    };
 
    //InteriorLightTimeoutDoorOpen
    this._InteriorLightTimeoutDoorOpenCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SetInteriorLightTimeoutDoorOpen', text1Id : '_60minutes', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetInteriorLightTimeoutDoorOpen', text1Id : '_30minutes', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
            { appData : 'SetInteriorLightTimeoutDoorOpen', text1Id : '_10minutes', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},   
        ] 
    };
    
    //Tabs Config
    this._tabsConfig = 
    [
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.HUDTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "HUD"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DisplayTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Display"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Safety",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Safety"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SoundTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Sound" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Clock",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Clock" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.VehicleTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Vehicle"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DevicesTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Devices"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SystemTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "System"
        }
    ];

    this._tabsConfigJ78A = 
    [   
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.HUDTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "HUD"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DisplayTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Display"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Safety",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Safety"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SoundTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Sound" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Clock",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Clock" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.VehicleTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Vehicle"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DevicesTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Devices"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SystemTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "System"
        }
    ];
        
    this._tabsConfigNoHUD = 
    [ 
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DisplayTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Display"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Safety",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Safety"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SoundTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Sound" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Clock",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Clock" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.VehicleTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Vehicle"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DevicesTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Devices"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SystemTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "System"
        }
    ];
    
    // TABS BUTTON CONFIGURATION, HUD_INSTALLED OFFSETS
    this._HUDTabBtnConfig = {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":0, "tabsConfig": this._tabsConfig, tabsGroup : "settings"},
    this._SafetyTabBtnConfig = {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":2, "tabsConfig": this._tabsConfig, tabsGroup : "settings"}; 
    this._VehicleSettingsTabBtnConfig = {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":5, "tabsConfig": this._tabsConfig, tabsGroup : "settings"}; 

    
    
    //Context table
    //@formatter:off
    this._contextTable = { 
        "HUDTab" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Settings",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._HUDTabCtxtDataListBrightnessControlOn,
                    titleConfiguration : 'tabsTitle', 
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":0, "tabsConfig":this._tabsConfig, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,   
                    minChangeInterval : 1000,
                    toggleMinChangeInterval : 1000,
                    rotationIdleDetectTime : 1250,
                    settleTime : 1500,
                    toggleSettleTime : 1500,
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._HUDTabCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : this._HUDTabCtxtIn.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed
        }, // end of "HUDTab"

        
        "HUDTabJ78" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Settings",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._HUDJ78TabCtxtDataListBrightnessControlOn,
                    titleConfiguration : 'tabsTitle', 
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":0, "tabsConfig":this._tabsConfigJ78A, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,   
                    minChangeInterval : 1000,
                    toggleMinChangeInterval : 1000,
                    rotationIdleDetectTime : 1250,
                    settleTime : 1500,
                    toggleSettleTime : 1500,
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._HUDJ78TabCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : this._HUDJ78TabCtxtIn.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed
        }, // end of "HUDTabJ78"

	"HUDTabJ36" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Settings",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._CHUDJ36CtxtDataListBrightnessControlOn,
                    titleConfiguration : 'tabsTitle', 
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":0, "tabsConfig":this._tabsConfigJ78A, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,   
                    minChangeInterval : 1000,
                    toggleMinChangeInterval : 1000,
                    rotationIdleDetectTime : 1250,
                    settleTime : 1500,
                    toggleSettleTime : 1500,
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._CHUDJ36CtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : this._CHUDJ36CtxtIn.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed
        }, // end of "HUDTabJ36"
      
        "HUDDisplayInformation" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "HUDSettings",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._HUDDispInfoCtxtList,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : "DisplayInformation",
                        titleStyle : "style02"
                    },                  
                    selectCallback : this.listItemClick,   
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
			"contextInFunction" : this._HUDDispInfoCtxtIn.bind(this),
            "readyFunction" : this._HUDDispInfoCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "HUDDisplayInformation"
		
		"HUDDisplayInformationJ36" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "HUDSettings",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._CHUDDispInfoJ36List,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : "DisplayInformation",
                        titleStyle : "style02"
                    },                  
                    selectCallback : this.listItemClick,   
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._HUDDispInfoCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "HUDDisplayInformation"
        
        "HUDStreetInformation" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "HUDSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._StreetInfoCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'StreetInformation',
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._StreetInfoCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "HUDStreetInformation" 
		
		"HUDNavigation" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "HUDSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._CHUDNavigationInfoCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'Navigation',
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
			"contextInFunction" : this._CHUDNavigationCtxtIn.bind(this),
            "readyFunction" : this._CHUDNavigationCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "HUDNavigation" 
               
        "SafetyTab" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Settings",
            "controlProperties": {
                "List2Ctrl" : {
                   
                    "dataList": this._SafetyTabCtxtDataList,
                    titleConfiguration : 'tabsTitle', 
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":2, "tabsConfig":this._tabsConfig, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._SafetyTabCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : this._SafetyTabTabCtxtIn.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed
        }, // end of "SafetyTab"
        
        "VehicleSettingsTab" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Settings",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._VehicleSettingsTabCtxtDataList,
                    titleConfiguration : 'tabsTitle', 
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":5, "tabsConfig":this._tabsConfig, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._VehicleSettingsTabCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : this._VehicleSettingsTabCtxtIn.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed
        }, // end of "VehicleSettingsTab"
 
        "DRSS" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._DistanceRecoSupportSystemCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'DistanceRecognitionSupportSystem', 
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._DistanceRecoSupportSystemCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "DRSS"
        
        "LAS" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._LASCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'LaneKeepAssistSystem', 
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,  
                    toggleMinChangeInterval : 1400,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._LASCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "DRSS"
        
        "LASSound" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._LASSoundCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'LASSound', 
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._LASSoundCtxtTmpltReadyToDisplay.bind(this),
             //"displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "DRSS"
        
        "LASTiming" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._LASTimingCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'LASTiming', 
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "contextInFunction" : this._LASTimingCtxtTmpltcontextInFunction.bind(this),
            "readyFunction" : this._LASTimingCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "DRSS"
       
       "FOW" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._ForwardObstructionWarningCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'ForwardObstructionWarning',
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._ForwardObstructionWarningCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "FOW"
        
        "LDWS" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": null, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'LaneDepartureWarningSystem',
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._LDWSCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "LDWS"
        
        // Speed Limit Information Context
        "SLI" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SelectSpeedLimitInformationCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SpeedLimitInformation',
                    },
                    "smallItemText" : true,
                     selectCallback : this.listItemClick,  
                   
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SelectSpeedLimitInformationCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SelectSpeedLimitInformation"
        
		 // Speed Limit Information Context for WHUD
        "SLI_WHUD" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SelectSpeedLimitInformationCtxtDataListCHud, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SpeedLimitInformation',
                    },
                    "smallItemText" : true,
                     selectCallback : this.listItemClick,  
                   
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SelectSpeedLimitInformationCtxtTmpltReadyToDisplayWHUD.bind(this),
        }, // end of "SelectSpeedLimitInformation"
		
        // Speed Limit Sign Context
        "SLSign" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SelectSpeedLimitSignCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SpeedLimitSign',
                    },
                    "smallItemText" : true,
                   selectCallback : this.listItemClick,  
                 
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SelectSpeedLimitSignCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SpeedLimitSign"
        
        // Speed Limit Caution
        "SLCaution" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SelectSpeedLimitCautionCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SpeedLimitCaution',
                    },
                    "smallItemText" : true,
                   selectCallback : this.listItemClick,  
                  
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SelectSpeedLimitCautionCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SpeedLimitCaution"
        
        // Speed Alarm Context
        "SpeedAlarm": {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SelectSpeedAlarmCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SpeedAlarm',
                    },
                    "smallItemText" : true,
                    stepMinChangeInterval : 1500,
                    selectCallback : this.listItemClick,  
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SelectSpeedAlarmCtxtTmpltReadyToDisplay.bind(this),
			"noLongerDisplayedFunction" : this._SelectSpeedAlarmnoLongerDisplayedFunction.bind(this),
        }, // end of "SpeedAlarm"
        
        // Caution Speed
        "CautionSpeed": {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SelectCautionSpeedCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'CautionSpeed',
                    },
                    "smallItemText" : true,
                   selectCallback : this.listItemClick,  
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SelectCautionSpeedCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "CautionSpeed"
        
        // Interior Lightining Brightness Context
        "IntLightingBrightness": {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
			"sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SelectILBCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'InteriorLightingBrightness',
                    },
                    "smallItemText" : true,
                   selectCallback : this.listItemClick,  
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SelectILBCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SelectILB"
        
        "LDWSTiming" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._LDWSTimingCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'LDWSTiming',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._LDWSTimingCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "LDWSTiming"
        
        "HeadlightOffTimer" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._HeadlightOffTimerCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'HeadlightOffTimer',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._HeadlightOffTimerCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "HeadlightOffTimer"
        
        "CHLT"  : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._CHLTCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'ComingHomeLightsTimer',
                    },
                    "smallItemText" : true,
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._CHLTCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "CHLT"
        
        "AutoHeadlightOn" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._AutoHeadlightOnCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'AutoHeadlightOn',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._AutoHeadlightSensitivityCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "AutoHeadlightOn"
        
        "SBS" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SmartBrakeSupportCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SmartBrakeSupport',
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SmartBrakeSupportCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "SBS"
        
        "SBS_SCBS" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SmartCityBreakSystemCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SBSSCBS',
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SmartCityBreakSystemCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "SBS_SCBS"
       
            "SBS_SCBS_J36IPM" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._SmartCityBreakSystemJ36IPMCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SBSSCBS',
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SmartCityBreakSystemJ36IPMCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "SBS_SCBS_J36IPM" 
            
            "SBS_SCBSReset_J36IPM" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'SBS_SCBSReset',     // Check Dict
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SBS_SCBS_J36IPMResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SBS_SCBSReset_J36IPM"
        
        "SBS_SCBSResetProgress_J36IPM" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'SBS_SCBSResetProgress',    // Check Dict
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SBS_SCBS_J36IPMResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SBSResetProgress"
        
        "SBS_SCBSResetError_J36IPM" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        },
                        button2 : {
                            labelId : "common.No", 
                            appData : "no" 
                        }
                    },
                    text1Id : 'SBS_SCBSResetError',     // Check Dict
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SBS_SCBS_J36IPMResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SBSResetError"
            
        "RVMVolume" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._RearviewMonitorBuzzerVolumeCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'RVMBuzzerVolume',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._RearviewMonitorBuzzerVolumeCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "RVMVolume"
		
        "Camera360View" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._TopViewMonitorCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : '360ViewCamera',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._TopViewMonitorCtxtTmpltReadyToDisplay.bind(this), 
        }, // end of "360TVM"		
        
        "BSMVolume" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._BlindSpotMonitorBuzzerVolumeCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'BSMBuzzerVolume',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._BlindSpotMonitorBuzzerVolumeCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "BSMVolume"

        "BSMSystem" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "Safetysettings",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._BlindSpotMonitorSystemCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'BSMSystem', //Need to update Dictornary
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._BlindSpotMonitorSystemCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "BSMSystem"

        "IntLightTimeoutDoorClosed" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._IntLightTimeoutDoorClosedCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'InterioLightsTimeOutDoorsClosed',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._IntLightTimeoutDoorClosedCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "IntLightTimeoutDoorClosed"
        
        "IntLightTimeoutDoorOpen" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._InteriorLightTimeoutDoorOpenCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'InterioLightsTimeOutDoorsOpen',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    selectCallback : this.listItemClick,  
                    "smallItemText" : true,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._InteriorLightTimeoutDoorOpenCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "IntLightTimeoutDoorOpen"

        "DoorLock" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._DoorLockCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'DoorLock',
                    },
                    "smallItemText" : true,
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._AutoDoorLockCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "DoorLock"
         
        "DoorLockMode" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._DoorLockModeManualTransmissionCtxtDataList, //Defaulting to Manualtransmssion
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'DoorLockMode',
                    },
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    selectCallback : this.listItemClick,   
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._DoorLockModeCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "DoorLock"
        
        "KeylessLockBeepVol" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._KeylessLockBeepVolCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'KeylessLockBeepVol',
                    },
                    selectCallback : this.listItemClick,  
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._KeylessLockBeepVolCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "KeylessLockBeepVol"
         
        "DoorRelockTime" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._DoorRelockTimeCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'DoorRelockTime',
                    },
                    selectCallback : this.listItemClick,  
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._DoorRelockTimeCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "DoorRelockTime"
        
        "UnlockMode" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._UnlockModeCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'UnlockMode',
                    },
                    selectCallback : this.listItemClick,  
                    checkMinChangeInterval : 1000,
                    checkSettleTime : 1500,
                    "smallItemText" : true,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._UnlockModeCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "UnlockMode"
         
        "TurnSettings" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._TurnSettingsCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'TurnSettings',
                    },
                    selectCallback : this.listItemClick,   
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._TurnSettingsCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "TurnSettings"
        
        "Lighting" : {
            "template" : "List2Tmplt",
            "leftBtnStyle" : "goBack",
            "sbNameId" : "VehicleSettings",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList": this._LightingCtxtDataList, 
                    titleConfiguration : 'listTitle',
                    // thickItems: true,
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'Lighting',
                    },
                    selectCallback : this.listItemClick,  
                    toggleMinChangeInterval : 1000,
                    toggleSettleTime : 1500,
                    "smallItemText" : true,
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._LightingCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "Lighting"

        //=========================== RESET CONTEXTS =======================
        "DRSSReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'DRSSReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._DRSSResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "DRSSReset"
        
        "DRSSResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'DRSSResetProgress',    
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "DRSSResetProgress"
        
        "DRSSResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        },
                        button2 : {
                            labelId : "common.No", 
                            appData : "no" 
                        }
                    },
                    text1Id : 'DRSSResetError',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._DRSSResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "DRSSResetError"
        
        "SBSReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'SBSReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SBSResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SBSReset"
        
        "SBSResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'SBSResetProgress',    
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "SBSResetProgress"
        
        "SBSResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        },
                        button2 : {
                            labelId : "common.No", 
                            appData : "no" 
                        }
                    },
                    text1Id : 'SBSResetError',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SBSResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SBSResetError"
        
        "SBS_SCBSReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'SBS_SCBSReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SBS_SCBSResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SBS_SCBSReset"
        
        "SBS_SCBSResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'SBS_SCBSResetProgress',    
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "SBS_SCBSResetProgress"
        
        "SBS_SCBSResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'SBS_SCBSResetError',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SBS_SCBSResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SBS_SCBSResetError"

        "FOWReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'FOWReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._FOWResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "FOWReset"
        
        "FOWResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'FOWResetProgress',    
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "FOWResetProgress"
        
        "FOWResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'FOWResetError',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._FOWResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "FOWResetError"

        "LDWSReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'LDWSReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._LDWSResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "LDWSReset"
        
        "LDWSResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'LDWSResetProgress',    
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "LDWSResetProgress"
        
        "LDWSResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'LDWSResetError',     
                    text2Id : 'LDWSResetErrorConfirmation',
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._LDWSResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "LDWSResetError"
        
        "LightingReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'LightingReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._LightingResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "LightingReset"
        
        "LightingResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'LightingResetProgress',    
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "LightingResetProgress"
        
        "LightingResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'LightingResetError',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._LightingResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "LightingResetError"
        
        
        "DoorLockReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'DoorLockReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._DoorLockResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "DoorLockReset"
        
        "DoorLockResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                    text1Id : 'DoorLockResetProgress',    
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "DoorLockResetProgress"
        
        "DoorLockResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'DoorLockResetError',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._DoorLockResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "DoorLockResetError"

        "TurnReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'TurnReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._TurnResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "TurnReset"
        
        "TurnProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14", 
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                    text1Id : 'TurnProgress',    
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "TurnProgress"
        
        "TurnResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'TurnResetError',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._TurnResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "TurnResetError"
        

        "HUDReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :   this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'HUDReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._HUDResetResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "HUDReset"
        
        "HUDProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    "fullScreen" : true,
                    "text1Id" : 'HUDResetProgress',
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._HUDResetProgressCtxtTmpltReadyToDisplay.bind(this),         
        }, // end of "HUDProgress"
        
        "HUDResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    initialFocus: 2,                    
                    buttonConfig : {
                        button1 : {
                            labelId : "common.Cancel", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Retry", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'HUDResetError',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._HUDResetResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "HUDResetError" 

        "HUDDisplayInfoReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "HUDDisplayInfoReset",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'HUDDisplayInfoReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._HUDDispInfoResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "HUDDisplayInfoReset"
        
        "HUDDisplayInfoResetProgress":{
         "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    "fullScreen" : true,
                    "text1Id" : 'HUDDisplayInfoResetProgress',
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "HUDDisplayInfoResetProgress"
        
        "HUDDisplayInfoResetError" : {
         "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    initialFocus: 2,                    
                    buttonConfig : {
                        button1 : {
                        labelId : "common.Cancel", 
                            appData : "Cancel"
                        },
                        button2 : {
                            labelId : "common.Retry", 
                            appData : "Retry" 
                        }
                    },
                    text1Id : 'HUDDisplayInfoError',     
                    initialFocus:2,
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._HUDDisplayInfoResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of HUDDisplayInfoResetError
        
        "LASReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'LASDefaultValues',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._LASResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "LASReset"
        
        "LASResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'ChangingLASSettings',    
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
        }, // end of "LASResetProgress"
        
        "LASResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "no" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "yes" 
                        }
                    },
                    text1Id : 'ErrorLASSettings',     
                    //text2Id : 'LASResetErrorConfirmation',
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._LASResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "LASResetError"

        //Speed Limit Reset 
        "SLIReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'SLIReset',     
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SLIResetCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SLIReset"
        
        "SLIResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle : "style14",  
                    text1Id : 'SLIResetProgress',    
                    "fullScreen" : true,
                    "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SLIResetProgressCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SLIResetProgress"
        
         "SLIResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle : "style02", 
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                        labelId : "common.Cancel", 
                            appData : "Global.No"    
                        },
                        button2 : {
                            labelId : "common.Retry", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'SLIResetError',     
                    //text2Id : 'LASResetErrorConfirmation',
                    "fullScreen" : true,
                } // end of properties for "DialogCtrl"                                       
            }, // end of list of controlProperties 
            "readyFunction" : this._SLIResetErrorCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "SLIResetError"
        
        
    //=========================== END RESET CONTEXTS =======================
    }; // 
    //@formatter:on 
    this._messageTable = {
        //General
        "IgnitionStatus" : this._IgnitionStatus_MsgHandler.bind(this),
        "Global.AtSpeed" : this._AtSpeedMsgHandler.bind(this),  
        "Global.NoSpeed" : this._NoSpeedMsgHandler.bind(this),
        "CanStatus" : this._CANStatusMsgHandler.bind(this),
		"HudType" : this._HudTypeMsgHandler.bind(this),
	    "TSRStatus" : this._TSRStatusMsgHandler.bind(this),
		"NAVIEquipped" : this._NAVIEquippedMsgHandler.bind(this),
        //HUD: ----------------------------------------------------------------------
        "Hud_Installed" : this._HudInstalledMsgHandler.bind(this),  
        "HUDHeight" : this._HudTiltMsgHandler.bind(this), 
        "HUDDisplay" : this._HudOnOffStatusMsgHandler.bind(this),
        "HUDBrightness" : this._HudIntensityMsgHandler.bind(this), 
        "HUDNavigation" : this._HudTurnByTurnMsgHandler.bind(this),   
        "HUDBrightnessControl" : this._HudAutoIntensityOnOffMsgHandler.bind(this), 
        "HUDCalibration"  : this._HudCalibrationMsgHandler.bind(this),
        "GetHUDRotation" : this._HudRotationMsgHandler.bind(this),      
        "Hud_ControlAllowed" : this._HudControlAllowedMsgHandler.bind(this),
        "HUDError" : this._HudErrorMsgHandler.bind(this),
        "GetHUDGSI" : this._SetGISValueMsgHandler.bind(this),
        "GetHUDStreet" : this._SetStreetValOnMsgHandler.bind(this),     
		"GetHUDNavigation" : this._CHUDNavigation.bind(this), 
        //SAFETY: ----------------------------------------------------------------------
        "GetLASIntervention" : this._InterventionMsgHandler.bind(this),
        "GetLASAlert" : this._LASAlertMsgHandler.bind(this),
        "GetDA" : this._DA_InstalledMsgHandler.bind(this),
        "ParkingSensor_Installed": this._PSI_InstalledMsgHandler.bind(this),//Verified
        "GetParkingSensor": this._ParkingSensorIndicationMsgHandler.bind(this),//Verified
        "SBS_Installed" : this._SBS_InstalledMsgHandler.bind(this),  
        "FOW_Installed" : this._FOW_InstalledMsgHandler.bind(this),
        "RVM_Installed" : this._RVM_InstalledMsgHandler.bind(this),  
        "BSM_Installed" : this._BSM_InstalledMsgHandler.bind(this),  
        "LDW_Installed" : this._LDW_InstalledMsgHandler.bind(this), 
        "DRSS_Installed" : this._DRSS_InstalledMsgHandler.bind(this),  
        "SCBS_Installed" : this._SCBS_InstalledMsgHandler.bind(this),  
        "Safety_Installed" : this._Safety_InstalledMsgHandler.bind(this), 
        "GetDRSS" : this._DRSS_DRSSMsgHandler.bind(this),
        "GetFOW" : this._FOW_WarningMsgHandler.bind(this),
        "GetSBS" : this._SBS_BrakeSupportMsgHandler.bind(this),
        "GetSBSDistance" : this._SBS_SCBS_DistanceMsgHandler.bind(this),
        "GetSCBS" : this._SBS_CityBrakeSystemMsgHandler.bind(this),
        "GetFOWDistance" : this._FOW_DistanceMsgHandler.bind(this),
        "GetBSMBuzzerVolume" : this._BSM_VolumeMsgHandler.bind(this), 
        "GetRVMBuzzerVolume" : this._RVM_VolumeMsgHandler.bind(this), 
        "GetSBSBuzzerVolume" : this._SBS_BuzzerVolumeMsgHandler.bind(this),
        "GetBuzzerSetting" : this._LAS_LDWS_BuzzerSettingMsgHandler.bind(this),
        "GetDRSSDistance" : this._DRSS_DRSSSensitivityMsgHandler.bind(this),
        "GetFOWBuzzerVolume" : this._FOW_BuzzerVolumeMsgHandler.bind(this), 
        "GetLDWSBuzzerVolume" : this._LAS_LDWS_BuzzerVolumeMsgHandler.bind(this),
        "GetLDWSTiming" : this._LAS_LDWS_TimingMsgHandler.bind(this),   
        "GetLDWSWarning" : this._LDWS_SensitivityWarningCancelationMsgHandler.bind(this),
        "SetSpeedLimitSign" : this._GetSpeedLimitSignMsgHandler.bind(this),
        "GetSBS_SCBS_DistanceJ36IPM" : this._SCBS_DistanceJ36IPMMsgHandler.bind(this),
        "BSMSystem_Status" : this._BSMSystem_statusMsgHandler.bind(this), 
        "NewBSM_Support" : this._NewBSM_SupportMsgHandler.bind(this), 
        
        "GetSLC" : this._SLCSettingMsgHandler.bind(this),
        "GetCautionSpeed" : this._CSSettingMsgHandler.bind(this),
        "GetSLS_HUD" : this._GetHeadUpDisplayMsgHandler.bind(this),
        "GetSLS_Center" : this._GetCenterDisplayMsgHandler.bind(this),
		
		"TVM_Installed" : this._TVMSettingsMsgHandler.bind(this),
		"GetTVMAutoViewStart" :	 this._GetTVMAutoViewStartMsgHandler.bind(this),
		"GetTVMVehiclePathLine" : this._GetTVMVehiclePathLineMsgHandler.bind(this),
		"GetTVMFrontViewDisplay" : this._GetTVMFrontViewDisplayMsgHandler.bind(this),

        //VEHICLE: ----------------------------------------------------------------------
        "GetSpeedAlarm"  :this._GoToSettingsMsgHandler.bind(this),
        "GetPrevSpeedAlarm"  :this._GetPrevSpeedAlarmMsgHandler.bind(this),
        "GetUnlockMode" : this._Keyless_UnlockModeMsgHandler.bind(this),
        "GetHBC" : this._Headlight_HighBeamControllMsgHandler.bind(this),
        "GetAFS": this._AFSMsgHandler.bind(this),
        "GetAutoDoorLockAT" : this._Vehicle_AutoDoorLockAT_MsgHandler.bind(this),
        "GetAutoDoorLockAT6" : this._Vehicle_AutoDoorLockAT6_MsgHandler.bind(this),
        "GetAutoDoorLockMT" : this._Vehicle_AutoDoorLockMT_MsgHandler.bind(this),
        "GetWalkAwayLock" : this._Keyless_WalkAwayLockMsgHandler.bind(this),
        "GetRainSensingWiper" : this._Safety_AutoWiperMsgHandler.bind(this), 
        "AutoWiper_Installed": this._AutoWiper_InstalledMsgHandler.bind(this), 
        "GetAutoRelockTimer" : this._Safety_AutoRelockTimerMsgHandler.bind(this),
        "Get3FlashTurnSignal" : this._Safety_3flashTurnSignalMsgHandler.bind(this),
        "GetDRL" : this._GetDaytimeRunningLightsMsgHandler.bind(this),
        "GetHeadlightOffTimer" : this._Headlight_HeadlightOffTimerMsgHandler.bind(this),
        "GetHeadlightOnWarning" : this._Headlight_HeadlightOnWaringMsgHandler.bind(this),
        "GetCHLT" : this._CHLTMsgHandler.bind(this),
        "GetLHL" : this._LHLMsgHandler.bind(this),
        "GetKeylessLockBeepVol" : this._Safety_AutoDoorLockChimeVolumeMsgHandler.bind(this), 
        "GetTurnSignalIndicatorVolume" : this._Safety_TurnSignalIndicatorVolumeMsgHandler.bind(this), 
        "GetAutoHeadlightSensitivity" : this._Headlight_AutoHeadlightsSensitivityMsgHandler.bind(this),
        "GetInteriorLightTimeoutDoorOpen" : this._Safety_InterioLightTimeoutDoorOpenMsgHandler.bind(this),
        "GetInteriorLightTimeoutDoorClosed" : this._Safety_InterioLightTimeoutDoorClosedMsgHandler.bind(this),
        "GetILB" : this._ILBSettingMsgHandler.bind(this),
        
        "set_failed": this._set_failedMsgHandler.bind(this),
        "HBC_Installed" : this._HBC_InstalledMsgHandler.bind(this),
        "AHBC_Installed" : this._AHBC_InstalledMsgHandler.bind(this),
        "LDWSSound_Installed" : this._LDWSSound_InstalledMsgHandler.bind(this),
        "AFS_Installed": this._AFS_InstalledMsgHandler.bind(this),
        "WalkAway_Installed" : this._WalkAway_InstalledMsgHandler.bind(this),
        "ThreeFlash_Installed" : this._ThreeFlash_InstalledMsgHandler.bind(this),
        "UnlockMode_Installed" : this._UnlockMode_InstalledMsgHandler.bind(this),
        "HeadlightON_Installed" : this._HeadlightON_InstalledMsgHandler.bind(this),
        "AutoDoorLockAT6_Installed" : this._AutoDoorLockAT6_InstalledMsgHandler.bind(this),
        "CHLT_Installed" : this._CHLT_InstalledMsgHandler.bind(this),
        "LHL_Installed" : this._LHL_InstalledMsgHandler.bind(this),
        "AutoDoorLockAT_Installed" : this._AutoDoorLockAT_InstalledMsgHandler.bind(this),
        "AutoDoorLockMT_Installed" : this._AutoDoorLockMT_InstalledMsgHandler.bind(this),
        "HeadOffTimer_Installed" : this._HeadOffTimer_InstalledMsgHandler.bind(this),
        "AutoDoorRelock_Installed" : this._AutoDoorRelock_InstalledMsgHandler.bind(this),
        "TurnSignalVolume_Installed" : this._TurnSignalVolume_InstalledMsgHandler.bind(this),
        "BuzzerAnswerback_Installed" : this._BuzzerAnswerback_InstalledMsgHandler.bind(this),
        "LightTimeoutDoorOpen_Installed" : this._LightTimeoutDoorOpen_InstalledMsgHandler.bind(this),
        "LightTimeoutDoorClosed_Installed" : this._LightTimeoutDoorClosed_InstalledMsgHandler.bind(this),
        "HeadlightAutoSensitivity_Installed" : this._HeadlightAutoSensitivity_InstalledMsgHandler.bind(this),
        "DRL_Installed" : this._DayTimeRunningLight_InstalledMsgHandler.bind(this),
        "DA_Installed" :  this._DriverAlert_InstalledMsgHandler.bind(this),
        "LAS_Installed" :  this._LaneAssistSystem_InstalledMsgHandler.bind(this),
        "VoltageStatus" : this._VoltageStatusMsgHandler.bind(this),
        "ILB_Installed" : this._InteriorLightiningBrightinessInstalledMsgHandler.bind(this),
        "SpeedAlarm_Installed" : this._SpeedAlarmInstalledMsgHandler.bind(this),
        "GetSBS_SCBS_J36IPM" : this._SBS_SCBS_J36IPM_BrakeSupportMsgHandler.bind(this),
        "SteeringWheelLoc" : this._SteeringWheelLocHandler.bind(this)
    };
    // end of this._messageTable
    // @formatter:on
    this.populateStatusArrayLighting(); //For Lighting
    this.populateStatusArrayDoorLock();//For Door lock 
    this.populateStatusArrayTurn();//For Turn
    this.populateStatusArrayAutoWiper();
    this.populateStatusArraySafetyTab();
    
    //Set default values for Shared Data at initialization
    framework.setSharedData(this.uiaId, "HudInstalled", false);
    framework.setSharedData(this.uiaId, "IgnitionStatus", true);
    framework.setSharedData(this.uiaId, "CanStatus", true);
};


 
/**************************
 * Context handlers
 **************************/

// HUDTab Context
vehsettingsApp.prototype._HUDTabCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_HUDTabCtxtTmpltReadyToDisplay called..."); 
    
    this.populateListCtrl(this._currentContextTemplate); 
    if (this._isListChanged === true)
    {
        if (params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
};

vehsettingsApp.prototype._HUDJ78TabCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_HUDJ78TabCtxtTmpltReadyToDisplay called...");   
    this.populateListCtrl(this._currentContextTemplate); 
};
vehsettingsApp.prototype._CHUDJ36CtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_CHUDJ36CtxtTmpltReadyToDisplay called...");   
    this.populateListCtrl(this._currentContextTemplate); 
};

vehsettingsApp.prototype._HUDDispInfoCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_HUDDispInfoCtxtTmpltReadyToDisplay called..."); 
    this.populateListCtrl(this._currentContextTemplate); 
};

vehsettingsApp.prototype._HUDDispInfoCtxtIn = function()
{
    log.debug("_HUDDispInfoCtxtIn called...");
	var region = framework.localize.getRegion();			
	if((framework.getSharedData("syssettings","DestinationCode") !== "SETTINGS_Destination_JP" ) && ((region !== "Region_Europe") && (region !=="Region_4A") && (region !=="Region_ChinaTaiwan")))
	{
		this._HUDDispInfoCtxtList = {
			itemCountKnown : true,
        itemCount: 3,
			items : [
				{ appData : 'SetHudNavigation', text1Id : 'NavigationSignal', hasCaret : false, itemStyle : 'styleOnOff', value : this._cachedNaviVal },
				{ appData : 'SelectHUDStreet', text1Id : 'StreetInformation',  hasCaret : true,itemStyle : 'style06', label1Id :    this._cachedStreetLabel, labelWidth : 'wide'},
				{ appData : 'SelectDisplayReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},
			]
		}	
	}
	else
	{
		this._HUDDispInfoCtxtList = {
			itemCountKnown : true,
            itemCount : 2,
			items : [
				{ appData : 'SetHudNavigation', text1Id : 'NavigationSignal', hasCaret : false, itemStyle : 'styleOnOff', value : this._cachedNaviVal },
				{ appData : 'SelectDisplayReset', text1Id : 'common.Tooltip_IcnUmpReset', hasCaret : false, itemStyle : 'style01'},
			]
		}
	}
    //this.populateListCtrl(this._currentContextTemplate); 
};

vehsettingsApp.prototype._StreetInfoCtxtTmpltReadyToDisplay = function()  //TODO: Remove streetinfo
{
    log.debug("_StreetInfoCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

vehsettingsApp.prototype._CHUDNavigationCtxtTmpltReadyToDisplay = function()
{
    log.debug("_CHUDNavigationCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

vehsettingsApp.prototype._CHUDNavigationCtxtIn = function()
{
    log.debug("_CHUDNavigationCtxtIn called...");
	var region = framework.localize.getRegion();			
    //this.populateListCtrl(this._currentContextTemplate);
	if((framework.getSharedData("syssettings","DestinationCode") !== "SETTINGS_Destination_JP" ) && ((region !== "Region_Europe") && (region !=="Region_4A") && (region !=="Region_ChinaTaiwan")))
	{
		this._CHUDNavigationInfoCtxtDataList = {
			itemCountKnown : true,
			itemCount : 4,
			items: [ 
				{ appData : 'SelectHUDNavigation', text1Id : 'CHudNav_Off', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
				{ appData : 'SelectHUDNavigation', text1Id : 'AdaptiveLaneStreetTurn', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
				{ appData : 'SelectHUDNavigation', text1Id : 'CHudNav_TBT_Lane', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
				{ appData : 'SelectHUDNavigation', text1Id : 'CHudNav_TBT_Street', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
			]
		};
		
		this._contextTable["HUDNavigation"]["controlProperties"]["List2Ctrl"]["dataList"] = this._CHUDNavigationInfoCtxtDataList;
	}
	else
	{
		this._CHUDNavigationInfoCtxtDataList = {
			itemCountKnown : true,
			itemCount : 2,
			items: [ 
				{ appData : 'SelectHUDNavigation', text1Id : 'CHudNav_Off', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
				{ appData : 'SelectHUDNavigation', text1Id : 'CHudNav_TBT_Lane', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'},  
			]
		};
		
		this._contextTable["HUDNavigation"]["controlProperties"]["List2Ctrl"]["dataList"] = this._CHUDNavigationInfoCtxtDataList;
	}	
};

vehsettingsApp.prototype._HUDDispInfoResetCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

// SafetyTab Context
vehsettingsApp.prototype._SafetyTabCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_SafetyTabCtxtTmpltReadyToDisplay called...");   
    this._cachedGetSpeedUnit = framework.localize.getDistanceUnit();
    
    this.populateListCtrl(this._currentContextTemplate);  

    if (this._isListChanged === true)
    {
        if (params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
};

// VehicleSettingsTab Context
vehsettingsApp.prototype._VehicleSettingsTabCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_VehicleSettingsTabCtxtTmpltReadyToDisplay called...");   
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    this.populateListCtrl(this._currentContextTemplate);  
    if (this._isListChanged === true)
    {
        if (params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
};

vehsettingsApp.prototype._GoToSettingsMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        var settingVal = msg.params.payload.evData; 
        this._cachedGetSpeedUnit = framework.localize.getDistanceUnit();
        log.info("GoToSettingsMsgHandler called with payload" + settingVal);
        
        //Can signal 1 means Speed Alarm is Off and range is between 2 to 51
         if (settingVal !== 1)
        {
            this._cachedSettingValOnOff = "SpeedAlarm_On";
        }
        else
        {
            this._cachedSettingValOnOff = "SpeedAlarm_Off";
            
        }
        
        //Boundary check added for Can Signal for Speed Alarm
        if(this._cachedGetSpeedUnit === "Kilometers")
        {
            if(settingVal >=2 && settingVal <= 30)
            {
                settingVal = 30; // For Kilometers value between 2 and 30 will always be 30
            }
            else if(settingVal >250)
            {
                settingVal = 250; // For Kilometers value greater then 250 will always be 250
            }
        }
        else
        {
            if(settingVal >=2 && settingVal <= 20)
            {
                settingVal = 20; // For Miles value between 2 and 20 will always be 20
            }
            else if(settingVal >150)
            {
                settingVal = 150; // For Miles value greater then 150 will always be 150
            }
            
        }
        log.info("Distance Unit  = "+this._cachedGetSpeedUnit + " Value after boundary change = "+settingVal);
    
        // 1 (i.e. off) is not a valid value for previousSpeedAlarmTime
        if (1 != this._currentValue)
        {
            this._previousSpeedAlarmTime = this._currentValue;
        }
        this._currentValue = settingVal;
    
        // populate
        if(this._cachedSettingValOnOff === "SpeedAlarm_On" )
        {
            if(this._currentContext && this._currentContext.ctxtId === "SpeedAlarm" && this._currentContextTemplate)
            {
                this._currentContextTemplate.list2Ctrl.setToggleValue(0,1);
            }
            this._cachedSpeedalarm = "on";
        }   
        else
        {
            if(this._currentContext && this._currentContext.ctxtId === "SpeedAlarm" && this._currentContextTemplate)
            {
                this._currentContextTemplate.list2Ctrl.setToggleValue(0,2);
            }
            this._cachedSpeedalarm = "Off";
        }

        // SW00170572
        // Only update the GUI list control if we're in an appropriate context and something's changed
        if (this._currentContext &&
            (this._currentContext.ctxtId === "VehicleSettingsTab" || this._currentContext.ctxtId === "SpeedAlarm") &&
            this._currentContextTemplate)
        {
            this._populateListCtrl(this._currentContextTemplate);
        }
    }
};

//Msg handler to get the previous speed Alarm
vehsettingsApp.prototype._GetPrevSpeedAlarmMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        this._previousSpeedAlarmTime = msg.params.payload.evData;
    }
}

// MIDSettings Context
vehsettingsApp.prototype._MIDSettingsCtxtTmpltReadyToDisplay = function()
{
    log.debug("_MIDSettingsCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate);     
};

// DistanceRecoSupportSystem Context
vehsettingsApp.prototype._DistanceRecoSupportSystemCtxtTmpltReadyToDisplay = function()
{
    log.debug("_DistanceRecoSupportSystemCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
};

//LAS
vehsettingsApp.prototype._LASCtxtTmpltReadyToDisplay = function()
{
    log.debug("_LASCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate);
};

// ForwardObstructionWarning Context
vehsettingsApp.prototype._LASSoundCtxtTmpltReadyToDisplay = function()
{
    log.debug("_LASSoundCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

// ForwardObstructionWarning Context
vehsettingsApp.prototype._ForwardObstructionWarningCtxtTmpltReadyToDisplay = function()
{
    log.debug("_ForwardObstructionWarningCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

// LDWS Context
vehsettingsApp.prototype._LDWSCtxtTmpltReadyToDisplay = function()
{
    log.debug("_LDWSCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate);
    
};

vehsettingsApp.prototype._SelectSpeedLimitInformationCtxtTmpltReadyToDisplay = function()
{
    log.debug("_SelectSpeedLimitInformationReadyToDisplay called..."); 
    this.populateListCtrl(this._currentContextTemplate);  
};

vehsettingsApp.prototype._SelectSpeedLimitInformationCtxtTmpltReadyToDisplayWHUD = function()
{
    log.debug("_SelectSpeedLimitInformationReadyToDisplay called...");
	if(this._TSRStatus === "TSR_Enabled") //display string as Traffic Sign Display
	{
	  this._currentContextTemplate.list2Ctrl.setTitle({titleStyle : 'style02', text1Id: 'TSR_System'});
	}
	else
	{
	  this._currentContextTemplate.list2Ctrl.setTitle({titleStyle : 'style02', text1Id: 'SpeedLimitInformation'});	
	}

    this.populateListCtrl(this._currentContextTemplate);  
};

vehsettingsApp.prototype._SelectSpeedLimitSignCtxtTmpltReadyToDisplay = function()
{
    log.debug("_SelectSpeedLimitSignCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate);   
};

vehsettingsApp.prototype._SelectSpeedLimitCautionCtxtTmpltReadyToDisplay = function()
{
    log.debug("_SelectSpeedLimitCautionCtxtTmpltReadyToDisplay called...");
    log.info("this._CurrentUnit = "+this._CurrentUnit);
    this.populateListCtrl(this._currentContextTemplate);
};

vehsettingsApp.prototype._SelectSpeedAlarmCtxtTmpltReadyToDisplay = function()
{
    log.debug("SelectSpeedAlarmCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate);
};

vehsettingsApp.prototype._SelectSpeedAlarmnoLongerDisplayedFunction = function()
{
    log.debug("_SelectSpeedAlarmnoLongerDisplayedFunction called...");
	this._SpeedAlarmTime = false;
    
};

vehsettingsApp.prototype._SelectCautionSpeedCtxtTmpltReadyToDisplay = function()
{
    this._cachedGetSpeedUnit = framework.localize.getDistanceUnit();
    log.debug("_SelectCautionSpeedCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate);  
};

vehsettingsApp.prototype._SLIResetCtxtTmpltReadyToDisplay= function()
{
    if((this._HudType === "WHUD_color" || this._HudType === "CHUD_color" ) &&(this._TSRStatus === "TSR_Enabled"))
    {
      this._currentContextTemplate.dialog3Ctrl.setText1Id("TSRReset");
    }
    else
    {
      this._currentContextTemplate.dialog3Ctrl.setText1Id("SLIReset");
    }
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._SLIResetErrorCtxtTmpltReadyToDisplay= function()
{
    if((this._HudType === "WHUD_color" || this._HudType === "CHUD_color" ) &&(this._TSRStatus === "TSR_Enabled"))
    {
      this._currentContextTemplate.dialog3Ctrl.setText1Id("TSRResetError");
    }
    else
    {
      this._currentContextTemplate.dialog3Ctrl.setText1Id("SLIResetError");
    }
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._SLIResetProgressCtxtTmpltReadyToDisplay= function()
{
    if((this._HudType === "WHUD_color" || this._HudType === "CHUD_color" ) &&(this._TSRStatus === "TSR_Enabled"))
    {
      this._currentContextTemplate.dialog3Ctrl.setText1Id("TSRResetProgress");
    }
    else
    {
      this._currentContextTemplate.dialog3Ctrl.setText1Id("SLIResetProgress");
    }
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};
// LDWSTiming Context
vehsettingsApp.prototype._LDWSTimingCtxtTmpltReadyToDisplay = function()
{
    log.debug("_LDWSTimingCtxtTmpltReadyToDisplay called...");   
    this.populateListCtrl(this._currentContextTemplate);  
};

//LASTiming Context
vehsettingsApp.prototype._LASTimingCtxtTmpltcontextInFunction = function()
{
    log.debug("_LASTimingCtxtTmpltcontextInFunction called...");   
    var LASTimingCtxtDataList = null;
    if(this._cachedIntervention === "LAS_Intervention_On")
    {
        this._contextTable["LASTiming"]["controlProperties"]["List2Ctrl"]["title"]["text1Id"] = "InterventionTiming";
         LASTimingCtxtDataList = {
            itemCountKnown : true,
            itemCount : 2,
            items: [ 
                { appData : 'SetLDWSTiming', text1Id : 'LASEarly', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
                { appData : 'SetLDWSTiming', text1Id : 'LASLate', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            ]
        };
    }
    else
    {
        this._contextTable["LASTiming"]["controlProperties"]["List2Ctrl"]["title"]["text1Id"] = "AlertTiming";
        LASTimingCtxtDataList = {
            itemCountKnown : true,
            itemCount : 4,
            items: [ 
                { appData : 'SetLDWSTiming', text1Id : 'Adaptive', image1:'tick', checked:true, hasCaret : false, itemStyle : 'style03'}, 
                { appData : 'SetLDWSTiming', text1Id : 'LASEarly', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
                { appData : 'SetLDWSTiming', text1Id : 'Med', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
                { appData : 'SetLDWSTiming', text1Id : 'LASLate', image1:'tick', checked:false, hasCaret : false, itemStyle : 'style03'}, 
            ]
        };
    }
    this._contextTable["LASTiming"]["controlProperties"]["List2Ctrl"]["dataList"] = LASTimingCtxtDataList;
};

//LASTiming Context
vehsettingsApp.prototype._LASTimingCtxtTmpltReadyToDisplay = function()
{
    log.debug("_LASTimingCtxtTmpltReadyToDisplay called...");   
    this.populateListCtrl(this._currentContextTemplate);  
};

// _HeadlightOffTimer  Context
vehsettingsApp.prototype._HeadlightOffTimerCtxtTmpltReadyToDisplay = function()
{
    log.debug("_HeadlightOffTimerCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

//CHLT
vehsettingsApp.prototype._CHLTCtxtTmpltReadyToDisplay = function()
{
    if(this._currentContextTemplate)
    {
        if (this.cachedSpeed != null)
        {
            this._DisableSpeedRestricted();
        }
        
        log.debug("_CHLTCtxtTmpltReadyToDisplay called...");
        this.populateListCtrl(this._currentContextTemplate);
    }
};

// AutoHeadlightSensitivity Context
vehsettingsApp.prototype._AutoHeadlightSensitivityCtxtTmpltReadyToDisplay = function()
{
    log.debug("_AutoHeadlightSensitivityCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};
// KeylessSettings Context
vehsettingsApp.prototype._KeylessSettingsCtxtTmpltReadyToDisplay = function()
{
    log.debug("_KeylessSettingsCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

//  SmartBrakeSupport Context
vehsettingsApp.prototype._SmartBrakeSupportCtxtTmpltReadyToDisplay = function()
{
    log.debug("_SmartBrakeSupportCtxtTmpltReadyToDisplay called...");
    if (framework.localize.getRegion() == "Region_Europe")
    {
        this._currentContextTemplate.list2Ctrl.setDataList(this._SmartBrakeSupportHelperCtxtDataList);
        this.populateListCtrl(this._currentContextTemplate);
    }
    else
    {
        this.populateListCtrl(this._currentContextTemplate);
    }
};

//  SmartCityBreakSystem Context
vehsettingsApp.prototype._SmartCityBreakSystemCtxtTmpltReadyToDisplay = function()
{
    log.debug("_SmartCityBreakSystemCtxtTmpltReadyToDisplay called...");
    if (framework.localize.getRegion() == "Region_Europe")
    {
        this._currentContextTemplate.list2Ctrl.setDataList(this._SmartCityBreakSystemHelperCtxtDataList);
        this.populateListCtrl(this._currentContextTemplate);
    }
    else
    {
        this.populateListCtrl(this._currentContextTemplate);
    } 
};

// SCBS Context for J36IPM 
vehsettingsApp.prototype._SmartCityBreakSystemJ36IPMCtxtTmpltReadyToDisplay = function()
{
    log.debug("_SmartCityBreakSystemJ36IPMCtxtTmpltReadyToDisplay called...");
    if(!this._cachedSBS_Installed)
    {
            this._currentContextTemplate.list2Ctrl.setTitle({titleStyle : 'style02', text1Id: 'SCBS'});
    }
        this.populateListCtrl(this._currentContextTemplate);
};


//  RearviewMonitorBuzzerVolume Context
vehsettingsApp.prototype._RearviewMonitorBuzzerVolumeCtxtTmpltReadyToDisplay = function()
{
    log.debug("_RearviewMonitorBuzzerVolumeCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

//  TopViewMonitor Context
vehsettingsApp.prototype._TopViewMonitorCtxtTmpltReadyToDisplay = function()
{
    log.debug("_TopViewMonitorCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

//  BlindSpotMonitorBuzzerVolume Context
vehsettingsApp.prototype._BlindSpotMonitorBuzzerVolumeCtxtTmpltReadyToDisplay = function()
{
    log.debug("_BlindSpotMonitorBuzzerVolumeCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

//BlindSpotMonitorSystem Context
vehsettingsApp.prototype._BlindSpotMonitorSystemCtxtTmpltReadyToDisplay = function()
{
    log.debug("_BlindSpotMonitorSystemCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};


// IntLightTimeoutDoorClosed Context
vehsettingsApp.prototype._IntLightTimeoutDoorClosedCtxtTmpltReadyToDisplay = function()
{
    log.debug("_IntLightTimeoutDoorClosedCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

// InteriorLightTimeoutDoorOpen Context
vehsettingsApp.prototype._InteriorLightTimeoutDoorOpenCtxtTmpltReadyToDisplay = function()
{
    log.debug("_InteriorLightTimeoutDoorOpenCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

// AutoDoorLockChimeVolume Context
vehsettingsApp.prototype._KeylessLockBeepVolCtxtTmpltReadyToDisplay = function()
{
    log.debug("_KeylessLockBeepVolCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
};
 
// DoorRelockTime Context
vehsettingsApp.prototype._DoorRelockTimeCtxtTmpltReadyToDisplay = function()
{
    log.debug("_DoorRelockTimeCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
};

// UnlockMode Context
vehsettingsApp.prototype._UnlockModeCtxtTmpltReadyToDisplay = function()
{
    log.debug("_UnlockModeCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
};

// AutoDoorLock Context
vehsettingsApp.prototype._AutoDoorLockCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_AutoDoorLockCtxtTmpltReadyToDisplay called...");
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    this.populateListCtrl(this._currentContextTemplate);
    if (this._isListChanged === true)
    {
        if (params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
};

//Lighting Context
vehsettingsApp.prototype._LightingCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_LightingCtxtTmpltReadyToDisplay called...");
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    this.populateListCtrl(this._currentContextTemplate);
    if (this._isListChanged === true)
    {
        if (params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
};

vehsettingsApp.prototype._SelectILBCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_SelectILBCtxtTmpltReadyToDisplay called...");
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    this.populateListCtrl(this._currentContextTemplate);
    if (this._isListChanged === true)
    {
        if (params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
};

// DoorLockMode Context
vehsettingsApp.prototype._DoorLockModeCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_DoorLockModeCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    
    if (this._isListChanged === true)
    {
        if (params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
};

// TurnSettings Context
vehsettingsApp.prototype._TurnSettingsCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_TurnSettingsCtxtTmpltReadyToDisplay called...");
    this.populateListCtrl(this._currentContextTemplate); 
    if (this._isListChanged === true)
    {
        if (params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();    
};

//DoorLock Reset
vehsettingsApp.prototype._DoorLockResetCtxtTmpltReadyToDisplay = function()
{
    log.debug("vehsettingsApp _DoorLockResetCtxtTmpltReadyToDisplay called...");
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//DoorLock Reset Error
vehsettingsApp.prototype._DoorLockResetErrorCtxtTmpltReadyToDisplay = function()
{
    log.debug("vehsettingsApp _DoorLockResetCtxtTmpltReadyToDisplay called...");
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//Turn Reset
vehsettingsApp.prototype._TurnResetCtxtTmpltReadyToDisplay= function()
{
    log.debug("vehsettingsApp _TurnResetCtxtTmpltReadyToDisplay called...");
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//Turn ResetError
vehsettingsApp.prototype._TurnResetErrorCtxtTmpltReadyToDisplay= function()
{
    log.debug("vehsettingsApp _TurnResetErrorCtxtTmpltReadyToDisplay called...");

    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//HUDReset
vehsettingsApp.prototype._HUDResetResetCtxtTmpltReadyToDisplay= function()
{
    log.debug("vehsettingsApp _TurnResetErrorCtxtTmpltReadyToDisplay called...");
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//HUDResetError
vehsettingsApp.prototype._HUDResetResetErrorCtxtTmpltReadyToDisplay= function()
{
    log.debug("vehsettingsApp _TurnResetErrorCtxtTmpltReadyToDisplay called...");
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//HUDResetProgress
vehsettingsApp.prototype._HUDResetProgressCtxtTmpltReadyToDisplay= function()
{
    log.debug("vehsettingsApp _HUDResetProgressCtxtTmpltReadyToDisplay called...");
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//HUDDisplayInfoResetError
vehsettingsApp.prototype._HUDDisplayInfoResetErrorCtxtTmpltReadyToDisplay= function()
{
    log.debug("vehsettingsApp _TurnResetErrorCtxtTmpltReadyToDisplay called...");
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//LightingReset
vehsettingsApp.prototype._LightingResetCtxtTmpltReadyToDisplay= function()
{
    log.debug("vehsettingsApp _TurnResetErrorCtxtTmpltReadyToDisplay called...");
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

//LightingResetError
vehsettingsApp.prototype._LightingResetErrorCtxtTmpltReadyToDisplay= function()
{
    log.debug("vehsettingsApp _TurnResetErrorCtxtTmpltReadyToDisplay called...");
    this.cachedSpeed = framework.common.getAtSpeedValue();
    if (this.cachedSpeed != null)
        this._DisableSpeedRestricted();
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

vehsettingsApp.prototype._DRSSResetCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._DRSSResetErrorCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._SBSResetCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }   
};

vehsettingsApp.prototype._SBSResetErrorCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

// SBS_SCBS_J36IPM Handler
vehsettingsApp.prototype._SBS_SCBS_J36IPMResetErrorCtxtTmpltReadyToDisplay= function()
{
     if(!this._cachedSBS_Installed)
    {
        switch(this._currentContext.ctxtId)
        {
            case "SBS_SCBSReset_J36IPM":
                this._currentContextTemplate.dialog3Ctrl.setText1Id("SCBSReset");
            break;

            case "SBS_SCBSResetProgress_J36IPM":
                this._currentContextTemplate.dialog3Ctrl.setText1Id("SCBSResetProgress");
            break;

            case "SBS_SCBSResetError_J36IPM":
                this._currentContextTemplate.dialog3Ctrl.setText1Id("SCBSResetError");
            break;
        }
    }

    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};


vehsettingsApp.prototype._SBS_SCBSResetCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._SBS_SCBSResetErrorCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._FOWResetErrorCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._FOWResetCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._LDWSResetCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._LDWSResetErrorCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._LASResetCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};

vehsettingsApp.prototype._LASResetErrorCtxtTmpltReadyToDisplay= function()
{
    if(this._currentContextTemplate)
    {
        this._populateDialogCtrl(this._currentContextTemplate); 
    }
};
/*******************************************************************************
 * Message handlers
 ******************************************************************************/
// Safety
vehsettingsApp.prototype._DA_InstalledMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("DA msg Handler called with msg" + msg);
        this._cachedDA = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._LASAlertMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("LASalert msg handler called with msg" + msg);
        this._cachedLASAlert = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "LAS")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._ParkingSensorIndicationMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.parkingSensorSetting != null && msg.params.payload.parkingSensorSetting != undefined)
    {
        log.debug("ParkingSensorIndication msg handler called with msg" + msg.params.payload.parkingSensorSetting);
        this._cachedPSI = msg.params.payload.parkingSensorSetting; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._InterventionMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("Intervention msg handler called with msg" + msg);
        this._cachedIntervention = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "LAS")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._SLCSettingMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData )
    {
        log.debug("_SLCSettingMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedSpeedLimitCaution = msg.params.payload.evData; 
        
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._cachedSpeedLimitCaution)
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};
    
vehsettingsApp.prototype._CSSettingMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData )
    {
        log.debug("_CSSettingMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedSpeed = msg.params.payload.evData;
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            this.populateListCtrl(this._currentContextTemplate);
        }
    }
};

vehsettingsApp.prototype._GetSpeedLimitSignMsgHandler = function(msg)
{
    if(msg.params.payload.evData == 1)
    {
        this._SelectSpeedLimitSignCtxtDataList.item[0].value = 1;
    }
    else if (msg.params.payload.evData == 2)
    {
        this._SelectSpeedLimitSignCtxtDataList.item[1].value = 1;
    }
};

vehsettingsApp.prototype._GetCenterDisplayMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("_GetCenterDisplayMsgHandler called with msg" + msg);
        this._cachedCDVal = (msg.params.payload.evData)==="SLS_Center_On"?1:2; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            this.populateListCtrl(this._currentContextTemplate);
        }
    }
};

vehsettingsApp.prototype._TVMSettingsMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("_TVMSettingsMsgHandler called with msg" + msg);
		this._cachedTVMStatus = msg.params.payload.evData;
		
		if(this._cachedTVMStatus === 1)
		{
			this.statusArraySafetyTab[this._SafetyTabIndex["Camera360View"]] = true;
		}
		else
		{
			this.statusArraySafetyTab[this._SafetyTabIndex["Camera360View"]] = false;
		}
		
		if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SafetyTab")
        {
            this.populateListCtrl(this._currentContextTemplate);
        }
    }
};

vehsettingsApp.prototype._GetTVMAutoViewStartMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("_GetTVMAutoViewStart evData:" + msg.params.payload.evData);
		
        switch(msg.params.payload.evData)
        {
            case "On":
                this._cachedTVMAVSStatus = 1;
                break;
            case "Off":
                this._cachedTVMAVSStatus = 2;
                break;
            default:
                break;
        }

		if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "Camera360View")
        {
            this._currentContextTemplate.list2Ctrl.setToggleValue(0,this._cachedTVMAVSStatus);
        }		
    }
};

vehsettingsApp.prototype._GetTVMVehiclePathLineMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("_GetTVMVehiclePathLineMsgHandler EvData:" + msg.params.payload.evData);
		
        switch(msg.params.payload.evData)
        {
            case "On":
                this._cachedTVMVPLStatus = 1;
                break;
            case "Off":
                this._cachedTVMVPLStatus = 2;
                break;
            default:
                break;
        }		

		if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "Camera360View")
        {
            this._currentContextTemplate.list2Ctrl.setToggleValue(1,this._cachedTVMVPLStatus);
        }		
    }
};

vehsettingsApp.prototype._GetTVMFrontViewDisplayMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("_GetTVMFrontViewDisplayMsgHandler EvData:" + msg.params.payload.evData);

        switch(msg.params.payload.evData)
        {
            case "On":
                this._cachedTVMFVDStatus = 1;
                break;
            case "Off":
                this._cachedTVMFVDStatus = 2;
                break;
            default:
                break;
        }		
		
		if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "Camera360View")
        {
            this._currentContextTemplate.list2Ctrl.setToggleValue(2,this._cachedTVMFVDStatus);
        }		
    }
};

vehsettingsApp.prototype._GetHeadUpDisplayMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("_GetHeadUpDisplayMsgHandler called with msg" + msg);
        this._cachedHUDVal = (msg.params.payload.evData)==="SLS_HUD_On"?1:2; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            this.populateListCtrl(this._currentContextTemplate);
        }
    }
};
    
vehsettingsApp.prototype._ILBSettingMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData )
    {
        log.debug("_ILBSettingMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedILB = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "IntLightingBrightness" || this._currentContext.ctxtId === "Lighting")
            {
                if (this._cachedILB)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};


// HudOnOffStatus
vehsettingsApp.prototype._HudOnOffStatusMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("_HudOnOffStatusMsgHandler called with msg" + msg);
        this._cachedHudOnOffStatus = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "HUDTab")
            {
                this._currentContextTemplate.list2Ctrl.setToggleValue(4,this._cachedHudOnOffStatus);
                this.populateListCtrl(this._currentContextTemplate);
            }
            else if(this._currentContext.ctxtId === "HUDTabJ78")
            {
                this._currentContextTemplate.list2Ctrl.setToggleValue(5,this._cachedHudOnOffStatus);
                this.populateListCtrl(this._currentContextTemplate);
            }   
            else if(this._currentContext.ctxtId === "HUDTabJ36")
            {
				//this._currentContextTemplate.list2Ctrl.setToggleValue(5,this._cachedHudOnOffStatus);
                this._currentContextTemplate.list2Ctrl.setToggleValue(4,this._cachedHudOnOffStatus);
                this.populateListCtrl(this._currentContextTemplate);
            }  			
        }
    }
};

vehsettingsApp.prototype._HudControlAllowedMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("._HudControlAllowedMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedHudControlAllowed = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "HUDTab" || this._currentContext.ctxtId === "HUDTabJ78"|| this._currentContext.ctxtId === "HUDTabJ36")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// HudTilt
vehsettingsApp.prototype._HudTiltMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("_HudTiltMsgHandler called with msg" + msg);
        this._cachedHudTilt = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "HUDTab" || this._currentContext.ctxtId === "HUDTabJ78"|| this._currentContext.ctxtId === "HUDTabJ36")
            {
                if (this._cachedHudTilt != null && this._cachedHudTilt != undefined)
                {                
                    this._currentContextTemplate.list2Ctrl.setSliderValue(0,this._cachedHudTilt);
                }
             }
        }
    }
};

// HudAutoIntensityOnOff
vehsettingsApp.prototype._HudAutoIntensityOnOffMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("_HudAutoIntensityOnOffMsgHandler called with msg" + msg);
        this._cachedHudAutoIntensityOnOff = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "HUDTab" || this._currentContext.ctxtId === "HUDTabJ78"|| this._currentContext.ctxtId === "HUDTabJ36")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// HudIntensity
vehsettingsApp.prototype._HudIntensityMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("_HudIntensityMsgHandler called with msg" + msg);
        
        this._cachedHudIntensity = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "HUDTab" || this._currentContext.ctxtId === "HUDTabJ78"|| this._currentContext.ctxtId === "HUDTabJ36")
            {
                if (this._cachedHudIntensity != null && this._cachedHudIntensity != undefined)
                {
                    if(this._cachedHudAutoIntensityOnOff === 2)
                    {
                        this._currentContextTemplate.list2Ctrl.setSliderValue(2,this._cachedHudIntensity);
                    }
                }
            }
        }
    }
};

vehsettingsApp.prototype._HudCalibrationMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("_HudIntensityMsgHandler called with msg" + msg);
        this._cachedHudCalibration = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "HUDTab" || this._currentContext.ctxtId === "HUDTabJ78"|| this._currentContext.ctxtId === "HUDTabJ36")
            {    
                if (this._cachedHudCalibration != null && this._cachedHudCalibration != undefined)
                {
                    if(this._cachedHudAutoIntensityOnOff === 1)
                    {
                        this._currentContextTemplate.list2Ctrl.setSliderValue(2,this._cachedHudCalibration);
                    }
                }       
                
            }
        }
    }
};

//HUDRoatation
vehsettingsApp.prototype._HudRotationMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("HudRot msg rotVal" + msg.params.payload.evData);
        var rotationalValue = msg.params.payload.evData;
        switch(rotationalValue)
        {
            case "Level_minus_1":
                this._cachedRotationVal = -1;
                break;
            case "Level_minus_2":
                this._cachedRotationVal = -2;
                break;
            case "Level_minus_3":
                this._cachedRotationVal = -3;
                break;
            case "Level_Default":
                this._cachedRotationVal = 0;
                break;
            case "Level_plus_1":
                this._cachedRotationVal = 1;
                break;
            case "Level_plus_2":
                this._cachedRotationVal = 2;
                break;
            case "Level_plus_3":
                this._cachedRotationVal = 3;
                break;
            default:
                break;                          
        }   
            
        if (this._cachedRotationVal != null && this._cachedRotationVal != undefined)
        {                   
            if (this._currentContext && this._currentContextTemplate)
            {   
                if (this._currentContext.ctxtId === "HUDTabJ78")
                {
                    this._currentContextTemplate.list2Ctrl.setSliderValue(3,this._cachedRotationVal);
                }   
            }
        }
    }
};


//GIS value
vehsettingsApp.prototype._SetGISValueMsgHandler = function(msg)
{
    log.debug("GetHUDGSI is Deprecated MsgID. Should be removed from MMUI also");
};

//Street
vehsettingsApp.prototype._SetStreetValOnMsgHandler = function(msg)
{
    log.debug("_SetStreetValOnMsgHandler received", msg.params.payload.evData); 
    this._cachedStreetInfoindex = msg.params.payload.evData;
    switch(msg.params.payload.evData)
    {
        case "Street_Always":
            this._cachedStreetLabel = "Always";
            break;
        case "Street_On_Demand":
            this._cachedStreetLabel = "CHudNav_Maneuver";
            break;
        case "Street_Off":
            this._cachedStreetLabel = "Streetinfo_off";
            break;
        default: 
            log.warn("EvData value incorrect ");
            break;          
    }
    if(this._currentContext && this._currentContextTemplate)
    {
        this.populateListCtrl(this._currentContextTemplate);
    }
};

//CHUDJ36NaviInfo
vehsettingsApp.prototype._CHUDNavigation = function(msg)
{
    log.debug("_CHUDNavigation received", msg.params.payload.evData); 
    this._cachedCHudNavindex = msg.params.payload.evData;
	var region = framework.localize.getRegion(); 
	if((framework.getSharedData("syssettings","DestinationCode") !== "SETTINGS_Destination_JP" ) && ((region !== "Region_Europe") && (region !=="Region_4A") && (region !=="Region_ChinaTaiwan")))
	{
		switch(msg.params.payload.evData)
		{
			case "Navigation_Off":
				this._cachedCHudNavLabel = "CHudNav_Off";
				break;
			case "Navigation_Maneuver":
				this._cachedCHudNavLabel = "AdaptiveLaneStreetTurn";
				break;
			case "Navigation_LaneGuidance":
				this._cachedCHudNavLabel = "CHudNav_TBT_Lane";
				break;
			case "Navigation_Streetname":
				this._cachedCHudNavLabel = "CHudNav_TBT_Street";
				break;
			default: 
				log.warn("EvData value incorrect ");
				break;          
		}
	}
	else
	{
		switch(msg.params.payload.evData)
		{
			case "Navigation_Off":
				this._cachedCHudNavLabel = "CHudNav_Off";
				break;
			case "Navigation_LaneGuidance":
				this._cachedCHudNavLabel = "CHudNav_TBT_Lane";
				break;
			default: 
				log.warn("EvData value incorrect ");
				break;          
		}		
	}
    if(this._currentContext && this._currentContextTemplate)
    {
        this.populateListCtrl(this._currentContextTemplate);
    }
};
// HudTurnByTurn
vehsettingsApp.prototype._HudTurnByTurnMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("_HudTurnByTurnMsgHandler evData:" + msg.params.payload.evData);
        this._cachedNaviVal = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "HUDTab")
            {
                this._currentContextTemplate.list2Ctrl.setToggleValue(3,this._cachedNaviVal);
            }
            else if (this._currentContext.ctxtId === "HUDDisplayInformation")
            {   
                this._currentContextTemplate.list2Ctrl.setToggleValue(0,this._cachedNaviVal);
				var region = framework.localize.getRegion(); 
				if((framework.getSharedData("syssettings","DestinationCode") !== "SETTINGS_Destination_JP" ) && ((region !== "Region_Europe") && (region !=="Region_4A") && (region !=="Region_ChinaTaiwan")))
				{
					if(this._cachedNaviVal === 1)
					{	
						if(this._cachedSDcardStatus == "On")
						{
							this._HUDDispInfoCtxtList.items[1].disabled = false;
							this._HUDDispInfoCtxtList.items[1].itemStyle ='style06';
							this._HUDDispInfoCtxtList.items[1].label1Id = this._cachedStreetLabel;
							this._HUDDispInfoCtxtList.items[1].hasCaret = true;
							this._HUDDispInfoCtxtList.items[1].labelWidth = 'wide';					
						}
						else
						{
							this._HUDDispInfoCtxtList.items[1].disabled = true;
							this._HUDDispInfoCtxtList.items[1].itemStyle ='style06';
							this._HUDDispInfoCtxtList.items[1].label1Id = this._cachedStreetLabel;
							this._HUDDispInfoCtxtList.items[1].hasCaret = false;
							this._HUDDispInfoCtxtList.items[1].labelWidth = 'wide';					
						}

					}
					else
					{
						this._HUDDispInfoCtxtList.items[1].itemStyle ='style01';
						this._HUDDispInfoCtxtList.items[1].hasCaret = false;
						this._HUDDispInfoCtxtList.items[1].disabled = true;
					}
				}	
                this._currentContextTemplate.list2Ctrl.setDataList(this._HUDDispInfoCtxtList);
                this._currentContextTemplate.list2Ctrl.updateItems(0,this._HUDDispInfoCtxtList.itemCount - 1);              
            }                       
        }
    }
};

// HudInstalled
vehsettingsApp.prototype._HudInstalledMsgHandler = function(msg)
{ 
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("_HudInstalledMsgHandler evData:" + msg.params.payload.evData); 
        if (msg && msg.params.payload)
        {
            if (msg.params.payload.evData == 0)
            {
                framework.setSharedData(this.uiaId, "HudInstalled", false);
                this._HUDInstalledStatus = false;
                this._HudInstalledStatusHandler();
            }
            else
            {
                framework.setSharedData(this.uiaId, "HudInstalled", true);
                this._HUDInstalledStatus = true;
                this._HudInstalledStatusHandler();   
            }
        }
        //SLI menu will be removal if HUD not installed. Calling PopulateList to update screen.
        if(this._currentContext && this._currentContextTemplate)
        {
            this.populateListCtrl(this._currentContextTemplate);
        }   
    }
};

//HUD error
vehsettingsApp.prototype._HudErrorMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("_HudErrorMsgHandler called with msg:" + msg.params.payload.evData); 
        if (msg && msg.params.payload)
        {
            this._cachedHudError = msg.params.payload.evData;  
            if (this._currentContext && this._currentContextTemplate)
            {
                if (this._currentContext.ctxtId === "HUDTab" || this._currentContext.ctxtId === "HUDTabJ78"|| this._currentContext.ctxtId === "HUDTabJ36")
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

vehsettingsApp.prototype._AutoWiper_InstalledMsgHandler = function(msg)
{ 
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.debug("_AutoWiper_InstalledMsgHandler called with msg:" + msg.params.payload.evData); 
        if (msg && msg.params.payload && msg.params.payload.evData != this._cachedAutoWiper_Installed)
        {
            this._cachedAutoWiper_Installed = msg.params.payload.evData;
            if (this._cachedAutoWiper_Installed === 1)
            {
                this.statusArrayVehicleTab[0] = true;
            }
            else
            {
                this.statusArrayVehicleTab[0] = false;
            }
            if (this._currentContext && this._currentContextTemplate)
            {
                if (this._currentContext.ctxtId === "VehicleSettingsTab")
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

vehsettingsApp.prototype._LightTimeoutDoorOpen_InstalledMsgHandler = function(msg)
{ 
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedLightTimeoutDoorOpen_Installed)
    {
        this._cachedLightTimeoutDoorOpen_Installed = msg.params.payload.evData;
        
        if (this._cachedLightTimeoutDoorOpen_Installed === 1)
        {
            this.statusArray[1] = true;
        }
        else
        {
            this.statusArray[1] = false;
        }
        
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._DayTimeRunningLight_InstalledMsgHandler = function(msg)
{ 
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedDayTimeRunningLight_Installed)
    {
        this._cachedDayTimeRunningLight_Installed = msg.params.payload.evData;
        if (this._cachedDayTimeRunningLight_Installed === 1)
        {
            this.statusArray[9] = true; 
        }
        else
        {
            this.statusArray[9] = false; 
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._LightTimeoutDoorClosed_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedLightTimeoutDoorClosed_Installed)
    {
        this._cachedLightTimeoutDoorClosed_Installed = msg.params.payload.evData;
        if (this._cachedLightTimeoutDoorClosed_Installed === 1)
        {
            this.statusArray[2] = true;
        }
        else
        {
            this.statusArray[2] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._AutoDoorLockAT6_InstalledMsgHandler = function(msg)
{ 
    log.debug("_AutoDoorLockAT6_InstalledMsgHandler called with msg" + msg);
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedVehicle_AutoDoorLockInstalledAT6)
    {
        this._cachedVehicle_AutoDoorLockInstalledAT6 = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLockMode" || this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                if (this._cachedVehicle_AutoDoorLockInstalledAT6 != null && this._cachedVehicle_AutoDoorLockInstalledAT6 != undefined)
                {                
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }  
    }
};

vehsettingsApp.prototype._AutoDoorLockAT_InstalledMsgHandler = function(msg)
{ 
    log.debug("_AutoDoorLockAT_InstalledMsgHandler called with msg" + msg);
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedVehicle_AutoDoorLockInstalledAT)
    {
        this._cachedVehicle_AutoDoorLockInstalledAT = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLockMode" || this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                if (this._cachedVehicle_AutoDoorLockInstalledAT != null && this._cachedVehicle_AutoDoorLockInstalledAT != undefined)
                {                
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }  
    }
};

vehsettingsApp.prototype._AutoDoorLockMT_InstalledMsgHandler = function(msg)
{ 
    log.debug("_AutoDoorLockMT_InstalledMsgHandler called with msg" + msg);
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedVehicle_AutoDoorLockInstalledMT)
    {
        this._cachedVehicle_AutoDoorLockInstalledMT = msg.params.payload.evData;
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLockMode" || this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                if (this._cachedVehicle_AutoDoorLockInstalledMT != null && this._cachedVehicle_AutoDoorLockInstalledMT != undefined)
                {                
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

vehsettingsApp.prototype._HeadOffTimer_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedHeadOffTimerValue_Installed)
    {
        this._cachedHeadOffTimerValue_Installed = msg.params.payload.evData;
        if (this._cachedHeadOffTimerValue_Installed === 1)
        {
            this.statusArray[6] = true;
        }
        else
        {
            this.statusArray[6] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._HeadlightAutoSensitivity_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedHeadAutoValue_Installed)
    {
        this._cachedHeadAutoValue_Installed = msg.params.payload.evData;
        if (this._cachedHeadAutoValue_Installed === 1)
        {
            this.statusArray[10] = true;
        }
        else
        {
            this.statusArray[10] = false;
        } 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._ThreeFlash_InstalledMsgHandler = function(msg)
{ 

    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedThreeFlash_Installed)
    {
        log.debug("_ThreeFlash_InstalledMsgHandler called with msg:" + msg.params.payload.evData); 
        this._cachedThreeFlash_Installed = msg.params.payload.evData;
        if (this._cachedThreeFlash_Installed === 1)
        {
            this.statusArrayTurn[0] = true;
        }
        else
        {
            this.statusArrayTurn[0] = false;
        } 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "TurnSettings" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._TurnSignalVolume_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedTurnSignalVolume_Installed)
    {
        log.debug("_TurnSignalVolume_InstalledMsgHandler called with msg:" + msg.params.payload.evData); 
        this._cachedTurnSignalVolume_Installed = msg.params.payload.evData;
        if (this._cachedTurnSignalVolume_Installed === 1)
        {
            this.statusArrayTurn[1] = true;
        }
        else
        {
            this.statusArrayTurn[1] = false;
        } 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "TurnSettings" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._set_failedMsgHandler = function(msg)
{ 
    log.debug("_set_failedMsgHandler called with msg:" + msg.params.payload.evData); 
    //TODO: Implement logic
};

vehsettingsApp.prototype.checkHBC_and_AHBC = function()
{
    if(this._cachedHBCValue_Installed === 1)
    {
        if(this._cachedAHBCValue_Installed === 1)
        {
            this.statusArray[3] = false;
        }
        else
        {
            this.statusArray[3] = true;
            this.textChange = 1;
        }
    }
    else
    {
        if(this._cachedAHBCValue_Installed === 1)
        {
            this.statusArray[3] = true;
            this.textChange = 2;
        }
        else
        {
            this.statusArray[3] = false;
        }
    }
};

vehsettingsApp.prototype._HBC_InstalledMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedHBCValue_Installed)
    {
        this._cachedHBCValue_Installed = msg.params.payload.evData;
        this.checkHBC_and_AHBC();
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
     }
};

vehsettingsApp.prototype._AHBC_InstalledMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedAHBCValue_Installed)
    {
        this._cachedAHBCValue_Installed = msg.params.payload.evData;
        this.checkHBC_and_AHBC();
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
     }
};

vehsettingsApp.prototype._AFS_InstalledMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this.cachedAFSValue)
    {
        this.cachedAFSValue = msg.params.payload.evData;
        if (this.cachedAFSValue === 1)
        {
            this.statusArray[4] = true; 
        }
        else
        {   
            this.statusArray[4] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
     }
};

vehsettingsApp.prototype._HeadlightON_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedHeadLightOnValue_Installed)
    {
        this._cachedHeadLightOnValue_Installed = msg.params.payload.evData;
        if (this._cachedHeadLightOnValue_Installed === 1)
        {
            this.statusArray[5] = true;
        }
        else
        {
            this.statusArray[5] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        } 
    }
};

vehsettingsApp.prototype._CHLT_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this.cachedCHLTValue)
    {
        this.cachedCHLTValue = msg.params.payload.evData;
        if (this.cachedCHLTValue === 1)
        {
            this.statusArray[7] = true;
        }
        else
        {
            this.statusArray[7] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        } 
    }
};

vehsettingsApp.prototype._LHL_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this.cachedLHLValue)
    {
        this.cachedLHLValue = msg.params.payload.evData;
        if (this.cachedLHLValue === 1)
        {
            this.statusArray[8] = true;
        }
        else
        {
            this.statusArray[8] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        } 
    }
};

vehsettingsApp.prototype._AutoDoorRelock_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedDoorReLockValue_Installed)
    {
        this._cachedDoorReLockValue_Installed = msg.params.payload.evData;
        if (this._cachedDoorReLockValue_Installed === 1)
        {
            this.statusArrayDoorLock[2] = true;
        }
        else
        {
            this.statusArrayDoorLock[2] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._WalkAway_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedWalkAwayValue_Installed)
    {
        this._cachedWalkAwayValue_Installed = msg.params.payload.evData;
        if (this._cachedWalkAwayValue_Installed === 1)
        {
            this.statusArrayDoorLock[4] = true;
        }
        else
        {
            this.statusArrayDoorLock[4] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._UnlockMode_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedUnlockModeValue_Installed)
    {
        this._cachedUnlockModeValue_Installed = msg.params.payload.evData;
        if (this._cachedUnlockModeValue_Installed === 1)
        {
            this.statusArrayDoorLock[3] = true;
        }
        else
        {
            this.statusArrayDoorLock[3] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        } 
    }
};

vehsettingsApp.prototype._BuzzerAnswerback_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedBuzzerAnswerback_Installed)
    {
        log.debug("_BuzzerAnswerback_InstalledMsgHandler evData:" + msg.params.payload.evData); 
        this._cachedBuzzerAnswerback_Installed = msg.params.payload.evData;
        if (this._cachedBuzzerAnswerback_Installed === 1)
        {
            this.statusArrayDoorLock[1] = true;
        }
        else
        {
            this.statusArrayDoorLock[1] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// Safety_Installed
vehsettingsApp.prototype._Safety_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_Safety_InstalledMsgHandler evData:" + msg.params.payload.evData); 
        this._cachedSafety_Installed = msg.params.payload.evData;   
    }
};

// BSMBuzzerVolume_Installed
vehsettingsApp.prototype._BSM_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedBSM_Installed)
    {
        log.debug("_BSM_InstalledMsgHandler called with msg:" + msg.params.payload.evData); 
        this._cachedBSM_Installed = msg.params.payload.evData; 
        if (this._cachedBSM_Installed === 1)
        {
            if(this._cachedNewBSM_Installed === 1)
            {
                this.statusArraySafetyTab[this._SafetyTabIndex["BSMSystem"]] = true;
            }
            else
            {
                this.statusArraySafetyTab[this._SafetyTabIndex["BSMBuzzerVolume"]] = true;
            }
        }
        else
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["BSMBuzzerVolume"]] = false;
            this.statusArraySafetyTab[this._SafetyTabIndex["BSMSystem"]] = false;
        }
        
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        } 
    }
};

// BSMSystem_Installed
vehsettingsApp.prototype._NewBSM_SupportMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedNewBSM_Installed)
    {
        log.debug("_NewBSM_SupportMsgHandler called with msg:" + msg.params.payload.evData); 
        this._cachedNewBSM_Installed = msg.params.payload.evData; 
        if (this._cachedNewBSM_Installed === 1)
        {
            if(this._cachedBSM_Installed === 1)
            {
                this.statusArraySafetyTab[this._SafetyTabIndex["BSMSystem"]] = true;
                this.statusArraySafetyTab[this._SafetyTabIndex["BSMBuzzerVolume"]] = false;
            }
        }
        else
        {
            if(this._cachedBSM_Installed === 1)
           {
                this.statusArraySafetyTab[this._SafetyTabIndex["BSMSystem"]] = false;
                this.statusArraySafetyTab[this._SafetyTabIndex["BSMBuzzerVolume"]] = true;
           }
        }

        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        } 
    }
};


// LaneDepartureWarning_Installed
vehsettingsApp.prototype._LDW_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedLDW_Installed)
    {
    log.debug("_LDW_InstalledMsgHandler called with msg:" + msg.params.payload.evData); 
        this._cachedLDW_Installed = msg.params.payload.evData; 
        if (this._cachedLDW_Installed === 1)
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["LaneDepartureWarning"]] = true;
        }
        else
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["LaneDepartureWarning"]] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};
//RVMBuzzerVolume_Installed
vehsettingsApp.prototype._RVM_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedRVM_Installed)
    {
        log.debug("_RVM_InstalledMsgHandler called with msg:" + msg.params.payload.evData); 
        this._cachedRVM_Installed = msg.params.payload.evData;   
        if (this._cachedRVM_Installed === 1)
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["RVMBuzzerVolume"]] = true;
        }
        else
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["RVMBuzzerVolume"]] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// InteriorLightiningBrightinessInstalled
vehsettingsApp.prototype._InteriorLightiningBrightinessInstalledMsgHandler= function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._InteriorLightiningBrightinessInstalled)
    {
        this._InteriorLightiningBrightinessInstalled = msg.params.payload.evData;
        if (this._InteriorLightiningBrightinessInstalled === 1)
        {
            this.statusArray[0] = true;
        }
        else
        {
            this.statusArray[0] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        } 
    }
};

// FOW_Installed
vehsettingsApp.prototype._FOW_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedFOW_Installed)
    {
        log.debug("_FOW_InstalledMsgHandler called with msg:" + msg.params.payload.evData); 
        this._cachedFOW_Installed = msg.params.payload.evData;  
        if (this._cachedFOW_Installed === 1)
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["FOW"]] = true;
        }
        else
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["FOW"]] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// SpeedAlarm_Installed
vehsettingsApp.prototype._SpeedAlarmInstalledMsgHandler= function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._SpeedAlarmInstalled)
    {
        log.debug("_SpeedAlarmInstalled called with msg:" + msg.params.payload.evData); 
        this._SpeedAlarmInstalled = msg.params.payload.evData; 
        if (this._SpeedAlarmInstalled === 1)
        {
            this.statusArrayVehicleTab[4] = true;
        }
        else
        {
            this.statusArrayVehicleTab[4] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "VehicleSettingsTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// DRSS_Installed
vehsettingsApp.prototype._DRSS_InstalledMsgHandler = function(msg)
{  
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedDRSS_Installed)
    {
        log.debug("_DRSS_InstalledMsgHandler called with msg:" + msg.params.payload.evData); 
        this._cachedDRSS_Installed = msg.params.payload.evData;
        if (this._cachedDRSS_Installed === 1)
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["DRSS"]] = true;
        }
        else
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["DRSS"]] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// SBS_Installed
vehsettingsApp.prototype._SBS_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedSBS_Installed)
    {
        log.debug("_SBS_InstalledMsgHandler called with msg:" + msg.params.payload.evData);  
        this._cachedSBS_Installed = msg.params.payload.evData;
        if (this._cachedSBS_Installed === 1)
        {
            if(this._cachedSCBS_Installed === 4 || this._cachedSCBS_Installed === 5 )
            {
                this.statusArraySafetyTab[this._SafetyTabIndex["SBS_SCBS_J36IPM"]] = true;
                this.statusArraySafetyTab[this._SafetyTabIndex["SCBS_J36IPM"]] = false;
            }
            else
            {
                this.statusArraySafetyTab[this._SafetyTabIndex["SBS"]] = true;
        }
        }
        else
        {
            if(this._cachedSCBS_Installed === 4 || this._cachedSCBS_Installed === 5 )
            {
                this.statusArraySafetyTab[this._SafetyTabIndex["SBS_SCBS_J36IPM"]] = false;
                this.statusArraySafetyTab[this._SafetyTabIndex["SCBS_J36IPM"]] = true;
            }
        else
        {
                this.statusArraySafetyTab[this._SafetyTabIndex["SBS"]] = false;
        }
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// SCBS_Installed
vehsettingsApp.prototype._SCBS_InstalledMsgHandler = function(msg)
{  
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedSCBS_Installed)
    {
        log.info("_SCBS_InstalledMsgHandler evData:" + msg.params.payload.evData); 
        this._cachedSCBS_Installed = msg.params.payload.evData;
        
        if (this._cachedSCBS_Installed === 0 || this._cachedSCBS_Installed === 1)
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["SCBS"]] = false
            this.statusArraySafetyTab[this._SafetyTabIndex["SCBS_J36IPM"]] = false;
        }
        else if (this._cachedSCBS_Installed === 4 || this._cachedSCBS_Installed === 5)
        {
            if(this._cachedSBS_Installed === 1)
            {
                 this.statusArraySafetyTab[this._SafetyTabIndex["SBS_SCBS_J36IPM"]] = true;
                 this.statusArraySafetyTab[this._SafetyTabIndex["SBS"]] = false;
            }
            else
            {
                this.statusArraySafetyTab[this._SafetyTabIndex["SCBS_J36IPM"]] = true;
            }
            this.statusArraySafetyTab[this._SafetyTabIndex["SCBS"]] = false;
        }
        else
        {
            if(this._cachedSBS_Installed === 1)
            {
                this.statusArraySafetyTab[this._SafetyTabIndex["SBS"]] = true;
            }
            this.statusArraySafetyTab[this._SafetyTabIndex["SBS_SCBS_J36IPM"]] = false;
            this.statusArraySafetyTab[this._SafetyTabIndex["SCBS_J36IPM"]] = false;
            this.statusArraySafetyTab[this._SafetyTabIndex["SCBS"]] = true;
        }

        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

//Lane Assist System Installed
vehsettingsApp.prototype._LaneAssistSystem_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedLAS_Installed)
    {
        this._cachedLAS_Installed = msg.params.payload.evData;
        if (this._cachedLAS_Installed === 1)
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["LAS"]] = true;
        }
        else
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["LAS"]] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// Driver alert Installed
vehsettingsApp.prototype._DriverAlert_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined && msg.params.payload.evData != this._cachedDA_Installed)
    {
        this._cachedDA_Installed = msg.params.payload.evData;
        if (this._cachedDA_Installed === 1)
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["DA"]] = true;
        }
        else
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["DA"]] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

vehsettingsApp.prototype._PSI_InstalledMsgHandler = function(msg)
{ 
    if (msg && msg.params && msg.params.payload && msg.params.payload.parkingSensorConfig != null && msg.params.payload.parkingSensorConfig != undefined && msg.params.payload.parkingSensorConfig != this._cachedPSI_Installed)
    {
        this._cachedPSI_Installed = msg.params.payload.parkingSensorConfig;
        if (this._cachedPSI_Installed === "Installed")
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["ParkingSensor"]] = true;
        }
        else // "NOTInstalled"
        {
            this.statusArraySafetyTab[this._SafetyTabIndex["ParkingSensor"]] = false;
        }
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
    }
};

// DRSS_DRSS
vehsettingsApp.prototype._DRSS_DRSSMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData)
    {
        log.info("DRSSMsgHandler EvData:" + msg.params.payload.evData);
        this._cachedDRSS_DRSS = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "DRSS")
        {
            if (this._cachedDRSS_DRSS)
            {
                var DRSSValue = 2;
                switch (this._cachedDRSS_DRSS)
                {
                    case "DRSS_On":
                        DRSSValue = 1;
                        break;
                    case "DRSS_Off":
                        DRSSValue = 2;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(0,DRSSValue);
            }
        }
    }
};
// DRSS_DRSSSensitivity
vehsettingsApp.prototype._DRSS_DRSSSensitivityMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_DRSS_DRSSSensitivityMsgHandler evData:" + msg.params.payload.evData);
        this._cachedDRSS_DRSSSensitivity = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "DRSS")
        {
            if (this._cachedDRSS_DRSSSensitivity)
            {
                var DRSSSenValue = 3;
                switch (this._cachedDRSS_DRSSSensitivity)
                {
                    case "DRSS_Distance_Long":
                        DRSSSenValue = 1;
                        break;
                    case "DRSS_Distance_Middle":
                        DRSSSenValue = 2;
                        break;
                    case "DRSS_Distance_Short":
                        DRSSSenValue = 3;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(1,DRSSSenValue);
            }
        }
    }
};

// FOW_Warning
vehsettingsApp.prototype._FOW_WarningMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_FOW_WarningMsgHandler evData:" + msg.params.payload.evData);
        this._cachedFOW_Warning = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "FOW")
        {
            if (this._cachedFOW_Warning)
            {
                var FOWValue = 2;
                switch (this._cachedFOW_Warning)
                {
                    case "FOW_On":
                        FOWValue = 1;
                        break;
                    case "FOW_Off":
                        FOWValue = 2;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(0,FOWValue);
            }
        }
    }
};

// FOW_Distance
vehsettingsApp.prototype._FOW_DistanceMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_FOW_DistanceMsgHandler evData:" + msg.params.payload.evData);
        this._cachedFOW_Distance = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "FOW")
        {
            if (this._cachedFOW_Distance)
            {
                var FOWDistValue = 1;
                switch (this._cachedFOW_Distance)
                {
                    case "FOW_Distance_Short":
                        FOWDistValue = 1;
                        break;
                    case "FOW_Distance_Long":
                        FOWDistValue = 2;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(1,FOWDistValue);
            }
        }
    }
};

// FOW_BuzzerVolume
vehsettingsApp.prototype._FOW_BuzzerVolumeMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_FOW_BuzzerVolumeMsgHandler evData:" + msg.params.payload.evData);
        this._cachedFOW_BuzzerVolume = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "FOW")
        {
            if (this._cachedFOW_BuzzerVolume)
            {
                var FOWVolValue = 3;
                switch (this._cachedFOW_BuzzerVolume)
                {
                    case "FOW_Vol_Big":
                        FOWVolValue = 1;
                        break;
                    case "FOW_Vol_Small":
                        FOWVolValue = 2;
                        break;
                    case "FOW_Vol_No_Alarm":
                        FOWVolValue = 3;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(2,FOWVolValue);
            }
        }
    }
};

// SBS_BrakeSupport
vehsettingsApp.prototype._SBS_BrakeSupportMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_SBS_BrakeSupportMsgHandler evData:" + msg.params.payload.evData);
        this._cached_SBS_SCBS_BrakeSupport = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            switch (this._currentContext.ctxtId)
            {
                case "SBS": 
                    //intentional fall-through
                case "SBS_SCBS":
                    if (this._cached_SBS_SCBS_BrakeSupport )
                    {
                        var SBSValue = 2;
                        switch (this._cached_SBS_SCBS_BrakeSupport)
                        {
                            case "SBS_On":
                                SBSValue = 1;
                                break;
                            case "SBS_Off":
                                SBSValue = 2;
                                break;
                            default :
                                break;
                        }
                        this._currentContextTemplate.list2Ctrl.setToggleValue(0,SBSValue);
                    }    
                    break;
                default:
                    log.warn("_SBS_BrakeSupportMsgHandler called for not handled context "+this._currentContext.ctxtId);
                    break;
            }
        }
    }
};

//SBS_SCBS_J36IPM_Distance

vehsettingsApp.prototype._SCBS_DistanceJ36IPMMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_SCBS_DistanceJ36IPMMsgHandler evData:" + msg.params.payload.evData);
        this._cached_SCBSDistance_J36IPM = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            switch (this._currentContext.ctxtId)
            {
                case "SBS_SCBS_J36IPM":
                    if (this._cached_SBS_SCBS_J36IPM)
                    {
                        var SCBSDistValue = 1;
                        switch (this._cached_SCBSDistance_J36IPM)
                        {
                            case "SCBSDistance_Long":
                                SCBSDistValue = 1;
                                break;
                            case "SCBSDistance_Middle":
                                SCBSDistValue = 2;
                                break;
                            case "SCBSDistance_Short":
                                SCBSDistValue = 3;
                                break;
                            default :
                                break;
                        }
                        this._currentContextTemplate.list2Ctrl.setToggleValue(1,SCBSDistValue);
                    }    
                    break;
                default:
                    log.warn("_SCBS_DistanceJ36IPMMsgHandler called for not handled context "+this._currentContext.ctxtId);
                    break;
            }
        }
    }
};


// SBS_SCBS_J36IPM
vehsettingsApp.prototype._SBS_SCBS_J36IPM_BrakeSupportMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_SBS_SCBS_J36IPM_BrakeSupportMsgHandler called with msg" + msg.params.payload.evData);
        this._cached_SBS_SCBS_J36IPM = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            switch (this._currentContext.ctxtId)
            {
                case "SBS_SCBS_J36IPM":
                    if (this._cached_SBS_SCBS_J36IPM )
                    {
                        var sbs_scbs = 2;
                        switch (this._cached_SBS_SCBS_J36IPM)
                        {
                            case "SCBS_On":
                                sbs_scbs = 1;
                                break;
                            case "SCBS_Off":
                                sbs_scbs = 2;
                                break;
                            default :
                                log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_J36IPM);
                                break;
                        }
                        this._currentContextTemplate.list2Ctrl.setToggleValue(0,sbs_scbs);
                    }    
                    break;
                default:
                    log.warn("_SBS_SCBS_J36IPM_BrakeSupportMsgHandler called for not handled context "+this._currentContext.ctxtId);
                    break;
            }
        }
    }
}

// SBS_Distance
vehsettingsApp.prototype._SBS_SCBS_DistanceMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_SBS_SCBS_DistanceMsgHandler evData:" + msg.params.payload.evData);
        this._cached_SBS_SCBS_Distance = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            switch (this._currentContext.ctxtId)
            {
                case "SBS":
                    //intentional fall-through
                case "SBS_SCBS":
                    if (this._cached_SBS_SCBS_BrakeSupport)
                    {
                        var SBSDistValue = 1;
                        switch (this._cached_SBS_SCBS_Distance)
                        {
                            case "SBS_Distance_Short":
                                SBSDistValue = 1;
                                break;
                            case "SBS_Distance_Long":
                                SBSDistValue = 2;
                                break;
                            default :
                                break;
                        }
                        this._currentContextTemplate.list2Ctrl.setToggleValue(1,SBSDistValue);
                    }    
                    break;
                default:
                    log.warn("_SBS_SCBS_DistanceMsgHandler called for not handled context "+this._currentContext.ctxtId);
                    break;
            }
        }
    }
};

// SBS_BuzzerVolume
vehsettingsApp.prototype._SBS_BuzzerVolumeMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_SBS_BuzzerVolumeMsgHandler evData:" + msg.params.payload.evData);
        this._cached_SBS_SCBS_BuzzerVolume = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            switch (this._currentContext.ctxtId)
            {
                case "SBS":
                    //Intentional fall-through
                case "SBS_SCBS":
                case "SBS_SCBS_J36IPM":
                    if (this._cached_SBS_SCBS_BuzzerVolume)
                    {
                        var SBSVolValue = 3;
                        switch (this._cached_SBS_SCBS_BuzzerVolume)
                        {
                            case "SBS_Vol_Big":
                                SBSVolValue = 1;
                                break;
                            case "SBS_Vol_Small":
                                SBSVolValue = 2;
                                break;
                            case "SBS_Vol_No_Alarm":
                                SBSVolValue = 3;
                                break;
                            default :
                                break;
                        }
                            this._currentContextTemplate.list2Ctrl.setToggleValue(2,SBSVolValue);
                    }
                    break;
                default:
                    log.warn("_SBS_BuzzerVolumeMsgHandler called for not handled context "+this._currentContext.ctxtId);
                    break;
            }
        }
    }
};

// SBS_CityBrakeSystem
vehsettingsApp.prototype._SBS_CityBrakeSystemMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_SBS_CityBrakeSystemMsgHandler evData:" + msg.params.payload.evData);
        this._cached_SBS_SCBS_BrakeSupport = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab" &&
                this._smartCityBreakToggleIndex != null && this._smartCityBreakToggleIndex != undefined &&
                this._cached_SBS_SCBS_BrakeSupport )
            {
                var SCBSValue = 2;
                switch (this._cached_SBS_SCBS_BrakeSupport)
                {
                    case "SCBS_On":
                        SCBSValue = 1;
                        break;
                    case "SCBS_Off":
                        SCBSValue = 2;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(this._smartCityBreakToggleIndex,SCBSValue);
            }
            else if(this._currentContext.ctxtId === "SBS_SCBS" && this._cached_SBS_SCBS_BrakeSupport)
            {

                var SCBSValue = 2;
                switch (this._cached_SBS_SCBS_BrakeSupport)
                {
                    case "SCBS_On":
                        SCBSValue = 1;
                        break;
                    case "SCBS_Off":
                        SCBSValue = 2;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(0,SCBSValue);
            }
        }
    }
};

// Headlight_HighBeamControll
vehsettingsApp.prototype._Headlight_HighBeamControllMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_Headlight_HighBeamControllMsgHandler evData:" + msg.params.payload.evData);
        this._cachedHeadlight_HighBeamControll = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" && 
                this._highBeamControlToggleIndex != null && this._highBeamControlToggleIndex != undefined &&
                this._cachedHeadlight_HighBeamControll)
            {
                var HBCValue = 2;
                switch (this._cachedHeadlight_HighBeamControll)
                {
                    case "HBC_On":
                        HBCValue = 1;
                        break;
                    case "HBC_Off":
                        HBCValue = 2;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(this._highBeamControlToggleIndex,HBCValue);
            }
        }
    }
};

vehsettingsApp.prototype._AFSMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData)
    {
        log.info("_AFSMsgHandler evData:" + msg.params.payload.evData);
        this._cachedAFS = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" && 
                this._AFSToggleIndex != null && this._AFSToggleIndex != undefined &&
                this._cachedAFS)
            {
                var AFSValue = 2;
                switch (this._cachedAFS)
                {
                    case "AFS_On":
                        AFSValue = 1;
                        break;
                    case "AFS_Off":
                        AFSValue = 2;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(this._AFSToggleIndex,AFSValue);
            }
        }
    }
};

// Headlight_HeadlightOnWaring
vehsettingsApp.prototype._Headlight_HeadlightOnWaringMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("HeadlightOnWaringMsgHandler evData:" + msg.params.payload.evData);
        this._cachedHeadlight_HeadlightOnWaring = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" && 
                this._lightReminderToggleIndex != null && this._lightReminderToggleIndex != undefined 
                && this._cachedHeadlight_HeadlightOnWaring)
            {
                var HOWValue = 2;
                switch (this._cachedHeadlight_HeadlightOnWaring)
                {
                    case "HOW_Big":
                        HOWValue = 1;
                        break;
                    case "HOW_Small":
                        HOWValue = 2;
                        break;
                    case "HOW_Off":
                        HOWValue = 3;
                        break;
                    default :
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(this._lightReminderToggleIndex,HOWValue);
            }
        }
    }
};

// Headlight_HeadlightOffTimer
vehsettingsApp.prototype._Headlight_HeadlightOffTimerMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_Headlight_HeadlightOffTimerMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedHeadlight_HeadlightOffTimer = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "HeadlightOffTimer")
            {
                if (this._cachedHeadlight_HeadlightOffTimer)
                { 
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

//CHLT
vehsettingsApp.prototype._CHLTMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_CHLTMsgHandler evData:" + msg.params.payload.evData);
        this._cachedCHLT = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "CHLT")
            {
                if (this._cachedCHLT != null)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

//LHL
vehsettingsApp.prototype._LHLMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_Headlight_HighBeamControllMsgHandler evData:" + msg.params.payload.evData);
        this._cachedLHL = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" && 
                this._LHLToggleIndex != null && this._LHLToggleIndex != undefined &&
                this._cachedLHL != null && this._cachedLHL != undefined)
            {
                switch(this._cachedLHL)
                {
                    case "LHL_On":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(this._LHLToggleIndex,1);
                        break;
                    case "LHL_Off":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(this._LHLToggleIndex,2);
                        break;
                    default:
                        break;
                }
            }
        }
    }
};

// Headlight_AutoHeadlightsSensitivity
vehsettingsApp.prototype._Headlight_AutoHeadlightsSensitivityMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_Headlight_AutoHeadlightsSensitivityMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedHeadlight_AutoHeadlightsSensitivity = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "AutoHeadlightOn")
            {
                if (this._cachedHeadlight_AutoHeadlightsSensitivity)
                { 
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

vehsettingsApp.prototype._GetDaytimeRunningLightsMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_GetDaytimeRunningLightsMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedHeadlight_DaytimeLights = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" && 
                this._dayTimeRunningLightToggleIndex != null && this._dayTimeRunningLightToggleIndex != undefined &&
                this._cachedHeadlight_DaytimeLights)
            {
                switch(this._cachedHeadlight_DaytimeLights)
                {
                    case "DRL_On":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(this._dayTimeRunningLightToggleIndex,1);
                        break;
                    case "DRL_Off":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(this._dayTimeRunningLightToggleIndex,2);
                        break;
                    default:
                        log.warn("Incorrect Headlight_DaytimeLights value "+this._cachedHeadlight_DaytimeLights);
                        break;
                }
            }
        }
    }
};

// Keyless_WalkAwayLock
vehsettingsApp.prototype._Keyless_WalkAwayLockMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_Keyless_WalkAwayLockMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedKeyless_WalkAwayLock = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" && 
                this._walkAwayLockToggleIndex != null && this._walkAwayLockToggleIndex != undefined && 
                this._cachedKeyless_WalkAwayLock)
            {
                switch(this._cachedKeyless_WalkAwayLock)
                {
                    case "WalkAwayLock_On":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(this._walkAwayLockToggleIndex,1);
                        break;
                    case "WalkAwayLock_Off":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(this._walkAwayLockToggleIndex,2);
                        break;
                    default:
                        log.warn("Incorrect Keyless_WalkAwayLock value "+this._cachedKeyless_WalkAwayLock);
                        break;
                }
            }
        }
    }
};

// Keyless_UnlockMode
vehsettingsApp.prototype._Keyless_UnlockModeMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_Keyless_UnlockModeMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedKeyless_UnlockMode = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "UnlockMode" || this._currentContext.ctxtId === "DoorLock")
            {
                if (this._cachedKeyless_UnlockMode)
                { 
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

// LDWS_SensitivityForWideRange
vehsettingsApp.prototype._LAS_LDWS_TimingMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_LAS_LDWS_TimingMsgHandler called with msg" + msg.params.payload.evData);
        this._cached_LAS_LDWSTiming = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "LDWS" || this._currentContext.ctxtId === "LDWSTiming")
            {
                if (this._cached_LAS_LDWSTiming )
                {
                    if (framework.localize.getRegion() != "Region_NorthAmerica")
                    {
                        this.populateListCtrl(this._currentContextTemplate);
                    }
                    else //LDWS context
                    {
                        switch(this._cached_LAS_LDWSTiming)
                        {
                            case "LDWS_Timing_Online":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexTiming,1);
                                break;
                            case "LDWS_Timing_Insideline":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexTiming,2);
                                break;
                            default:
                                log.warn("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                break;
                        }
                    }
                }
            }
            if (this._currentContext.ctxtId === "LAS" || this._currentContext.ctxtId === "LASTiming")
            {
                if (this._cached_LAS_LDWSTiming)
                {
                    if (framework.localize.getRegion() != "Region_NorthAmerica")
                    {  
                        this.populateListCtrl(this._currentContextTemplate);
                    }
                    else
                    {
                        if(this._indexTiming !== null)
                        {
                            switch(this._cached_LAS_LDWSTiming)
                            {
                                case "LDWS_Timing_Online":
                                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexTiming,1);
                                    break;
                                case "LDWS_Timing_Insideline":
                                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexTiming,2);
                                    break;
                                default:
                                    log.warn("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                    break;
                            }
                        }
                        else
                        {
                            log.warn("(Intervention Timing is not available in NA J78A), Region is " +framework.localize.getRegion() +"and VehicleType is "+framework.getSharedData("syssettings","VehicleType"));
                        }
                    }
                }
            }
        }
    }
};

// LDWS_SensitivityWarningCancelation
vehsettingsApp.prototype._LDWS_SensitivityWarningCancelationMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_LDWS_SensitivityWarningCancelationMsgHandler evData:" + msg.params.payload.evData);
        this._cached_LAS_LDWS_Warning = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "LDWS" || this._currentContext.ctxtId === "LAS")
            {
                if (this._cached_LAS_LDWS_Warning)
                {
                    if (framework.localize.getRegion() === "Region_NorthAmerica")
                    {
                        switch(this._cached_LAS_LDWS_Warning)
                        {
                            case "LDWS_Warning_Ofen":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexWarning,1);
                                break;
                            case "LDWS_Warning_Rare":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexWarning,2);
                                break;
                            default:
                                log.warn("Invalid LDWS Warning Value : " + this._cached_LAS_LDWS_Warning);
                                break;
                        }
                        this._currentContextTemplate.list2Ctrl.updateItems(this._indexWarning,this._indexWarning);       
                    }
                    else
                    {
                        switch(this._cached_LAS_LDWS_Warning)
                        {
                            case "LDWS_Warning_Ofen":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexWarning,1);
                                break;
                            case "LDWS_Warning_Med":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexWarning,2);
                                break;
                            case "LDWS_Warning_Rare":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexWarning,3);
                                break;
                            default:
                                log.warn("Invalid LDWS Warning Value : " + this._cached_LAS_LDWS_Warning);
                                break;
                        }
                        this._currentContextTemplate.list2Ctrl.updateItems(this._indexWarning,this._indexWarning);
                    }
                }
            }
        }
    }
};

vehsettingsApp.prototype._LDWSSound_InstalledMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {        
        if(this._cachedLDWSSound_Installed != msg.params.payload.evData)
        {
        this._cachedLDWSSound_Installed = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "LAS" || this._currentContext.ctxtId === "LASTiming" || this._currentContext.ctxtId === "LDWS" || this._currentContext.ctxtId === "SafetyTab")
            {
                this.populateListCtrl(this._currentContextTemplate);
            }
        }
        }
    }
};

// LDWS_BuzzerSetting
vehsettingsApp.prototype._LAS_LDWS_BuzzerSettingMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_LAS_LDWS_BuzzerSettingMsgHandler called with msg" + msg.params.payload.evData);
        this._cached_LAS_LDWS_SoundSetting = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate && (this._currentContext.ctxtId === "LDWS" ))
        {
            var LDWSVolumeChange = 2;
            //Set Sound Settings 
            if(this._cachedLDWSSound_Installed === 1)
            {
                this._indexSound = 3;
                if (this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Rumber")
                {
                        this._currentContextTemplate.list2Ctrl.dataList.items[3] = this._LDWSCtxtDataListHelper.items[5];
                        LDWSVolumeChange = 3;
                        switch(this._cachedLAS_LDWS_SoundVolume) 
                        {
                            case "LDWS_Vol_High":
                                LDWSVolumeChange = 1;
                                break;
                            case "LDWS_Vol_Med":
                                LDWSVolumeChange = 2;
                                break;
                            case "LDWS_Vol_Low":
                                LDWSVolumeChange = 3;
                                break;
                            default:
                                log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                                break;
                        }
                        this._currentContextTemplate.list2Ctrl.dataList.items[2].value = 2;//Set sound Setting to Rumble
                        this._currentContextTemplate.list2Ctrl.dataList.items[3].value = LDWSVolumeChange;
                }
                else
                {
                    this._currentContextTemplate.list2Ctrl.dataList.items[3] = this._LDWSCtxtDataListHelper.items[4]; 
                    var LDWSVolumeChange;
                    switch(this._cachedLAS_LDWS_SoundVolume) 
                    {
                        case "LDWS_Vol_High":
                            /*Intentional fall through*/
                        case "LDWS_Vol_Med":
                            LDWSVolumeChange = 1;
                            break;
                        case "LDWS_Vol_Low":
                            LDWSVolumeChange = 2;
                            break;
                        default:
                            log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                            break;
                    }
                    this._currentContextTemplate.list2Ctrl.dataList.items[2].value = 1;
                    this._currentContextTemplate.list2Ctrl.dataList.items[3].value = LDWSVolumeChange; //Set sound Setting to Beep
                }
            this._currentContextTemplate.list2Ctrl.updateItems(2,3);
            }
            else /*For BEEP type - H/L - Sound not installed*/
            {
                this._indexSound = 2;
                this._currentContextTemplate.list2Ctrl.dataList.items[2] = this._LDWSCtxtDataListHelper.items[4];
                switch(this._cachedLAS_LDWS_SoundVolume) 
                {
                    case "LDWS_Vol_High":
                        /*Intentional fall through*/
                    case "LDWS_Vol_Med":
                        LDWSVolumeChange = 1;
                        break;
                    case "LDWS_Vol_Low":
                        LDWSVolumeChange = 2;
                        break;
                    default:
                        log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                        break;
                }
                this._currentContextTemplate.list2Ctrl.dataList.items[2].value = LDWSVolumeChange;
                this._currentContextTemplate.list2Ctrl.updateItems(2,2);
            }
        }
        else if (this._currentContext && this._currentContextTemplate && (this._currentContext.ctxtId === "LASSound" || this._currentContext.ctxtId === "LAS" ))
        {
            this.populateListCtrl(this._currentContextTemplate);
        }
    }
};

// LDWS_BuzzerVolume and LAS Beep Volume
vehsettingsApp.prototype._LAS_LDWS_BuzzerVolumeMsgHandler = function(msg) 
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData)
    {
        this._cachedLAS_LDWS_SoundVolume = msg.params.payload.evData;

        if (this._currentContext && this._currentContextTemplate) 
        {
            if (this._currentContext.ctxtId === "LDWS") 
            {
                var LDWSVolumeIndex = 2; //Sound not installed Default
                var LDWSVolumeChange = 1; //High default
                if (this._cachedLDWSSound_Installed === 1 && this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Rumber") /*For RUMBLE type - H/M/L*/
                {
                    LDWSVolumeIndex = 3;
                    switch(this._cachedLAS_LDWS_SoundVolume) 
                    {
                        case "LDWS_Vol_High":
                            LDWSVolumeChange = 1;
                            break;
                        case "LDWS_Vol_Med":
                            LDWSVolumeChange = 2;
                            break;
                        case "LDWS_Vol_Low":
                            LDWSVolumeChange = 3;
                            break;
                        default:
                            log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                            break;
                    }
                }
                else if (this._cachedLDWSSound_Installed === 1) /*For BEEP type - H/L - Sound installed*/
                {
                    LDWSVolumeIndex = 3;
                    switch(this._cachedLAS_LDWS_SoundVolume) 
                    {
                        case "LDWS_Vol_High":
                            /*Intentional fall through*/
                        case "LDWS_Vol_Med":
                            LDWSVolumeChange = 1;
                            break;
                        case "LDWS_Vol_Low":
                            LDWSVolumeChange = 2;
                            break;
                        default:
                            log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                            break;
                    }
                } 
                else //if( this._cachedLDWSSound_Installed === 0 || this._cachedLDWSSound_Installed == null || this._cachedLDWSSound_Installed == undefined) /*For BEEP type - H/L - Sound not installed*/
                {
                    LDWSVolumeIndex = 2;
                    switch(this._cachedLAS_LDWS_SoundVolume) 
                    {
                        case "LDWS_Vol_High":
                            /*Intentional fall through*/
                        case "LDWS_Vol_Med":
                            LDWSVolumeChange = 1;
                            break;
                        case "LDWS_Vol_Low":
                            LDWSVolumeChange = 2;
                            break;
                        default:
                            log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                            break;
                    }
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(LDWSVolumeIndex, LDWSVolumeChange);
                /* else 
                {
                    log.info("Invalid value for _cachedLDWSSound_Installed ");
                } */
            } 
            else if (this._currentContext.ctxtId === "LAS") 
            {
                if (this._cachedLAS_LDWS_SoundVolume && this._cached_LAS_LDWS_SoundSetting !== "LDWS_Sound_Rumber") //Vibration/Beep
                {
                    var LASVolumeChange = 1; // default is set to High
                    switch (this._cachedLAS_LDWS_SoundVolume) 
                    {
                        case "LDWS_Vol_High":
                            LASVolumeChange = 1; // High
                            break;
                        case "LDWS_Vol_Med":
                            LASVolumeChange = 1; // High
                            break;
                        case "LDWS_Vol_Low":
                            LASVolumeChange = 2; // Low
                            break;
                        default:
                            log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                            break;
                    }
                    log.info("Set Beep/Vib :: " + LASVolumeChange);
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexSound, LASVolumeChange);
                } 
                else if (this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Rumber") 
                {
                    log.info("Set Rumble :: " + this._cachedLAS_LDWS_SoundVolume);
                    switch (this._cachedLAS_LDWS_SoundVolume) {
                        case "LDWS_Vol_High":
                            LASVolumeChange = 1; // High
                            break;
                        case "LDWS_Vol_Med":
                            LASVolumeChange = 2; // Med
                            break;
                        case "LDWS_Vol_Low":
                            LASVolumeChange = 3; // Low
                            break;
                        default:
                            log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                            break;
                    }
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._indexSound, LASVolumeChange);
                }
                this._currentContextTemplate.list2Ctrl.updateItems(this._indexSound, this._indexSound);
            }
            else 
            {
                //do Nothing. Variables have been updated and changes will reflect in ready function.
            }
        }
        else 
        {
            log.error("ERROR: context/template not initialized.");
        }
    }
    else 
    {
        log.warn("invalid state to update volume from _LAS_LDWS_BuzzerVolumeMsgHandler");
    }
};

// Safety_AutoWiper
vehsettingsApp.prototype._Safety_AutoWiperMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_Safety_AutoWiperMsgHandler evData:" + msg.params.payload.evData);
        this._cachedSafety_AutoWiper = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "VehicleSettingsTab" &&
                this._autoWiperToggleIndex != null && this._autoWiperToggleIndex != undefined &&
                this._cachedSafety_AutoWiper)
            {
                var RSWvalue = 2;
                switch (this._cachedSafety_AutoWiper) 
                {
                    case "RSW_On":
                        RSWvalue = 1;
                        break;
                    case "RSW_Off":
                        RSWvalue = 2;
                        break;
                    default:
                        log.warn("Invalid Safety_AutoWiper Value : " + this._cachedSafety_AutoWiper);
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(this._autoWiperToggleIndex,RSWvalue);
            }
        }
    }
};

// Safety_InterioLightTimeoutDoorOpen
vehsettingsApp.prototype._Safety_InterioLightTimeoutDoorOpenMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData)
    {
        log.debug("_Safety_InterioLightTimeoutDoorOpenMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedSafety_InterioLightTimeoutDoorOpen = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "IntLightTimeoutDoorOpen")
            {
                if (this._cachedSafety_InterioLightTimeoutDoorOpen)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

// Safety_InterioLightTimeoutDoorClosed
vehsettingsApp.prototype._Safety_InterioLightTimeoutDoorClosedMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_Safety_InterioLightTimeoutDoorClosedMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedSafety_InterioLightTimeoutDoorClosed = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "Lighting" || this._currentContext.ctxtId === "IntLightTimeoutDoorClosed")
            {
                if (this._cachedSafety_InterioLightTimeoutDoorClosed)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

// Safety_3flashTurnSignal
vehsettingsApp.prototype._Safety_3flashTurnSignalMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_Safety_3flashTurnSignalMsgHandler evData:" + msg.params.payload.evData);
        this._cachedSafety_3flashTurnSignal = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "TurnSettings" && 
                this._3flashTurnSettingsToggleIndex != null && this._3flashTurnSettingsToggleIndex != undefined &&
                this._cachedSafety_3flashTurnSignal )
            {
                var FTSValue = 2;
                switch (this._cachedSafety_3flashTurnSignal) 
                {
                    case "Three_Flash_On":
                        FTSValue = 1;
                        break;
                    case "Three_Flash_Off":
                        FTSValue = 2;
                        break;
                    default:
                        //do nothing
                        log.warn("Invalid Safety_3flashTurnSignal Value : " + this._cachedSafety_3flashTurnSignal);
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(this._3flashTurnSettingsToggleIndex,FTSValue);
            }
        }
    }
};

// Safety_TurnSignalIndicatorVolume
vehsettingsApp.prototype._Safety_TurnSignalIndicatorVolumeMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.info("_Safety_TurnSignalIndicatorVolumeMsgHandler evData:" + msg.params.payload.evData);
        this._cachedSafety_TurnSignalIndicatorVolume = msg.params.payload.evData; 
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "TurnSettings" && 
                this._cachedSafety_TurnSignalIndicatorVolume &&
                this._turnSignalVolumeToggleIndex != null && this._turnSignalVolumeToggleIndex != undefined )
            {
                var TSIVValue = 2;
                switch (this._cachedSafety_TurnSignalIndicatorVolume) 
                {
                    case "Turn_Volume_Big":
                        TSIVValue = 1;
                        break;
                    case "Turn_Volume_Small":
                        TSIVValue = 2;
                        break;
                    default:
                        //do nothing
                        log.warn("Invalid Safety_TurnSignalIndicatorVolume Value : " + this._cachedSafety_TurnSignalIndicatorVolume);
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(this._turnSignalVolumeToggleIndex,TSIVValue);
            }
        }
    }
};

// Safety_AutoDoorLock
vehsettingsApp.prototype._Vehicle_AutoDoorLockAT_MsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
       log.debug("_Safety_AutoDoorLockMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedGet_AutoDoorLockAT = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "DoorLockMode")
            {
                if (this._cachedGet_AutoDoorLockAT)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

vehsettingsApp.prototype._Vehicle_AutoDoorLockAT6_MsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_Safety_AutoDoor6LockMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedGet_AutoDoorLockAT6 = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "DoorLockMode")
            {
                if (this._cachedGet_AutoDoorLockAT6)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

vehsettingsApp.prototype._Vehicle_AutoDoorLockMT_MsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_Safety_AutoDoorLockMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedGet_AutoDoorLockMT = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "DoorLockMode")
            {
                if (this._cachedGet_AutoDoorLockMT)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

// Safety_AutoDoorLockChimeVolume
vehsettingsApp.prototype._Safety_AutoDoorLockChimeVolumeMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_Safety_AutoDoorLockChimeVolumeMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedSafety_AutoDoorLockChimeVolume = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "KeylessLockBeepVol")
            {
                if (this._cachedSafety_AutoDoorLockChimeVolume)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

// Safety_AutoRelockTimer
vehsettingsApp.prototype._Safety_AutoRelockTimerMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_Safety_AutoRelockTimerMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedSafety_AutoRelockTimer = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "DoorLock" || this._currentContext.ctxtId === "DoorRelockTime")
            {
                if (this._cachedSafety_AutoRelockTimer)
                { 
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

// RVM_Volume
vehsettingsApp.prototype._RVM_VolumeMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData )
    {
        log.debug("_RVM_VolumeMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedRVMBuzzerVolume = msg.params.payload.evData; 
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab" || this._currentContext.ctxtId === "RVMVolume")
            {
                if (this._cachedRVMBuzzerVolume)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }
        }
    }
};

// BSM_Volume
vehsettingsApp.prototype._BSM_VolumeMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData )
    {
        log.debug("_BSM_VolumeMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedBSMBuzzerVolume = msg.params.payload.evData; 
        this._cachedBSMVolume = msg.params.payload.evData;
        // populate
        if (this._currentContext && this._currentContextTemplate)
        {
            if (this._currentContext.ctxtId === "SafetyTab" || this._currentContext.ctxtId === "BSMVolume")
            {
                if (this._cachedBSMBuzzerVolume)
                {
                    this.populateListCtrl(this._currentContextTemplate);
                }
            }

            if(this._currentContext.ctxtId === "BSMSystem")
            {
                var BSMValue = 0;
                switch(this._cachedBSMVolume)
                {
                    case "BSM_Vol_Big":
                        BSMValue = 1;
                        break;
                    case "BSM_Vol_Small":
                        BSMValue = 2;
                        break;
                    case "BSM_Vol_No_Alarm":
                        BSMValue = 3;
                        break;
                    default:
                        //do nothing
                        log.warn("Invalid BSMVolume Value "+this._cachedBSMVolume);
                        break;
                }
                this._currentContextTemplate.list2Ctrl.setToggleValue(1,BSMValue);
            }
        }
    }
};

// BSMSystem_status
vehsettingsApp.prototype._BSMSystem_statusMsgHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined )
    {
        log.debug("_BSMSystem_statusMsgHandler called with msg" + msg.params.payload.evData);
        this._cachedBSMSystem = msg.params.payload.evData;
        if (this._currentContext && this._currentContextTemplate)
        {
            if(this._currentContext.ctxtId === "BSMSystem")
            {
                var BSMSystem = 2;
                switch(this._cachedBSMSystem)
                {
                    case "BSM_On":
                        BSMSystem = 1;
                        this._currentContextTemplate.list2Ctrl.dataList.items[0].disabled = false;
                        this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = false;
                        break;
                    case "BSM_Off":
                        BSMSystem = 2;
                        this._currentContextTemplate.list2Ctrl.dataList.items[0].disabled = false;
                        this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = true;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cachedBSMSystem);
                        break;
                 }
                this._currentContextTemplate.list2Ctrl.setToggleValue(0,BSMSystem);
                this._currentContextTemplate.list2Ctrl.updateItems(0,1);
            }
        }
    }
};


vehsettingsApp.prototype._AtSpeedMsgHandler = function(msg)
{
    log.debug("_AtSpeedMsgHandler called "); 
    if(msg)
    {
         this.cachedSpeed = true;
         this._DisableSpeedRestricted(); 
    }
};

// NoSpeed
vehsettingsApp.prototype._NoSpeedMsgHandler = function(msg)
{
    log.debug("_NoSpeedMsgHandler called "); 
    if (msg)
    {
       this.cachedSpeed = false;
       this._DisableSpeedRestricted(); 
    }
};

//VehicleTab Contextin Functions
vehsettingsApp.prototype._VehicleSettingsTabCtxtIn = function()
{
    this._HudInstalledStatusHandler();
};

//SafetyTab Contextin Functions
vehsettingsApp.prototype._SafetyTabTabCtxtIn = function()
{
    this._HudInstalledStatusHandler();
};

//HUDTab Contextin Functions
vehsettingsApp.prototype._HUDTabCtxtIn = function()
{
    this._HudInstalledStatusHandler();
};

//HUDJ78ATab Contextin Functions
vehsettingsApp.prototype._HUDJ78TabCtxtIn = function()
{
    this._HudInstalledStatusHandler();
};
//CHUDJ36 Contextin Functions
vehsettingsApp.prototype._CHUDJ36CtxtIn = function()
{
    this._HudInstalledStatusHandler();
};
vehsettingsApp.prototype._VoltageStatusMsgHandler = function(msg)
{
    log.debug("_HudErrorMsgHandler evData:" + msg.params.payload.evData); 
    if (msg && msg.params.payload)
    {
       this._cachedvoltageStatus = msg.params.payload.evData;  
       if (this._currentContext && this._currentContextTemplate)
       {
           this.populateListCtrl(this._currentContextTemplate);
           this._populateDialogCtrl(this._currentContextTemplate);
       }
    }
};
/**************************
 * Helper functions
 **************************/
//populate List control
vehsettingsApp.prototype._populateListCtrl = function(tmplt)
{
    var items = new Array();
    if(this._currentContext && this._currentContext.ctxtId)
    {
        switch (this._currentContext.ctxtId)            
        {
            case "HUDTab": 
                this._latestValueHudBrightnessControl = this._cachedHudAutoIntensityOnOff;
                this._latestValueHudHeight = this._cachedHudTilt;
                this._latestValueHudBrightnessCalibration = this._cachedHudCalibration;
                this._latestValueHudBrightness = this._cachedHudIntensity;
                this._latestValueHudNavigation = this._cachedNaviVal;
                this._latestValueHudOpenClose = this._cachedHudOnOffStatus;
                var listLength = this._HUDTabCtxtDataListBrightnessControlOn.itemCount;
                if (framework.debugMode && this._cachedHudAutoIntensityOnOff === null) 
                {
                    this._cachedHudAutoIntensityOnOff = 1;
                } 
                //Show     Calibration or Brightness depending on BrightnessControl value
                if (this._cachedHudAutoIntensityOnOff === 1)
                {
                    tmplt.list2Ctrl.dataList.items[2] = this._HUDTabCtxtDataListBrightnessControlOff.items[1];
                    if (this._cachedHudCalibration != undefined && this._cachedHudCalibration != null) 
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = this._cachedHudCalibration;  
                    } 
                    tmplt.list2Ctrl.updateItems(2,2);   
                }
                else if(this._cachedHudAutoIntensityOnOff === 2)
                {
                    tmplt.list2Ctrl.dataList.items[2] = this._HUDTabCtxtDataListBrightnessControlOff.items[0];
                    if (this._cachedHudIntensity != undefined && this._cachedHudIntensity != null) 
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = this._cachedHudIntensity;
                    } 
                    tmplt.list2Ctrl.updateItems(2,2);    
                }  
                //0 HEIGHT
                if (this._cachedHudTilt != null && this._cachedHudTilt != undefined) 
                { 
                    tmplt.list2Ctrl.dataList.items[0].value = this._cachedHudTilt; 
                }
                
                //1 BRIGHTNESS CONTROL
                if (this._cachedHudAutoIntensityOnOff) 
                {
                    tmplt.list2Ctrl.dataList.items[1].value = this._cachedHudAutoIntensityOnOff;  
                } 
                
                //3 NAVIGATION
                if (this._cachedNaviVal) 
                { 
                    tmplt.list2Ctrl.dataList.items[3].value = this._cachedNaviVal; 
                }

                //4 HeadsUpDisplay
                if (this._cachedHudControlAllowed === 0 || this._cachedHudError === 1  || this._cachedvoltageStatus === 0 )
                {
                    for (var controlHUD = 0; controlHUD < 6; controlHUD++)
                    {
                         tmplt.list2Ctrl.dataList.items[controlHUD].disabled = true;
                    }
                }
                else
                {
                    for (var controlHUD = 0; controlHUD < 6; controlHUD++)
                    {
                        tmplt.list2Ctrl.dataList.items[controlHUD].disabled = false;
                    }
                    if (tmplt.list2Ctrl.dataList.items[4].disabled != true && this._cachedHudOnOffStatus) 
                    { 
                        tmplt.list2Ctrl.dataList.items[4].value = this._cachedHudOnOffStatus; 
                        if (this._cachedHudOnOffStatus === 1 && this._cachedHudControlAllowed === 1 && this._cachedvoltageStatus === 1)
                        {
                            tmplt.list2Ctrl.dataList.items[0].disabled = false;
                            tmplt.list2Ctrl.dataList.items[1].disabled = false;
                            tmplt.list2Ctrl.dataList.items[2].disabled = false;
                            tmplt.list2Ctrl.dataList.items[3].disabled = false;
                            tmplt.list2Ctrl.dataList.items[5].disabled = false;
                        }
                        if (this._cachedHudOnOffStatus === 2)
                        {
                            tmplt.list2Ctrl.dataList.items[0].disabled = true;
                            tmplt.list2Ctrl.dataList.items[1].disabled = true;
                            tmplt.list2Ctrl.dataList.items[2].disabled = true;
                            tmplt.list2Ctrl.dataList.items[3].disabled = true;
                            tmplt.list2Ctrl.dataList.items[5].disabled = true;
                        } 
                    } 
                } 
				//if sd card is removed, disable item
				if (this._cachedSDcardStatus == "Off") 
                { 
                    tmplt.list2Ctrl.dataList.items[3].disabled = true; 
                }
				else
				{
					tmplt.list2Ctrl.dataList.items[3].disabled = false; 
				}
				
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }    
                if (this._currentListItemIndex != null)
                {
                    tmplt.list2Ctrl.topItem = this._currentListItemIndex;
                    this._currentListItemIndex = null;
                }
                if (tmplt.list2Ctrl.dataList.itemCount !=  listLength)
                {
                    this._isListChanged = true;
                }
                break;
            case "HUDDisplayInformation": 
					var region = framework.localize.getRegion();
					if((framework.getSharedData("syssettings","DestinationCode") !== "SETTINGS_Destination_JP" ) && ((region !== "Region_Europe") && (region !=="Region_4A") && (region !=="Region_ChinaTaiwan")))
					{
						if(this._cachedNaviVal === 1 )
						{       
							this._HUDDispInfoCtxtList.items[1].disabled = false;
							this._HUDDispInfoCtxtList.items[1].itemStyle ='style06';
							this._HUDDispInfoCtxtList.items[1].label1Id =   this._cachedStreetLabel;
							this._HUDDispInfoCtxtList.items[1].hasCaret = true;
							this._HUDDispInfoCtxtList.items[1].labelWidth = 'wide';
							tmplt.list2Ctrl.dataList.items[0].value = 1;
						}
						else 
						{
							this._HUDDispInfoCtxtList.items[1].itemStyle ='style01';
							this._HUDDispInfoCtxtList.items[1].hasCaret = false;
							this._HUDDispInfoCtxtList.items[1].disabled = true;
							tmplt.list2Ctrl.dataList.items[0].value = 2;
						}       
                        
						if(this._cachedSDcardStatus == "Off")
						{
							this._HUDDispInfoCtxtList.items[0].disabled = true;
							this._HUDDispInfoCtxtList.items[1].hasCaret = false;
							this._HUDDispInfoCtxtList.items[1].disabled = true;
						}
						else
						{
							this._HUDDispInfoCtxtList.items[0].disabled = false;
						}
					}
					else
					{
						//this._ResetHUDDispInfo();
						if(this._cachedNaviVal === 1 )
						{       
							tmplt.list2Ctrl.dataList.items[0].value = 1;
						}
						else 
						{
							tmplt.list2Ctrl.dataList.items[0].value = 2;
						}       
						tmplt.list2Ctrl.dataList = this._HUDDispInfoCtxtList;
						if(this._cachedSDcardStatus == "Off")
						{
							this._HUDDispInfoCtxtList.items[0].disabled = true;
						}
						else
						{
							this._HUDDispInfoCtxtList.items[0].disabled = false;
						}						
					}					
					
                    this._currentContextTemplate.list2Ctrl.setDataList(this._HUDDispInfoCtxtList);
                    this._currentContextTemplate.list2Ctrl.updateItems(0,this._HUDDispInfoCtxtList.itemCount - 1);  
                break;
			case "HUDDisplayInformationJ36":   
				 if(this._HudFlagRegion === 0)
				 {
					   log.info("inside region check HUDDisplayInformationJ36"+ framework.localize.getRegion());						 
					   var region = framework.localize.getRegion();
					   if ((region === "Region_Japan") || (region === "Region_4A") || (region === "Region_ChinaTaiwan") || (region === "Region_Europe"))
                        {
	                      this._cachedCHudNavindex = "Navigation_LaneGuidance";
                          this._cachedCHudNavLabel = "CHudNav_TBT_Lane";  
                        }
					this._HudFlagRegion=1;	
				 }

                    if(this._cachedSDcardStatus == "On" )
                    {       
                        this._CHUDDispInfoJ36List.items[0].disabled = false;
                        this._CHUDDispInfoJ36List.items[0].itemStyle ='style06';
                        this._CHUDDispInfoJ36List.items[0].label1Id =   this._cachedCHudNavLabel;
                        this._CHUDDispInfoJ36List.items[0].hasCaret = true;
                        tmplt.list2Ctrl.dataList.items[0].value = 1;
                    }
					else
					{
                        this._CHUDDispInfoJ36List.items[0].disabled = true;
                        this._CHUDDispInfoJ36List.items[0].itemStyle ='style06';
                        this._CHUDDispInfoJ36List.items[0].label1Id =   this._cachedCHudNavLabel;
                        this._CHUDDispInfoJ36List.items[0].hasCaret = false;
                        tmplt.list2Ctrl.dataList.items[0].value = 1;					
					}				
					

                    this._currentContextTemplate.list2Ctrl.setDataList(this._CHUDDispInfoJ36List);
                    this._currentContextTemplate.list2Ctrl.updateItems(0,this._CHUDDispInfoJ36List.itemCount - 1);  
                break;
                    
            case "HUDStreetInformation" :
                var tempChange=0;
                switch(this._cachedStreetInfoindex)
                {
                    case "Street_Always" :
                        tempChange = 0;
                        break;
                    case "Street_On_Demand" :
                        tempChange = 1;
                        break;
                    case "Street_Off" :
                        tempChange = 2;
                        break;
                    default:
                        log.info("Invalid StreetInfoindex value : "+this._cachedStreetInfoindex);
                        break;
                }
                tmplt.list2Ctrl.setTick(tempChange, true);
                tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
                break;
				
			case "HUDNavigation" :
                var tempChange=0;
				var region = framework.localize.getRegion();
				if((framework.getSharedData("syssettings","DestinationCode") !== "SETTINGS_Destination_JP" ) && ((region !== "Region_Europe") && (region !=="Region_4A") && (region !=="Region_ChinaTaiwan")))
				{
					switch(this._cachedCHudNavindex)
					{
						case "Navigation_Off" :
							tempChange = 0;
							break;
						case "Navigation_Maneuver" :
							tempChange = 1;
							break;
						case "Navigation_LaneGuidance" :
							tempChange = 2;
							break;						
						case "Navigation_Streetname" :
							tempChange = 3;
							break;
						default:
							log.info("Invalid CHud  value : "+this._cachedCHudNavLabel);
							break;
					}
 								
					tmplt.list2Ctrl.setTick(tempChange, true);
					//tmplt.list2Ctrl.focussedItem = tempChange;
					this._contextTable["HUDNavigation"]["controlProperties"]["List2Ctrl"]["focussedItem"] = tempChange;
					tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
				}
				else if((framework.getSharedData("syssettings","DestinationCode") === "SETTINGS_Destination_JP") || ((region === "Region_Europe") || (region ==="Region_4A") || (region ==="Region_ChinaTaiwan")))
				{
					switch(this._cachedCHudNavindex)
					{
						case "Navigation_Off" :
							tempChange = 0;
							break;
						case "Navigation_LaneGuidance" :
							tempChange = 1;
							break;						
						default:
							log.warn("Invalid CHud  value : "+this._cachedCHudNavLabel);
							break;
					}
					tmplt.list2Ctrl.setTick(tempChange, true);
					// tmplt.list2Ctrl.focussedItem = tempChange;
					tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
					tmplt.list2Ctrl.focussedItem = tempChange;	
				}
                // tmplt.list2Ctrl.setTick(tempChange, true);
                // tmplt.list2Ctrl.focussedItem = tempChange;
                // tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
                break;	
            case "HUDTabJ78" :
                this._latestValueHudBrightnessControl = this._cachedHudAutoIntensityOnOff;
                this._latestValueHudHeight = this._cachedHudTilt;
                this._latestValueHudDispInfo=this._cachedDispInfo;
                this._latestValueHudRotation=this._cachedRotationVal;
                this._latestValueHudBrightnessCalibration = this._cachedHudCalibration;
                this._latestValueHudBrightness = this._cachedHudIntensity;
                this._latestValueHudOpenClose = this._cachedHudOnOffStatus;
                var listLength = this._HUDTabCtxtDataListBrightnessControlOn.itemCount;
                if (framework.debugMode && this._cachedHudAutoIntensityOnOff === null) 
                {
                    this._cachedHudAutoIntensityOnOff = 1;
                } 
                //Show     Calibration or Brightness depending on BrightnessControl value
                if (this._cachedHudAutoIntensityOnOff === 1)
                {
                    tmplt.list2Ctrl.dataList.items[2] = this._HUDTabCtxtDataListBrightnessControlOff.items[1];
                    if (this._cachedHudCalibration != undefined && this._cachedHudCalibration != null) 
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = this._cachedHudCalibration;  
                    } 
                    tmplt.list2Ctrl.updateItems(2,2);   
                }
                else if(this._cachedHudAutoIntensityOnOff === 2)
                {
                    tmplt.list2Ctrl.dataList.items[2] = this._HUDTabCtxtDataListBrightnessControlOff.items[0];
                    if (this._cachedHudIntensity != undefined && this._cachedHudIntensity != null) 
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = this._cachedHudIntensity;
                    } 
                    tmplt.list2Ctrl.updateItems(2,2);    
                }  
                //0 HEIGHT
                if (this._cachedHudTilt != null && this._cachedHudTilt != undefined) 
                { 
                    tmplt.list2Ctrl.dataList.items[0].value = this._cachedHudTilt; 
                }
                
                //1 BRIGHTNESS CONTROL
                if (this._cachedHudAutoIntensityOnOff) 
                {
                    tmplt.list2Ctrl.dataList.items[1].value = this._cachedHudAutoIntensityOnOff;  
                } 
                
                //5 Rotation
                if (this._cachedRotationVal != null && this._cachedRotationVal != undefined) 
                { 
                    tmplt.list2Ctrl.dataList.items[3].value = this._cachedRotationVal; 
                }

                //4 HeadsUpDisplay
                if (this._cachedHudControlAllowed === 0 || this._cachedHudError === 1  || this._cachedvoltageStatus === 0 )
                {
                    for (var controlHUD = 0; controlHUD < 7; controlHUD++)
                    {
                         tmplt.list2Ctrl.dataList.items[controlHUD].disabled = true;
                    }
                }                       
                else
                {
                     for (var controlHUD = 0; controlHUD < 7; controlHUD++)
                    {
                        tmplt.list2Ctrl.dataList.items[controlHUD].disabled = false;
                    } 

                    if (tmplt.list2Ctrl.dataList.items[5].disabled != true && this._cachedHudOnOffStatus) 
                    { 
                        tmplt.list2Ctrl.dataList.items[5].value = this._cachedHudOnOffStatus; 
                         if (this._cachedHudOnOffStatus === 1 && this._cachedHudControlAllowed === 1 && this._cachedvoltageStatus === 1)
                        {
                           for (var controlHUD = 0; controlHUD < 7; controlHUD++)
                            {
                                if(controlHUD!=5)
                                {
                                    this._HUDJ78TabCtxtDataListBrightnessControlOn.items[controlHUD].disabled = false;
                                }
                            }  
                        }
                        else
                        {
                        
                             for (var controlHUD = 0; controlHUD < 7; controlHUD++)
                            {
                                if(controlHUD!=5)
                                {
                                    this._HUDJ78TabCtxtDataListBrightnessControlOn.items[controlHUD].disabled = true;
                                }
                            }
                            
                        } 
                    } 
                } 
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }    
                if (this._currentListItemIndex != null)
                {
                    tmplt.list2Ctrl.topItem = this._currentListItemIndex;
                    this._currentListItemIndex = null;
                }
                if (tmplt.list2Ctrl.dataList.itemCount !=  listLength)
                {
                    this._isListChanged = true;
                }
                break;          
            case "HUDTabJ36" :
                this._latestValueHudBrightnessControl = this._cachedHudAutoIntensityOnOff;
                this._latestValueHudHeight = this._cachedHudTilt;
                this._latestValueHudDispInfo=this._cachedDispInfo;
                this._latestValueHudRotation=this._cachedRotationVal;
                this._latestValueHudBrightnessCalibration = this._cachedHudCalibration;
                this._latestValueHudBrightness = this._cachedHudIntensity;
                this._latestValueHudOpenClose = this._cachedHudOnOffStatus;
                var listLength = this._HUDTabCtxtDataListBrightnessControlOn.itemCount;
                if (framework.debugMode && this._cachedHudAutoIntensityOnOff === null) 
                {
                    this._cachedHudAutoIntensityOnOff = 1;
                } 
                //Show     Calibration or Brightness depending on BrightnessControl value
                if (this._cachedHudAutoIntensityOnOff === 1)
                {
                    tmplt.list2Ctrl.dataList.items[2] = this._HUDTabCtxtDataListBrightnessControlOff.items[1];
                    if (this._cachedHudCalibration != undefined && this._cachedHudCalibration != null) 
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = this._cachedHudCalibration;  
                    } 
                    tmplt.list2Ctrl.updateItems(2,2);   
                }
                else if(this._cachedHudAutoIntensityOnOff === 2)
                {
                    tmplt.list2Ctrl.dataList.items[2] = this._HUDTabCtxtDataListBrightnessControlOff.items[0];
                    if (this._cachedHudIntensity != undefined && this._cachedHudIntensity != null) 
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = this._cachedHudIntensity;
                    } 
                    tmplt.list2Ctrl.updateItems(2,2);    
                }  
                //0 HEIGHT
                if (this._cachedHudTilt != null && this._cachedHudTilt != undefined) 
                { 
                    tmplt.list2Ctrl.dataList.items[0].value = this._cachedHudTilt; 
                }
                
                //1 BRIGHTNESS CONTROL
                if (this._cachedHudAutoIntensityOnOff) 
                {
                    tmplt.list2Ctrl.dataList.items[1].value = this._cachedHudAutoIntensityOnOff;  
                } 
                
                //5 Rotation
            //    if (this._cachedRotationVal != null && this._cachedRotationVal != undefined) 
           //     { 
            //        tmplt.list2Ctrl.dataList.items[3].value = this._cachedRotationVal; 
             //   }

                //4 HeadsUpDisplay
                if (this._cachedHudControlAllowed === 0 || this._cachedHudError === 1  || this._cachedvoltageStatus === 0 )
                {
                    for (var controlHUD = 0; controlHUD < 6; controlHUD++)
                    {
                         tmplt.list2Ctrl.dataList.items[controlHUD].disabled = true;
                    }
                }                       
                else
                {
                     for (var controlHUD = 0; controlHUD < 6; controlHUD++)
                    {
                        tmplt.list2Ctrl.dataList.items[controlHUD].disabled = false;
                    } 

                    if (tmplt.list2Ctrl.dataList.items[4].disabled != true && this._cachedHudOnOffStatus) 
                    { 
                        tmplt.list2Ctrl.dataList.items[4].value = this._cachedHudOnOffStatus; 
                         if (this._cachedHudOnOffStatus === 1 && this._cachedHudControlAllowed === 1 && this._cachedvoltageStatus === 1)
                        {
                           for (var controlHUD = 0; controlHUD < 6; controlHUD++)
                            {
                                if(controlHUD!=4)
                                {
                                    this._CHUDJ36CtxtDataListBrightnessControlOn.items[controlHUD].disabled = false;
                                }
                            }  
                        }
                        else
                        {
                        
                             for (var controlHUD = 0; controlHUD < 6; controlHUD++)
                            {
                                if(controlHUD!=4)
                                {
                                    this._CHUDJ36CtxtDataListBrightnessControlOn.items[controlHUD].disabled = true;
                                }
                            }
                            
                        } 
                    } 
                } 
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }    
                if (this._currentListItemIndex != null)
                {
                    tmplt.list2Ctrl.topItem = this._currentListItemIndex;
                    this._currentListItemIndex = null;
                }
                if (tmplt.list2Ctrl.dataList.itemCount !=  listLength)
                {
                    this._isListChanged = true;
                }
                break;          				
            case "SafetyTab":
                //DYNAMIC LIST
                var listLength = this._SafetyTabCtxtDataList.itemCount;
                var tempArraySafetyTab = new Array();
                tempArraySafetyTab = this.getAdjustedValueforDataListSafetyTab();
                tmplt.list2Ctrl.dataList.items = tempArraySafetyTab;
                tmplt.list2Ctrl.dataList.itemCount = tempArraySafetyTab.length;
                
                //if any of the status is disable, disable all the settings
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
						if(tmplt.list2Ctrl.dataList.items[tempcount].text1Id == "SpeedLimitInformation")
						{
							 if(this._TSRStatus === "TSR_Enabled")
							 {
								tmplt.list2Ctrl.dataList.items[tempcount].text1Id ="TSR_System"; 
							 }
							 else
							 {
							//retain old string	 
							 }
						
						}
						else if(tmplt.list2Ctrl.dataList.items[tempcount].text1Id == "TSR_System")
						{
							 if(this._TSRStatus === "TSR_Disabled")
							 {
								tmplt.list2Ctrl.dataList.items[tempcount].text1Id ="SpeedLimitInformation"; 
							 }
							 else
							 {
							//retain old string	 
							 }
						
						}

                    }
                }

				if ((this.statusArraySafetyTab[this._SafetyTabIndex["Camera360View"]] === true)
				||(this.statusArraySafetyTab[this._SafetyTabIndex["ParkingSensor"]] === true))
                {
                    for(var count = 0; count < tmplt.list2Ctrl.dataList.itemCount; count++)
					{
						if(tmplt.list2Ctrl.dataList.items[count].appData === "GoCamera360View")
						{
							tmplt.list2Ctrl.dataList.items[count].disabled = this.cachedSpeed;
						}
						else if(tmplt.list2Ctrl.dataList.items[count].appData === "SetParkingSensor")
						{
							tmplt.list2Ctrl.dataList.items[count].disabled = this.cachedSpeed;
						}						
					}					
                }
                this._currentContextTemplate.list2Ctrl.setDataList(tmplt.list2Ctrl.dataList);
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                } 
                if (tmplt.list2Ctrl.dataList.itemCount == 0)
                {
                    this._currentContextTemplate.list2Ctrl.setLoading(false);
                }
                if (tmplt.list2Ctrl.dataList.itemCount !=  listLength)
                {
                    this._isListChanged = true;
                }
                break;
                
                
            case "VehicleSettingsTab":
             if (this._cachedVehicle_AutoDoorLockInstalledAT === 0 && this._cachedVehicle_AutoDoorLockInstalledMT === 0 && this._cachedVehicle_AutoDoorLockInstalledAT6 === 0)
                {
                    this.statusArrayDoorLock[0] = false;
                }
                else
                {
                    this.statusArrayDoorLock[0] = true; 
                }
                var listLength = this._VehicleSettingsTabCtxtDataList.itemCount;
                var tempArrayVehicleTab = new Array();//For vehicle tab's removable entries
                tempArrayVehicleTab = this.getAdjustedValueforDataListVehicleTab();
                tmplt.list2Ctrl.dataList.items = tempArrayVehicleTab;
                tmplt.list2Ctrl.dataList.itemCount = tempArrayVehicleTab.length;
                //if any of the status is disable, disable all the settings
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                   var index = 0;
                   //Auto Wiper
                   if (this.statusArrayVehicleTab[0] === true)
                   {
                       tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                       index++;
                   }
                 //Door Lock
                   if (this.statusArrayVehicleTab[1] === true)
                   {
                       tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                       index++;
                   }
                 //Turn
                   if (this.statusArrayVehicleTab[2] === true)
                   {
                       tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                       index++;
                   }
                 //Lighting
                   if (this.statusArrayVehicleTab[3] === true)
                   {
                       
                       if ((this.statusArray[3] === true) || (this.statusArray[4] === true))
                       {
                       tmplt.list2Ctrl.dataList.items[index].disabled = false;
                       }
                       else if((this.statusArray[3] === false) && (this.statusArray[4] === false))
                       {
                       tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                       }
                       index++;
                   }
                   if (this.statusArrayVehicleTab[4] === true)
                   {
                       tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                       index++;
                   }
                }
                this._currentContextTemplate.list2Ctrl.setDataList(tmplt.list2Ctrl.dataList);
                
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    if(this._cachedSpeedalarm == "Off")
                    {
                        this._VehicleSettingsTabCtxtDataList.items[this._VehicleSettingsTabCtxtDataList.itemCount - 1].label1 =framework.localize.getLocStr(this.uiaId, this._cachedSpeedalarm) ;
                    }
                    else
                    {
                        this._cachedGetSpeedUnit = framework.localize.getDistanceUnit();
                        this._VehicleSettingsTabCtxtDataList.items[this._VehicleSettingsTabCtxtDataList.itemCount - 1].label1 = this._currentValue+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
                    }
                    
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                } 
                if (tmplt.list2Ctrl.dataList.itemCount == 0)
                {
                    this._currentContextTemplate.list2Ctrl.setLoading(false);
                }
                if (tmplt.list2Ctrl.dataList.itemCount !=  listLength)
                {
                    this._isListChanged = true;
                }
                break; 
            case "TurnSettings":
                var listLength = this._TurnSettingsCtxtDataList.itemCount;
                var tempArray2 = new Array();
                tempArray2 = this.getAdjustedValueforDataListTurn(tmplt.list2Ctrl.dataList.items);
                tmplt.list2Ctrl.dataList.items = tempArray2;
                tmplt.list2Ctrl.dataList.itemCount = tempArray2.length;
                this._currentContextTemplate.list2Ctrl.setDataList(tmplt.list2Ctrl.dataList);
                this._currentContextTemplate.list2Ctrl.updateItems(0,tempArray2.length - 1);             
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                    var index = 0;
                    //3 flash turn
                    if (this.statusArrayTurn[0] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Turn signal volume
                    if (this.statusArrayTurn[1] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Turn reset
                    if (this.statusArrayTurn[2] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                if (tmplt.list2Ctrl.dataList.itemCount == 0)
                {
                    this._currentContextTemplate.list2Ctrl.setLoading(false);
                }
                if (tmplt.list2Ctrl.dataList.itemCount !=  listLength)
                {
                    this._isListChanged = true;
                }
                break;  
                
            case "Lighting":
                
                this._latestValueCHLT = this._cachedCHLT;
                this._latestValueLHL = this._cachedLHL;
                var listLength = this._LightingCtxtDataList.itemCount;
                var tempArray = new Array();
                tempArray = this.getAdjustedValueforDataListLighting(tmplt.list2Ctrl.dataList.items);
                tmplt.list2Ctrl.dataList.items = tempArray;
                tmplt.list2Ctrl.dataList.itemCount = tempArray.length;
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                    var index = 0;
                    
                     //Interior Lightining brightness
                    if (this.statusArray[0] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                    
                    //Light Time out door open
                    if (this.statusArray[1] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Light Time Out Door closed
                    if (this.statusArray[2] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //High Beam Control
                    if (this.statusArray[3] === true)
                    {
                        //Do not apply atSpeed.
                        index++;
                    }
                  //AFS
                    if (this.statusArray[4] === true)
                    {
                        //Do not apply atSpeed.
                        index++;
                    }
                  //Headlight On
                    if (this.statusArray[5] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                    //Headlight off Timer
                    if (this.statusArray[6] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                    //CHLT
                    if (this.statusArray[7] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                    //LHL
                    if (this.statusArray[8] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Daytime Running light
                    if (this.statusArray[9] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Auto Headlight On
                    if (this.statusArray[10] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                    //Reset
                    if (this.statusArray[11] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                }
                this._currentContextTemplate.list2Ctrl.setDataList(tmplt.list2Ctrl.dataList);
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                } 
                if (tmplt.list2Ctrl.dataList.itemCount == 0)
                {
                    this._currentContextTemplate.list2Ctrl.setLoading(false);
                }
                if (tmplt.list2Ctrl.dataList.itemCount !=  listLength)
                {
                    this._isListChanged = true;
                }
                break;
            //DoorLock    
            case "DoorLock":
                var listLength = this._DoorLockCtxtDataList.itemCount;
                if (this._cachedVehicle_AutoDoorLockInstalledAT6 === 0 && this._cachedVehicle_AutoDoorLockInstalledAT === 0 && this._cachedVehicle_AutoDoorLockInstalledMT === 0 )
                {
                    this.statusArrayDoorLock[0] = false;
                }
                else
                {
                    this.statusArrayDoorLock[0] = true; 
                }
                var tempArrayDoorLock = new Array();
                tempArrayDoorLock = this.getAdjustedValueForDataListDoorLock(tmplt.list2Ctrl.dataList.items);
                tmplt.list2Ctrl.dataList.items = tempArrayDoorLock;
                tmplt.list2Ctrl.dataList.itemCount = tempArrayDoorLock.length;
                //this._currentContextTemplate.list2Ctrl.setDataList(tmplt.list2Ctrl.dataList);
                //this._currentContextTemplate.list2Ctrl.updateItems(0,tempArrayDoorLock.length - 1);              
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                    var index = 0;
                    //Door Lock Mode
                    if (this.statusArrayDoorLock[0] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Keyless Lock Beep Volume
                    if (this.statusArrayDoorLock[1] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Door Relock Time
                    if (this.statusArrayDoorLock[2] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Unlock Mode
                    if (this.statusArrayDoorLock[3] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                    //Walk Away Lock
                    if (this.statusArrayDoorLock[4] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                  //Reset
                    if (this.statusArrayDoorLock[5] === true)
                    {
                        tmplt.list2Ctrl.dataList.items[index].disabled = this.cachedSpeed;
                        index++;
                    }
                }
                this._currentContextTemplate.list2Ctrl.setDataList(tmplt.list2Ctrl.dataList);
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                } 
                if (tmplt.list2Ctrl.dataList.itemCount == 0)
                {
                    this._currentContextTemplate.list2Ctrl.setLoading(false);
                }
                if (tmplt.list2Ctrl.dataList.itemCount !=  listLength)
                {
                    this._isListChanged = true;
                }
                break; 
            case "DoorLockMode":
                this._cachedListLength = this._DoorLockModeManualTransmissionCtxtDataList.itemCount;
                if (this._cachedVehicle_AutoDoorLockInstalledAT6 === 1)
                {
                    this._currentContextTemplate.list2Ctrl.setDataList(this._DoorLockModeAutoTransmission6CtxtDataList);
                    if (tmplt.list2Ctrl.dataList.itemCount) 
                    { 
                        tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
                    }
                    var ADLAT6Value = 5;
                    switch(this._cachedGet_AutoDoorLockAT6)
                    {
                        case "AT6_Shift_OutOfPark_UnlockInPark":
                            ADLAT6Value = 0;
                            break;
                        case "AT6_Shift_OutOfPark":
                            ADLAT6Value = 1;
                            break;
                        case "AT6_Driving_Unlock_In_Park":
                            ADLAT6Value = 2;
                            break;
                        case "AT6_DrivingUnlock_IGN_Off":
                            ADLAT6Value = 3;
                            break;
                        case "AT6_Driving":
                            ADLAT6Value = 4;
                            break;
                        case "AT6_Off":
                            ADLAT6Value = 5;
                            break;
                        default:
                            //do nothing
                            log.info("Invalid value of Get_AutoDoorLockAT6 : "+this._cachedGet_AutoDoorLockAT6);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(ADLAT6Value, true);
                }
                else if (this._cachedVehicle_AutoDoorLockInstalledAT === 1)
                {
                    this._currentContextTemplate.list2Ctrl.setDataList(this._DoorLockModeAutoTransmissionCtxtDataList);
                    if (tmplt.list2Ctrl.dataList.itemCount) 
                    { 
                        tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                    }
                    var ADLATValue = 4;
                    switch(this._cachedGet_AutoDoorLockAT)
                    {
                        case "AT5_Lock_OutOfPark":
                            ADLATValue = 0;
                            break;
                        case "AT5_Shift_OutOfPark":
                            ADLATValue = 1;
                            break;
                        case "AT5_DrivingUnlock_IGN_Off":
                            ADLATValue = 2;
                            break;
                        case "AT5_Driving":
                            ADLATValue = 3;
                            break;
                        case "AT5_Off":
                            ADLATValue = 4;
                            break;
                        default:
                            //do nothing
                            log.info("Invalid value of Get_AutoDoorLockAT : "+this._cachedGet_AutoDoorLockAT);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(ADLATValue, true);
                }
                else if (this._cachedVehicle_AutoDoorLockInstalledMT === 1 )
                {
                    this._currentContextTemplate.list2Ctrl.setDataList(this._DoorLockModeManualTransmissionCtxtDataList);
                    if (tmplt.list2Ctrl.dataList.itemCount) 
                    { 
                        tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                    }
                    var ADLMTValue = 2;
                    switch(this._cachedGet_AutoDoorLockMT)
                    {
                        case "MT_DrivingUnlock_IGN_Off":
                            ADLMTValue = 0;
                            break;
                        case "MT_Driving":
                            ADLMTValue = 1;
                            break;
                        case "MT_Off":
                            ADLMTValue = 2;
                            break;
                        default:
                            //do nothing
                            log.info("Invalid value of Get_AutoDoorLockMT : "+this._cachedGet_AutoDoorLockMT);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(ADLMTValue, true);
                }
                else if (this._cachedVehicle_AutoDoorLockInstalledAT === 0 && this._cachedVehicle_AutoDoorLockInstalledMT === 0 && this._cachedVehicle_AutoDoorLockInstalledAT6 === 0 )
                {
                    this._currentContextTemplate.list2Ctrl.setDataList(this._DoorLockModeNullDataList);
                }
                else
                {
                    log.warn("Auto and Manual door Lock mode cannot be installed simultaneously.Invalid case");
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                if (tmplt.list2Ctrl.dataList.itemCount != this._cachedListLength)
                {
                    this._isListChanged = true;
                }
                break; 
                
            case "SLI":
			this._specialSLIcheck=0;
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    if(this._cachedHUDVal == 2 && this._cachedCDVal == 2)
                    {
                        this._SelectSpeedLimitInformationCtxtDataList.items[1].disabled = true;
                        this._SelectSpeedLimitInformationCtxtDataList.items[2].disabled = true;             
                    }
                    
                    tmplt.list2Ctrl.dataList.items[1].label1Id = this._cachedSpeedLimitCaution;
                    tmplt.list2Ctrl.dataList.items[2].label1 = this._speedTransition[this._cachedSpeed]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
                    this._currentContextTemplate.list2Ctrl.setDataList(this._SelectSpeedLimitInformationCtxtDataList);
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;
			case "SLI_WHUD":
			this._specialSLIcheck=1;
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
			        if(this._TSRStatus === "TSR_Enabled") //display string as Traffic Sign Recognition
					{
					   tmplt.list2Ctrl.dataList.items[0].text1Id = "TSR_Display";
					}
					else
					{
					   tmplt.list2Ctrl.dataList.items[0].text1Id = "SpeedLimitSign";
					}
                    if(this._cachedHUDVal == 2)
                    {
	                        this._SelectSpeedLimitInformationCtxtDataListCHud.items[1].disabled = true;
                            this._SelectSpeedLimitInformationCtxtDataListCHud.items[2].disabled = true;             
                    }
					else
					{
							this._SelectSpeedLimitInformationCtxtDataListCHud.items[1].disabled = false;
                            this._SelectSpeedLimitInformationCtxtDataListCHud.items[2].disabled = false;  
					}
				    tmplt.list2Ctrl.dataList.items[0].value = this._cachedHUDVal;
                    tmplt.list2Ctrl.dataList.items[1].label1Id = this._cachedSpeedLimitCaution;
                    tmplt.list2Ctrl.dataList.items[2].label1 = this._speedTransition[this._cachedSpeed]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
                    this._currentContextTemplate.list2Ctrl.setDataList(this._SelectSpeedLimitInformationCtxtDataListCHud);
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;

            case "SLSign":
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1) )
                {//if both of the status are enable, enable all the settings
                    var region = framework.localize.getRegion();
                    if(this._cachedSpeedLimitCheck == 0)
                    {
                        if (region == "Region_Europe" || region == "Region_NorthAmerica")
                        {
                            tmplt.list2Ctrl.dataList.items[0].value = 1;
                            tmplt.list2Ctrl.dataList.items[1].value = 1;
                            this._cachedSpeedLimitCheck = 1;
                        }
                        else if(region == "Region_4A")
                        {
                            tmplt.list2Ctrl.dataList.items[0].value = 0;
                            tmplt.list2Ctrl.dataList.items[1].value = 1;
                            this._cachedSpeedLimitCheck = 1;
                        }
                        else if(region == "Region_ChinaTaiwan" )
                        {
                            tmplt.list2Ctrl.dataList.items[0].value = 1;
                            tmplt.list2Ctrl.dataList.items[1].value = 0;
                            this._cachedSpeedLimitCheck = 1;
                        }
                    }
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }
                if(this._cachedHUDVal == 2)
                {
                    this._SelectSpeedLimitSignCtxtDataList.items[0].value = 0; 
                }
                else
                {
                    this._SelectSpeedLimitSignCtxtDataList.items[0].value = 1;
                }
                
                if(this._cachedCDVal == 2)
                {
                    this._SelectSpeedLimitSignCtxtDataList.items[1].value = 0; 
                }
                else
                {
                    this._SelectSpeedLimitSignCtxtDataList.items[1].value = 1;
                }
                
               if (tmplt.list2Ctrl.dataList.itemCount) 
               { 
                    this._currentContextTemplate.list2Ctrl.setDataList(this._SelectSpeedLimitSignCtxtDataList);
                   tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
               }       
               break;
                    
            case "SpeedAlarm":
                this._cachedGetSpeedUnit = framework.localize.getDistanceUnit();
                var tempMinValue = this._cachedGetSpeedUnit == "Kilometers" ? 30 : 20;
                var tempMaxValue = this._cachedGetSpeedUnit == "Kilometers" ? 250 : 150;
                var incrementValue = this._cachedGetSpeedUnit == "Kilometers" ? 10 : 5;

                if(this._currentValue == 1 && this._previousSpeedAlarmTime)
                {
                    this._currentValue = this._previousSpeedAlarmTime;
                }
                else if(this._currentValue == 1)
                {
                    this._currentValue = this._cachedGetSpeedUnit == "Kilometers" ? 30 : 20;
                }
                
                
                if( tmplt.list2Ctrl.dataList.items[0].text1Id =='Setting' && (tmplt.list2Ctrl.dataList.items[0].value == 1 || this._cachedSettingValOnOff == "SpeedAlarm_On"))
                {
					if(!this._SpeedAlarmTime)
					{
						this._SelectSpeedAlarmCtxtDataList = {
						itemCountKnown : true,
							itemCount : 2,
							items: [ 
										{ appData : 'GoToSetting', text1Id : 'Setting', itemStyle : 'styleOnOff', value:1, hasCaret:false,disabled:this.cachedSpeed},
										{ appData: 'SetAlarmTiming', text1: ' ' , itemStyle: 'styleStep', label1Id:'AlarmTiming', label1SubMap : this._distancealarm, label2Id : "Step"+this._cachedGetSpeedUnit , hasCaret : false,value: this._currentValue ,min: tempMinValue ,max : tempMaxValue,increment : incrementValue,styleMod :'hint'},
								   ]
						};
						//this._SpeedAlarmTime = true;					
					}
                }
                else
                {
					log.debug("Setting Value of _SpeedAlarmTime in populateListCtrl to false");
                    this._SpeedAlarmTime = false;
                    this._SelectSpeedAlarmCtxtDataList = {
                    itemCountKnown : true,
                        itemCount : 1,
                        items: [ 
                                    { appData : 'GoToSetting', text1Id : 'Setting', itemStyle : 'styleOnOff', value:0, hasCaret:false,disabled:this.cachedSpeed},
                               ]
                    };
                }
                
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < this._SelectSpeedAlarmCtxtDataList.itemCount; tempcount++)
                    {
                        this._SelectSpeedAlarmCtxtDataList.items[tempcount].disabled = true;
                    }
                    
                }
                
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    
                    for(var tempcount = 0; tempcount < this._SelectSpeedAlarmCtxtDataList.itemCount; tempcount++)
                    {
                        //this._SelectSpeedAlarmCtxtDataList.items[tempcount].disabled = false;  
                        this._SelectSpeedAlarmCtxtDataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                    
                }

				if(this._SpeedAlarmTime)
				{
					   this._SelectSpeedAlarmCtxtDataList.items[1].label2 = this._currentValue+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
					   this._SelectSpeedAlarmCtxtDataList.items[1].value = this._currentValue;
					   this._SelectSpeedAlarmCtxtDataList.items[1].label2Id = "Step"+this._cachedGetSpeedUnit;
					   this._currentContextTemplate.list2Ctrl.updateItems(0,this._SelectSpeedAlarmCtxtDataList.itemCount-1);
				}
				else
				{
					this._currentContextTemplate.list2Ctrl.setDataList(this._SelectSpeedAlarmCtxtDataList);
					this._currentContextTemplate.list2Ctrl.updateItems(0,this._SelectSpeedAlarmCtxtDataList.itemCount-1);
					if(this._cachedSettingValOnOff == "SpeedAlarm_On")
					{
						log.debug("Setting Value of _SpeedAlarmTime in populateListCtrl to true");
						this._SpeedAlarmTime = true;
					}
					
				}
                break;

            // Caution Speed
            case "CautionSpeed":
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                 }
                 if (tmplt.list2Ctrl.dataList.itemCount)
                {
                    tmplt.list2Ctrl.dataList.items[0].text1 = this._speedTransition[this._cachedSpeed1]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
                    tmplt.list2Ctrl.dataList.items[1].text1 = this._speedTransition[this._cachedSpeed2]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
                    tmplt.list2Ctrl.dataList.items[2].text1 = this._speedTransition[this._cachedSpeed3]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
                
                }
                for(var iCount=0;iCount<=this._SelectCautionSpeedCtxtDataList.itemCount - 1;iCount++)
                {
                    if(this._SelectCautionSpeedCtxtDataList.items[iCount].text1 === this._speedTransition[this._cachedSpeed]+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit))
                    {
                        this._SelectCautionSpeedCtxtDataList.items[iCount].checked = true;
                    }
                    else
                    {
                        this._SelectCautionSpeedCtxtDataList.items[iCount].checked = false;
                    }
                }
                tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                break;
            case "SLCaution":
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0) )
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                 }
                
                for(var iCount=0;iCount<=this._SelectSpeedLimitCautionCtxtDataList.itemCount - 1;iCount++)
                {
                    if(this._SelectSpeedLimitCautionCtxtDataList.items[iCount].text1Id === this._cachedSpeedLimitCaution)
                    {
                        this._SelectSpeedLimitCautionCtxtDataList.items[iCount].checked = true;
                    }
                    else
                    {
                        this._SelectSpeedLimitCautionCtxtDataList.items[iCount].checked = false;
                    }
                }
                    
               if (tmplt.list2Ctrl.dataList.itemCount) 
               { 
                    tmplt.list2Ctrl.setDataList(this._SelectSpeedLimitCautionCtxtDataList); 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
               }
                break;
                    
            case "IntLightingBrightness":
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0) )
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1) )
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }
                for(var iCount=0;iCount<=this._SelectILBCtxtDataList.itemCount - 1;iCount++)
                {
                    if(this._SelectILBCtxtDataList.items[iCount].text1Id === this._cachedILB)
                    {
                        this._SelectILBCtxtDataList.items[iCount].checked = true;
                    }
                    else
                    {
                        this._SelectILBCtxtDataList.items[iCount].checked = false;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;
            case "KeylessLockBeepVol":
                if (this._cachedSafety_AutoDoorLockChimeVolume )
                {
                    var ADLCVValue = 3;
                    switch(this._cachedSafety_AutoDoorLockChimeVolume)
                    {
                        case "KBV_Big":
                            ADLCVValue = 0;
                            break;
                        case "KBV_Middle":
                            ADLCVValue = 1;
                            break;
                        case "KBV_Small":
                            ADLCVValue = 2;
                            break;
                        case "KBV_Off":
                            ADLCVValue = 3;
                            break;
                        default:
                            //do nothing
                            log.info("Invalid Safety_AutoDoorLockChimeVolume Value "+this._cachedSafety_AutoDoorLockChimeVolume);                
                            break;
                    }
                    tmplt.list2Ctrl.setTick(ADLCVValue, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break; 
            case "DoorRelockTime":
                if (this._cachedSafety_AutoRelockTimer )
                {
                    var ARTValue = 2;
                    switch(this._cachedSafety_AutoRelockTimer)
                    {
                        case "Door_Relock_90_Sec":
                            ARTValue = 0;
                            break;
                        case "Door_Relock_60_Sec":
                            ARTValue = 1;
                            break;
                        case "Door_Relock_30_Sec":
                            ARTValue = 2;
                            break;
                        default:
                            //do nothing
                            log.info("Invalid Safety_AutoRelockTimer Value "+this._cachedSafety_AutoRelockTimer);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(ARTValue, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;
            case "UnlockMode":
                if (this._cachedKeyless_UnlockMode )
                {
                    var UMValue = 2;
                    switch(this._cachedKeyless_UnlockMode)
                    {
                        case "Unlock_AllSeat":
                            UMValue = 0;
                            break;
                        case "Unlock_DriverSeat":
                            UMValue = 1;
                            break;
                        default:
                            //do nothing
                            log.info("Invalid Keyless_UnlockMode Value "+this._cachedKeyless_UnlockMode);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(UMValue, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break; 
            case "BSMVolume":
                if (this._cachedBSMBuzzerVolume )
                {
                    var BSMValue = 2;
                    switch(this._cachedBSMBuzzerVolume)
                    {
                        case "BSM_Vol_Big":
                            BSMValue = 0;
                            break;
                        case "BSM_Vol_Small":
                            BSMValue = 1;
                            break;
                        case "BSM_Vol_No_Alarm":
                            BSMValue = 2;
                            break;
                        default:
                            //do nothing
                            log.info("Invalid BSMBuzzerVolume Value "+this._cachedBSMBuzzerVolume);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(BSMValue, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;
            case "BSMSystem":
                log.info("Inside Populate Function = "+this._cachedBSMSystem+"   "+this._cachedBSMBuzzerVolume);
                if(this._cachedBSMSystem)
                {
                    var BSMSystem = 2;
                    switch(this._cachedBSMSystem)
                    {
                        case "BSM_On" :
                            BSMSystem = 1;
                            break;
                        case "BSM_Off":
                            BSMSystem = 2;
                            break;
                        default:
                            log.warn("Incorrect value of DRSS received"+ this._cachedBSMSystem);
                            break;
                    }
                }
                if (this._cachedBSMVolume )
                {
                    var BSMValue = 0;
                    switch(this._cachedBSMVolume)
                    {
                        case "BSM_Vol_Big":
                            BSMValue = 1;
                            break;
                        case "BSM_Vol_Small":
                            BSMValue = 2;
                            break;
                        case "BSM_Vol_No_Alarm":
                            BSMValue = 3;
                            break;
                        default:
                            //do nothing
                            log.info("Invalid BSMBuzzerVolume Value "+this._cachedBSMVolume);
                            break;
                    }
                    this._currentContextTemplate.list2Ctrl.setToggleValue(1,BSMValue);
                }
                if(this._cachedBSMSystem)
                {
                    tmplt.list2Ctrl.dataList.items[0].value = BSMSystem;
                }
                if (this._cachedBSMBuzzerVolume )
                {
                    tmplt.list2Ctrl.dataList.items[0].value = BSMValue;
                }

                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }
                if(this._cachedBSMSystem === "BSM_Off")
                {
                    this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = true;
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                 this._currentContextTemplate.list2Ctrl.setToggleValue(0,BSMSystem);
            break;
            case "RVMVolume":
                if (this._cachedRVMBuzzerVolume )
                {
                    var RVMValue = 2;
                    switch(this._cachedRVMBuzzerVolume)
                    {
                        case "RVM_Vol_Big":
                            RVMValue = 0;
                            break;
                        case "RVM_Vol_Small":
                            RVMValue = 1;
                            break;
                        case "RVM_Vol_No_Alarm":
                            RVMValue = 2;
                            break;
                        default:
                            //do nothing
                             log.info("Invalid RVMBuzzerVolume Value "+this._cachedRVMBuzzerVolume);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(RVMValue, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;
            case "LDWSTiming":
                if (this._cached_LAS_LDWSTiming)
                {
                    if (framework.localize.getRegion() != "Region_NorthAmerica")
                    {
                        var LASLDWSTiming = 3;
                        switch(this._cached_LAS_LDWSTiming)
                            {
                                case "LDWS_Timing_Automaticaly":
                                    LASLDWSTiming = 0;
                                    break;
                                case "LDWS_Timing_Insideline":
                                    LASLDWSTiming = 1;
                                    break;
                                case "LDWS_Timing_Online":
                                    LASLDWSTiming = 2;
                                    break;
                                case "LDWS_Timing_Outsideline":
                                    LASLDWSTiming = 3;
                                    break;
                                default:
                                    log.info("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                    break;
                            }
                        tmplt.list2Ctrl.setTick(LASLDWSTiming, true);
                    }
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;
            
            case "HeadlightOffTimer":
                if (this._cachedHeadlight_HeadlightOffTimer)
                {
                    var HOTValue = 4;
                    switch(this._cachedHeadlight_HeadlightOffTimer)
                    {
                        case "HOT_120_Sec" :
                            HOTValue = 0;
                            break;
                        case "HOT_90_Sec" :
                            HOTValue = 1;
                            break;
                        case "HOT_60_Sec" :
                            HOTValue = 2;
                            break;
                        case "HOT_30_Sec" :
                            HOTValue = 3;
                            break;
                        case "HOT_OFF" :
                            HOTValue = 4;
                            break;
                        default:
                            log.info("Invalid Headlight_HeadlightOffTimer Value : " + this._cachedHeadlight_HeadlightOffTimer);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(HOTValue, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;
            case "AutoHeadlightOn": 
                if (this._cachedHeadlight_AutoHeadlightsSensitivity)
                {
                    var AHSValue = 4;
                    switch(this._cachedHeadlight_AutoHeadlightsSensitivity)
                    {
                        case "AHS_Extra_High" :
                            AHSValue = 0;
                            break;
                        case "AHS_High" :
                            AHSValue = 1;
                            break;
                        case "AHS_Standard" :
                            AHSValue = 2;
                            break;
                        case "AHS_Low" :
                            AHSValue = 3;
                            break;
                        case "AHS_Extra_Low" :
                            AHSValue = 4;
                            break;
                        default:
                            log.info("Invalid Headlight_AutoHeadlightsSensitivity Value : " + this._cachedHeadlight_AutoHeadlightsSensitivity);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(AHSValue, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;
            
            case "IntLightTimeoutDoorOpen":
                if (this._cachedSafety_InterioLightTimeoutDoorOpen)
                {
                    var ILTDOindex = 2;
                    switch (this._cachedSafety_InterioLightTimeoutDoorOpen)
                    {
                        case "ILTDO_60_Min":
                            ILTDOindex = 0;
                            break;
                        case "ILTDO_30_Min":
                            ILTDOindex = 1;
                            break;
                        case "ILTDO_10_Min":
                            ILTDOindex = 2;
                            break;
                        default:
                            log.warn("Incorrect value of Interio Light Timeout Door Open" + this._cachedSafety_InterioLightTimeoutDoorOpen);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(ILTDOindex, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;  
            case "IntLightTimeoutDoorClosed":
                if (this._cachedSafety_InterioLightTimeoutDoorClosed)
                {
                    var ILTDCindex = 3;
                    switch (this._cachedSafety_InterioLightTimeoutDoorClosed)
                    {
                        case "ILTDC_60_Sec":
                            ILTDCindex = 0;
                            break;
                        case "ILTDC_30_Sec":
                            ILTDCindex = 1;
                            break;
                        case "ILTDC_15_Sec":
                            ILTDCindex = 2;
                            break;
                        case "ILTDC_7_5_Sec":
                            ILTDCindex = 3;
                            break;
                        default:
                            log.warn("Incorrect value of Interio Light Timeout Door Closed" + this._cachedSafety_InterioLightTimeoutDoorClosed);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(ILTDCindex, true);
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = this.cachedSpeed;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;  
            case "DRSS":
                //DRSS
                if (this._cachedDRSS_DRSS)
                {
                    var DRSSValue = 2;
                    switch (this._cachedDRSS_DRSS)
                    {
                        case "DRSS_On":
                            DRSSValue = 1;
                            break;
                        case "DRSS_Off":
                            DRSSValue = 2;
                            break;
                        default :
                            log.warn("Incorrect value of DRSS received"+ this._cachedDRSS_DRSS);
                            break;
                    }
                    tmplt.list2Ctrl.dataList.items[0].value = DRSSValue;
                }
                //DRSS Sensitivity
                if (this._cachedDRSS_DRSSSensitivity )
                {
                    var DRSSSenValue = 3;
                    switch (this._cachedDRSS_DRSSSensitivity)
                    {
                        case "DRSS_Distance_Long":
                            DRSSSenValue = 1;
                            break;
                        case "DRSS_Distance_Middle":
                            DRSSSenValue = 2;
                            break;
                        case "DRSS_Distance_Short":
                            DRSSSenValue = 3;
                            break;
                        default :
                            log.warn("Incorrect value of DRSS received"+ this._cachedDRSS_DRSSSensitivity);
                            break;
                    }
                    tmplt.list2Ctrl.dataList.items[1].value = DRSSSenValue; 
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                {
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;  
            case "SBS_SCBS_J36IPM":
            log.debug("Inside Populate Function for SBS_SCBS_J36IPM");

                var SCBSValue = 2;
                switch (this._cached_SBS_SCBS_J36IPM)
                {
                    case "SCBS_On":
                        SCBSValue = 1;
                        break;
                    case "SCBS_Off":
                        SCBSValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_J36IPM);
                        break;
                }
               //SCBS Distance
                var SCBSDistValue = 1;
                switch (this._cached_SCBSDistance_J36IPM)
                {
                    case "SCBSDistance_Long":
                        SCBSDistValue = 1;
                        break;
                    case "SCBSDistance_Middle":
                        SCBSDistValue = 2;
                        break;
                     case "SCBSDistance_Short":
                        SCBSDistValue = 3;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SCBSDistance_J36IPM);
                        break;
                }
                //SBS Volume
                var SBSVolValue = 3;
                switch (this._cached_SBS_SCBS_BuzzerVolume)
                {
                    case "SBS_Vol_Big":
                        SBSVolValue = 1;
                        break;
                    case "SBS_Vol_Small":
                        SBSVolValue = 2;
                        break;
                    case "SBS_Vol_No_Alarm":
                        SBSVolValue = 3;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_BuzzerVolume);
                        break;
                }
                if (this._cached_SBS_SCBS_J36IPM)
                {
                    tmplt.list2Ctrl.dataList.items[0].value = SCBSValue; 
                }
                    if (this._cached_SCBSDistance_J36IPM)
                    {
                        tmplt.list2Ctrl.dataList.items[1].value = SCBSDistValue; 
                    }
                    if (this._cached_SBS_SCBS_BuzzerVolume)
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = SBSVolValue; 
                    } 
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
            break;
            case "SBS":
                //SBS
                var SBSValue = 2;
                switch (this._cached_SBS_SCBS_BrakeSupport)
                {
                    case "SBS_On":
                        SBSValue = 1;
                        break;
                    case "SBS_Off":
                        SBSValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_BrakeSupport);
                        break;
                }
                //SBS Distance
                var SBSDistValue = 1;
                switch (this._cached_SBS_SCBS_Distance)
                {
                    case "SBS_Distance_Short":
                        SBSDistValue = 1;
                        break;
                    case "SBS_Distance_Long":
                        SBSDistValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_Distance);
                        break;
                }
                //SBS Volume
                var SBSVolValue = 3;
                switch (this._cached_SBS_SCBS_BuzzerVolume)
                {
                    case "SBS_Vol_Big":
                        SBSVolValue = 1;
                        break;
                    case "SBS_Vol_Small":
                        SBSVolValue = 2;
                        break;
                    case "SBS_Vol_No_Alarm":
                        SBSVolValue = 3;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_BuzzerVolume);
                        break;
                }
                if (this._cached_SBS_SCBS_BrakeSupport)
                {
                    tmplt.list2Ctrl.dataList.items[0].value = SBSValue; 
                }
                if (framework.localize.getRegion() == "Region_Europe")
                {
                    if (this._cached_SBS_SCBS_BuzzerVolume)
                    {
                        tmplt.list2Ctrl.dataList.items[1].value = SBSVolValue; 
                    } 
                }
                else
                {
                    if (this._cached_SBS_SCBS_Distance)
                    {
                        tmplt.list2Ctrl.dataList.items[1].value = SBSDistValue; 
                    }
                    if (this._cached_SBS_SCBS_BuzzerVolume)
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = SBSVolValue; 
                    } 
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }
                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break; 
            case "SBS_SCBS":
                //SCBS
                var SCBSValue = 2;
                switch (this._cached_SBS_SCBS_BrakeSupport)
                {
                    //For SBS_SCBS context "SCBSValue" should use either SBS_On or SCBS_On
                    case "SCBS_On":
                    case "SBS_On":
                        SCBSValue = 1;
                        break;
                    //For SBS_SCBS context "SCBSValue" should use either SBS_Off or SCBS_Off
                    case "SCBS_Off":
                    case "SBS_Off":
                        SCBSValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_BrakeSupport);
                        break;
                }
                //SCBS Distance
                var SCBSDistValue = 1;
                switch (this._cached_SBS_SCBS_Distance)
                {
                    case "SBS_Distance_Short":
                        SCBSDistValue = 1;
                        break;
                    case "SBS_Distance_Long":
                        SCBSDistValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_Distance);
                        break;
                }
                //SCBS Volume
                var SCBSVolValue = 3;
                switch (this._cached_SBS_SCBS_BuzzerVolume)
                {
                    case "SBS_Vol_Big":
                        SCBSVolValue = 1;
                        break;
                    case "SBS_Vol_Small":
                        SCBSVolValue = 2;
                        break;
                    case "SBS_Vol_No_Alarm":
                        SCBSVolValue = 3;
                        break;
                    default :
                        log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_BuzzerVolume);
                        break;
                }
                if (this._cached_SBS_SCBS_BrakeSupport != null)
                {
                    tmplt.list2Ctrl.dataList.items[0].value = SCBSValue; 
                } 
                if (framework.localize.getRegion() == "Region_Europe")
                {  
                    if (this._cached_SBS_SCBS_BuzzerVolume)
                    {
                        tmplt.list2Ctrl.dataList.items[1].value = SCBSVolValue; 
                    }
                }
                else
                {
                    if (this._cached_SBS_SCBS_Distance)
                    {
                        tmplt.list2Ctrl.dataList.items[1].value = SCBSDistValue; 
                    }
                    if (this._cached_SBS_SCBS_BuzzerVolume)
                    {
                        tmplt.list2Ctrl.dataList.items[2].value = SCBSVolValue; 
                    } 
                }
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;  
            case "FOW":
                //FOW
                var FOWValue = 2;
                switch (this._cachedFOW_Warning)
                {
                    case "FOW_On":
                        FOWValue = 1;
                        break;
                    case "FOW_Off":
                        FOWValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of FOW received"+ this._cachedFOW_Warning);
                        break;
                }
                //FOW Distance
                var FOWDistValue = 1;
                switch (this._cachedFOW_Distance)
                {
                    case "FOW_Distance_Short":
                        FOWDistValue = 1;
                        break;
                    case "FOW_Distance_Long":
                        FOWDistValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of FOW Dist received"+ this._cachedFOW_Distance);
                        break;
                }
                //FOW Volume
                var FOWVolValue = 3;
                switch (this._cachedFOW_BuzzerVolume)
                {
                    case "FOW_Vol_Big":
                        FOWVolValue = 1;
                        break;
                    case "FOW_Vol_Small":
                        FOWVolValue = 2;
                        break;
                    case "FOW_Vol_No_Alarm":
                        FOWVolValue = 3;
                        break;
                    default :
                        log.warn("Incorrect value of FOW Volume received"+ this._cachedFOW_BuzzerVolume);
                        break;
                }
                if (this._cachedFOW_Warning)
                {
                    tmplt.list2Ctrl.dataList.items[0].value = FOWValue; 
                }
                if (this._cachedFOW_Distance)
                {
                    tmplt.list2Ctrl.dataList.items[1].value = FOWDistValue; 
                }
                if (this._cachedFOW_BuzzerVolume)
                {
                    tmplt.list2Ctrl.dataList.items[2].value = FOWVolValue; 
                }
                tmplt.list2Ctrl.updateItems(0,2);
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }

                if (tmplt.list2Ctrl.dataList.itemCount) 
                { 
                    tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1); 
                }
                break;  
            case "LAS":
                log.info("Cached LAS System : "+ this._cachedLAS_Installed+ " Cached Intervention : " +this._cachedIntervention);
                if (this._cachedLAS_Installed === 1 && this._cachedIntervention === "LAS_Intervention_On")
                {
                    if (framework.localize.getRegion() === "Region_NorthAmerica")
                    {
                        //Removed J78A vehicle check for showing intervention timing option
                        //as per CI-4332
                        this._currentContextTemplate.list2Ctrl.setDataList(this._LAS_NA_J78CtxtDataList);
                        tmplt.list2Ctrl.dataList.items[1] = this._LASCtxtDataListHelper.items[3];
                        this._indexTiming = null;
                        this._indexWarning = 1;
                        this._indexOfAlert = 2;
                        this._indexOfAlertType = 3;
                        this._indexSound = 4;
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button1Id = "High_SensitivityLAS";
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button2Id = "Low_SensitivityLAS";
                    }
                    else
                    {
                        this._currentContextTemplate.list2Ctrl.setDataList(this._LASCtxtDataList);
                        tmplt.list2Ctrl.dataList.items[1] = this._LASCtxtDataListHelper.items[0];
                        tmplt.list2Ctrl.dataList.items[2] = this._LASCtxtDataListHelper.items[2];
                        this._indexTiming = 1;
                        this._indexWarning = 2;
                        this._indexOfAlert = 3;
                        this._indexOfAlertType = 4;
                        this._indexSound = 5;
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button1Id = "High_SensitivityLAS";
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button2Id = "Medium_SensitivityLAS";
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button3Id = "Low_SensitivityLAS";
                        tmplt.list2Ctrl.dataList.items[this._indexTiming].text1Id = "InterventionTiming";
                    }
                    //Sound
                    var LASVolumeChange = 1; //default set to High
                    if(this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Vibration")
                    {
                        tmplt.list2Ctrl.dataList.items[this._indexSound] = this._LASCtxtDataListHelper.items[6];
                        tmplt.list2Ctrl.dataList.items[this._indexSound].itemStyle = "style10";
                        switch(this._cachedLAS_LDWS_SoundVolume)
                        {
                            case 'LDWS_Vol_High' : 
                                LASVolumeChange = 1; //High
                                break;
                            case 'LDWS_Vol_Med' : 
                                LASVolumeChange = 1; //High
                                break;
                            case 'LDWS_Vol_Low' : 
                                LASVolumeChange = 2; //Low
                                break;
                            default :
                                log.warn("Incorrect value of LAS_LDWS_SoundVolume received"+ this._cachedLAS_LDWS_SoundVolume);
                                break;
                        }
                    }
                    else if(this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Buzzer")
                    {
                        tmplt.list2Ctrl.dataList.items[this._indexSound] = this._LASCtxtDataListHelper.items[4];
                        tmplt.list2Ctrl.dataList.items[this._indexSound].itemStyle = "style10";
                        switch(this._cachedLAS_LDWS_SoundVolume)
                        {
                            case 'LDWS_Vol_High' : 
                                LASVolumeChange = 1; //High
                                break;
                            case 'LDWS_Vol_Med' : 
                                LASVolumeChange = 1; //High
                                break;
                            case 'LDWS_Vol_Low' : 
                                LASVolumeChange = 2; //Low
                                break;
                            default:
                                log.warn("Incorrect value of LAS_LDWS_SoundVolume received"+ this._cachedLAS_LDWS_SoundVolume);
                                break;
                        }
                    }
                    else if(this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Rumber")
                    {
                        tmplt.list2Ctrl.dataList.items[this._indexSound] = this._LASCtxtDataListHelper.items[5];
                        tmplt.list2Ctrl.dataList.items[this._indexSound].itemStyle = "style11";
                        switch(this._cachedLAS_LDWS_SoundVolume) 
                        {
                            case "LDWS_Vol_High":
                                LASVolumeChange = 1;
                                break;
                            case "LDWS_Vol_Med":
                                LASVolumeChange = 2;
                                break;
                            case "LDWS_Vol_Low":
                                LASVolumeChange = 3;
                                break;
                            default:
                                log.warn("Incorrect value of LAS_LDWS_SoundVolume received"+ this._cachedLAS_LDWS_SoundVolume);
                                break;
                        }
                    }
                    if(LASVolumeChange != null && LASVolumeChange != undefined)
                    {
                        tmplt.list2Ctrl.dataList.items[this._indexSound].value = LASVolumeChange;
                        log.info("this._cachedLASVolume :: "+LASVolumeChange);
                    }

                    //Alert
                    if (this._cachedLASAlert) 
                    {
                        var LASAValue = 2;
                        switch (this._cachedLASAlert)
                        {
                            case "LAS_Alert_On":
                                LASAValue = 1;
                                break;
                            case "LAS_Alert_Off":
                                LASAValue = 2;
                                break;
                            default:
                                //do nothing
                                log.warn("Incorrect value of LASAlert received"+ this._cachedLASAlert);
                                break;
                        }
                        tmplt.list2Ctrl.dataList.items[this._indexOfAlert].value = LASAValue; 
                    }
                    //If Intervention ON and Alert OFF disabled the AlertType and Volume. Intervention is ON here so just check for Alert
                    if(this._cachedLASAlert === "LAS_Alert_Off")
                    {
                        tmplt.list2Ctrl.dataList.items[this._indexOfAlertType].disabled = true;
                        tmplt.list2Ctrl.dataList.items[this._indexOfAlertType].hasCaret = false;
                        tmplt.list2Ctrl.dataList.items[this._indexOfAlertType].label1Id = null;
                        tmplt.list2Ctrl.dataList.items[this._indexOfAlertType].label1 = " ";
                        tmplt.list2Ctrl.dataList.items[this._indexSound].disabled = true;
                        tmplt.list2Ctrl.dataList.items[this._indexSound].itemStyle = "style01";
                    }
                    else
                    {
                        tmplt.list2Ctrl.dataList.items[this._indexOfAlertType].disabled = false;
                        tmplt.list2Ctrl.dataList.items[this._indexOfAlertType].hasCaret = true;
                        tmplt.list2Ctrl.dataList.items[this._indexOfAlertType].label1 = null;
                        tmplt.list2Ctrl.dataList.items[this._indexSound].disabled = false;
                    }
                    tmplt.list2Ctrl.dataList.items[this._indexWarning].text1Id = "Sensitivity";
                    this._currentContextTemplate.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
                }
                else if (this._cachedLAS_Installed === 1 && this._cachedIntervention === "LAS_Intervention_Off")
                {
                    var LASVolumeChange = 1; //default is set to High                   
                    this._currentContextTemplate.list2Ctrl.setDataList(this._InterventiondisabledCtxtDataList);
                    if (framework.localize.getRegion() === "Region_NorthAmerica")
                    {
                        tmplt.list2Ctrl.dataList.items[1] = this._LASCtxtDataListHelper.items[1];
                        tmplt.list2Ctrl.dataList.items[2] = this._LASCtxtDataListHelper.items[3];
                        this._indexSound = 4;
                        this._indexWarning = 2;
                        this._indexTiming = 1;
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button1Id = "Often_Int_OFF";
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button2Id = "Rare_Int_OFF";
                    }
                    else
                    {
                        tmplt.list2Ctrl.dataList.items[1] = this._LASCtxtDataListHelper.items[0];
                        tmplt.list2Ctrl.dataList.items[2] = this._LASCtxtDataListHelper.items[2];
                        this._indexSound = 4;
                        this._indexWarning = 2;
                        this._indexTiming = 1;
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button1Id = "Often_Int_OFF";
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button2Id = "Medium_Int_OFF";
                        tmplt.list2Ctrl.dataList.items[this._indexWarning].button3Id = "Rare_Int_OFF";
                    }
                    if(this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Vibration")
                    {
                        tmplt.list2Ctrl.dataList.items[4] = this._LASCtxtDataListHelper.items[6];
                        tmplt.list2Ctrl.dataList.items[4].itemStyle = "style10";
                        switch(this._cachedLAS_LDWS_SoundVolume)
                        {
                            case 'LDWS_Vol_High' : 
                                LASVolumeChange = 1; //High
                                break;
                            case 'LDWS_Vol_Med' : 
                                LASVolumeChange = 1; //High
                                break;
                            case 'LDWS_Vol_Low' : 
                                LASVolumeChange = 2; //Low
                                break;
                            default:
                                log.warn("Incorrect LAS_LDWS_SoundVolume value "+this._cachedLAS_LDWS_SoundVolume);
                                break;
                        }
                    }
                    else if(this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Buzzer")
                    {
                        tmplt.list2Ctrl.dataList.items[4] = this._LASCtxtDataListHelper.items[4];
                        tmplt.list2Ctrl.dataList.items[4].itemStyle = "style10";
                        switch(this._cachedLAS_LDWS_SoundVolume)
                        {
                            case 'LDWS_Vol_High' : 
                                LASVolumeChange = 1; //High
                                break;
                            case 'LDWS_Vol_Med' : 
                                LASVolumeChange = 1; //High
                                break;
                            case 'LDWS_Vol_Low' : 
                                LASVolumeChange = 2; //Low
                                break;
                            default:
                                log.warn("Incorrect LAS_LDWS_SoundVolume value "+this._cachedLAS_LDWS_SoundVolume);
                                break;
                        }
                    }
                    else if(this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Rumber")
                    {
                        tmplt.list2Ctrl.dataList.items[4] = this._LASCtxtDataListHelper.items[5];
                        tmplt.list2Ctrl.dataList.items[4].itemStyle = "style11";
                        switch(this._cachedLAS_LDWS_SoundVolume) 
                        {
                            case "LDWS_Vol_High":
                                LASVolumeChange = 1;
                                break;
                            case "LDWS_Vol_Med":
                                LASVolumeChange = 2;
                                break;
                            case "LDWS_Vol_Low":
                                LASVolumeChange = 3;
                                break;
                            default:
                                log.warn("Incorrect LAS_LDWS_SoundVolume value "+this._cachedLAS_LDWS_SoundVolume);
                                break;
                        }
                    }
                    if(LASVolumeChange != null && LASVolumeChange != undefined)
                    {
                        tmplt.list2Ctrl.dataList.items[4].value = LASVolumeChange;
                        log.info("this._cachedLASVolume :: "+LASVolumeChange);
                    }
                    //Alert
                    if (this._cachedLASAlert) 
                    { 
                        var LASAValue = 2;
                        switch (this._cachedLASAlert)
                        {
                            case "LAS_Alert_On":
                                LASAValue = 1;
                                break;
                            case "LAS_Alert_Off":
                                LASAValue = 2;
                                break;
                            default:
                                //do nothing
                                log.warn("Incorrect LASAlert value "+this._cachedLASAlert);
                                break;
                        }
                        tmplt.list2Ctrl.dataList.items[1].value = LASAValue;
                    }
                    tmplt.list2Ctrl.dataList.items[4].disabled = false;
                    tmplt.list2Ctrl.dataList.items[5].disabled = false;
                    
                    tmplt.list2Ctrl.dataList.items[this._indexWarning].text1Id = "Sensitivity_Intervention_OFF";
                    tmplt.list2Ctrl.dataList.items[this._indexTiming].text1Id = "AlertTiming";
                }
                /* Set values for Timing and Sound Type*/
                for (var i = 0; i < tmplt.list2Ctrl.dataList.itemCount; i++) 
                {
                    //Timing
                    if (tmplt.list2Ctrl.dataList.items[i].appData === "SetLDWSTiming") //"Region_NorthAmerica"
                    {
                        if (this._cached_LAS_LDWSTiming)
                        {
                            {
                                switch(this._cached_LAS_LDWSTiming)
                                {
                                    case "LDWS_Timing_Online":
                                        tmplt.list2Ctrl.dataList.items[this._indexTiming].value = 1;
                                        break;
                                    case "LDWS_Timing_Insideline":
                                        tmplt.list2Ctrl.dataList.items[this._indexTiming].value = 2;
                                        break;
                                    default:
                                        log.info("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                        break;
                                }
                            }
                        }
                    }
                    else if (tmplt.list2Ctrl.dataList.items[i].appData === "GoLASTiming") //Set label for Other Regions
                    {
                        if (this._cached_LAS_LDWSTiming )
                        {
                            switch (this._cached_LAS_LDWSTiming)
                            { 
                                case "LDWS_Timing_Automaticaly":
                                    if(this._cachedIntervention === "LAS_Intervention_On")
                                    {
                                        tmplt.list2Ctrl.dataList.items[i].label1Id = "LASEarly";  
                                    }
                                    else
                                    {
                                        tmplt.list2Ctrl.dataList.items[i].label1Id = "Adaptive";  
                                    }
                                    break;
                                case "LDWS_Timing_Insideline":
                                    tmplt.list2Ctrl.dataList.items[i].label1Id = "LASEarly"; 
                                    break; 
                                case "LDWS_Timing_Online":
                                    if(this._cachedIntervention === "LAS_Intervention_On")
                                    {
                                        tmplt.list2Ctrl.dataList.items[i].label1Id = "LASLate";  
                                    }
                                    else
                                    {
                                        tmplt.list2Ctrl.dataList.items[i].label1Id = "Med";  
                                    }
                                    break;  
                                case "LDWS_Timing_Outsideline":
                                    tmplt.list2Ctrl.dataList.items[i].label1Id = "LASLate";  
                                    break;
                                default:
                                    log.info("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                    break;
                            }
                        }
                    }
                    //Sound Type
                    else if (tmplt.list2Ctrl.dataList.items[i].appData === "GoLASSound")
                    {
                        if (this._cached_LAS_LDWS_SoundSetting && (!(this._cachedIntervention === "LAS_Intervention_On" && this._cachedLASAlert === "LAS_Alert_Off" )))
                        {
                            switch (this._cached_LAS_LDWS_SoundSetting)
                            { 
                                case "LDWS_Sound_Vibration":
                                    tmplt.list2Ctrl.dataList.items[i].label1Id = "Vibration";  
                                    break;
                                case "LDWS_Sound_Buzzer":
                                    tmplt.list2Ctrl.dataList.items[i].label1Id = "Beep"; 
                                    break; 
                                case "LDWS_Sound_Rumber":
                                    tmplt.list2Ctrl.dataList.items[i].label1Id = "RumbleStrips";   
                                    break;  
                                default:
                                    log.info("Invalid LAS_LDWS_SoundSetting Value : " + this._cached_LAS_LDWS_SoundSetting);
                                    break;
                            }       
                            tmplt.list2Ctrl.dataList.items[i].hasCaret = true;
                        }
                    }               
                }
                //Intervention
                if (this._cachedIntervention) 
                    {
                        switch(this._cachedIntervention)
                        {
                            case "LAS_Intervention_On":
                                tmplt.list2Ctrl.dataList.items[0].value = 1;
                                break;
                            case "LAS_Intervention_Off":
                                tmplt.list2Ctrl.dataList.items[0].value = 2;
                                break;
                            default:
                                log.info("Invalid LDWS Warning Value : " + this._cachedIntervention);
                                break;
                        }
                    }
                //Warning
                if (this._cached_LAS_LDWS_Warning)
                {
                    if (framework.localize.getRegion() === "Region_NorthAmerica")
                    {
                        switch(this._cached_LAS_LDWS_Warning)
                        {
                            case "LDWS_Warning_Ofen":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 1;
                                break;
                            case "LDWS_Warning_Rare":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 2;
                                break;
                            default:
                                log.info("Invalid LDWS Warning Value : " + this._cached_LAS_LDWS_Warning);
                                break;
                        }
                    }
                    else
                    {
                        switch(this._cached_LAS_LDWS_Warning)
                        {
                            case "LDWS_Warning_Ofen":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 1;
                                break;
                            case "LDWS_Warning_Med":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 2;
                                break;
                            case "LDWS_Warning_Rare":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 3;
                                break;
                            default:
                                log.warn("Invalid LDWS Warning Value : " + this._cached_LAS_LDWS_Warning);
                                break;
                        }
                    }
                }
                this._currentContextTemplate.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
                break;
            case "LDWS":
                this._indexSound = 2;
                this._indexWarning = 1;
                this._indexTiming = 0;
                if (this._cachedLDWSSound_Installed === 0)
                {
                    tmplt.list2Ctrl.setDataList(this._LDWSCtxtDataListNotInstalled); 
                }
                else if (this._cachedLDWSSound_Installed === 1)
                {
                    tmplt.list2Ctrl.setDataList(this._LDWSCtxtDataList);
                }
                //Timing and Warning
                if (framework.localize.getRegion() === "Region_NorthAmerica")
                {
                tmplt.list2Ctrl.dataList.items[0] =  this._LDWSCtxtDataListHelper.items[1];
                tmplt.list2Ctrl.dataList.items[1] =  this._LDWSCtxtDataListHelper.items[3];
                }
                else
                {
                tmplt.list2Ctrl.dataList.items[0] =  this._LDWSCtxtDataListHelper.items[0];
                tmplt.list2Ctrl.dataList.items[1] =  this._LDWSCtxtDataListHelper.items[2];
                }
                //Set Timing value
                if (tmplt.list2Ctrl.dataList.items[this._indexTiming].appData === "SetLDWSTiming") //Region_NorthAmerica
                {
                    if (this._cached_LAS_LDWSTiming)
                    {
                        {
                            switch(this._cached_LAS_LDWSTiming)
                            {
                                case "LDWS_Timing_Online":
                                    tmplt.list2Ctrl.dataList.items[this._indexTiming].value = 1;
                                    break;
                                case "LDWS_Timing_Insideline":
                                    tmplt.list2Ctrl.dataList.items[this._indexTiming].value = 2;
                                    break;
                                default:
                                    log.info("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                    break;
                            }
                        }
                    }
                }
                else if (tmplt.list2Ctrl.dataList.items[this._indexTiming].appData === "GoLDWSTiming") //Other regions
                {
                    if (this._cached_LAS_LDWSTiming)
                    {
                        switch(this._cached_LAS_LDWSTiming)
                        {
                            case "LDWS_Timing_Automaticaly":
                                tmplt.list2Ctrl.dataList.items[this._indexTiming].label1Id = "Adaptive"; 
                                break;
                            case "LDWS_Timing_Insideline":
                                tmplt.list2Ctrl.dataList.items[this._indexTiming].label1Id = "Early"; 
                                break;
                            case "LDWS_Timing_Online":
                                tmplt.list2Ctrl.dataList.items[this._indexTiming].label1Id = "Medium";  
                                break;
                            case "LDWS_Timing_Outsideline":
                                tmplt.list2Ctrl.dataList.items[this._indexTiming].label1Id = "Late";
                                break;
                            default:
                                log.info("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                break;
                        }                   
                    }                           
                } 
                //Set Warning value
                if (this._cached_LAS_LDWS_Warning)
                {
                    if (framework.localize.getRegion() === "Region_NorthAmerica")
                    {
                        switch(this._cached_LAS_LDWS_Warning)
                        {
                            case "LDWS_Warning_Ofen":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 1;
                                break;
                            case "LDWS_Warning_Rare":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 2;
                                break;
                            default:
                                log.info("Invalid LDWS Warning Value : " + this._cached_LAS_LDWS_Warning);
                                break;
                        }
                    }
                    else
                    {
                        switch(this._cached_LAS_LDWS_Warning)
                        {
                            case "LDWS_Warning_Ofen":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 1;
                                break;
                            case "LDWS_Warning_Med":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 2;
                                break;
                            case "LDWS_Warning_Rare":
                                tmplt.list2Ctrl.dataList.items[this._indexWarning].value = 3;
                                break;
                            default:
                                log.warn("Invalid LDWS Warning Value : " + this._cached_LAS_LDWS_Warning);
                                break;
                        }
                    }
                }
                var LDWSVolumeChange = 2;
                //Set Sound Settings 
                if(this._cachedLDWSSound_Installed === 1)
                {
                    this._indexSound = 3;
                    if (this._cached_LAS_LDWS_SoundSetting === "LDWS_Sound_Rumber")
                    {
                            tmplt.list2Ctrl.dataList.items[3] = this._LDWSCtxtDataListHelper.items[5];
                            LDWSVolumeChange = 3;
                            switch(this._cachedLAS_LDWS_SoundVolume) 
                            {
                                case "LDWS_Vol_High":
                                    LDWSVolumeChange = 1;
                                    break;
                                case "LDWS_Vol_Med":
                                    LDWSVolumeChange = 2;
                                    break;
                                case "LDWS_Vol_Low":
                                    LDWSVolumeChange = 3;
                                    break;
                                default:
                                    log.info("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                                    break;
                            }
                            tmplt.list2Ctrl.dataList.items[2].value = 2;//Set sound Setting to Rumble
                            tmplt.list2Ctrl.dataList.items[3].value = LDWSVolumeChange;
                    }
                    else
                    {
                        tmplt.list2Ctrl.dataList.items[3] = this._LDWSCtxtDataListHelper.items[4]; 
                        var LDWSVolumeChange;
                        switch(this._cachedLAS_LDWS_SoundVolume) 
                        {
                            case "LDWS_Vol_High":
                                /*Intentional fall through*/
                            case "LDWS_Vol_Med":
                                LDWSVolumeChange = 1;
                                break;
                            case "LDWS_Vol_Low":
                                LDWSVolumeChange = 2;
                                break;
                            default:
                                log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                                break;
                        }
                        tmplt.list2Ctrl.dataList.items[2].value = 1;
                        tmplt.list2Ctrl.dataList.items[3].value = LDWSVolumeChange; //Set sound Setting to Beep
                    }
                }
                else /*For BEEP type - H/L - Sound not installed*/
                {
                    this._indexSound = 2;
                    tmplt.list2Ctrl.dataList.items[2] = this._LDWSCtxtDataListHelper.items[4];
                    switch(this._cachedLAS_LDWS_SoundVolume) 
                    {
                        case "LDWS_Vol_High":
                            /*Intentional fall through*/
                        case "LDWS_Vol_Med":
                            LDWSVolumeChange = 1;
                            break;
                        case "LDWS_Vol_Low":
                            LDWSVolumeChange = 2;
                            break;
                        default:
                            log.warn("Invalid LAS_LDWS_SoundVolume Value : " + this._cachedLAS_LDWS_SoundVolume);
                            break;
                    }
                    tmplt.list2Ctrl.dataList.items[2].value = LDWSVolumeChange;
                }
               //Enable/Disable items
                if ((this._delayStatus === "disabled") || (this._CANStatus === false) || (this._cachedvoltageStatus === 0))
                {
                    for(var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                    }
                }
                else if ((this._delayStatus === "enabled") && (this._CANStatus === true) && (this._cachedvoltageStatus === 1))
                {//if both of the status are enable, enable all the settings
                    for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                    {
                        tmplt.list2Ctrl.dataList.items[tempcount].disabled = false;
                    }
                }
                
                //Update all items
                tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
                break;
            case "VehicleSettingsTab":
                if (this._cachedHeadlight_HighBeamControll)
                {
                    var HBCValue = 2;
                    switch (this._cachedHeadlight_HighBeamControll)
                    {
                        case "HBC_On":
                            HBCValue = 1;
                            break;
                        case "HBC_Off":
                            HBCValue = 2;
                            break;
                        default :
                            log.warn("Incorrect value of HBC received"+ this._cachedHeadlight_HighBeamControll);
                            break;
                    }
                    tmplt.list2Ctrl.dataList.items[0].value = HBCValue; 
                }
                break;
                tmplt.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
            case "CHLT" :
                if (this._cachedCHLT != null)
                {
                    switch (this._cachedCHLT)
                    {
                        case "CHL_120_SEC":
                            tmplt.list2Ctrl.setTick(0, true);
                            break;
                        case "CHL_90_SEC":
                            tmplt.list2Ctrl.setTick(1, true);
                            break; 
                        case "CHL_60_SEC":
                            tmplt.list2Ctrl.setTick(2, true);
                            break; 
                        case "CHL_30_SEC":
                            tmplt.list2Ctrl.setTick(3, true);
                            break; 
                        case "CHL_OFF":
                            tmplt.list2Ctrl.setTick(4, true);
                            break; 
                        default:
                            log.warn("Incorrect CHLT received"+ this._cachedCHLT);
                            break;
                    }
                }
                break;
            case "LASSound" :
                if (this._cached_LAS_LDWS_SoundSetting)
                {
                    switch (this._cached_LAS_LDWS_SoundSetting)
                    {
                        case "LDWS_Sound_Vibration":
                            LASSoundSetting = 0;
                            break;
                        case "LDWS_Sound_Buzzer":
                            LASSoundSetting = 1;
                            break;
                        case "LDWS_Sound_Rumber":
                            LASSoundSetting = 2;
                            break;
                        default:
                            log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                            break;
                    }
                    tmplt.list2Ctrl.setTick(LASSoundSetting, true);
                }
                break; 
            case "LASTiming" :
                if (this._cached_LAS_LDWSTiming)
                {
                    var LASLDWSTiming = 1;
                    if(this._cachedIntervention != "LAS_Intervention_On")
                    {
                        switch(this._cached_LAS_LDWSTiming)
                        {
                            case "LDWS_Timing_Automaticaly":
                                LASLDWSTiming = 0;
                                break;
                            case "LDWS_Timing_Insideline":
                                LASLDWSTiming = 1;
                                break;
                            case "LDWS_Timing_Online":
                                LASLDWSTiming = 2;
                                break;
                            case "LDWS_Timing_Outsideline":
                                LASLDWSTiming = 3;
                                break;
                            default:
                                log.info("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                break;
                        }
                    }
                    else
                    {
                        switch(this._cached_LAS_LDWSTiming)
                        {
                            case "LDWS_Timing_Insideline":
                                LASLDWSTiming = 0;
                                break;
                            case "LDWS_Timing_Outsideline":
                                LASLDWSTiming = 1;
                                break;
                            default:
                                log.warn("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                                break;
                        }
                    }
                }
                this._currentContextTemplate.list2Ctrl.setTick(LASLDWSTiming, true);
                break;
			case "Camera360View" : 
					tmplt.list2Ctrl.dataList.items[0].value = this._cachedTVMAVSStatus ;
					tmplt.list2Ctrl.dataList.items[1].value = this._cachedTVMVPLStatus ;
					tmplt.list2Ctrl.dataList.items[2].value = this._cachedTVMFVDStatus ;
					
					for(var i= 0; i<tmplt.list2Ctrl.dataList.itemCount; i++)
					{
						tmplt.list2Ctrl.dataList.items[i].disabled = this.cachedSpeed;
					}
					
					this._currentContextTemplate.list2Ctrl.updateItems(0,tmplt.list2Ctrl.dataList.itemCount - 1);
               break;
            default :
                log.info("Populate List called for not handled context "+this._currentContext.ctxtId);
                break;
        }
    }   
};

vehsettingsApp.prototype._populateDialogCtrl = function(tmplt)
{
    var disableSpeedRestricted = framework.common.getAtSpeedValue();
    if(this._currentContext && this._currentContext.ctxtId)
    {
        switch(this._currentContext.ctxtId)
        {
            case "HUDReset" :
            case "HUDResetError" :   
                if (this._cachedvoltageStatus === 1)
                {
                    tmplt.dialog3Ctrl.setDisabled("button1",false);
                    tmplt.dialog3Ctrl.setDisabled("button2",false);
                }
                if (this._cachedvoltageStatus === 0)
                {
                    tmplt.dialog3Ctrl.setDisabled("button1",false);
                    tmplt.dialog3Ctrl.setDisabled("button2",true);
                }           
                break;
            case "HUDProgress" :
                break;
            case "HUDDispInfoResetError" :
                break;          
            case "DRSSReset" : 
                break;
            case "DRSSResetError" : 
                break;
            case "SBS_SCBSReset_J36IPM":
                break;
            case "SBS_SCBSResetError_J36IPM":
                break;
            case "SBSReset" : 
                break;
            case "SBSResetError" : 
                break;
            case "SBS_SCBSReset" : 
                break;
            case "SBS_SCBSResetError" : 
                break;
            case "FOWResetError" : 
                break;
            case "FOWReset" : 
                break;
            case "LDWSReset" : 
                break;
            case "LDWSResetError" : 
                break;
            case "LASReset" : 
                break;
            case "LASResetError" : 
                break;
            case "DoorLockReset" :
            case "DoorLockResetError" : 
            case "TurnReset" : 
            case "TurnResetError" : 
            case "LightingReset" : 
            case "LightingResetError" : 
               if (this._cachedvoltageStatus === 1)
               {
                   tmplt.dialog3Ctrl.setDisabled("button1",false);
                   tmplt.dialog3Ctrl.setDisabled("button2",this.cachedSpeed);
               }
               if (this._cachedvoltageStatus === 0)
               {
                   tmplt.dialog3Ctrl.setDisabled("button1",false);
                   tmplt.dialog3Ctrl.setDisabled("button2",true);
               }
               break;
            default:
                log.debug("Do nothing for context Id  "+this._currentContext.ctxtId);
                break;
        }
    }
    else
    {
        log.warn("No context loaded");
    }
};

/**************************
 * App Functions *
 **************************/
/*
 * Callback from List2Ctrl when a tab button is clicked.
 */
vehsettingsApp.prototype._tabClickCallback = function(btnRef, appData, params)
{ 
    log.debug(" _tabClickCallback  called...", appData); 
    framework.sendEventToMmui("Common", "Global.IntentSettingsTab", { payload : { settingsTab : appData} } );    
};

// Click callback for the dialog
vehsettingsApp.prototype._dialogDefaultSelectCallback = function(dialogBtnCtrlObj, appData, params)
{
    log.debug("_dialogDefaultSelectCallback  called...", dialogBtnCtrlObj.properties.label, appData);
    
    switch(this._currentContext.ctxtId)
    {
        case 'DisplaySettingsReset':
        case "DRSSReset" :  
        case "DRSSResetError" :  
        case "SBSReset" :   
        case "SBS_SCBSReset_J36IPM":
        case "SBS_SCBSResetError_J36IPM":
        case "SBSResetError" :  
        case "SBS_SCBSReset" :  
        case "SBS_SCBSResetError" :   
        case "FOWReset" :  
        case "FOWResetError" :
        case "LDWSReset" :
        case "LDWSResetError" :  
        case "LightingReset" :  
        case "LightingResetError" :  
        case "DoorLockReset" :  
        case "DoorLockResetError" : 
        case "TurnReset" :  
        case "TurnResetError" :  
        case "HUDReset" :  
        case "HUDResetError" :
        case "HUDDisplayInfoReset" :
            switch(appData)
            {
                case 'yes':
                    framework.sendEventToMmui("Common", "Global.Yes"); 
                    break;
                case 'no': 
                    framework.sendEventToMmui("Common", "Global.No"); 
                    break;
                default:
                    log.info("Appdata invalid "+appData);
                    break;
            }
        break;
        case "HUDDisplayInfoResetProgress" :
    //      framework.sendEventToMmui("vehsettings", "HUDDisplayInfoResetMessage");                                                
            break;
        case "HUDDisplayInfoResetError" :   
            switch(appData)
            {
                case 'Retry':
                    framework.sendEventToMmui("Common", "Global.Yes"); 
                    break;
                case 'Cancel': 
                    framework.sendEventToMmui("Common", "Global.No"); 
                    break;
                default:
                    log.info("Appdata invalid "+appData);
                    break;
            }
        break;      
        case "LASReset" :
        case "LASResetError" :      
            switch(appData)
            {
                case 'yes':
                    framework.sendEventToMmui("Common", "Global.Yes"); 
                    break;
                case 'no': 
                    framework.sendEventToMmui("Common", "Global.No"); 
                    break;
                default:
                    log.info("Appdata invalid "+appData);
                    break;
            } 
            break; 
        case "SLIReset":
            switch(appData)
            {
                case "Global.Yes":
                    framework.sendEventToMmui("Common", appData); 
                    break;
                case "Global.No": 
                    
                    framework.sendEventToMmui("Common", appData); 
                    break;
                default:
                    log.info("Appdata invalid "+appData);
                    break;
            }
            break;
        case "SLIResetError":
            switch(appData)
            {
                case "Global.Yes": 
                    framework.sendEventToMmui("Common", appData); 
                    break;
                case "Global.No": 
                    framework.sendEventToMmui("Common", appData); 
                    break;
                default:
                    log.info("Appdata invalid "+appData);       
                    break;
            }
            break;
        default:
            log.info("Not handled Context ID  : "+this._currentContext.ctxtId); 
            break; 
    }
};

/*
 * Select callback for the list menus
 * @param   listCtrlObj (Object) Reference to the list control that was clicked
 * @param   appData (Object) Item data that was passed into the list control when it was was populated
 * @param   params  (Object) Object that contains additional data about the list item that was clicked
 */
vehsettingsApp.prototype._menuItemSelectCallback = function(listCtrlObj, appData, params)
{
    log.info("_menuItemSelectCallback called with Appdata " + appData);
    
    switch(appData)
    {  
        //HUD TAB   
        case 'SetHudHeight' :
            if (this._cachedHudTilt != params.value && params.value != null)
            {
                if (this._currentContextTemplate && params.value != this._latestValueHudHeight)
                {
                    this._latestValueHudHeight = params.value;
                    framework.sendEventToMmui(this.uiaId, "SetHudHeight",  { payload : { evData : params.value} } ); 
                }
                this._cachedHudTilt = params.value; 
            }       
            break;      
        case 'SetHudBrightnessCalibration':
            if (this._cachedHudCalibration != params.value && params.value != null)
            {
                if (this._currentContextTemplate && params.value != this._latestValueHudBrightnessCalibration)
                {
                    this._latestValueHudBrightnessCalibration = params.value;
                    framework.sendEventToMmui(this.uiaId, "SetHudCalibration",  { payload : { evData : params.value} } );
                } 
                this._cachedHudCalibration = params.value; 
            }       
            break;
        case 'SelectDisplayInformation' :
            framework.sendEventToMmui(this.uiaId, "SelectDisplayInformation");
            break;
			
		case 'SelectDisplayInformationJ36' :
            framework.sendEventToMmui(this.uiaId, "SelectDisplayInformationJ36");
            break;
        case 'SelectHUDStreet':
            framework.sendEventToMmui(this.uiaId, "SelectHUDStreet");
            break; 
		case 'SelectHUDNavigationScreen':
            framework.sendEventToMmui(this.uiaId, "SelectHUDNavigationScreen");
            break; 
        case 'SetHUDStreet':
            switch(params.itemIndex)
            {
                case 0:
                    this._cachedStreetInfoindex="Street_Always";
                    this._cachedStreetLabel = "Always";
                    break;
                case 1:
                    this._cachedStreetInfoindex="Street_On_Demand";
                    this._cachedStreetLabel = "CHudNav_Maneuver";
                    break;
                case 2:
                    this._cachedStreetInfoindex="Street_Off";
                    this._cachedStreetLabel = "Streetinfo_off";
                    break;
                default:
                    log.info("Param Index invalid "+params.itemIndex);
                    break;          
            }
            framework.sendEventToMmui(this.uiaId, "SetHUDStreet", { payload : { evData : this._cachedStreetInfoindex } } );           
            break; 
			
		case 'SelectHUDNavigation':
			var region = framework.localize.getRegion();			
			if((framework.getSharedData("syssettings","DestinationCode") !== "SETTINGS_Destination_JP" ) && ((region !== "Region_Europe") && (region !=="Region_4A") && (region !=="Region_ChinaTaiwan")))
			{
				switch(params.itemIndex)
				{
					case 0:
						this._cachedCHudNavindex="Navigation_Off";
						this._cachedCHudNavLabel = "CHudNav_Off";
						break;
					case 1:
						this._cachedCHudNavindex="Navigation_Maneuver";
						this._cachedCHudNavLabel = "AdaptiveLaneStreetTurn";
						break;
					case 2:
						this._cachedCHudNavindex="Navigation_LaneGuidance";
						this._cachedCHudNavLabel = "CHudNav_TBT_Lane";
						break;
					case 3:
						this._cachedCHudNavindex="Navigation_Streetname";
						this._cachedCHudNavLabel = "CHudNav_TBT_Street";
						break;	
					default:
						log.info("Param Index invalid "+params.itemIndex);
						break;          
				}
			}
			else
			{
				switch(params.itemIndex)
				{
					case 0:
						this._cachedCHudNavindex="Navigation_Off";
						this._cachedCHudNavLabel = "CHudNav_Off";
						break;
					case 1:
						this._cachedCHudNavindex="Navigation_LaneGuidance";
						this._cachedCHudNavLabel = "CHudNav_TBT_Lane";
						break;
					default:
						log.warn("Param Index invalid "+params.itemIndex);
						break;
				}
			}
            framework.sendEventToMmui(this.uiaId, "SelectHUDNavigation", { payload : { evData : this._cachedCHudNavindex } } );           
            break;
        case 'SetHudNavigation':
           if (!params.additionalData)
            {
                log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                break;
            }
            if (params.additionalData != this._cachedNaviVal)
            {    
                this._cachedNaviVal = params.additionalData;
                framework.sendEventToMmui(this.uiaId, "SetHudNavigation", { payload : { evData : params.additionalData} } );
				var region = framework.localize.getRegion();			
				if((framework.getSharedData("syssettings","DestinationCode") !== "SETTINGS_Destination_JP" ) && ((region !== "Region_Europe") && (region !=="Region_4A") && (region !=="Region_ChinaTaiwan")))
				{
					if(this._cachedNaviVal===1)
					{       
						this._HUDDispInfoCtxtList.items[1].disabled = false;
						this._HUDDispInfoCtxtList.items[1].hasCaret = true;
					}
					else
					{
						this._cachedStreetInfoindex = " ";
						this._HUDDispInfoCtxtList.items[1].label1Id = " ";
						this._HUDDispInfoCtxtList.items[1].hasCaret = false;                    
						this._HUDDispInfoCtxtList.items[1].disabled = true;                 
					}
				}
				else
				{
					log.warn("This is not an option");
				}
        
            }
            this._populateListCtrl(this._currentContextTemplate);
            break;
               
        case 'GoLASSound': 
            framework.sendEventToMmui(this.uiaId, "GoLASSound");
            break;
        case 'GoLASReset': 
            framework.sendEventToMmui(this.uiaId, "GoLASReset");
            break;
        case 'SetHudBrightness': 
            //slider, pass
            break;           
        case 'SetHudBrightnessControl' :
            if (!params.additionalData)
            {
                log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                break;
            }
            if (params.additionalData != this._latestValueHudBrightnessControl)
            {
                this._latestValueHudBrightnessControl = params.additionalData;
                framework.sendEventToMmui(this.uiaId, "SetHudBrightnessControl",  { payload : { evData : params.additionalData} } ); 
            }
            this._cachedHudAutoIntensityOnOff = params.additionalData;  
            if (this._cachedHudAutoIntensityOnOff == 1)
            {
                this._currentContextTemplate.list2Ctrl.dataList.items[2] = this._HUDTabCtxtDataListBrightnessControlOff.items[1];
                if(this._cachedHudCalibration !=null && this._cachedHudCalibration != undefined)
                {
                    this._currentContextTemplate.list2Ctrl.dataList.items[2].value = this._cachedHudCalibration;
                }
            }
            else if(this._cachedHudAutoIntensityOnOff == 2)
            {
                this._currentContextTemplate.list2Ctrl.dataList.items[2] = this._HUDTabCtxtDataListBrightnessControlOff.items[0];
                if (this._cachedHudIntensity !=null && this._cachedHudIntensity !=undefined)
                {
                    this._currentContextTemplate.list2Ctrl.dataList.items[2].value = this._cachedHudIntensity;
                }
            } 
            if (this._cachedHudIntensity !=null && this._cachedHudIntensity !=undefined)
            {
                //this._currentContextTemplate.list2Ctrl.dataList.items[2].value = this._cachedHudIntensity;
            }
            this._currentContextTemplate.list2Ctrl.updateItems(2,2);   
            break; 
        case 'SetHudNavigation':
            if (!params.additionalData)
            {
                log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                break;
            }
            if (params.additionalData != this._latestValueHudNavigation)
            {    
                this._latestValueHudNavigation = params.additionalData;
                framework.sendEventToMmui(this.uiaId, "SetHudNavigation", { payload : { evData : params.additionalData} } );  
            }
            this._cachedNaviVal = params.additionalData;  
            break;
        case "SetHudOpenClose":
            if (!params.additionalData)
            {
                log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                break;
            }
            if (params.additionalData != this._latestValueHudOpenClose)
            {    
                this._latestValueHudOpenClose = params.additionalData;
                framework.sendEventToMmui(this.uiaId, "SetHudOpenClose", { payload : { evData : params.additionalData} } );  
            }
            this._cachedHudOnOffStatus = params.additionalData;   
            if(this._currentContext.ctxtId === "HUDTab")
            {           
                if (this._cachedHudOnOffStatus === 1 && this._cachedHudControlAllowed === 1)
                {
                    this._currentContextTemplate.list2Ctrl.dataList.items[0].disabled = false;
                    this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = false;
                    this._currentContextTemplate.list2Ctrl.dataList.items[2].disabled = false;
                    this._currentContextTemplate.list2Ctrl.dataList.items[3].disabled = false;     
                    this._currentContextTemplate.list2Ctrl.dataList.items[5].disabled = false;
                }
                if (this._cachedHudOnOffStatus === 2)
                {
                    this._currentContextTemplate.list2Ctrl.dataList.items[0].disabled = true;
                    this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = true;
                    this._currentContextTemplate.list2Ctrl.dataList.items[2].disabled = true;
                    this._currentContextTemplate.list2Ctrl.dataList.items[3].disabled = true;    
                    this._currentContextTemplate.list2Ctrl.dataList.items[5].disabled = true;
                } 
                this._currentContextTemplate.list2Ctrl.updateItems(0,5);
                }
            else if(this._currentContext.ctxtId === "HUDTabJ78")
            { 
                 if (this._cachedHudOnOffStatus === 1 && this._cachedHudControlAllowed === 1 && this._cachedvoltageStatus === 1)
                {
                    for (var controlHUD = 0; controlHUD < 7; controlHUD++)
                    {
                        if(controlHUD!=5)
                        {
                            this._currentContextTemplate.list2Ctrl.dataList.items[controlHUD].disabled = false;
                        }
                    }  
                }
                else
                {
                    for (var controlHUD = 0; controlHUD < 7; controlHUD++)
                    {
                        if(controlHUD!=5)
                        {
                            this._currentContextTemplate.list2Ctrl.dataList.items[controlHUD].disabled = true;
                        }
                    }   
                } 
                this._currentContextTemplate.list2Ctrl.updateItems(0,6);
            } 
			 else if(this._currentContext.ctxtId === "HUDTabJ36")
            { 
                 if (this._cachedHudOnOffStatus === 1 && this._cachedHudControlAllowed === 1 && this._cachedvoltageStatus === 1)
                {
                    for (var controlHUD = 0; controlHUD < 6; controlHUD++)
                    {
                        if(controlHUD!=4)
                        {
                            this._currentContextTemplate.list2Ctrl.dataList.items[controlHUD].disabled = false;
                        }
                    }  
                }
                else
                {
                    for (var controlHUD = 0; controlHUD < 6; controlHUD++)
                    {
                        if(controlHUD!=4)
                        {
                            this._currentContextTemplate.list2Ctrl.dataList.items[controlHUD].disabled = true;
                        }
                    }   
                } 
                this._currentContextTemplate.list2Ctrl.updateItems(0,5);
            } 
            break;  
        //SAFETY
        
        case 'SetDA':
            switch(params.additionalData)
            {
                case 1:
                    this._cachedDA = "DA_On";
                    break;
                case 2:
                    this._cachedDA = "DA_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetDA", { payload : { evData :this._cachedDA } } );  
            break;
        case 'SetParkingSensor':
                switch(params.additionalData)
                {
                    case 1:
                        this._cachedPSI = "On";
                        break;
                    case 2:
                        this._cachedPSI = "Off";
                        break;
                    default:
                        log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                        break;
                }
                    
                framework.sendEventToMmui(this.uiaId, "SetParkingSensor", { payload : { parkingSensorSetting : this._cachedPSI} } );
            break;
        case 'SetLASIntervention':
            switch (params.additionalData)
            {
                case 1:
                    this._cachedIntervention = "LAS_Intervention_On";
                    break;
                case 2:
                    this._cachedIntervention = "LAS_Intervention_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLASIntervention", { payload : { evData : this._cachedIntervention} } );   
            this.populateListCtrl(this._currentContextTemplate);
            break;
        
        case 'SetLASAlert':
            switch (params.additionalData)
            {
                case 1:
                    this._cachedLASAlert = "LAS_Alert_On";
                    break;
                case 2:
                    this._cachedLASAlert = "LAS_Alert_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLASAlert", { payload : { evData : this._cachedLASAlert} } );  
            this.populateListCtrl(this._currentContextTemplate);
            break;
			
        case 'SetTVMAutoViewStart':
			if (!params.additionalData)
            {
                log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                break;
            }
			
			var TVMAutoViewStart = "On"
            switch (params.additionalData)
            {
                case 1:
                    TVMAutoViewStart = "On";
                    break;
                case 2:
                    TVMAutoViewStart = "Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetTVMAutoViewStart", { payload : { evData : TVMAutoViewStart} } );
			this._cachedTVMAVSStatus = params.additionalData;
            this.populateListCtrl(this._currentContextTemplate);
            break;

        case 'SetTVMVehiclePathLine':
			if (!params.additionalData)
            {
                log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                break;
            }
			
			var TVMVehiclePathLine = "On"
            switch (params.additionalData)
            {
                case 1:
                    TVMVehiclePathLine = "On";
                    break;
                case 2:
                    TVMVehiclePathLine = "Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetTVMVehiclePathLine", { payload : { evData : TVMVehiclePathLine} } );  
            this._cachedTVMVPLStatus = params.additionalData;
			this.populateListCtrl(this._currentContextTemplate);
            break;
			
        case 'SetTVMFrontViewDisplay':
			if (!params.additionalData)
            {
                log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                break;
            }
			var TVMFrontViewDisplay = "On"
            switch (params.additionalData)
            {
                case 1:
                    TVMFrontViewDisplay = "On";
                    break;
                case 2:
                    TVMFrontViewDisplay = "Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetTVMFrontViewDisplay", { payload : { evData : TVMFrontViewDisplay} } );  
            this._cachedTVMFVDStatus = params.additionalData;
			this.populateListCtrl(this._currentContextTemplate);
            break;
			
        case "SetSCBS":
            switch (params.additionalData)
            {
                case 1:
                    this._cached_SBS_SCBS_BrakeSupport = "SCBS_On";
                    break;
                case 2:
                    this._cached_SBS_SCBS_BrakeSupport = "SCBS_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetSCBS", { payload : { evData : this._cached_SBS_SCBS_BrakeSupport} } );
            break;  
        //DRSS
        case "SetDRSS":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedDRSS_DRSS = "DRSS_On";
                    break;
                case 2:
                    this._cachedDRSS_DRSS = "DRSS_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetDRSS", { payload : { evData : this._cachedDRSS_DRSS} } );    
            break; 
        case "SetDRSSDistance":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedDRSS_DRSSSensitivity = "DRSS_Distance_Long";
                    break;
                case 2:
                    this._cachedDRSS_DRSSSensitivity = "DRSS_Distance_Middle";
                    break;
                case 3:
                    this._cachedDRSS_DRSSSensitivity = "DRSS_Distance_Short";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetDRSSDistance", { payload : { evData : this._cachedDRSS_DRSSSensitivity} } );   
            break;  
        //FOW
        case "SetFOW":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedFOW_Warning = "FOW_On";
                    break;
                case 2:
                    this._cachedFOW_Warning = "FOW_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetFOW", { payload : { evData : this._cachedFOW_Warning} } );    
            break; 
        case "SetFOWDistance":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedFOW_Distance = "FOW_Distance_Short";
                    break;
                case 2:
                    this._cachedFOW_Distance = "FOW_Distance_Long";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetFOWDistance", { payload : { evData : this._cachedFOW_Distance} } );  
            break; 
        case "SetFOWBuzzerVolume":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedFOW_BuzzerVolume = "FOW_Vol_Big";
                    break;
                case 2:
                    this._cachedFOW_BuzzerVolume = "FOW_Vol_Small";
                    break;
                case 3:
                    this._cachedFOW_BuzzerVolume = "FOW_Vol_No_Alarm";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData  : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetFOWBuzzerVolume", { payload : { evData : this._cachedFOW_BuzzerVolume} } ); 
            break; 
        case "SetLDWSBuzzerVolume":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_High";
                    break;
                case 2:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_Low";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLDWSBuzzerVolume", { payload : { evData : this._cachedLAS_LDWS_SoundVolume} } );   
            break; 
        case "SetLDWSRumbleVolume":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_High";
                    break;
                case 2:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_Med";
                    break;
                case 3:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_Low";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLDWSRumbleVolume", { payload : { evData : this._cachedLAS_LDWS_SoundVolume} } );   
            break; 
        case "SetLASSoundVibration":
            //Intentional fallthrough
        case "SetLASSoundBeep":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_High";
                    break;
                case 2:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_Low";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData  : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLASSoundVol", { payload : { evData : this._cachedLAS_LDWS_SoundVolume} } );   
            break;
        case "SetLASSoundRumble":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_High";
                    break;
                case 2:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_Med";
                    break;
                case 3:
                    this._cachedLAS_LDWS_SoundVolume = "LDWS_Vol_Low";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData  : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLASSoundVol", { payload : { evData : this._cachedLAS_LDWS_SoundVolume} } );   
            break;
        case "SetSBS":
            switch (params.additionalData)
            {
                case 1:
                    this._cached_SBS_SCBS_BrakeSupport = "SBS_On";
                    break;
                case 2:
                    this._cached_SBS_SCBS_BrakeSupport = "SBS_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetSBS", { payload : { evData : this._cached_SBS_SCBS_BrakeSupport} } ); 
            break;
        //SBS/SCBS for J36IPM
        case "SetSCBSMode_J36IPM":
            switch (params.additionalData)
            {
                case 1:
                    this._cached_SBS_SCBS_J36IPM = "SCBS_On";
                    break;
                case 2:
                    this._cached_SBS_SCBS_J36IPM = "SCBS_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetSCBSMode_J36IPM", { payload : { evData : this._cached_SBS_SCBS_J36IPM} } ); 
            break;
         case "SetSCBSDistance_J36IPM":
            switch (params.additionalData)
            {
                case 1:
                    this._cached_SCBSDistance_J36IPM = "SCBSDistance_Long";
                    break;
                case 2:
                    this._cached_SCBSDistance_J36IPM = "SCBSDistance_Middle";
                    break;
                case 3:
                    this._cached_SCBSDistance_J36IPM = "SCBSDistance_Short";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetSCBSDistance_J36IPM", { payload : { evData : this._cached_SCBSDistance_J36IPM} } ); 
            break;
        //LDWS
        case "SetLDWSTiming":
            //For Other regions
            if (framework.localize.getRegion() != "Region_NorthAmerica")
            {
                if(this._currentContext.ctxtId === "LASTiming" && this._cachedIntervention == "LAS_Intervention_On")
                {
                    switch(params.itemIndex)
                    {
                        case 0:
                            this._cached_LAS_LDWSTiming = "LDWS_Timing_Insideline";
                            break;
                        case 1:
                            this._cached_LAS_LDWSTiming = "LDWS_Timing_Outsideline";
                            break;
                        default:
                            log.info("Invalid LDWS Timing Value : " + this._cached_LAS_LDWSTiming);
                            break;
                    }
                }
                else
                {
                    switch (params.itemIndex)
                    {
                        case 0:
                            this._cached_LAS_LDWSTiming = "LDWS_Timing_Automaticaly";
                            break;
                        case 1:
                            this._cached_LAS_LDWSTiming = "LDWS_Timing_Insideline";
                            break;
                        case 2:
                            this._cached_LAS_LDWSTiming = "LDWS_Timing_Online";
                            break;
                        case 3:
                            this._cached_LAS_LDWSTiming = "LDWS_Timing_Outsideline";
                            break;
                        default:
                            log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                            break;
                    }
                }
            }
            //For NA region
            else
            {
                switch (params.additionalData)
                {
                    case 1:
                        this._cached_LAS_LDWSTiming = "LDWS_Timing_Online";
                        break;
                    case 2:
                        this._cached_LAS_LDWSTiming = "LDWS_Timing_Insideline";
                        break;
                    default:
                        log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                        break;
                }
            }
            framework.sendEventToMmui(this.uiaId, "SetLDWSTiming", { payload : { evData : this._cached_LAS_LDWSTiming } } ); 
            break; 
        case "SetLDWSWarning":
            if (framework.localize.getRegion() == "Region_NorthAmerica") 
            {
                switch (params.additionalData)
                {
                    case 1:
                        this._cached_LAS_LDWS_Warning = "LDWS_Warning_Ofen";
                        break;
                    case 2:
                        this._cached_LAS_LDWS_Warning = "LDWS_Warning_Rare";
                        break;
                    default:
                        //do nothing
                        log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                        break;
                }
            }
            else 
            {
                switch (params.additionalData)
                {
                    case 1:
                        this._cached_LAS_LDWS_Warning = "LDWS_Warning_Ofen";
                        break;
                    case 2:
                        this._cached_LAS_LDWS_Warning = "LDWS_Warning_Med";
                        break;
                    case 3:
                        this._cached_LAS_LDWS_Warning = "LDWS_Warning_Rare";
                        break;
                    default:
                        //do nothing
                        log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                        break;
                }
            }
            framework.sendEventToMmui(this.uiaId, "SetLDWSWarning", { payload : { evData : this._cached_LAS_LDWS_Warning} } ); 
            break; 
        case "SetBuzzerSetting":
            switch (params.additionalData)
            {
                case 1:
                    this._cached_LAS_LDWS_SoundSetting = "LDWS_Sound_Buzzer";
                    break;
                case 2:
                    this._cached_LAS_LDWS_SoundSetting = "LDWS_Sound_Rumber";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLASSound", { payload : { evData : this._cached_LAS_LDWS_SoundSetting  } } );
            break; 
        case "SetSBSDistance":
            switch (params.additionalData)
            {
                case 1:
                    this._cached_SBS_SCBS_Distance = "SBS_Distance_Short";
                    break;
                case 2:
                    this._cached_SBS_SCBS_Distance = "SBS_Distance_Long";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetSBSDistance", { payload : { evData : this._cached_SBS_SCBS_Distance} } );  
            break; 
        case "SetSBSBuzzerVolume":
            switch (params.additionalData)
            {
                case 1:
                    this._cached_SBS_SCBS_BuzzerVolume = "SBS_Vol_Big";
                    break;
                case 2:
                    this._cached_SBS_SCBS_BuzzerVolume = "SBS_Vol_Small";
                    break;
                case 3:
                    this._cached_SBS_SCBS_BuzzerVolume = "SBS_Vol_No_Alarm";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetSBSBuzzerVolume", { payload : { evData : this._cached_SBS_SCBS_BuzzerVolume} } );   
            break;  
        case "SetWalkAwayLock":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedKeyless_WalkAwayLock = "WalkAwayLock_On";
                    break;
                case 2:
                    this._cachedKeyless_WalkAwayLock = "WalkAwayLock_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetWalkAwayLock", { payload : { evData : this._cachedKeyless_WalkAwayLock} } );     
            break; 

        case "SLCSetting":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedSpeedLimitCaution = "SLC_Off";
                    break;
                case 1:
                    this._cachedSpeedLimitCaution = "SLC_Sign";
                    break;
                case 2 :
                    this._cachedSpeedLimitCaution = "SLC_Sign_Buzzer";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
              
            framework.sendEventToMmui(this.uiaId, "SetSLC", { payload : { evData : this._cachedSpeedLimitCaution} } ); 
            break;
    
        case "CSSetting":
         switch (params.itemIndex)
            {
                case 0:
                   this._cachedSpeed = this._cachedSpeed1;
                   framework.sendEventToMmui(this.uiaId, "SetCautionSpeed", { payload : { evData : "SLCS_0"} } ); 
                    break;
                case 1:
                    this._cachedSpeed = this._cachedSpeed2;
                    framework.sendEventToMmui(this.uiaId, "SetCautionSpeed", { payload : { evData : "SLCS_5"} } ); 
                    break;
                case 2:
                    this._cachedSpeed = this._cachedSpeed3;
                    framework.sendEventToMmui(this.uiaId, "SetCautionSpeed", { payload : { evData : "SLCS_10"} } ); 
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
              
            this._cachedCautionSpeed = this._cachedSpeed +" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
            break;


        case "HeadUpDisplay":
        var tempAdditionalData;
        if (!params.additionalData)
                {
                    log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                    break;
                }
                if (params.additionalData != this._cachedHUDVal)
                {    
                    this._cachedHUDVal = params.additionalData;
                    if(this._cachedHUDVal == 1)
                    {
                        tempAdditionalData = "SLS_HUD_On";
                    }
                    else
                    {
                        tempAdditionalData = "SLS_HUD_Off";
                    }
                    
                        framework.sendEventToMmui(this.uiaId, "SetSLS_HUD", { payload : { evData : tempAdditionalData} } );
                }
                this._cachedHUDVal = params.additionalData;  
                this._populateListCtrl(this._currentContextTemplate);
        break;
        
        
        case "CenterDisplay":
        if (!params.additionalData)
                {
                    log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                    break;
                }
                if (params.additionalData != this._cachedCDVal)
                {    
                    this._cachedCDVal = params.additionalData;
                    if(this._cachedCDVal == 1)
                    {
                        tempAdditionalData = "SLS_Center_On";
                    }
                    else
                    {
                        tempAdditionalData = "SLS_Center_Off";
                    }
                    framework.sendEventToMmui(this.uiaId, "SetSLS_Center", { payload : { evData : tempAdditionalData} } );
                    
                }
                this._cachedCDVal = params.additionalData;  
                this._populateListCtrl(this._currentContextTemplate);
        break;

        
        
        // VEHICLE SETTINGS TAB
        case "SetRainSensingWiper":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedSafety_AutoWiper = "RSW_On";
                    break;
                case 2:
                    this._cachedSafety_AutoWiper = "RSW_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetRainSensingWiper", { payload : { evData : this._cachedSafety_AutoWiper} } );   
            break;    
        //TURN SETTINGS
        case "Set3FlashTurnSignal":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedSafety_3flashTurnSignal = "Three_Flash_On";
                    break;
                case 2:
                    this._cachedSafety_3flashTurnSignal = "Three_Flash_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "Set3FlashTurnSignal", { payload : { evData : this._cachedSafety_3flashTurnSignal} } );   
            break; 
        case "SetTurnSignalIndicatorVolume":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedSafety_TurnSignalIndicatorVolume = "Turn_Volume_Big";
                    break;
                case 2:
                    this._cachedSafety_TurnSignalIndicatorVolume = "Turn_Volume_Small";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetTurnSignalIndicatorVolume", { payload : { evData : this._cachedSafety_TurnSignalIndicatorVolume} } );    
            break;   
        case "SetHBC":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedHeadlight_HighBeamControll = "HBC_On";
                    break;
                case 2:
                    this._cachedHeadlight_HighBeamControll = "HBC_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetHBC", { payload : { evData : this._cachedHeadlight_HighBeamControll} } );    
            break;  
        case "SetAFS":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedAFS = "AFS_On";
                    break;
                case 2:
                    this._cachedAFS = "AFS_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }   
            framework.sendEventToMmui(this.uiaId, "SetAFS", { payload : { evData : this._cachedAFS} } );
            break;      
        case "SetDaytimeRunningLights":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedHeadlight_DaytimeLights = "DRL_On";
                    break;
                case 2:
                    this._cachedHeadlight_DaytimeLights = "DRL_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }  
            framework.sendEventToMmui(this.uiaId, "SetDaytimeRunningLights", { payload : { evData : this._cachedHeadlight_DaytimeLights} } );
            break; 
        case "SetHeadlightOnWarning":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedHeadlight_HeadlightOnWaring = "HOW_Big";
                    break;
                case 2:
                    this._cachedHeadlight_HeadlightOnWaring = "HOW_Small";
                    break;
                case 3:
                    this._cachedHeadlight_HeadlightOnWaring = "HOW_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }  
            framework.sendEventToMmui(this.uiaId, "SetHeadlightOnWarning", { payload : { evData : this._cachedHeadlight_HeadlightOnWaring} } );
            break;
        case "SetRVMBuzzerVolume":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedRVMBuzzerVolume = "RVM_Vol_Big";
                    break;
                case 1:
                    this._cachedRVMBuzzerVolume = "RVM_Vol_Small";
                    break;
                case 2:
                    this._cachedRVMBuzzerVolume = "RVM_Vol_No_Alarm";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }  
            framework.sendEventToMmui(this.uiaId, "SetRVMBuzzerVolume", { payload : { evData : this._cachedRVMBuzzerVolume} } ); 
            break; 

        case "GoDRSSReset":
            framework.sendEventToMmui(this.uiaId, "GoDRSSReset");    
            break; 
        case 'GoHUDReset' :
            framework.sendEventToMmui(this.uiaId, "GoHUDReset");  
            break; 
        case 'SelectDisplayReset' :
		     this._HudFlagRegion=0;
             framework.sendEventToMmui(this.uiaId, "SelectDisplayReset");
            break;
        case "SelectDRSS":
            framework.sendEventToMmui(this.uiaId, "SelectDRSS");      
            break; 
        case "GoSBS":
            framework.sendEventToMmui(this.uiaId, "GoSBS");      
            break; 
        case "GoSBS_SCBS":
            framework.sendEventToMmui(this.uiaId, "GoSBS_SCBS");      
            break; 
        case "GoSBS_SCBS_J36IPM":
            framework.sendEventToMmui(this.uiaId, "GoSBS_SCBS_J36IPM");
            break;
        case "SetSCBS_J36IPM":
            framework.sendEventToMmui(this.uiaId, "SetSCBS_J36IPM");
            break;
        case "GoFOW":
            framework.sendEventToMmui(this.uiaId, "GoFOW");      
            break; 
        case "SelectRVMBuzzerVolume":
            framework.sendEventToMmui(this.uiaId, "SelectRVMBuzzerVolume");      
            break; 
        case "SelectBSMBuzzerVolume":
            framework.sendEventToMmui(this.uiaId, "SelectBSMBuzzerVolume");      
            break; 
        case "SelectBSMSystem":
            framework.sendEventToMmui(this.uiaId, "SelectBSMSystem");      
            break; 
        case "ResetFOWSettings":
            framework.sendEventToMmui(this.uiaId, "ResetFOWSettings");     
            break;  
        case "GoLAS":
            framework.sendEventToMmui(this.uiaId, "GoLAS");      
            break;
        //VEHICLE SETTINGS TAB
        case 'GoDoorLock':
            framework.sendEventToMmui(this.uiaId, "GoDoorLock");  
            break;  
        case 'GoTurnSettings':
            framework.sendEventToMmui(this.uiaId, "GoTurnSettings");  
            break;      
        case 'GoLighting':
            framework.sendEventToMmui(this.uiaId, "GoLighting");   
            break;  
        //LDWS
        case "GoLDWSTiming":
            framework.sendEventToMmui(this.uiaId, "GoLDWSTiming");   
            break;
        case "GoLASTiming":
            framework.sendEventToMmui(this.uiaId, "GoLASTiming");   
            break;          
        case 'GoLDWSReset':
            framework.sendEventToMmui(this.uiaId, "GoLDWSReset");   
            break;    
        case 'GoSBSReset':
            framework.sendEventToMmui(this.uiaId, "GoSBSReset");   
            break;  
        case 'GoSBS_SCBSReset':
            framework.sendEventToMmui(this.uiaId, "GoSBS_SCBSReset");   
            break;   
        case 'GoSBS_SCBS_J36IPMReset':
            framework.sendEventToMmui(this.uiaId, "GoSBS_SCBS_J36IPMReset");   
            break;   
        case 'SelectLaneDepartureWarning':
            framework.sendEventToMmui(this.uiaId, "SelectLaneDepartureWarning");   
            break;    
        case 'SpeedLimitInformation':
            framework.sendEventToMmui(this.uiaId, "SelectSpeedLimitInfo");   
            break; 
        case 'SpeedLimitSign':
            framework.sendEventToMmui(this.uiaId, "SelectSLSign");   
            break;  
			
		case 'SpeedLimitSignWHUD':
		                
						
						
					           if (!params.additionalData)
                {
                    log.debug("Speed Limit Sign callback called with params.additionalData as null for AppData : "+ appData);
                    break;
                }
                if (params.additionalData != this._cachedHUDVal)
                {    
                    this._cachedHUDVal = params.additionalData;  
					log.info("Rami_menuItemSelectCallback called with params.additionalData as null for AppData : "+ this._cachedHUDVal);
                    if(this._cachedHUDVal == 1)
                    {
                        tempAdditionalData = "SLS_HUD_On";
					this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = false;
                    this._currentContextTemplate.list2Ctrl.dataList.items[2].disabled = false;
                    }
                    else
                    {
                        tempAdditionalData = "SLS_HUD_Off";
					this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = true;
                    this._currentContextTemplate.list2Ctrl.dataList.items[2].disabled = true;
                    }                  
                   
                }			
            this._populateListCtrl(this._currentContextTemplate);	
			framework.sendEventToMmui(this.uiaId, "SetSLS_WHUD", { payload : { evData : tempAdditionalData} } );
			break;		
        case 'SpeedLimitCaution':
            framework.sendEventToMmui(this.uiaId, "SelectSLCaution");   
            break;
        case 'CautionSpeed':
           framework.sendEventToMmui(this.uiaId, "SelectCautionSpeed");   
            break;
        case "GoCamera360View":
            framework.sendEventToMmui(this.uiaId, "GoCamera360View", { payload : { evData : "GoCamera360View"} } );
            break;			  
        case 'SpeedAlarm':
            framework.sendEventToMmui(this.uiaId, "SelectSpeedAlarm");  
            break; 
            
        case 'GoToSetting' :
              if (!params.additionalData)
            {
                log.info("_menuItemSelectCallback called with params.additionalData as null for AppData : "+ appData);
                break;
            }

                var evData = "SpeedAlarm_Off";
                if(params.additionalData === 1)
                {
                    evData = "SpeedAlarm_On";
                }
                
                framework.sendEventToMmui(this.uiaId, "SetSpeedAlarmOnOff", { payload : { evData : evData} } );

            this._cachedSettingValOnOff = evData; 
            this._populateListCtrl(this._currentContextTemplate);
            break;
            
        case 'SetAlarmTiming':
            // SW00170572
            // Process the update event (esp. sending the MMUI event) ONLY if we're in the SpeedAlarm context
            if (this._currentContext && this._currentContext.ctxtId === "SpeedAlarm" && this._currentContextTemplate)
            {
                this._currentValue = params.value;
                this._itemIndex = params.itemIndex;
                this._SelectSpeedAlarmCtxtDataList.items[1].label2 = this._currentValue+" "+framework.localize.getLocStr(this.uiaId, this._cachedGetSpeedUnit);
                this._currentContextTemplate.list2Ctrl.updateItems(1,1);
                framework.sendEventToMmui(this.uiaId, "SetSpeedAlarm", { payload : { evData : this._currentValue} } );
             }
            else
            {
                log.warn("vehsettingsApp._menuItemSelectCallback(SetAlarmTiming): no longer in SpeedAlarm context, ignoring value " + params.value + "!");
            }
            break;
        
        case 'GoSLIReset':
            framework.sendEventToMmui(this.uiaId, "SelectSPIReset");  
            break;
            
        //LIGHTING 
        case "SelectInteriorLightTimeoutDoorOpen":
            framework.sendEventToMmui(this.uiaId, "SelectInteriorLightTimeoutDoorOpen");   
            break; 
        case "SelectInteriorLightTimeoutDoorClosed":
            framework.sendEventToMmui(this.uiaId, "SelectInteriorLightTimeoutDoorClosed");   
            break; 
        case "SelectHeadlightOffTimer":
            framework.sendEventToMmui(this.uiaId, "SelectHeadlightOffTimer");   
            break;  
        case 'GoAutoHeadlightOn':
            framework.sendEventToMmui(this.uiaId, "GoAutoHeadlightOn");   
            break; 
        case 'GoLightingReset':    
            framework.sendEventToMmui(this.uiaId, "GoLightingReset");   
            break;    
        case 'InteriorLightingBrightness':    
            framework.sendEventToMmui(this.uiaId, "SelectILB");   
            break;
            
    
            
        case "ILBSetting":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedILB = "ILB_Bright";
                    break;
                case 1:
                    this._cachedILB = "ILB_Medium";
                    break;
                case 2:
                    this._cachedILB = "ILB_Dark";
                    break;
                case 3 :
                    this._cachedILB = "ILB_Off";
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
              
            framework.sendEventToMmui(this.uiaId, "SetILB", { payload : { evData : this._cachedILB} } ); 
            break; 
        
        //TURN
        case "GoTurnReset":
            framework.sendEventToMmui(this.uiaId, "GoTurnReset");   
            break;  
        //DOOR LOCK
        case 'GoDoorLockMode':
            framework.sendEventToMmui(this.uiaId, "GoDoorLockMode");   
            break; 
        case 'GoKeylessLockBeepVol':
            framework.sendEventToMmui(this.uiaId, "GoKeylessLockBeepVol");   
            break; 
        case 'GoDoorRelockTime':
            framework.sendEventToMmui(this.uiaId, "GoDoorRelockTime");   
            break; 
        case 'GoUnlockMode':
            framework.sendEventToMmui(this.uiaId, "GoUnlockMode");   
            break; 
        case 'GoDoorLockReset':
            framework.sendEventToMmui(this.uiaId, "GoDoorLockReset");   
            break;  
        case "SetUnlockMode":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedKeyless_UnlockMode = "Unlock_AllSeat";
                    break;
                case 1:
                    this._cachedKeyless_UnlockMode = "Unlock_DriverSeat";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetUnlockMode", { payload : { evData : this._cachedKeyless_UnlockMode} } );
            break;        
        case "SetBSMBuzzerVolume":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedBSMBuzzerVolume = "BSM_Vol_Big";
                    break;
                case 1:
                    this._cachedBSMBuzzerVolume = "BSM_Vol_Small";
                    break;
                case 2:
                    this._cachedBSMBuzzerVolume = "BSM_Vol_No_Alarm";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetBSMBuzzerVolume", { payload : { evData : this._cachedBSMBuzzerVolume} } );
            break;

        // BSM System Implementation
        case "SetBSMSystem":
           switch (params.additionalData)
            {
                case 1:
                    this._cachedBSMSystem = "BSM_On";

                    this._currentContextTemplate.list2Ctrl.dataList.items[0].disabled = false;
                    this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = false;
                    break;
                case 2:
                    this._cachedBSMSystem = "BSM_Off";

                    this._currentContextTemplate.list2Ctrl.dataList.items[0].disabled = false;
                    this._currentContextTemplate.list2Ctrl.dataList.items[1].disabled = true;
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetBSMSystem", { payload : { evData : this._cachedBSMSystem} } );
            //Enable/Disable Warning Volume on selecting on/off
            this._currentContextTemplate.list2Ctrl.updateItems(0,2);
            break;

        // BSM Volume Implementation
        case "SetBSMVolume":
            switch (params.additionalData)
            {
                case 1:
                    this._cachedBSMvolume = "BSM_Vol_Big";
                    break;
                case 2:
                    this._cachedBSMvolume = "BSM_Vol_Small";
                    break;
                case 3:
                    this._cachedBSMvolume = "BSM_Vol_No_Alarm";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetBSMVolume", { payload : { evData : this._cachedBSMvolume} } );
            break;

        case "SetHeadlightOffTimer":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedHeadlight_HeadlightOffTimer = "HOT_120_Sec";
                    break;
                case 1:
                    this._cachedHeadlight_HeadlightOffTimer = "HOT_90_Sec";
                    break;
                case 2:
                    this._cachedHeadlight_HeadlightOffTimer = "HOT_60_Sec";
                    break;
                case 3:
                    this._cachedHeadlight_HeadlightOffTimer = "HOT_30_Sec";
                    break;
                case 4:
                    this._cachedHeadlight_HeadlightOffTimer = "HOT_OFF";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetHeadlightOffTimer", { payload : { evData : this._cachedHeadlight_HeadlightOffTimer} } );
            break;
        case "SetCHLT" :
          
            switch(params.itemIndex)
            {
                case 0:
                    this._latestValueCHLT="CHL_120_SEC";
                    break;
                case 1:
                    this._latestValueCHLT="CHL_90_SEC";
                    break;
                case 2:
                    this._latestValueCHLT="CHL_60_SEC";
                    break;
                case 3:
                    this._latestValueCHLT="CHL_30_SEC";
                    break;
                case 4:
                    this._latestValueCHLT="CHL_OFF";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
             framework.sendEventToMmui(this.uiaId, "SetCHLT", { payload : { evData : this._latestValueCHLT  } } ); 
            break;
        case "GoCHLT" :
            framework.sendEventToMmui(this.uiaId, "GoCHLT");  
            break;
        case "SetLHL" :
            switch(params.additionalData)
            {
                case 1:
                    this._latestValueLHL ="LHL_On";
                    break;
                case 2:
                    this._latestValueLHL ="LHL_Off";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.additionalData : "+ params.additionalData);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLHL", { payload : { evData : this._latestValueLHL} } ); 
            break;
            case "SetAutoHeadlightSensitivity":
                switch(params.itemIndex)
                {
                    case 0:
                        this._cachedHeadlight_AutoHeadlightsSensitivity ="AHS_Extra_High";
                        break;
                    case 1:
                        this._cachedHeadlight_AutoHeadlightsSensitivity ="AHS_High";
                        break;
                    case 2:
                        this._cachedHeadlight_AutoHeadlightsSensitivity ="AHS_Standard";
                        break;
                    case 3:
                        this._cachedHeadlight_AutoHeadlightsSensitivity ="AHS_Low";
                        break;
                    case 4:
                        this._cachedHeadlight_AutoHeadlightsSensitivity ="AHS_Extra_Low";
                        break;
                    default:
                        log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                        break;
                }
                framework.sendEventToMmui(this.uiaId, "SetAutoHeadlightSensitivity", { payload : { evData : this._cachedHeadlight_AutoHeadlightsSensitivity} } ); 
            break; 
        case "SetInteriorLightTimeoutDoorOpen":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedSafety_InterioLightTimeoutDoorOpen = "ILTDO_60_Min";
                    break;
                case 1:
                    this._cachedSafety_InterioLightTimeoutDoorOpen = "ILTDO_30_Min";
                    break;
                case 2:
                    this._cachedSafety_InterioLightTimeoutDoorOpen = "ILTDO_10_Min";
                    break;
                default:
                    log.warn("Incorrect index value of Interio Light Timeout Door Open" + params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetInteriorLightTimeoutDoorOpen", { payload : { evData : this._cachedSafety_InterioLightTimeoutDoorOpen } } ); 
            break;
        case "SetInteriorLightTimeoutDoorClosed":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedSafety_InterioLightTimeoutDoorClosed = "ILTDC_60_Sec";
                    break;
                case 1:
                    this._cachedSafety_InterioLightTimeoutDoorClosed = "ILTDC_30_Sec";
                    break;
                case 2:
                    this._cachedSafety_InterioLightTimeoutDoorClosed = "ILTDC_15_Sec";
                    break;
                case 3:
                    this._cachedSafety_InterioLightTimeoutDoorClosed = "ILTDC_7_5_Sec";
                    break;
                default:
                    log.warn("Incorrect index value of Interior Light Timeout Door Closed" + params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetInteriorLightTimeoutDoorClosed", { payload : { evData : this._cachedSafety_InterioLightTimeoutDoorClosed  } } ); 
        
            break; 
        case "SetAutoDoorLockAT":
            switch (params.itemIndex)
            {
                case 0:
                    this._cachedGet_AutoDoorLockAT = "AT5_Lock_OutOfPark";
                    break;
                case 1:
                    this._cachedGet_AutoDoorLockAT = "AT5_Shift_OutOfPark";
                    break;
                case 2:
                    this._cachedGet_AutoDoorLockAT = "AT5_DrivingUnlock_IGN_Off";
                    break;
                case 3:
                    this._cachedGet_AutoDoorLockAT = "AT5_Driving";
                    break;
                case 4:
                    this._cachedGet_AutoDoorLockAT = "AT5_Off";
                    break;
                default:
                    log.warn("Incorrect index value of Auto Door Lock" + params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetAutoDoorLockAT", { payload : { evData : this._cachedGet_AutoDoorLockAT } } );
            break;   
        case "SetAutoDoorLockAT6":
            switch(params.itemIndex)
            {
                case 0:
                    this._cachedGet_AutoDoorLockAT6 = "AT6_Shift_OutOfPark_UnlockInPark";
                    break;
                case 1:
                    this._cachedGet_AutoDoorLockAT6 = "AT6_Shift_OutOfPark";
                    break;
                case 2:
                    this._cachedGet_AutoDoorLockAT6 = "AT6_Driving_Unlock_In_Park";
                    break;
                case 3:
                    this._cachedGet_AutoDoorLockAT6 = "AT6_DrivingUnlock_IGN_Off";
                    break;
                case 4:
                    this._cachedGet_AutoDoorLockAT6 = "AT6_Driving";
                    break;
                case 5:
                    this._cachedGet_AutoDoorLockAT6 = "AT6_Off";
                    break;
                default:
                    log.warn("Incorrect index value of Auto Door Lock" + params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetAutoDoorLockAT6", { payload : { evData : this._cachedGet_AutoDoorLockAT6 } } );
            break;  
        case "SetAutoDoorLockMT":
            switch(params.itemIndex)
            {
                case 0:
                    this._cachedGet_AutoDoorLockMT = "MT_DrivingUnlock_IGN_Off";
                    break;
                case 1:
                    this._cachedGet_AutoDoorLockMT = "MT_Driving";
                    break;
                case 2:
                    this._cachedGet_AutoDoorLockMT = "MT_Off";
                    break;
                default:
                    log.warn("Incorrect index value of Auto Door Lock" + params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetAutoDoorLockMT", { payload : { evData : this._cachedGet_AutoDoorLockMT  } } ); 
            break;
        case "SetKeylessLockBeepVol":
		
	    var val = parseInt(params.itemIndex);
			
            switch(val)
            {
                case 0:
                    this._cachedSafety_AutoDoorLockChimeVolume = "KBV_Big";
                    break;
                case 1:
                    this._cachedSafety_AutoDoorLockChimeVolume = "KBV_Middle";
                    break;
                case 2:
                    this._cachedSafety_AutoDoorLockChimeVolume = "KBV_Small";
                    break;
                case 3:
                    this._cachedSafety_AutoDoorLockChimeVolume = "KBV_Off";
                    break;
                default:
                    log.warn("Incorrect index value of Auto Door Lock" + params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetKeylessLockBeepVol", { payload : { evData : this._cachedSafety_AutoDoorLockChimeVolume } } ); 
            break;
        case "SetAutoRelockTimer":
		
	    var intVal = parseInt(params.itemIndex);
		
            switch(intVal)
            {
                case 0:
                    this._cachedSafety_AutoRelockTimer = "Door_Relock_90_Sec";
                    break;
                case 1:
                    this._cachedSafety_AutoRelockTimer = "Door_Relock_60_Sec";
                    break;
                case 2:
                    this._cachedSafety_AutoRelockTimer = "Door_Relock_30_Sec";
                    break;
                default:
                    log.warn("Incorrect index value of AutoRelockTimer" + params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetAutoRelockTimer", { payload : { evData : this._cachedSafety_AutoRelockTimer } } ); 
            break;
        case "SetLASSound":
            var LASSoundSetting = "LDWS_Sound_Buzzer";
            switch (params.itemIndex)
            {
                case 0:
                    LASSoundSetting = "LDWS_Sound_Vibration";
                    break;
                case 1:
                    LASSoundSetting = "LDWS_Sound_Buzzer";
                    break;
                case 2:
                    LASSoundSetting = "LDWS_Sound_Rumber";
                    break;
                default:
                    log.info("_menuItemSelectCallback called with params.itemIndex : "+ params.itemIndex);
                    break;
            }
            framework.sendEventToMmui(this.uiaId, "SetLASSound", { payload : { evData : LASSoundSetting  } } );
            this._cached_LAS_LDWS_SoundSetting = LASSoundSetting;
            break;
        case 'SetHUDRotation':
            if(this._cachedRotationVal != params.value && params.value != null)
            {
                if(this._currentContextTemplate && params.value != this._latestValueHudRotation)
                {   
                    var rotationValue = null;
                    if(params.value == -1)
                    {
                        rotationValue = "Level_minus_1";
                    }
                    else if(params.value == -2)
                    {
                        rotationValue = "Level_minus_2";
                    }
                    else if(params.value == -3)
                    {
                        rotationValue = "Level_minus_3";
                    }
                    else if(params.value == 0)
                    {
                        rotationValue = "Level_Default";
                    }
                    else if(params.value == 1)
                    {
                        rotationValue = "Level_plus_1";
                    }
                    else if(params.value == 2)
                    {
                        rotationValue = "Level_plus_2";
                    }
                    else if(params.value == 3)
                    {
                        rotationValue = "Level_plus_3";
                    }
                    this._cachedRotationVal =  params.value;                    
                    this._latestValueHudRotation =  params.value;
                    log.info("Payload for Rotation is "+rotationValue);
                    framework.sendEventToMmui(this.uiaId, "SetHUDRotation",  { payload : { evData : rotationValue} } ); 
                }
            }
            break;              
        default:  
            log.error("NO ACTION TAKEN FOR " + appData);
            break;
    }
};

vehsettingsApp.prototype._menuItemSlideCallback = function(listCtrlObj, appData, params)
{
    log.debug("_menuItemSlideCallback called for context " + this._currentContext.ctxtId);
    switch(appData)
    { 
        //HUD
        case 'SetHudHeight' :
            if (this._cachedHudTilt != params.value && params.value != null)
            {
                if (this._currentContextTemplate && params.value != this._latestValueHudHeight)
                {
                    this._latestValueHudHeight = params.value;
                    framework.sendEventToMmui(this.uiaId, "SetHudHeight",  { payload : { evData : params.value} } ); 
                }
                this._cachedHudTilt = params.value; 
            } 
            break;
        case 'SetHudBrightnessCalibration':
            if (this._cachedHudCalibration != params.value && params.value != null)
            {
                if (this._currentContextTemplate && params.value != this._latestValueHudBrightnessCalibration)
                {
                    this._latestValueHudBrightnessCalibration = params.value;
                    framework.sendEventToMmui(this.uiaId, "SetHudCalibration",  { payload : { evData : params.value} } );
                } 
                this._cachedHudCalibration = params.value; 
            } 
            break;
        case 'SetHudBrightness':
            if (this._cachedHudIntensity != params.value && params.value != null)
            {
                if (this._currentContextTemplate && params.value != this._latestValueHudBrightness)
                {
                    this._latestValueHudBrightness = params.value;
                    framework.sendEventToMmui(this.uiaId, "SetHudBrightness",  { payload : { evData : params.value} } ); 
                } 
                this._cachedHudIntensity = params.value;
            } 
            break;
        case 'SetHUDRotation':
            if(this._cachedRotationVal != params.value && params.value != null)
            {
                if(this._currentContextTemplate && params.value != this._latestValueHudRotation)
                {   
                    var rotationValue = null;
                    log.info("Payload for Roataion is params.value :"+params.value);    
                    log.info("Type of Params value "+typeof(params.value));
                    
                    if(params.value == -1)
                    {
                        rotationValue = "Level_minus_1";
                    }
                    else if(params.value == -2)
                    {
                        rotationValue = "Level_minus_2";
                    }
                    else if(params.value == -3)
                    {
                        rotationValue = "Level_minus_3";
                    }
                    else if(params.value == 0)
                    {
                        rotationValue = "Level_Default";
                    }
                    else if(params.value == 1)
                    {
                        rotationValue = "Level_plus_1";
                    }
                    else if(params.value == 2)
                    {
                        rotationValue = "Level_plus_2";
                    }
                    else if(params.value == 3)
                    {
                        rotationValue = "Level_plus_3";
                    }
                    this._cachedRotationVal =  params.value;                    
                    this._latestValueHudRotation =  params.value;
                    log.info("Payload for Roataion is "+rotationValue);

                    framework.sendEventToMmui(this.uiaId, "SetHUDRotation",  { payload : { evData : rotationValue} } ); 
                }
            }
            break;          
        default:
            log.error("NO ACTION TAKEN FOR " + appData);
            break;
    }
};

//Ignition off message handler
vehsettingsApp.prototype._IgnitionStatus_MsgHandler = function(msg)
{
    if (msg && msg.params.payload)
    {
        this._ignitionStatus = msg.params.payload.evData;
        if (this._ignitionStatus === 0)
        {
            if (this.ignitionTimer != 0)
            {
                //clear if a timer is started
                clearTimeout(this.ignitionTimer);
            }
            framework.setSharedData(this.uiaId, "IgnitionStatus", false);
            
            this._delayStatus = "disabled";
        }
    }
    if (this._currentContext && this._currentContextTemplate)
    {
        var tmplt = this._currentContextTemplate;
        if (this._currentContext.ctxtId === "VehicleSettingsTab" || 
                this._currentContext.ctxtId === "SafetyTab" || 
                this._currentContext.ctxtId === "DRSS" || 
                this._currentContext.ctxtId === "FOW" || 
                this._currentContext.ctxtId === "LDWS" || 
                this._currentContext.ctxtId === "RVMVolume" || 
                this._currentContext.ctxtId === "BSMVolume" || 
                this._currentContext.ctxtId === "SBS_SCBS" || 
                this._currentContext.ctxtId === "SBS" || 
                this._currentContext.ctxtId === "KeylessLockBeepVol" || 
                this._currentContext.ctxtId === "DoorLockMode" || 
                this._currentContext.ctxtId === "DoorLock" || 
                this._currentContext.ctxtId === "IntLightTimeoutDoorOpen" || 
                this._currentContext.ctxtId === "IntLightTimeoutDoorClosed" || 
                this._currentContext.ctxtId === "AutoHeadlightOn" || 
                this._currentContext.ctxtId === "HeadlightOffTimer" || 
                this._currentContext.ctxtId === "DoorRelockTime" || 
                this._currentContext.ctxtId === "UnlockMode" || 
                this._currentContext.ctxtId === "TurnSettings" || 
                this._currentContext.ctxtId === "Lighting" ||
                this._currentContext.ctxtId === "SLI" ||
                this._currentContext.ctxtId === "SLSign"||
                this._currentContext.ctxtId === "SLCaution"||
                this._currentContext.ctxtId === "CautionSpeed" ||
                this._currentContext.ctxtId === "SpeedAlarm" ||
                this._currentContext.ctxtId === "IntLightingBrightness") 
        {
            if (this._ignitionStatus === 0) 
            {
                for (var tempcount = 0; tempcount < tmplt.list2Ctrl.dataList.itemCount; tempcount++)
                {
                    tmplt.list2Ctrl.dataList.items[tempcount].disabled = true;
                }
                tmplt.list2Ctrl.updateItems(0, tmplt.list2Ctrl.dataList.itemCount - 1);
                if (tmplt.list2Ctrl.dataList.itemCount == 0)
                {
                    tmplt.list2Ctrl.setLoading(false);
                }
            }
            else if (this._ignitionStatus === 1)
            {
                if (this.ignitionTimer != 0)
                {
                    //clear if a timer is started
                    clearTimeout(this.ignitionTimer);
                }
                //restart the timer
                this.ignitionTimer = setTimeout(this._timeOutIgnition.bind(this),2000);
            }
        }
        else
        {
            if (this._ignitionStatus === 1)
            {
                if (this.ignitionTimer != 0)
                {
                    //clear if a timer is started
                    clearTimeout(this.ignitionTimer);
                }
                //restart the timer
                this.ignitionTimer = setTimeout(this._timeOutIgnition.bind(this),2000);
            }
        }
    }
    else
    {
        if (this._ignitionStatus === 1)
        {
            if (this.ignitionTimer != 0)
            {
                //clear if a timer is started
                clearTimeout(this.ignitionTimer);
            }
            //restart the timer
            this.ignitionTimer = setTimeout(this._timeOutIgnition.bind(this),2000);
        }
    }
};

vehsettingsApp.prototype._timeOutIgnition = function()
{ 
    this._delayStatus = "enabled";
    this.ignitionTimer = 0;
    //store the ignition status to framework ( 2 sec delay is always handled in Veh settings)
    framework.setSharedData(this.uiaId, "IgnitionStatus", true);
    if (this._currentContext && this._currentContextTemplate && (this._currentContext.ctxtId === "SLI" || this._currentContext.ctxtId === "SLSign"|| this._currentContext.ctxtId === "SLCaution"||
                this._currentContext.ctxtId === "CautionSpeed" || this._currentContext.ctxtId === "IntLightingBrightness" || this._currentContext.ctxtId === "SpeedAlarm" || 
                this._currentContext.ctxtId === "VehicleSettingsTab" || this._currentContext.ctxtId === "SafetyTab" || this._currentContext.ctxtId === "DRSS" || this._currentContext.ctxtId === "FOW" || 
                this._currentContext.ctxtId === "LDWS" || this._currentContext.ctxtId === "RVMVolume" || this._currentContext.ctxtId === "BSMVolume" || this._currentContext.ctxtId === "SBS_SCBS" || 
                this._currentContext.ctxtId === "SBS" || this._currentContext.ctxtId === "KeylessLockBeepVol" || this._currentContext.ctxtId === "DoorLockMode" || this._currentContext.ctxtId === "DoorLock" || 
                this._currentContext.ctxtId === "IntLightTimeoutDoorOpen" || this._currentContext.ctxtId === "IntLightTimeoutDoorClosed" || this._currentContext.ctxtId === "AutoHeadlightOn" || 
                this._currentContext.ctxtId === "HeadlightOffTimer" || this._currentContext.ctxtId === "BuzzerAnswerBackVol" || this._currentContext.ctxtId === "DoorRelockTime" || 
                this._currentContext.ctxtId === "UnlockMode" || this._currentContext.ctxtId === "TurnSettings" || this._currentContext.ctxtId === "Lighting" || 
                this._currentContext.ctxtId === "SensitivityForWarningCancel" || this._currentContext.ctxtId === "SensitivityForWideRange"))
    {
        if (this._CANStatus === true && this.cachedSpeed === false) // if CAN status is active and AtSpeed is false, then only enable
        {
            for (var tempcount = 0; tempcount < this._currentContextTemplate.list2Ctrl.dataList.itemCount; tempcount++)
            {
                this._currentContextTemplate.list2Ctrl.dataList.items[tempcount].disabled = false;
            }
            this._currentContextTemplate.list2Ctrl.setDataList(this._currentContextTemplate.list2Ctrl.dataList);
            //this._currentContextTemplate.list2Ctrl.updateItems(0,this._currentContextTemplate.list2Ctrl.dataList.itemCount - 1);
            if (this._currentContextTemplate.list2Ctrl.dataList.itemCount) 
            { 
                this._currentContextTemplate.list2Ctrl.updateItems(0,this._currentContextTemplate.list2Ctrl.dataList.itemCount - 1); 
            } 
            switch(this._currentContextTemplate.templateName)
            {
                case "List2Tmplt" :
                    if (this._currentContextTemplate.list2Ctrl.dataList.itemCount == 0)
                    {
                        this._currentContextTemplate.list2Ctrl.setLoading(false);
                    }
                    break;
                default:
                    log.debug("Do nothing for other then ListTmplt");
                    break;
            }
        }
        else if(this._CANStatus === true && this.cachedSpeed == true)
        {
            this._DisableSpeedRestricted();
        }
           
    }
};

//For vehicle tab
vehsettingsApp.prototype.getTrueCountsVehicleTab = function()
{
    var temp = new Array();
    var index = 0;
    //Turn
    
    if (this.statusArrayTurn[1] === false && this.statusArrayTurn[0] === false)
    {
        this.statusArrayVehicleTab[2] = false;
    }
    if (this.statusArrayTurn[1] === true || this.statusArrayTurn[0] === true)
    {
        this.statusArrayVehicleTab[2] = true;
    }
    //DoorLock
    if (this.statusArrayDoorLock[4] === false && this.statusArrayDoorLock[3] === false && this.statusArrayDoorLock[1] === false && this.statusArrayDoorLock[2] === false && this.statusArrayDoorLock[0] === false)
    {
        this.statusArrayVehicleTab[1] = false;
    }
    if (this.statusArrayDoorLock[4] === true || this.statusArrayDoorLock[3] === true || this.statusArrayDoorLock[1] === true || this.statusArrayDoorLock[2] === true || this.statusArrayDoorLock[0] === true)
    {
        this.statusArrayVehicleTab[1] = true;
    }
    //Lighting
       
    if (this.statusArray[0] === false && 
        this.statusArray[1] === false && 
        this.statusArray[2] === false && 
        this.statusArray[3] === false && 
        this.statusArray[4] === false && 
        this.statusArray[5] === false && 
        this.statusArray[6] === false && 
        this.statusArray[7] === false && 
        this.statusArray[8] === false && 
        this.statusArray[9] === false &&
        this.statusArray[10] === false)
    {
        this.statusArrayVehicleTab[3] = false;
    }
    if (this.statusArray[0] === true || 
        this.statusArray[1] === true || 
        this.statusArray[2] === true || 
        this.statusArray[3] === true || 
        this.statusArray[4] === true || 
        this.statusArray[5] === true || 
        this.statusArray[6] === true || 
        this.statusArray[7] === true || 
        this.statusArray[8] === true || 
        this.statusArray[9] === true ||
        this.statusArray[10] === true)
    {
        this.statusArrayVehicleTab[3] = true;    
    }
    //Return True Items
    for (var j = 0; j < this.statusArrayVehicleTab.length; j++)
    {
        if (this.statusArrayVehicleTab[j] === true)
        {
            temp[index] = j;    
            index++;
        }        
    }
    return temp;
};

vehsettingsApp.prototype.getAdjustedValueforDataListVehicleTab = function()
{
    var trueArrayVehicleTab = this.getTrueCountsVehicleTab();
    var indexCount = 0;
    var tempArrayAutoWiper = new Array();
    for (var i = 0; i < trueArrayVehicleTab.length; i++)    
    {
        indexCount = trueArrayVehicleTab[i];
        tempArrayAutoWiper[i] =  this._VehicleSettingsTabCtxtDataListImmutable.items[indexCount];
        if (indexCount === 0 && this._cachedSafety_AutoWiper)//3 flash turn signal
        {
            this._autoWiperToggleIndex = i;
            var RSWvalue = 2;
            switch (this._cachedSafety_AutoWiper) 
            {
                case "RSW_On":
                    RSWvalue = 1;
                    break;
                case "RSW_Off":
                    RSWvalue = 2;
                    break;
                default:
                    log.info("Invalid value for this._cachedSafety_AutoWiper : "+this._cachedSafety_AutoWiper);
                    break;
            }
            tempArrayAutoWiper[i].value = RSWvalue; 
        }
        
     }
     return tempArrayAutoWiper;
};

vehsettingsApp.prototype.populateStatusArrayAutoWiper = function()
{
     for (var truecount = 0; truecount < 4; truecount++)
     {
        this.statusArrayVehicleTab[truecount] = false;
     }
};


//For Turn
vehsettingsApp.prototype.getTrueCountsTurn = function()
{
    var temp = new Array();
    var index = 0;
    if (this.statusArrayTurn[1] === false && this.statusArrayTurn[0] === false)//For turn
    {
        this.statusArrayTurn[2] = false;
    }
    if (this.statusArrayTurn[1] === true || this.statusArrayTurn[0] === true)//For turn
    {
        this.statusArrayTurn[2] = true;
    }
    for (var j = 0; j < this.statusArrayTurn.length; j++)
    {
        if (this.statusArrayTurn[j] === true)
        {
            temp[index] =  j;    
            index++;
        }        
    }
    return temp;
};

vehsettingsApp.prototype.getAdjustedValueforDataListTurn = function(dataList)
{
    var trueArrayTurn = this.getTrueCountsTurn();

    var indexCount = 0;
    var tempArray2 = new Array();
    for (var i = 0; i < trueArrayTurn.length; i++)    
    {
        indexCount = trueArrayTurn[i];
        tempArray2[i] = this._TurnSettingsCtxtDataListImmutable.items[indexCount];

        if (indexCount === 0 && this._cachedSafety_3flashTurnSignal)//3 flash turn signal
        {
            var FTSValue = 2;
            switch (this._cachedSafety_3flashTurnSignal) 
                {
                    case "Three_Flash_On":
                        FTSValue = 1;
                        break;
                    case "Three_Flash_Off":
                        FTSValue = 2;
                        break;
                    default:
                        log.info("Invalid value for this._cachedSafety_3flashTurnSignal : "+this._cachedSafety_3flashTurnSignal);
                        break;
                }
            tempArray2[i].value = FTSValue; 
            this._3flashTurnSettingsToggleIndex = i;
        }
        else if (indexCount === 1 && this._cachedSafety_TurnSignalIndicatorVolume)//Turn Signal Volume
        {
            var TSIVValue = 2;
            switch (this._cachedSafety_TurnSignalIndicatorVolume) 
            {
                case "Turn_Volume_Big":
                    TSIVValue = 1;
                    break;
                case "Turn_Volume_Small":
                    TSIVValue = 2;
                    break;
                default:
                    log.info("Invalid value for this._cachedSafety_TurnSignalIndicatorVolume : "+this._cachedSafety_TurnSignalIndicatorVolume);
                    break;
            }
            tempArray2[i].value = TSIVValue; 
            this._turnSignalVolumeToggleIndex = i;
        }
    }
    return tempArray2;
};

vehsettingsApp.prototype.populateStatusArrayTurn = function()
{
     for(var truecount = 0; truecount < 3; truecount++)
     {
        this.statusArrayTurn[truecount] = false;
     }
};

vehsettingsApp.prototype.getTrueCountsDoorLock = function()
{
    var temp = new Array();
    var index = 0;
    if (this.statusArrayDoorLock[0] === false && 
        this.statusArrayDoorLock[1] === false && 
        this.statusArrayDoorLock[2] === false && 
        this.statusArrayDoorLock[3] === false && 
        this.statusArrayDoorLock[4] === false)
    {
        this.statusArrayDoorLock[5] = false;
    }
    if (this.statusArrayDoorLock[0] === true || 
        this.statusArrayDoorLock[1] === true || 
        this.statusArrayDoorLock[2] === true || 
        this.statusArrayDoorLock[3] === true || 
        this.statusArrayDoorLock[4] === true)
    {
        this.statusArrayDoorLock[5] = true;
    }
    for(var j = 0; j < this.statusArrayDoorLock.length; j++)
    {
        if(this.statusArrayDoorLock[j] == true)
        {
            temp[index] =  j;    
            index++;
        }        
    }
    return temp;
};

vehsettingsApp.prototype.getAdjustedValueForDataListDoorLock = function(dataList)
{
    var trueArray1 = this.getTrueCountsDoorLock();
    var indexCount;
    var tempArrayDoorLock = new Array();
    for(var i = 0; i < trueArray1.length; i++)    
    {
        indexCount = trueArray1[i];
        tempArrayDoorLock[i] = this._DoorLockCtxtDataListImmutable.items[indexCount];
        
        if (indexCount === 0)
        {
            if(this._cachedVehicle_AutoDoorLockInstalledAT6 === 1)
            {
                if (this._cachedGet_AutoDoorLockAT6 === "AT6_Off")
                {
                    tempArrayDoorLock[i].label1Id = "common.Off";// framework.localize.getLocStr("common","Off") ;
                }
                else if (this._cachedGet_AutoDoorLockAT6)
                {
                    tempArrayDoorLock[i].label1Id = "common.On"; //framework.localize.getLocStr("common","On");
                }
            }
            else
            {
        
                if (this._cachedVehicle_AutoDoorLockInstalledAT === 1 && this._cachedVehicle_AutoDoorLockInstalledMT === 0)// auto transmission
                {
                    if (this._cachedGet_AutoDoorLockAT === "AT5_Off")
                    {
                        tempArrayDoorLock[i].label1Id = "common.Off";// framework.localize.getLocStr("common","Off") ;
                    }
                    else if (this._cachedGet_AutoDoorLockAT)
                    {
                        tempArrayDoorLock[i].label1Id = "common.On"; //framework.localize.getLocStr("common","On");
                    }
                }
                else if (this._cachedVehicle_AutoDoorLockInstalledAT === 0 && this._cachedVehicle_AutoDoorLockInstalledMT === 1)//manual transmission
                {
                    if (this._cachedGet_AutoDoorLockMT === "MT_Off")
                    {
                        tempArrayDoorLock[i].label1Id = "common.Off";
                    }
                    else if (this._cachedGet_AutoDoorLockMT)
                    {
                        tempArrayDoorLock[i].label1Id = "common.On";
                    }
                }
                else if (this._cachedVehicle_AutoDoorLockInstalledAT === 1 && this._cachedVehicle_AutoDoorLockInstalledMT === 1)// If both installed then preference should be given to AT 
                {
                    if (this._cachedGet_AutoDoorLockAT === "AT5_Off")
                    {
                        tempArrayDoorLock[i].label1Id = "common.Off";// framework.localize.getLocStr("common","Off") ;
                    }
                    else if (this._cachedGet_AutoDoorLockAT)
                    {
                     tempArrayDoorLock[i].label1Id = "common.On"; //framework.localize.getLocStr("common","On");
                    }
                }
            }
        }  
        else if (indexCount === 1 && this._cachedSafety_AutoDoorLockChimeVolume )
        {
            switch (this._cachedSafety_AutoDoorLockChimeVolume)
            {
                case "KBV_Big":
                    tempArrayDoorLock[i].label1Id = "High";
                    break;
                case "KBV_Middle":
                    tempArrayDoorLock[i].label1Id = "Med";
                    break; 
                case "KBV_Small":
                    tempArrayDoorLock[i].label1Id = "Low";
                    break;  
                case "KBV_Off":
                    tempArrayDoorLock[i].label1Id = "common.Off";
                    break;
                default:
                    log.info("Invalid value for this._cachedSafety_AutoDoorLockChimeVolume : "+this._cachedSafety_AutoDoorLockChimeVolume);
                    break;
             }  
        }  
        else if (indexCount === 2 && this._cachedSafety_AutoRelockTimer)
        {
            switch (this._cachedSafety_AutoRelockTimer)
            {
                case "Door_Relock_90_Sec":
                    tempArrayDoorLock[i].label1Id ="_90s";
                    break;
                case "Door_Relock_60_Sec":
                    tempArrayDoorLock[i].label1Id ="_60s";
                    break; 
                case "Door_Relock_30_Sec":
                    tempArrayDoorLock[i].label1Id ="_30s";
                    break;
                default:
                    log.info("Invalid value for this._cachedSafety_AutoRelockTimer : "+this._cachedSafety_AutoRelockTimer);
                    break;  
            }  
        }  
        else if (indexCount === 3 && this._cachedKeyless_UnlockMode)
        {
            switch (this._cachedKeyless_UnlockMode)
            {
                case "Unlock_AllSeat":
                    tempArrayDoorLock[i].label1Id = "_AllDoors";
                    break;
                case "Unlock_DriverSeat":
                    tempArrayDoorLock[i].label1Id = "_Driver'sDoor";
                    break;
                default:
                    log.info("Invalid value for this._cachedKeyless_UnlockMode : "+this._cachedKeyless_UnlockMode);
                    break;                
            }  
        }  
        else if (indexCount === 4 && this._cachedKeyless_WalkAwayLock)
        {
            if (this._cachedKeyless_WalkAwayLock)
            {
                var WALValue = 2;
                switch (this._cachedKeyless_WalkAwayLock)
                {
                    case "WalkAwayLock_On":
                        WALValue = 1;
                        break;
                    case "WalkAwayLock_Off":
                        WALValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of WAL received"+ this._cachedKeyless_WalkAwayLock);
                        break;
                }
            }
            tempArrayDoorLock[i].value = WALValue;
            this._walkAwayLockToggleIndex = i;
        }
    }
    return tempArrayDoorLock;
};

vehsettingsApp.prototype.populateStatusArrayDoorLock = function()
{
    for (var truecount = 0; truecount < 6; truecount++)
    {
        this.statusArrayDoorLock[truecount] = false;
    }
};

vehsettingsApp.prototype.getTrueCounts = function()//Lighting
{
    var temp = new Array();
    var index = 0;
    if (this.statusArray[0] === false && this.statusArray[1] === false && this.statusArray[2] === false && this.statusArray[3] === false && this.statusArray[4] === false && this.statusArray[5] === false && this.statusArray[6] === false && this.statusArray[7] === false && this.statusArray[8] === false && this.statusArray[9] === false && this.statusArray[10] === false)
    {
        //this.statusArray[7] = false;
        this.statusArray[11] = false;
    }
    if (this.statusArray[0] === true || this.statusArray[1] === true || this.statusArray[2] === true || this.statusArray[3] === true || this.statusArray[4] === true || this.statusArray[5] === true || this.statusArray[6] === true || this.statusArray[7] === true || this.statusArray[8] === true || this.statusArray[9] === true || this.statusArray[10] === true)
    {
        //this.statusArray[7] = true;
        this.statusArray[11] = true;
    }   
    for (var j= 0; j < this.statusArray.length; j++)
    {
        if(this.statusArray[j] === true)
        {
            temp[index] =  j;    
            index++;
        }        
    }
    return temp;
};

vehsettingsApp.prototype.getAdjustedValueforDataListLighting = function(dataList)
{
    var trueArray = this.getTrueCounts();
    var indexCount;
    var tempArray = new Array();
    
    for (var i = 0; i < trueArray.length; i++)    
    {
        indexCount = trueArray[i];
        tempArray[i] = this._LightingCtxtDataListImmutable.items[indexCount];
        if (indexCount === 0 && this._cachedILB )
        {
             tempArray[i].label1Id = this._cachedILB;
        }  
        
        else if (indexCount === 1 && this._cachedSafety_InterioLightTimeoutDoorOpen )
        {
            switch (this._cachedSafety_InterioLightTimeoutDoorOpen)
            {
                case "ILTDO_60_Min":
                    tempArray[i].label1Id = "_60m";
                    break;
                case "ILTDO_30_Min":
                    tempArray[i].label1Id = "_30m";
                    break; 
                case "ILTDO_10_Min":
                    tempArray[i].label1Id = "_10m";
                    break;
                default:
                    log.info("Invalid value for this._cachedSafety_InterioLightTimeoutDoorOpen : "+this._cachedSafety_InterioLightTimeoutDoorOpen);
                    break;
            }  
        }  
        else if (indexCount === 2 && this._cachedSafety_InterioLightTimeoutDoorClosed)
        {
            switch (this._cachedSafety_InterioLightTimeoutDoorClosed)
            {
                case "ILTDC_60_Sec":
                    tempArray[i].label1Id =  "_60s";
                    break;
                case "ILTDC_30_Sec":
                    tempArray[i].label1Id = "_30s";
                    break; 
                case "ILTDC_15_Sec":
                    tempArray[i].label1Id = "_15s";
                    break;  
                case "ILTDC_7_5_Sec":
                    tempArray[i].label1Id = "_7p5s";
                    break;
                default:
                    log.info("Invalid value for this._cachedSafety_InterioLightTimeoutDoorClosed : "+this._cachedSafety_InterioLightTimeoutDoorClosed);
                    break;
            }
        }
        else if (indexCount === 3) //High Beam Control
        {
            if(this.textChange == 1)
            {
                tempArray[i].text1Id = "HighBeamControl";
            }
            else if(this.textChange == 2)
            {
                tempArray[i].text1Id = "AHBC";
            }
            if (this._cachedHeadlight_HighBeamControll)
            {
                var HBCValue = 2;
                switch (this._cachedHeadlight_HighBeamControll)
                {
                    case "HBC_On":
                        HBCValue = 1;
                        break;
                    case "HBC_Off":
                        HBCValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of HBC received : "+ this._cachedHeadlight_HighBeamControll);
                        break;
                }
            }
            tempArray[i].value = HBCValue;
            this._highBeamControlToggleIndex = i;
        }
        else if (indexCount === 4) //AFS
        {
            if (this._cachedAFS)
            {
                var AFSValue = 2;
                switch (this._cachedAFS)
                {
                    case "AFS_On":
                        AFSValue = 1;
                        break;
                    case "AFS_Off":
                        AFSValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of HBC received : "+ this._cachedAFS);
                        break;
                }
                tempArray[i].value = AFSValue;
            }
            this._AFSToggleIndex = i;
        }  
        else if (indexCount === 5) //HeadlightOnWaring
        {
            if (this._cachedHeadlight_HeadlightOnWaring)
            {
                var HOWValue = 2;
                switch (this._cachedHeadlight_HeadlightOnWaring)
                {
                    case "HOW_Big":
                        HOWValue = 1;
                        break;
                    case "HOW_Small":
                        HOWValue = 2;
                        break;
                    case "HOW_Off":
                        HOWValue = 3;
                        break;
                    default :
                        log.warn("Incorrect value of HBC received: "+ this._cachedHeadlight_HeadlightOnWaring);
                        break;
                }
                tempArray[i].value = HOWValue;
            }
            this._lightReminderToggleIndex = i;
        }    
        else if (indexCount === 6 && this._cachedHeadlight_HeadlightOffTimer)
        {
            switch (this._cachedHeadlight_HeadlightOffTimer)
            {
                case "HOT_120_Sec":
                    tempArray[i].label1Id = "_120s";
                    break;
                case "HOT_90_Sec":
                    tempArray[i].label1Id = "_90s";
                    break; 
                case "HOT_60_Sec":
                    tempArray[i].label1Id = "_60s";
                    break;  
                case "HOT_30_Sec":
                    tempArray[i].label1Id = "_30s";
                    break;
                case "HOT_OFF":
                    tempArray[i].label1Id = "common.Off";
                    break;
                default:
                    log.warn("Incorrect value of this._cachedHeadlight_HeadlightOffTimer received: "+ this._cachedHeadlight_HeadlightOffTimer);
                    break;
            }
        }
        else if (indexCount === 7 && this._cachedCHLT)  //CHLT
        {
            switch (this._cachedCHLT)
            {
                case "CHL_120_SEC":
                    tempArray[i].label1Id = "_120s";
                    break;
                case "CHL_90_SEC":
                    tempArray[i].label1Id = "_90s";
                    break; 
                case "CHL_60_SEC":
                    tempArray[i].label1Id = "_60s";
                    break;  
                case "CHL_30_SEC":
                    tempArray[i].label1Id = "_30s";
                    break;
                case "CHL_OFF":
                    tempArray[i].label1Id = "common.Off";
                    break;
                default:
                    log.warn("Incorrect value of this._cachedCHLT received: "+ this._cachedCHLT);
                    break;
            }
        }
        else if (indexCount === 8)  //LHL
        {
            switch(this._cachedLHL)
            {
                case "LHL_On":
                    tempArray[i].value = 1;
                    break;
                case "LHL_Off":
                    tempArray[i].value = 2;
                    break;
                default:
                    log.warn("Incorrect value of this._cachedLHL received: "+ this._cachedLHL);
                    break;   
            }
            this._LHLToggleIndex = i;
        } 
        else if (indexCount === 9) //DayTimeRunningLight
        {
            switch(this._cachedHeadlight_DaytimeLights)
            {
                case "DRL_On":
                    tempArray[i].value = 1;
                    break;
                case "DRL_Off":
                    tempArray[i].value = 2;
                    break;
                default:
                    log.warn("Incorrect value of this._cachedHeadlight_DaytimeLights received: "+ this._cachedHeadlight_DaytimeLights);
                    break;
                    
            }
            this._dayTimeRunningLightToggleIndex = i;
        }   
        else if (indexCount === 10 && this._cachedHeadlight_AutoHeadlightsSensitivity )
        {
            switch (this._cachedHeadlight_AutoHeadlightsSensitivity)
            {
                case "AHS_Extra_High":
                    tempArray[i].label1Id = "Light" ;
                    break;
                case "AHS_High":
                    tempArray[i].label1Id = "MediumLight";
                    break; 
                case "AHS_Standard":
                    tempArray[i].label1Id = "Medium";
                    break;  
                case "AHS_Low":
                    tempArray[i].label1Id = "MediumDark";
                    break;  
                case "AHS_Extra_Low":
                    tempArray[i].label1Id = "Dark";
                    break; 
                default:
                    log.warn("Incorrect value of this._cachedHeadlight_AutoHeadlightsSensitivity received: "+ this._cachedHeadlight_AutoHeadlightsSensitivity);
                    break;
            }
        }
    }
    return tempArray;
};

vehsettingsApp.prototype.gettext = function()
{
         if(!this._cachedSBS_Installed)
         {
            //Need Dict for SCBS reset Currently not available
            return 'SCBS';
         }
         else
         {
            return 'SBS_SCBSReset';
         }
};


vehsettingsApp.prototype.populateStatusArrayLighting = function()
{
    for (var truecount = 0; truecount < 13; truecount++)
    {
        this.statusArray[truecount] = false;
    }
};

vehsettingsApp.prototype.getTrueCountsSafetyTab = function()
{
    var temp = new Array();
    var index = 0;
    var statusArraySafetyTabCopy = new Array();
    
    var region = framework.localize.getRegion();
//    if(region !== "Region_Japan" && framework.getSharedData("syssettings","VehicleType") === "SETTINGS_VehicleModelType_J78A" && this._HUDInstalledStatus == true)
        
        //Added additional check of "this._cachedSDcardStatus" for CI-4682. SLI should not be visible when SD card is not available
        if((this._HUDInstalledStatus == true) &&((this._cachedSDcardStatus == "On") && ((region !== "Region_Japan" && framework.getSharedData("syssettings","VehicleType") === "SETTINGS_VehicleModelType_J78A" && this._HudType === "WHUD_color") ||
				(region !== "Region_Japan" && (this._HudType === "WHUD_color" || this._HudType === "CHUD_color" ) && this._TSRStatus === "TSR_Disabled"))) ||
				((this._HudType === "WHUD_color" || this._HudType === "CHUD_color" ) &&(this._TSRStatus === "TSR_Enabled")))
        {
        this.statusArraySafetyTab[this._SafetyTabIndex["SpeedLimitInformation"]] = true;
        }
        else
        {
        
        this.statusArraySafetyTab[this._SafetyTabIndex["SpeedLimitInformation"]] = false;
        } 
    
    for (i = 0; i <= this.statusArraySafetyTab.length; i++)
    {
        statusArraySafetyTabCopy[i] = this.statusArraySafetyTab[i];
    }

    //J36IPM Logic
    if (this.statusArraySafetyTab[this._SafetyTabIndex["SBS"]] === true || this.statusArraySafetyTab[this._SafetyTabIndex["SCBS"]] === true)
    {
        statusArraySafetyTabCopy[this._SafetyTabIndex["SBS/SCBS"]] = false;
    }

    if (this.statusArraySafetyTab[this._SafetyTabIndex["SBS"]] === true && this.statusArraySafetyTab[this._SafetyTabIndex["SCBS"]] === true)
    {
            statusArraySafetyTabCopy[this._SafetyTabIndex["SBS"]] = false;
            statusArraySafetyTabCopy[this._SafetyTabIndex["SCBS"]] = false;
            statusArraySafetyTabCopy[this._SafetyTabIndex["SBS/SCBS"]] = true;
    }
    
    if (this.statusArraySafetyTab[this._SafetyTabIndex["SBS"]] === false && this.statusArraySafetyTab[this._SafetyTabIndex["SCBS"]] === false)
    {
        statusArraySafetyTabCopy[this._SafetyTabIndex["SBS/SCBS"]] = false;
    }
    
    for (var j = 0; j < statusArraySafetyTabCopy.length; j++)
    {
        if (statusArraySafetyTabCopy[j] === true)
        {
            temp[index] =  j;    
            index++;
        }        
    }
    return temp;
};

		
// RTC 29310 - SCBS displayed not correctly.
vehsettingsApp.prototype.getAdjustedValueforDataListSafetyTab = function()
{
    var trueArray4 = this.getTrueCountsSafetyTab();

    var indexCount;
    var tempArraySafetyTab = new Array();
    for (var i = 0 ; i < trueArray4.length; i++)    
    {
        indexCount = trueArray4[i];
        tempArraySafetyTab[i] =  this._SafetyTabCtxtDataListImmutable.items[indexCount];
        if (tempArraySafetyTab[i].appData === "SetSCBS")
        {
            this._smartCityBreakToggleIndex = i;
            if (this._cached_SBS_SCBS_BrakeSupport)
            {
                var SCBSValue = 2;
                switch (this._cached_SBS_SCBS_BrakeSupport)
                {
                    case "SCBS_On":
                        SCBSValue = 1;
                        break;
                    case "SCBS_Off":
                        SCBSValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of this._cached_SBS_SCBS_BrakeSupport received"+ this._cached_SBS_SCBS_BrakeSupport);
                        break;
                }
                tempArraySafetyTab[i].value = SCBSValue;
            } 
        }

        if (tempArraySafetyTab[i].appData === "SetSCBSMode_J36IPM")
        {
            this._smartCityBreakToggleIndex = i;
            if (this._cached_SBS_SCBS_BrakeSupport)
            {
                var SCBSValue = 2;
                switch (this._cached_SBS_SCBS_BrakeSupport)
                {
                    case "SCBS_On":
                        SCBSValue = 1;
                        break;
                    case "SCBS_Off":
                        SCBSValue = 2;
                        break;
                    default :
                        log.warn("Incorrect value of this._cached_SBS_SCBS_BrakeSupport received"+ this._cached_SBS_SCBS_BrakeSupport);
                        break;
                }
                tempArraySafetyTab[i].value = SCBSValue;
            } 
        }
        
        if (tempArraySafetyTab[i].appData === "SetDA")
        {
            
             log.info("Inside getAdjustedValueforDataListSafetyTab :tempArraySafetyTab[i].appData ::"+tempArraySafetyTab[i].appData);
            
            if (this._cachedDA)
            {
                log.info("changing DA value to "+this._cachedDA +" at  index = "+i);
                switch(this._cachedDA)
                {
                    case "DA_On":
                        tempArraySafetyTab[i].value = 1;
                        break;
                    case "DA_Off":
                        tempArraySafetyTab[i].value = 2;
                        break;
                    default :
                        log.warn("Incorrect value of this._cachedDA received"+ this._cachedDA);
                        break;
                }
            } 
        }
        if (tempArraySafetyTab[i].appData === "SetParkingSensor")
        {
             log.info("Inside getAdjustedValueforDataListSafetyTab :tempArraySafetyTab[i].appData ::"+tempArraySafetyTab[i].appData);
            if (this._cachedPSI)
            {
                log.info("changing PSI value to "+this._cachedPSI +" at  index = "+i);
                switch(this._cachedPSI)
                {
                    case "On":
                        tempArraySafetyTab[i].value = 1;
                        break;
                    case "Off":
                        tempArraySafetyTab[i].value = 2;
                        break;
                    default:
                        tempArraySafetyTab[i].value = 2; //default setting to Off
                        log.info("Default setting to OFF , this._cachedPSI: "+this._cachedPSI);
                        break;
                }
            } 
        }
        if (tempArraySafetyTab[i].appData === "SelectRVMBuzzerVolume"  )
        {
            switch (this._cachedRVMBuzzerVolume)
            {
                case "RVM_Vol_Big":
                    tempArraySafetyTab[i].label1Id = "High";
                    break;
                case "RVM_Vol_Small":
                    tempArraySafetyTab[i].label1Id = "Low";
                    break; 
                case "RVM_Vol_No_Alarm":
                    tempArraySafetyTab[i].label1Id = "common.Off";
                    break;
                default:
                    log.info("Invalid value for this._cachedRVMBuzzerVolume :"+this._cachedRVMBuzzerVolume);
                    break;
             }  
        }
        if (tempArraySafetyTab[i].appData === "SpeedLimitInformation")
        {
            
             log.info("Inside getAdjustedValueforDataListSafetyTab :tempArraySafetyTab[i].appData ::"+tempArraySafetyTab[i].appData);
        }
        
        if (tempArraySafetyTab[i].appData === "SelectBSMBuzzerVolume")
        {
            switch (this._cachedBSMBuzzerVolume)
            {
                case "BSM_Vol_Big":
                    tempArraySafetyTab[i].label1Id = "High";
                    break;
                case "BSM_Vol_Small":
                    tempArraySafetyTab[i].label1Id = "Low";
                    break; 
                case "BSM_Vol_No_Alarm":
                    tempArraySafetyTab[i].label1Id = "common.Off";
                    break;
                default:
                    log.info("Invalid value for this._cachedBSMBuzzerVolume :"+this._cachedBSMBuzzerVolume);
                    break;
            }  
        } 
        if (this._SafetyTabIndex["SCBS_J36IPM"] === true && this._cached_SBS_SCBS_BrakeSupport )//SCBS
        {
            var SCBSValue = 2;
            switch (this._cached_SBS_SCBS_BrakeSupport)
            {
                case "SCBS_On":
                    SCBSValue = 1;
                    break;
                case "SCBS_Off":
                    SCBSValue = 2;
                    break;
                default :
                    log.warn("Incorrect value of DRSS received"+ this._cached_SBS_SCBS_BrakeSupport);
                    break;
            }
            tempArraySafetyTab[i].value = SCBSValue; 
        }
        if (this._SafetyTabIndex["RVMBuzzerVolume"] === true && this._cachedRVMBuzzerVolume && this._cachedRVM_Installed)//RVM
        {
            var RVMValue = 2;
            switch(this._cachedRVMBuzzerVolume)
            {
                case "RVM_Vol_Big":
                    RVMValue = 0;
                    break;
                case "RVM_Vol_Small":
                    RVMValue = 1;
                    break;
                case "RVM_Vol_No_Alarm":
                    RVMValue = 2;
                    break;
                default:
                    log.warn("Incorrect value of this._cachedRVMBuzzerVolume received"+ this._cachedRVMBuzzerVolume);
                    break;
            }
            tempArraySafetyTab[i].value = RVMValue; 
        }
    }
    return tempArraySafetyTab;
};

vehsettingsApp.prototype.populateStatusArraySafetyTab = function()
{
    for (var truecount = 0; truecount < 11; truecount++)
    {
        this.statusArraySafetyTab[truecount] = false;
    }
};

vehsettingsApp.prototype._DisableSpeedRestricted = function()
{  
    if (this._currentContext && this._currentContextTemplate) 
    {
        switch (this._currentContext.ctxtId)
        {
            case "VehicleSettingsTab" : 
                this._VehicleSettingsTabCtxtDataListImmutable.items[0].disabled = this.cachedSpeed;
                this._VehicleSettingsTabCtxtDataListImmutable.items[1].disabled = this.cachedSpeed;
                this._VehicleSettingsTabCtxtDataListImmutable.items[2].disabled = this.cachedSpeed;
                this._VehicleSettingsTabCtxtDataListImmutable.items[3].disabled = this.cachedSpeed;
                this._VehicleSettingsTabCtxtDataListImmutable.items[4].disabled = this.cachedSpeed;
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "SafetyTab" : 
                this.populateListCtrl(this._currentContextTemplate);
                break;				
            case "TurnSettings" : 
                this._TurnSettingsCtxtDataListImmutable.items[0].disabled = this.cachedSpeed;
                this._TurnSettingsCtxtDataListImmutable.items[1].disabled = this.cachedSpeed;
                this._TurnSettingsCtxtDataListImmutable.items[2].disabled = this.cachedSpeed;
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "Lighting":
                this._LightingCtxtDataListImmutable.items[0].disabled = this.cachedSpeed;
                this._LightingCtxtDataListImmutable.items[1].disabled = this.cachedSpeed;
                this._LightingCtxtDataListImmutable.items[4].disabled = this.cachedSpeed;
                this._LightingCtxtDataListImmutable.items[5].disabled = this.cachedSpeed;
                this._LightingCtxtDataListImmutable.items[6].disabled = this.cachedSpeed;
                this._LightingCtxtDataListImmutable.items[7].disabled = this.cachedSpeed;
                this._LightingCtxtDataListImmutable.items[8].disabled = this.cachedSpeed;
                this.populateListCtrl(this._currentContextTemplate); 
                break;
            case "DoorLock":
                this._DoorLockCtxtDataListImmutable.items[0].disabled = this.cachedSpeed; 
                this._DoorLockCtxtDataListImmutable.items[1].disabled = this.cachedSpeed;
                this._DoorLockCtxtDataListImmutable.items[2].disabled = this.cachedSpeed; 
                this._DoorLockCtxtDataListImmutable.items[3].disabled = this.cachedSpeed;
                this._DoorLockCtxtDataListImmutable.items[4].disabled = this.cachedSpeed; 
                this._DoorLockCtxtDataListImmutable.items[5].disabled = this.cachedSpeed;
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "DoorLockMode":
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "KeylessLockBeepVol":
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "DoorRelockTime":
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "UnlockMode" : 
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "HeadlightOffTimer" : 
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "IntLightTimeoutDoorOpen" : 
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "IntLightTimeoutDoorClosed" : 
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "AutoHeadlightOn" : 
                this.populateListCtrl(this._currentContextTemplate);
                break;
            case "IntLightingBrightness" :
            this.populateListCtrl(this._currentContextTemplate);
                break;
            case "SpeedAlarm" :
            this.populateListCtrl(this._currentContextTemplate);
                break;
			case "Camera360View" :
				this.populateListCtrl(this._currentContextTemplate);
                break;
            
            case "DoorLockReset" :
            case "DoorLockResetError" : 
            case "TurnReset" : 
            case "TurnResetError" :     
            case "LightingReset" : 
            case "LightingResetError" : 
                this._populateDialogCtrl(this._currentContextTemplate);
                break;
            case "CHLT" : 
                var listLength = this._currentContextTemplate.list2Ctrl.dataList.items.length;
                if(this.cachedSpeed)
                {
                    for (var i = 0; i < listLength; i++)
                    {
                        this._currentContextTemplate.list2Ctrl.dataList.items[i].disabled = true;
                    }
                }
                else
                {
                    for (var i = 0; i < listLength; i++)
                    {
                        this._currentContextTemplate.list2Ctrl.dataList.items[i].disabled = false;
                    }
                }
                this._currentContextTemplate.list2Ctrl.updateItems(0,this._currentContextTemplate.list2Ctrl.dataList.itemCount - 1); 
                break;
            default:
                log.debug("no case found");
                break;
        }  
    }
};
 
vehsettingsApp.prototype._CANStatusMsgHandler = function(msg)
{  
    if (msg && msg.params.payload)
    {
        //store the ignition status to framework
        if (msg.params.payload.evData === 0)
        {
            framework.setSharedData(this.uiaId, "CanStatus", false);
            this._CANStatus = false;
        }
        else if (msg.params.payload.evData === 1)
        {
            framework.setSharedData(this.uiaId, "CanStatus", true);
            this._CANStatus = true;
        }    
    }
    
    if (this._currentContext && this._currentContextTemplate) 
    {
            if (this._currentContext.ctxtId === "VehicleSettingsTab" || 
                this._currentContext.ctxtId === "SafetyTab" || 
                this._currentContext.ctxtId === "DRSS" || 
                this._currentContext.ctxtId === "FOW" || 
                this._currentContext.ctxtId === "LDWS" || 
                this._currentContext.ctxtId === "RVMVolume" || 
                this._currentContext.ctxtId === "BSMVolume" || 
                this._currentContext.ctxtId === "SBS_SCBS" || 
                this._currentContext.ctxtId === "SBS" || 
                this._currentContext.ctxtId === "KeylessLockBeepVol" || 
                this._currentContext.ctxtId === "DoorLockMode" || 
                this._currentContext.ctxtId === "DoorLock" || 
                this._currentContext.ctxtId === "IntLightTimeoutDoorOpen" || 
                this._currentContext.ctxtId === "IntLightTimeoutDoorClosed" || 
                this._currentContext.ctxtId === "AutoHeadlightOn" || 
                this._currentContext.ctxtId === "HeadlightOffTimer" || 
                this._currentContext.ctxtId === "DoorRelockTime" || 
                this._currentContext.ctxtId === "UnlockMode" || 
                this._currentContext.ctxtId === "TurnSettings" || 
                this._currentContext.ctxtId === "Lighting" ||
                this._currentContext.ctxtId === "SLI" ||
                this._currentContext.ctxtId === "SLSign" ||
                this._currentContext.ctxtId === "SLCaution" ||
                this._currentContext.ctxtId === "CautionSpeed" ||
                this._currentContext.ctxtId === "SpeedAlarm" ||
                this._currentContext.ctxtId === "IntLightingBrightness")
            {
                //var topItem = this._currentContextTemplate.list2Ctrl.topItem; // Save position 
                //this._currentContextTemplate.list2Ctrl.hideFocus();
                this.populateListCtrl(this._currentContextTemplate);
                //this._currentContextTemplate.list2Ctrl.restoreFocus(); // Restore the focus
                //this._currentContextTemplate.list2Ctrl.topItem = topItem; // Restore position 
            }
        }
};
vehsettingsApp.prototype._HudTypeMsgHandler = function(msg)
{  
  log.info("_HudTypeMsgHandler : " + msg.params.payload.evData);
 
  if (msg && msg.params.payload)
    {
        //store the ignition status to framework
        if (msg.params.payload.evData === "CHUD_mono")
        {
            this._HudType = "CHUD_mono";
        }
        else if (msg.params.payload.evData === "CHUD_color")
        {
            this._HudType = "CHUD_color";
        }    
	    else if (msg.params.payload.evData === "WHUD_color")
        {
            this._HudType = "WHUD_color";
        }  
		else
		{
			//currently do nothing
		}
		
	}
    log.info("After assignment _HudTypeMsgHandler : " + this._HudType);  
	
}
vehsettingsApp.prototype._TSRStatusMsgHandler = function(msg)
{  
  log.info("_TSRStatusMsgHandler : " + msg.params.payload.evData);
  if (msg && msg.params.payload)
    {
        //store the ignition status to framework
        if (msg.params.payload.evData === "TSR_Disabled")
        {
            this._TSRStatus = "TSR_Disabled";
        }
        else if (msg.params.payload.evData === "TSR_Enabled")
        {
            this._TSRStatus = "TSR_Enabled";
        }    
		else
		{
			//currently do nothing
		}
		
        //following code chnages are implemented to replace SLI with TSR when TSRStatus msg is received on safetyTab
		if (this._currentContext && this._currentContextTemplate) 
		{
			if( this._currentContext.ctxtId ==="SafetyTab")
			{
				this.populateListCtrl(this._currentContextTemplate);
			}		
		} 
		
	}
    log.info("After assignment _TSRStatusMsgHandler : " + this._TSRStatus);  	
}
vehsettingsApp.prototype._NAVIEquippedMsgHandler = function(msg)
{
	if(msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
	{
		this._cachedSDcardStatus = msg.params.payload.evData;
		
		if (this._currentContext && this._currentContextTemplate) 
		{
			if(this._currentContext.ctxtId === "HUDTab" || this._currentContext.ctxtId === "HUDDisplayInformation" 
                || this._currentContext.ctxtId === "HUDDisplayInformationJ36" || this._currentContext.ctxtId ==="SafetyTab")
			{
				this.populateListCtrl(this._currentContextTemplate);
			}		
		}
	}
}

vehsettingsApp.prototype._HudInstalledStatusHandler = function()
{
    if (this._HUDInstalledStatus == true)
    {
        var region = framework.localize.getRegion();
        if(framework.getSharedData("syssettings","VehicleType") === "SETTINGS_VehicleModelType_J78A")
        {
            this._contextTable.VehicleSettingsTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigJ78A;  
            this._contextTable.HUDTabJ78.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigJ78A;            
            this._contextTable.SafetyTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigJ78A;  
                
            this._contextTable.HUDTabJ78.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 0;  
            this._contextTable.VehicleSettingsTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 5;  
            this._contextTable.SafetyTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 2;    
        }
        else
        {
            this._contextTable.VehicleSettingsTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfig;  
            this._contextTable.HUDTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfig;  
            this._contextTable.SafetyTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfig;  
            
            this._contextTable.HUDTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 0;    
            this._contextTable.VehicleSettingsTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 5;  
            this._contextTable.SafetyTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 2;    
        }          
    }
    else
    {
        this._contextTable.VehicleSettingsTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigNoHUD;  
        this._contextTable.SafetyTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigNoHUD;    
        
        this._contextTable.VehicleSettingsTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 4;   
        this._contextTable.SafetyTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 1; 
    }    
};

vehsettingsApp.prototype._SteeringWheelLocHandler = function(msg)
{
    if (msg && msg.params && msg.params.payload && msg.params.payload.evData != null && msg.params.payload.evData != undefined)
    {
        log.info("SteeringWheelLocation : " + msg.params.payload.evData);
        framework.setSharedData(this.uiaId,"SteeringWheelLoc",msg.params.payload.evData);
    }
}


//Tell framework this .js file has finished loading
framework.registerAppLoaded("vehsettings", null, true);

