try {
    var restMessage = new sn_ws.RESTMessageV2();
    restMessage.setHttpMethod("GET");
    restMessage.setEndpoint("https://google.co.in");
    restMessage.setRequestHeader("Accept", "application/json");
    restMessage.setRequestHeader("Content-Type", "application/json");
    restMessage.setRequestBody(JSON.stringify({short_description: "Test incident"}));
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
