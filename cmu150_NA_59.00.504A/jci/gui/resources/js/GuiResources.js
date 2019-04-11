/*
 Copyright 2013 by Johnson Controls
 __________________________________________________________________________

 Filename: GuiResources.js
 __________________________________________________________________________

 Project: JCI-IHU
 Language: EN
 Author: awoodhc
 Date: 09.20.2013
 __________________________________________________________________________

 Description: Manifest file which lists the App Dictionaries managed by
 GUI RESOURCES component.
 __________________________________________________________________________

 */

/*
 * Constructor
 */
function GuiResources()
{

}

/*
 * List of dictionary files managed in the GUI_RESOURCES Component.
 * Any Application whose dictionaries are managed by GUI_RESOURCES should
 * be added to this list.
 */
GuiResources.prototype.DICTIONARY_LIST = {
    "aharadio" : true,
    "amradio" : true,
    "audiosettings" : true,
    "auxin" : true,
    "backupparking" : true,
    "btaudio" : true,
    "btpairing" : true,
    "cd" : true,
    "common" : true,
    "contacts" : true,
    "dab": true,
    "diag" : true,
    "driverid" : true,
    "dvd" : true,
    "ecoenergy" : true,
    "email" : true,
    "emnavi" : true,
    "favorites" : true,
    "fmradio" : true,
    "hdtrafficimage" : true,
    "idm" : true,
    "mobile911" : true,
    "netmgmt": true,
    "pandora": true,
    "phone": true,
    "satradio": true,
    "schedmaint": true,
    "sms": true,
    "stitcher": true,
    "syssettings": true,
    "system": true,
    "sysupdate": true,
    "tutorial": true,
    "tv": true,
    "usbaudio": true,
    "vdt": true,
    "vehsettings": true,
    "warnguide": true,
    "carplay": true,
    "screenrep": false,
    "siri": true,
    "xmdata": true,
    "xmaudio": true,
    "vsm": true
};

/*
 * Lookup table for VR Examples managed in GUI_RESOURCES component.
 * Helps to organize the Title and Text for each Example Screen based on exampleId(s)
 */
