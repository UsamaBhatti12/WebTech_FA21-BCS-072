console.log("usama Bhatti");
// just give the path in the environmental variable ( where the node is installed)
// all done run code using code runner extension 

let user={
    name:'Usama Bhatti', age:'21'
}

console.log(user.age);

let data=[1,5,100,30,55,200,105,10];
  data.sort(sortdata);   // the sort method will automatically loop through each element we just have to tell the logic in the function

function sortdata(a,b){
    if(a>b){
        return -1;
    }
    else{
        return 1;
    }
}
data.reverse();
console.log(data);

let array=['usama', 'bhatti', 'annas', 'shami'];

searched=array.find(searchfor);

function searchfor(element){
    if(element=='bhatti') { return true}
    else{ return false}
}
console.log(searched);

// map function
let rates=[2,6,10];

let newrates= rates.map(function(rate){
    return rate*2;
})
console.log(newrates)

// arrow function

let func= names => names;
