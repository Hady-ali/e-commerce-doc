import { useLoaderData } from 'react-router-dom'
import "./CSS/Products.css"
import { addToCart } from '../../redux/SapSlice';
import { useDispatch } from 'react-redux';

const Products = () => {

  const data = useLoaderData();
  const products = data.data;
  console.log(products);
  const dispatch = useDispatch()
  

  return (
    <>
      <div className='products-container'>
        {products.map((item)=>{
        return <div className='product-card' key={item.id}>
          <img src={item.image} alt={item.title} />
          <div className='product-info'>
            <p className='title'>{item.title.substring(0,50)}</p>
            <p className='description' title={item.description}>{item.description.substring(0,80)}...</p>
            <div className="flex">
              <p className='price'>${item.price}</p>
            </div>
            <p className='category'>{item.category}</p>
            <div className="category flex">
              <p>({item.rating.count} reviews)</p>
            </div>
            <button onClick={()=>{dispatch(addToCart({
              id: item.id ,
              img: item.image,
              price: item.price,
              categ: item.category,
              title: item.title,
              dec: item.description,
              quantity: 1,
            }))}} className='add-to-card-button'>Add to Cart</button>
          </div>
        </div>
        })}
    </div>
    </>
  )
}

export default Products;





