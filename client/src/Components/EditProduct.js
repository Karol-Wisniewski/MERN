import axios from 'axios';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import "../Style/AppStyle.scss";

const EditProduct = () => {

    const [product, setProduct] = useState({});

    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const params = useParams();

    const id = params.id;

    const getProductById = async () => {
        return axios.get(`http://localhost:5000/products/${id}`)
        .then(res => {
            console.log("EDITED PRODUCT:")
            console.log(res.data)
            return res.data;
        })
        .catch(err => console.log(err))
    };

    useEffect(() => {
        getProductById().then(data => setProduct(data));
    }, []);

    return (
        <div className="AddProduct">
            <h2>Edit product</h2>
            <Formik
                initialValues={
                    {
                        name: '',
                        price: '',
                        description: '',
                        amount: '',
                        size: '',
                    }
                }
                onSubmit={async (values, { resetForm }) => {
                        await axios.put(`http://localhost:5000/products/${id}`, 
                        {
                            name: values.name ? values.name : product.name,
                            price: values.price ? values.price : product.price,
                            description: values.description ? values.description : product.description,
                            size: values.size ? values.size : product.size,
                            amount: values.amount ? values.amount : product.amount,
                        })
                        .then((res) => {
                            console.log(res);
                            getProductById().then(data => setProduct(data));
                            resetForm();
                            setMsg("Updated product successfully!");
                        })
                        .catch((err) => {
                            console.log(err);
                            setMsg("Something went wrong...");
                        })
                    }
                }
                >
                <Form className="form">
                    <label>Name</label>
                    <Field name="name" className="field" placeholder={product.name}/>
                    <label>Price</label>
                    <Field name="price" type="number" className="field" placeholder={product.price}/>
                    <label>Description</label>
                    <Field name="description" className="field" placeholder={product.description}/>
                    <label>Size</label>
                    <Field name="size" type="number" className="field" placeholder={product.size}/>
                    <label>Amount</label>
                    <Field name="amount" type="number"className="field" placeholder={product.amount}/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <button onClick={() => navigate(-1)}>Go back</button>
            <p>{msg}</p>
        </div>
    );
}

export default EditProduct;
