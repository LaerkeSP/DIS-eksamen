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
        axios.get('https://localhost:3000/reservation/b6367e4a-08b2-4925-aafe-acd708ba0ede', {
            agent: httpsAgent
        }),
        axios.post('https://localhost:3000/reservation', {
            agent: httpsAgent,
            clientID: "926b0758-0a90-43df-ae1b-060ccddbd845",
            date: "31/12/21",
            hotelName: "hotel new year",
            price: 2022,
            balance: 0
        }),
        axios.delete('https://localhost:3000/reservation/6a28795e-2827-4f87-ac02-123d441d9b57', {
            agent: httpsAgent
        }),
        axios.patch('https://localhost:3000/reservation/b6367e4a-08b2-4925-aafe-acd708ba0ede', {
            agent: httpsAgent,
            clientID: "733507e2-6c96-4222-9fa3-0245b68cc044",
            date: "30/9/21",
            hotelName: "hotel basalona",
            price: 14000,
            balance: 1000
        }),
        axios.get('https://localhost:3000/reservation', { 
            agent: httpsAgent 
        })
    ]).then(axios.spread(function (response) {
            // console.log(response);
        })).catch(function (error) {
            console.log(error);
    });
}, 1000);