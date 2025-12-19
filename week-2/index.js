// const fs=require('fs');

// const data=fs.readFileSync('b.txt','utf8');
// console.log(data);

// class Rectangle{
//     constructor(width,height,color){
//         this.width=width;
//         this.height=height;
//         this.color=color;
//     }

//     calcArea(){
//         return this.width*this.height;
//     }   

//     paint(){
//         console.log(`Painting the rectangle with color: ${this.color}`);
//     }
// }

// const rect=new Rectangle(5,10,);
// console.log(rect.calcArea());
// rect.paint();

//setTimeout promise example

// function wait(ms){
//     return new Promise((resolve)=>{setTimeout(resolve, ms)});
// }

// function callback(){
//     console.log('Callback executed after delay');
// }

// wait(2000).then(callback);

//readfile promise example

// const fs=require('fs');
// function readfilePromisified(path,encoding){
//     return new Promise((resolve,reject)=>{
//         fs.readFile(path,encoding,(err,data)=>{
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(data);
//             }
//         });
//     });
// }
// readfilePromisified('b.txt','utf8')
// .then((data)=>{
//     console.log('File content:',data);
// })
// .catch((err)=>{
//     console.error('Error reading file:',err);
// });

//async await example

