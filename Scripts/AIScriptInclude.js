var GoogleAIRest = Class.create();
GoogleAIRest.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    base64Encode: function(attachID) {
        var gr = new GlideRecord('sys_attachment');
        gr.addQuery('table_sys_id', attachID);
        gr.query();
		var base64 = '';

        if (gr.next()) {
            var sa = new GlideSysAttachment();
            var binData = sa.getBytes(gr);
            base64 += GlideStringUtil.base64Encode(binData);
           // gs.info(base64);
		return (base64);
        }
    },

    requestJSON: function(b64image) {
        var obj = {
            "requests": [{
                "image": {
                    "content": b64image
                },
                "features": [{
                    "type": "TEXT_DETECTION"
                }]
            }]
        };

        var parser = new JSON();
        var str = parser.encode(obj);

        //gs.info("The object" + str);
		return(str);

    },
    type: 'GoogleAIRest'
});

//business rule
(function executeRule(current, previous /*null when async*/ ) {

    var currID = current.sys_id;
    gs.addInfoMessage(currID);

    var visionAI = new GoogleAIRest();
    var base64 = visionAI.base64Encode(currID);
    var reqBody = visionAI.requestJSON(base64);

	var gr = new GlideRecord('sys_auth_profile_basic');
	gr.addQuery('sys_id', '648c6e4adb50101018d02fb74896193e');
	gr.query();
	if (gr.next()){
		var username = gr.username;
		var password = gr.password;
	}

    try {
        var restMessage = new sn_ws.RESTMessageV2();
        restMessage.setHttpMethod("POST");
        restMessage.setEndpoint("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHnApG-d0uXm8sImwYkY6jp75P8Uy8i2k");
        restMessage.setBasicAuth(username, password);


        restMessage.setRequestBody(reqBody);
        var response = restMessage.execute();
        if (response.getStatusCode() === 200) {
            var responseBody = response.getBody();
            var responseData = JSON.parse(responseBody);
            //gs.addInfoMessage("Description  " + responseData.responses[0].fullTextAnnotation.text);
            //gs.addInfoMessage("Good! " + responseBody);
            // process successful response
			current.u_vision = responseData.responses[0].fullTextAnnotation.text;
			current.update();
        } else if (response.getStatusCode() === 0) {
            gs.addInfoMessage("Good! " + responseBody);
            // process connect timed out
        } else {
            // process error response
            var statusCode = response.getStatusCode();
            var erorMessage = response.getErrorMessage();
            var contentType = response.getHeader("Content-Type");
            var body = response.getBody();
            gs.addInfoMessage("NOT Good! " + body);
            // ...
        }
    } catch (ex) {
        // process exception
    }



})(current, previous);
