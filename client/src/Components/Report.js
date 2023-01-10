import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import "../Style/AppStyle.scss";

const Report = () => {

    const [reportData, setReportData] = useState({});

    const params = useParams();

    const id = params.id;

    const navigate = useNavigate();

    const getReportData = (id) => {
        return axios.get(`http://localhost:5000/products/${id}/report`)
        .then(res => {
            console.log("PRODUCT REPORT:")
            console.log(res.data[0])
            return res.data[0];
        })
        .catch(err => console.log(err))
    };

    useEffect(() => {
        getReportData(id).then(data => setReportData(data));
    }, [id])

    return (
    <div className="Report">
        <h3>Report</h3>
        <div>
            <p>{reportData.name}</p>
            <p>Amount: &nbsp;&nbsp;{reportData.amount}</p>
            <p>Price: &nbsp;&nbsp;{reportData.price} zł</p>
            <p>Total value: &nbsp;&nbsp;{reportData.value} zł</p>
        </div>
        <button onClick={() => navigate(-1)}>Go back</button>
    </div>
    );
}

export default Report;
