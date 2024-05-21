//  the jsonplaceholder is containing an array of objects

const data=require('./users.json');
// console.log(data)
console.log(data.length);
console.log('zipcode= '+data[0].address.zipcode)   // print zipcode which is in the  address of  the first user
// we can use like addrss.zipcode.first etc to dig deep

// lets find out the latitude  of user with id 3
console.log('latitude = '+data[2].address.geo.lat);

//searching

let citydata= data.find(citysearch)
// let citydata= data.find(citysearch)
// find the user object with the city = "Roscoeview"
function citysearch(user){
    if(user.address.city=="Roscoeview"){    // the finds method loops on each object (i give this object name user, you can give any name)
        return true                             // find method is for arrays , each object means each index from 0 till it finds the conditon
    }
    else{
        return false
    }
}
// arrow function
let usercity= data.find(user=> user.address.city=="Roscoeview");

// console.log(usercity)
console.log(citydata)   