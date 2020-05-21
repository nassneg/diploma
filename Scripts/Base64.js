var attach = '98e56702db70101018d02fb748961906';
var gr = new GlideRecord('sys_attachment');
gr.addQuery ('sys_id',attach);
gr.query();

if(gr.next()){
  var sa = new GlideSysAttachment();
  var binData = sa.getBytes(gr);
  var base64 = GlideStringUtil.base64Encode(binData);
  gs.info(base64);
};




{
  "requests": [
    {
      "image": {
        "content": "base64-encoded-image"
      },
      "features": [
        {
          "type": "TEXT_DETECTION"
        }
      ]
    }
  ]
}
