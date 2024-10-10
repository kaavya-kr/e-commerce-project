const mongoose = require('mongoose');

const Schema = mongoose.Schema; //this constructor allows construct a new schema

const productSchema = new Schema({
    title: {
        type:String,
        required:true // this is because  any one of the products must have that title mentioned above
    },
    price:{
        type: Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}); //here in {} we specify how our object look like


module.exports = mongoose.model('Product',productSchema);    //calling a model is imp for mongoose

// const mongodb=require('mongodb');
// const { use } = require('../routes/admin');
// const getDb = require('../util/database').getDb;

// class Product{
//     constructor(title,price,description,imageUrl, id, userId){
//         this.title =title;
//         this.price=price;
//         this.description=description;
//         this.imageUrl=imageUrl;
//         this._id= id ? new mongodb.ObjectId(id) : null;
//         this.userId=userId;
//     }
//     save() {
//         const db =getDb();
//         let dbOp;
//         if(this._id){
//             // update 
//             dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
//         }else{
//             dbOp =db.collection('products').insertOne(this);

//         }
        
//          return  dbOp
//         .then(result => {
//             console.log(result);
//         })
//         .catch(err => console.log(err));
//     }
//     static fetchAll() {
//         const db =getDb();
//         return db.collection('products').find().toArray()
//         .then(products => {
//             console.log(products);
//             return products;
//         })
//         .catch(err => console.log(err));
//     }

//     static findByPk(prodId){
//         const db = getDb();
//         return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
//         .then(product => {
//             console.log(product);
//             return product;
//         })
//         .catch(err => console.log(err));
//     }
//     static deleteById(prodId) {
//         const db = getDb();
//         return db
//           .collection('products')
//           .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//           .then(result => {
//             console.log('Deleted');
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       }
// }



// module.exports = Product;













// // const Product = sequelize.define('product', {
// //     id:{
// //         type: Sequelize.INTEGER,
// //         autoIncrement: true,
// //         allowNull:false,
// //         primaryKey:true
// //     },
// //     title:Sequelize.STRING,
// //     price:{
// //         type:Sequelize.DOUBLE,
// //         allowNull:false
// //     },
// //     imageUrl:{
// //         type:Sequelize.STRING,
// //         allowNull:false
// //     },
// //     description:{
// //         type:Sequelize.STRING,
// //         allowNull:false
// //     }
// // });