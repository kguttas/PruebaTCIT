let webConfig = {};

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    webConfig.urlBaseAPI = "http://localhost:8080";
    console.log("DEVELOPMENT");

} else {
    // production code
    webConfig.urlBaseAPI = "http://localhost:8080";
    console.log("PRODUCTION");
}

export default webConfig
