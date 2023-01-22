import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import "../Style/AppStyle.scss";

const Products = ({products, getProducts, setProducts}) => {

    const navigate = useNavigate();

    const deleteProduct = async (productId) => {
        try {
            const res = await axios.delete(`https://express-mongo-gveo.onrender.com/products/${productId}`);
            console.log(res);
            getProducts().then(data => setProducts(data.data));
        } catch (err) {
            console.log(err);
        }
    }

    return (
    <div className="Products">
        {
            products?.length > 0 && 
            Array.from(products).map(product => {
                return (
                    <div className="product-div" key={product._id}>
                        <p>{product.name}</p>
                        <p>{product.price} zł</p>
                        <p>{product.description}</p>
                        <p>Size: {product.size}</p>
                        <p>Amount: {product.amount}</p>
                        <div className="button-div">
                            <button onClick={() => navigate(`${product._id}/edit`)}>Edit</button>
                            <button onClick={() => navigate(`${product._id}/report`)}>Report</button>
                            <button onClick={() => deleteProduct(product._id)}>Delete</button>
                        </div>
                    </div>
                );
            })
        }
    </div>
    );
}

export default Products;
