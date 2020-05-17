try {
    var restMessage = new sn_ws.RESTMessageV2();
    restMessage.setHttpMethod("GET");
    restMessage.setEndpoint("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHnApG-d0uXm8sImwYkY6jp75P8Uy8i2k");
    restMessage.setRequestBody(JSON.stringify({"requests":[
    {
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
));
    var response = restMessage.execute();
    if (response.getStatusCode() === 200) {
        var responseBody = response.getBody();
        var responeData = JSON.parse(responseBody);
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

//-------------------------------------------------------------------------------------------------
var obj = { "requests":[
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
var parser = new JSON();
var str = parser.encode(obj);

gs.addInfoMessage("The object"  + str);


//------------------------------------------------------------------------------------------------
var requestBody;
var responseBody;
var status;
var sm;
try{
	sm = new sn_ws.RESTMessageV2("Yahoo Finance", "get");  // Might throw exception if message doesn't exist or not visible due to scope.
	sm.setBasicAuth("admin","admin");
	sm.setStringParameter("symbol", "NOW");
	sm.setStringParameterNoEscape("xml_data","<data>test</data>");
	sm.setHttpTimeout(10000); //In milliseconds. Wait at most 10 seconds for response from http request.

	response = sm.execute();//Might throw exception if http connection timed out or some issue with sending request itself because of encryption/decryption of password.
	responseBody = response.haveError() ? response.getErrorMessage() : response.getBody();
	status = response.getStatusCode();
} catch(ex) {
	responseBody = ex.getMessage();
	status = '500';
} finally {
	requestBody = sm ? sm.getRequestBody():null;
}
gs.info("Request Body: " + requestBody);
gs.info("Response: " + responseBody);
gs.info("HTTP Status: " + status);
