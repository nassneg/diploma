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
