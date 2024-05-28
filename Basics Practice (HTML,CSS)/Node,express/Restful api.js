// an object will have variables and methods 
// example
// let obj={
//     name:'usama',
//     age:20,
//     mass: function(age){
//         return age*3+20; 
//     }
// }

// console.log(obj.mass(30))    // here we are using the mass method of object obj
// similarly we use methods and variables of builtin objects provided by node

const http=require("http");     // import the http module

// Define the hostname and port number
const hostname = '127.0.0.1';
const port = 3000;

http.createServer(function(req,res){
        console.log(req.url);
        switch(req.url){
            case '/':
                res.write("<h1> Usama Bhatti </h1>");
                break;
            case '/blog':
                    res.write("<h1> Blogs </h1>");
                    break;
            case '/Reviews':
                res.write("<h1> reviews </h1>");
                break;
        }
        
        res.end;



} ).listen(8080);