GuiResources.prototype.VR_EXAMPLES = {
    "examplesId1" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_Address", 
        "textId3" : "VrExample_TuneTo", 
        "textId4" : "VrExample_GoToAudioSrc", 
        "textId5" : "VrExample_Help", 
    },
    "examplesId2" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_Address", 
        "textId3" : "VrExample_PlayArtist", 
        "textId4" : "VrExample_GoToAudioSrc", 
        "textId5" : "VrExample_Help", 
    },
    "examplesId3" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_Address", 
        "textId3" : "VrExample_ChannelNumber", 
        "textId4" : "VrExample_GoToAudioSrc", 
        "textId5" : "VrExample_Help", 
    },
    "examplesId4" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_TuneTo", 
        "textId4" : "VrExample_GoToAudioSrc", 
        "textId5" : "VrExample_Help", 
    },
    "examplesId5" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_PlayArtist", 
        "textId4" : "VrExample_GoToAudioSrc", 
        "textId5" : "VrExample_Help",
    },
    "examplesId6" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_ChannelNumber", 
        "textId4" : "VrExample_GoToAudioSrc", 
        "textId5" : "VrExample_Help", 
    },
    "examplesId7" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_Address",
        "textId2" : "VrExample_TakeMeHome", 
        "textId3" : "VrExample_FindNearestPOI", 
        "textId4" : "VrExample_CallTo", 
        "textId5" : "VrExample_GoToAudioSrc",
    },
    "examplesId8" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_Address",
        "textId2" : "VrExample_TakeMeHome", 
        "textId3" : "VrExample_FindNearestPOI", 
        "textId4" : "VrExample_CallTo", 
        "textId5" : "VrExample_GoToAudioSrc",
    },
    "examplesId9" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_Address",
        "textId2" : "VrExample_TakeMeHome", 
        "textId3" : "VrExample_FindNearestPOI", 
        "textId4" : "VrExample_CallTo", 
        "textId5" : "VrExample_GoToAudioSrc",
    },
    "examplesId10" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_Redial", 
        "textId4" : "VrExample_Callback", 
        "textId5" : "VrExample_TextMsg",
    },
    "examplesId11" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_Redial", 
        "textId4" : "VrExample_Callback", 
        "textId5" : "VrExample_TextMsg",
    },
    "examplesId12" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_Redial", 
        "textId4" : "VrExample_Callback", 
        "textId5" : "VrExample_TextMsg", 
    },
    "examplesId13" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_Redial", 
        "textId4" : "VrExample_Callback", 
        "textId5" : "VrExample_TextMsg",
    },
    "examplesId14" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_Redial", 
        "textId4" : "VrExample_Callback", 
        "textId5" : "VrExample_TextMsg",
    },
    "examplesId15" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_Redial", 
        "textId4" : "VrExample_Callback", 
        "textId5" : "VrExample_TextMsg",
    },
    "examplesId16" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_TuneTo",
        "textId2" : "VrExample_GoToAudioSrc", 
        "textId3" : "VrExample_CallTo", 
        "textId4" : "VrExample_Address", 
        "textId5" : "VrExample_Help",
    },
    "examplesId17" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_TuneTo",
        "textId2" : "VrExample_GoToAudioSrc", 
        "textId3" : "VrExample_CallTo", 
        "textId4" : "VrExample_DialNumber", 
        "textId5" : "VrExample_Help",
    },
    "examplesId18" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_PlayArtist",
        "textId2" : "VrExample_GoToAudioSrc", 
        "textId3" : "VrExample_CallTo", 
        "textId4" : "VrExample_Address", 
        "textId5" : "VrExample_Help", 
    },
    "examplesId19" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_PlayArtist",
        "textId2" : "VrExample_GoToAudioSrc", 
        "textId3" : "VrExample_CallTo", 
        "textId4" : "VrExample_DialNumber", 
        "textId5" : "VrExample_Help",
    },
    "examplesId20" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_ChannelNumber",
        "textId2" : "VrExample_GoToAudioSrc", 
        "textId3" : "VrExample_CallTo", 
        "textId4" : "VrExample_Address", 
        "textId5" : "VrExample_Help",
    },
    "examplesId21" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_ChannelNumber",
        "textId2" : "VrExample_GoToAudioSrc", 
        "textId3" : "VrExample_CallTo", 
        "textId4" : "VrExample_DialNumber", 
        "textId5" : "VrExample_Help" 
    },
    "examplesId22" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_Address", 
        "textId3" : "VrExample_TuneTo", 
        "textId4" : "VrExample_GoToAudioSrc", 
        "textId5" : "VrExample_Help", 
    },
     "examplesId23" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_Address",
        "textId2" : "VrExample_TakeMeHome", 
        "textId3" : "VrExample_FindNearestPOI", 
        "textId4" : "VrExample_CallTo", 
        "textId5" : "VrExample_GoToAudioSrc",
    },
     "examplesId24" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_Address",
        "textId2" : "VrExample_TakeMeHome", 
        "textId3" : "VrExample_FindNearestPOI", 
        "textId4" : "VrExample_CallTo", 
        "textId5" : "VrExample_GoToAudioSrc",
    },
     "examplesId25" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_Address",
        "textId2" : "VrExample_TakeMeHome", 
        "textId3" : "VrExample_FindNearestPOI", 
        "textId4" : "VrExample_CallTo", 
        "textId5" : "VrExample_GoToAudioSrc",
    },
     "examplesId26" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_Address",
        "textId2" : "VrExample_TakeMeHome", 
        "textId3" : "VrExample_FindNearestPOI", 
        "textId4" : "VrExample_CallTo", 
        "textId5" : "VrExample_GoToAudioSrc",
    },
     "examplesId27" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_Address",
        "textId2" : "VrExample_TakeMeHome", 
        "textId3" : "VrExample_FindNearestPOI", 
        "textId4" : "VrExample_CallTo", 
        "textId5" : "VrExample_GoToAudioSrc",
    },
    "examplesId28" : {
        "titleText" : "VrExample_Title",
        "textId1" : "VrExample_CallTo",
        "textId2" : "VrExample_DialNumber", 
        "textId3" : "VrExample_TuneTo", 
        "textId4" : "VrExample_GoToAudioSrc", 
        "textId5" : "VrExample_Help", 
    }
};

// Global object. This file needs to instantiate itself so that it is
// immediately accessable to other files that are loaded.
guiResources = new GuiResources();