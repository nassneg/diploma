var GoogleAIRest = Class.create();
GoogleAIRest.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    base64Encode: function(attachID) {
        var AttachGR = new GlideRecord('sys_attachment');
        AttachGR.addQuery('table_sys_id', attachID);
        AttachGR.query();
        var base64 = '';

        if (AttachGR.next()) {
            var sysAttach = new GlideSysAttachment();
            var binData = sysAttach.getBytes(AttachGR);
            base64 += GlideStringUtil.base64Encode(binData);
            return (base64);
        }
    },

    requestJSON: function(b64Image) {
        var obj = {
            "requests": [{
                "image": {
                    "content": b64Image
                },
                "features": [{
                    "type": "TEXT_DETECTION"
                }]
            }]
        };

        var parser = new JSON();
        var request = parser.encode(obj);
        return (request);

    },

    type: 'GoogleAIRest'
});

//business rule
(function executeRule(current, previous /*null when async*/ ) {

    var visionAI = new GoogleAIRest();
    var base64 = visionAI.base64Encode(current.sys_id);
    var reqBody = visionAI.requestJSON(base64);

    var gr = new GlideRecord('sys_auth_profile_basic');
    gr.addQuery('sys_id', gs.getProperty('google.auth.credentials'));
    gr.query();
    if (gr.next()) {
        var username = gr.username;
        var password = gr.password;
    }

    try {
        var restMessage = new sn_ws.RESTMessageV2();
        restMessage.setHttpMethod("POST");
        restMessage.setEndpoint(gs.getProperty('google.auth.endpoint'));
        restMessage.setBasicAuth(username, password);


        restMessage.setRequestBody(reqBody);
        var response = restMessage.execute();

        if (response.getStatusCode() === 200) {
            var responseBody = response.getBody();
            var responseData = JSON.parse(responseBody);
            // process successful response
            current.u_vision = responseData.responses[0].fullTextAnnotation.text;
            current.update();
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
