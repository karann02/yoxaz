import React, { useState } from 'react';
import './OrderDetails.css';
import orderData from './orderData.json';

const ITEMS_PER_PAGE = 10;

const OrderDetails = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    const handleCheckboxChange = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === orderData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(orderData.map((order) => order.id));
        }
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleDispatchSelected = () => {
        setSelectedStatus("Delivered");
        // Implement dispatch logic for delivered orders
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    // Filter orders based on selected status and search value
    const filteredOrders = orderData.filter((order) => {
        const isStatusMatch = selectedStatus === 'all' || order.status === selectedStatus;
        const isSearchMatch = order.customer.toLowerCase().includes(searchValue.toLowerCase());

        return isStatusMatch && isSearchMatch;
    });

    // Pagination logic for filtered orders
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container">
            <div className="mainheader">
                <h1>Orders</h1>
                <button className="createButton">Create New</button>
            </div>
            <div className="firstheader">
                <h2>What are you looking for? </h2>
                <div className="inline-dropdowns">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="&#128269; Search for Customer..."
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <select onChange={handleFilterChange}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        {/* Add more options if needed */}
                    </select>
                    <select id="ddlstatus" onChange={handleStatusChange}>
                        <option value="all">All Columns</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        {/* Add more options if needed */}
                    </select>
                    <button className="searchButton">Search</button>
                </div>
            </div>
            <div className="details-container">
                <div className="inline-dropdowns">
                    <div className="productsummary">
                        <h2>Product Summary</h2>
                    </div>
                    <select id="ddlstatus" onChange={handleStatusChange}>
                        <option value="all">All Columns</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        {/* Add more options if needed */}
                    </select>
                    <button className="dispatchselected" onClick={handleDispatchSelected}>
                        Dispatch Selected
                    </button>
                    <div className="pagination">
                        <button className="arrow" onClick={handlePrevPage}>
                            {'<'}
                        </button>
                        {Array.from({ length: Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={currentPage === index + 1 ? 'active-pagination' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button className="arrow" onClick={handleNextPage}>
                            {'>'}
                        </button>
                    </div>
                </div>

                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    // checked={selectedRows.length === currentOrders.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>ID</th>
                            <th>Shpify</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Shipping</th>
                            <th>Source</th>
                            <th>Order Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(order.id) || order.checkbox}
                                        onChange={() => handleCheckboxChange(order.id)}
                                    />
                                </td>
                                <td>{order.id}</td>
                                <td>{order.shpify}</td>
                                <td>{order.date}</td>
                                <td>{order.status}</td>
                                <td>{order.customer}</td>
                                <td>{order.email}</td>
                                <td>{order.country}</td>
                                <td>{order.shipping}</td>
                                <td>{order.source}</td>
                                <td>{order.orderType}</td>
                                <td>
                                    <button>
                                        <span role="img" aria-label="Edit">
                                            &#9998;
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;
