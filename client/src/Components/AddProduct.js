import axios from 'axios';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import { useNavigate } from 'react-router';
import "../Style/AppStyle.scss";
import Products from './Products';

const AddProduct = () => {

    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    return (
        <div className="AddProduct">
            <h2>Add product</h2>
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
                        await axios.post("https://express-mongo-gveo.onrender.com/products", values)
                        .then((res) => {
                            console.log(res);
                            resetForm();
                            setMsg("Added product successfully!");
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
                    <Field name="name" className="field" required/>
                    <label>Price</label>
                    <Field name="price" type="number" className="field" required/>
                    <label>Description</label>
                    <Field name="description" className="field" required/>
                    <label>Size</label>
                    <Field name="size" type="number" className="field" required/>
                    <label>Amount</label>
                    <Field name="amount" type="number"className="field" required/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <button onClick={() => navigate(-1)}>Go back</button>
            <p>{msg}</p>
        </div>
    );
}

export default AddProduct;
