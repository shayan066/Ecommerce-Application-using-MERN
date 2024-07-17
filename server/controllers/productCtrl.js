const Product = require('../models/productModel')

//Filter, sorting, & pagination

class APIfeatures{
  constructor(query,queryString){
    this.query = query;
    this.queryString = queryString;
  }

  filtering(){
    const queryObj = {...this.queryString}
    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach(el => delete(queryObj[el]))

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    this.query.find(JSON.parse(queryStr))
    return this
  }

  sorting(){
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(',').join('')
      this.query = this.query.sort(sortBy)
      console.log(sortBy)
    }
    else{
      this.query = this.query.sort('-createdAt')
    }

  }

  pagination(){

    const page = this.queryString.page * 1 || 1;

    const limit = this.queryString.limit * 1 || 9;

    const skip = (page-1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;

  }

}

const productCtrl = {
  getProduct: async(req,res) => {
    try{
      const features = new APIfeatures(Product.find(),req.query).filtering().sorting().pagination()
      const product = await features.query
      res.json({result:product.length})
    }
    catch(err){
      return res.status(500).json({msg:err.message})
    }
  },
  createProduct: async(req,res) => {
    try{
      const {product_Id, title, price, description, content, images, category} = req.body;

      if(!images) return res.status(400).json({msg:'No Image Upload'})

      const productss = await Product.findOne({product_Id})

      if(productss) return res.status(400).json({msg:'This Product is Already Exist'})
      
      const newProductss = new Product({
        product_Id,title: title.toLowerCase(), price, description, content, images, category
      })
      await newProductss.save()
      res.json({msg:' Product Created Successfully'})
    }
    catch(err){
      return res.status(500).json({msg:err.message})
    }
  },
  deleteProduct: async(req,res) => {
    try{
      await Product.findByIdAndDelete(req.params.id)
      res.json({msg:'Deleted a product Successfully'})
    }
    catch(err){
      return res.status(500).json({msg:err.message})
    }
  },
  updateProduct: async(req,res) => {
    try{
      const {product_Id, title, price, description, content, images, category} = req.body;

      if(!images) return res.status(400).json({msg:'No Images Upload'})
      
      await Product.findOneAndUpdate({_id:req.params.id},{
        title: title.toLowerCase(),price,description,content,images,category
      }) 
      res.json({msg:'Product Updated Successfully'})
    }
    catch(err){
      return res.status(500).json({msg:err.message})
    }
  }
}

module.exports = productCtrl

