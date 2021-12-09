const axios = require('axios').default;

// getting around self assigned verification
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


// setting timer to insure servers running before requesting
setTimeout(function() {
    // letting all the requests run parallel 
    axios.all([
        // get request that finds specific client
        axios.get('https://localhost:3000/client/e348d033-e6ee-4ec8-ba93-c52a3505e631', {
        }),
        // post request that includes the data in the body
        axios.post('https://localhost:3000/client', {
            firstName: "Allis",
            lastName: "Frederiksen",
            streetAddress: "Villavej",
            city: "Aalborg"
        }),
        // delete request that deletes specific client
        axios.delete('https://localhost:3000/client/ee84c2cb-238e-4e76-ac46-495842f26b4d', {
        }),
        // patch request that patches a specific client and includes the changes in the body
        axios.patch('https://localhost:3000/client/733507e2-6c96-4222-9fa3-0245b68cc044', {
            firstName: "Louise",
            lastName: "Hansen",
            streetAddress: "Frederiksberg",
            city: "Koebenhavn"
        }),
        // get request for all clients
        axios.get('https://localhost:3000/client', { 
        })
    ]).then(axios.spread(function (response) {
        })).catch(function (error) {
            // logging the error message
            console.log(error);
    });
}, 1000);