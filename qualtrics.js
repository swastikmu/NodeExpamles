const express = require('express');
const app = express();
const path = require('path');
const parentFolderPath = path.resolve(__dirname, '..');
app.use(express.static(path.join(parentFolderPath,'mockui', 'webapp')));
// server response
app.get('/test', function (req, res) {  
    res.send('test called');
});
app.get('/test12', (req, res)=>res.redirect('https://my300532-api.s4hana.ondemand.com:443/s4hanacloud/sap/opu/odata/sap/API_SERVICE_ENTRY_SHEET_SRV'));


// start the server
app.listen(8080, function () { // env variable PORT is set by Cloud Foundry
    console.log('Proxy Server for UI5 started at 8080. Serving static file: mockui/webapp/index.html. Invoke with localhost:8080');
});
