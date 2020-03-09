import ProductModel from '../models/product';

const getAll = async () => await ProductModel.find({});

const find = async id => await ProductModel.findById(id);
 
const save = async payload => {
  const { name, price } = payload;
  const product = new ProductModel;
   product.name = name;
   product.price = price;

   await product.save();

  return product;
}

const update = async (id, payload) => {
 
 await ProductModel.updateOne({
   _id: id
 }, {
   $set: payload
 });

 return { message: 'Produto atualizado com sucesso!' }
}

const remove = async id => {
 
 await ProductModel.findOneAndDelete({
   _id: id,
 });

 return { message: `Id:${id} deletado com sucesso!` };
};

module.exports = {
  getAll,
  find,
  save,
  update,
  remove
};