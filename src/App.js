import React, { useState, useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css'; // Import Materialize JavaScript
import Sidebar from './Sidebar'; // Import komponen Sidebar
import './sidebar.css';
import './style.css'; // Import file CSS untuk gaya tambahan

const DashboardComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Jumlah item per halaman, bisa disesuaikan

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dblc.lifeforcode.net/dashboardlc');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        M.AutoInit(); // Initialize Materialize components
    }, []);

    // Menghitung indeks data yang akan ditampilkan pada halaman ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Mengubah halaman
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="container">Loading...</div>;
    }

    if (error) {
        return <div className="container">There was an error: {error.message}</div>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar /> {/* Tambahkan komponen Sidebar */}
            <div className="main-content">
                <h2 className="center-align">Data from MySQL Table</h2>
                <div className="table-responsive">
                    <table className="highlight responsive-table">
                        <thead>
                            <tr>
                                <th>si_number</th>
                                <th>site_lc</th>
                                <th>armada_kategori</th>
                                <th>shippingline</th>
                                <th>jalur</th>
                                <th>type_armada</th>
                                <th>cbm</th>
                                <th>utilisasi</th>
                                <th>od</th>
                                <th>droppoint</th>
                                <th>totalcaseid</th>
                                <th>released</th>
                                <th>picked</th>
                                <th>stage</th>
                                <th>loaded</th>
                                <th>shipped</th>
                                <th>sistatus</th>
                                <th>typelc</th>
                                <th>typelc2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.si_number}</td>
                                    <td>{item.site_lc}</td>
                                    <td>{item.armada_kategori}</td>
                                    <td>{item.shippingline}</td>
                                    <td>{item.jalur}</td>
                                    <td>{item.type_armada}</td>
                                    <td>{item.cbm}</td>
                                    <td>{item.utilisasi}</td>
                                    <td>{item.od}</td>
                                    <td>{item.droppoint}</td>
                                    <td>{item.totalcaseid}</td>
                                    <td>{item.released}</td>
                                    <td>{item.picked}</td>
                                    <td>{item.stage}</td>
                                    <td>{item.loaded}</td>
                                    <td>{item.shipped}</td>
                                    <td>{item.sistatus}</td>
                                    <td>{item.typelc}</td>
                                    <td>{item.typelc2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={data.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

// Komponen Pagination
const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination center-align">
            {pageNumbers.map(number => (
                <li key={number} className={number === currentPage ? 'active' : 'waves-effect'}>
                    <a onClick={() => paginate(number)} href="#!">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default DashboardComponent;
