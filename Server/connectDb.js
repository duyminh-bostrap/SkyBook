/**
 * Create by DungTmc on 16/09/2021
 */

 const mongoose = require("mongoose");

 async function connect() {
   try {
     await mongoose.connect("mongodb+srv://grapshql:dung0401@cluster0.drhw6.mongodb.net/Cluster0?retryWrites=true&w=majority", {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     console.log("Connect successfully");
   } catch (e) {
     console.log(e);
   }
 }
//  async function connect() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/demographql", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connect successfully");
//   } catch (e) {
//     console.log(e);
//   }
// }
 
 module.exports = { connect }