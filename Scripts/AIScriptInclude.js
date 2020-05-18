var GoogleAIRest = Class.create();
GoogleAIRest.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    base64Encode: function(attachID) {
        var gr = new GlideRecord('sys_attachment');
        gr.addQuery('sys_id', attachID);
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

	var currID = '';
	currID += current.sys_id;
	gs.addInfoMessage(currID);
    var base = new GoogleAIRest();
    var str = base.base64Encode(currID);
    var req = base.requestJSON(str);


    try {
        var restMessage = new sn_ws.RESTMessageV2();
        restMessage.setHttpMethod("POST");
        restMessage.setEndpoint("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHnApG-d0uXm8sImwYkY6jp75P8Uy8i2k");
        restMessage.setBasicAuth("", "");


        restMessage.setRequestBody(req);
        var response = restMessage.execute();
        if (response.getStatusCode() === 200) {
            var responseBody = response.getBody();
            var responseData = JSON.parse(responseBody);
			var text = responseData.description;
			gs.addInfoMessage("Description" + responseData);
            gs.addInfoMessage("Good! " + responseBody);
            // process successful response
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
