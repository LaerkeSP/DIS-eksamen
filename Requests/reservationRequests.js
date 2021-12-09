const axios = require('axios').default;

// getting around self assigned verification
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// setting timer to insure servers running before requesting
setTimeout(function() {
    // letting all the requests run parallel 
    axios.all([
        // get request that finds specific reservation
        axios.get('https://localhost:3000/reservation/b6367e4a-08b2-4925-aafe-acd708ba0ede', {
        }),
        // post request that includes the data in the body
        axios.post('https://localhost:3000/reservation', {
            clientID: "926b0758-0a90-43df-ae1b-060ccddbd845",
            date: "31/12/21",
            hotelName: "hotel new year",
            price: 2022,
            balance: 0
        }),
        // delete request that deletes specific reservation
        axios.delete('https://localhost:3000/reservation/6a28795e-2827-4f87-ac02-123d441d9b57', {
        }),
        // patch request that patches a specific reservation and includes the changes in the body
        axios.patch('https://localhost:3000/reservation/b6367e4a-08b2-4925-aafe-acd708ba0ede', {
            clientID: "733507e2-6c96-4222-9fa3-0245b68cc044",
            date: "30/9/21",
            hotelName: "hotel basalona",
            price: 14000,
            balance: 1000
        }),
        // get request for all reservations
        axios.get('https://localhost:3000/reservation', {
        })
    ]).then(axios.spread(function (response) {
        })).catch(function (error) {
            // logging the error message
            console.log(error);
    });
}, 1000);