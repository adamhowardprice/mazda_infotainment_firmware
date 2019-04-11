/*
 Copyright 2012 by Johnson Controls
 __________________________________________________________________________

 Filename: vsmTmplt.js
 __________________________________________________________________________

 Project: JCI-IHU
 Language: EN
 Author: apeter9
 Date: 1-08-2013
 __________________________________________________________________________

 Description: IHU GUI vsmCtrl template

 Revisions:
 v0.1 (01-10-2013)  Initial development (apeter9)
__________________________________________________________________________

 */

log.addSrcFile("vsmTmplt.js", "common");

// vsmTmplt constructor
function vsmTmplt(uiaId, parentDiv, templateId, controlProperties)
{    
    this.divElt = null;
    this.vsmCtrl = null;
    this.templateName = "vsmTmplt";
    
    this.onScreenClass = "TemplateWithStatusLeft";
    this.offScreenLeftClass = "TemplateWithStatus-OffscreenLeft";
    this.offScreenRightClass = "TemplateWithStatus-OffscreenRight";

    log.debug("  templateId in vsmTmplt constructor: " + templateId);

    //@formatter:off
    //set the template properties
    this.properties = {
    	"statusBarVisible" : true,
    	"leftButtonVisible" : true,
		"rightChromeVisible" : true,
    	"hasActivePanel" : false,
    	"isDialog" : false,
    	"customBgImage" : null,
    }
    //@formatter:on

    // create the div for template
    this.divElt = document.createElement('div');
    this.divElt.id = templateId;
    this.divElt.className = "TemplateWithStatusLeft";
	
    parentDiv.appendChild(this.divElt);

    var vsmProperties = controlProperties['vsmCtrl'];
    
    this.vsmCtrl = framework.instantiateControl(uiaId, this.divElt,
                                                            "vsmCtrl",
                                                            vsmProperties);
}

/*
 * ===============================
 * Standard Template API functions
 * ===============================
 */

/* (internal - called by the framework)
 * Handles multicontroller events.
 * @param	eventID	(string) any of the â€œInternal event nameâ€? values in IHU_GUI_MulticontrollerSimulation.docx (e.g. 'cw',
 * 'ccw', 'select')
 */
vsmTmplt.prototype.handleControllerEvent = function(eventID)
{
    // Route the event to the focused control
    if(this.vsmCtrl)
    {
        // Route the event to the focused control
        var response = this.vsmCtrl.handleControllerEvent(eventID);
        return response;
    }
}





vsmTmplt.prototype.restoreContext = function(templateContextCapture)
{
    log.debug("vsmTmplt: restoreContext() ", templateContextCapture);
    this.vsmCtrl.restoreContext(templateContextCapture);
}

/*
 * Called by the app during templateNoLongerDisplayed. Used to perform garbage collection procedures on the template and
 * its controls.
 */
vsmTmplt.prototype.cleanUp = function()
{
    this.vsmCtrl.cleanUp();
}

framework.registerTmpltLoaded("vsmTmplt", ["apps/vsm/controls/vsm", "common/controls/Button"]);
