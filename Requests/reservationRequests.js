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
            date: "1/1/22",
            hotelName: "hotel trivago",
            price: 4410,
            balance: 0
        }),
        // delete request that deletes specific reservation
        axios.delete('https://localhost:3000/reservation/04ee3f0b-52ae-48d8-9c9a-5174e41a0d9d', {
        }),
        // patch request that patches a specific reservation and includes the changes in the body
        axios.patch('https://localhost:3000/reservation/8ac64476-d2b2-4ab4-bcb9-951779fa7e81', {
            clientID: "733507e2-6c96-4222-9fa3-0245b68cc044",
            date: "30/9/21",
            hotelName: "hotel funhouse",
            price: 14000,
            balance: 23000
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