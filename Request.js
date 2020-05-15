var obj = {"requests":[
{
  "image":{
    "source":{
      "imageUri":
        "https://www.imgonline.com.ua/examples/text-photographed.jpg"
    }
  },
  "features":[
    {
      "type":"TEXT_DETECTION",
      "maxResults":1
    }
  ]
}
]};
var parser = new global.JSON();
var str = parser.encode(obj);
gs.info('The object '  + str);
try {
    var restMessage = new sn_ws.RESTMessageV2();
    restMessage.setHttpMethod("POST");
    restMessage.setEndpoint("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHnApG-d0uXm8sImwYkY6jp75P8Uy8i2k");
    restMessage.setBasicAuth("admin","admin");


    restMessage.setRequestBody(str);
    var response = restMessage.execute();
    if (response.getStatusCode() === 200) {
        var responseBody = response.getBody();
        //var responeData = JSON.parse(responseBody);
        gs.info("Good! " + responseBody);
        // process successful response
    } else if (response.getStatusCode() === 0) {
        // process connect timed out
    } else {
        // process error response
        var statusCode = response.getStatusCode();
        var erorMessage = response.getErrorMessage();
        var contentType = response.getHeader("Content-Type");
        var body = response.getBody();
        // ...
    }
} catch (ex) {
    // process exception
}
