var obj = {
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
};

var parser = new JSON();
var str = parser.encode(obj);

gs.addInfoMessage("The object"  + str);
