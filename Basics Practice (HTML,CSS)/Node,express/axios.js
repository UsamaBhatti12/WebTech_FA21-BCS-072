// install axios -->   npm install axios
// check version -->   npm ls axios

// Axios is a promise-based HTTP Client for node.js and the browser
// we use axios to properly handle data (handle errros and response)

const ax = require("axios");             // import axios module from axios library

ax.get("https://jsonplaceholder.typicode.com/users/10").then(response=>console.log("success: ", response.data)).catch(error=>console.log(error));  
                                                          
                            //using axious get method for the get request
                                                     // on succes we get the response object from axios and is passed as an arguement
                                        // we use reponse.data because on succcesful request, the response object returns 
                                        //not only data but status, code etc but need data from the response object therefore response.data

                                        // if the request encounters an error, it receives the error object as an argument. 