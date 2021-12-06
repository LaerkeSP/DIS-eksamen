const axios = require('axios').default;
const fs = require('fs');
const https = require('https');

// getting around self assigned verification
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let cert = fs.readFileSync('../Encryption/cert.pem');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: cert
}); 

setTimeout(function() {
    axios.all([
        axios.get('https://localhost:3000/client/e348d033-e6ee-4ec8-ba93-c52a3505e631', {
            agent: httpsAgent
        }),
        axios.post('https://localhost:3000/client', {
            agent: httpsAgent,
            firstName: "Allis",
            lastName: "Frederiksen",
            streetAddress: "Villavej",
            city: "Aalborg"
        }),
        axios.delete('https://localhost:3000/client/90f7657f-322d-4cb2-84ee-6f3c28aef71f', {
            agent: httpsAgent
        }),
        axios.patch('https://localhost:3000/client/733507e2-6c96-4222-9fa3-0245b68cc044', {
            agent: httpsAgent,
            firstName: "Louise",
            lastName: "Hansen",
            streetAddress: "Frederiksberg",
            city: "Koebenhavn"
        }),
        axios.get('https://localhost:3000/client', { 
            agent: httpsAgent 
        })
    ]).then(axios.spread(function (response) {
            // console.log(response);
        })).catch(function (error) {
            console.log(error);
    });
}, 1000);

