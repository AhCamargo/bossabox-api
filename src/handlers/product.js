import ProductRepository from '../repositories/product';

const transformerProduct = product => ({
  type: 'products',
  id: product.id,
  attributes: {
    name: product.name,
    price: product.price,
  },
  link: {
    self: `/api/v1/products/${product.id}`
  }
});

const getAll = async () => {
  const products = await ProductRepository.getAll();
  return { data: products.map(transformerProduct) };
}

const find = async (req) => {
 const { id } = req.params; 
 const products = await ProductRepository.find(id);
 
 return { data: transformerProduct(products) };
}

const save = async (req, h) => {
  const product = await ProductRepository.save(req.payload);
  
  return h.response(transformerProduct(product)).code(201);
}

const update = async (req) => {
 const { id } = req.params;
 const { payload } = req;
 
 return await ProductRepository.update(id, payload); 
}

const remove = async (req, h) => {
 const result = await ProductRepository.remove(req.params.id);

 return h.response(result).code(200);
};

module.exports = {
  getAll,
  find,
  save,
  update,
  remove
};