var obj = {"requests":[
    {
      "image":{
        "content": "BASE64_ENCODED_DATA"
      },
      "features": [
        {
          "type":"LABEL_DETECTION",
          "maxResults":1
        }
      ]
    }
  ]};
var parser = new JSON();
var str = parser.encode(obj);

gs.addInfoMessage("The object"  + str);
