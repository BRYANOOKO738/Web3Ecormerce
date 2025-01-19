import React from 'react';
import { ethers } from 'ethers';
import Rating from './Rating';

const Section = ({ title, items, togglePop }) => {
    return (
        <div className="container py-5">
            <h2 id={title} className="text-center mb-4">{title}</h2>
            <hr className="mb-5" />

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 d-flex justify-content-center">
                {items.map((item, index) => (
                    <div key={index} className="col">
                        <div className="card h-100 shadow-sm border-0">
                            {/* Product Image */}
                            <img
                                src={item.image}
                                className="card-img-top p-3"
                                alt={item.name}
                                style={{ height: '180px', objectFit: 'contain' }}
                            />

                            {/* Product Details */}
                            <div className="card-body">
                                <h5 className="card-title text-truncate">{item.name}</h5>
                                <p className="card-text text-muted mb-2 text-truncate">{item.category}</p>

                                <Rating value={item.Rating} />

                                {/* Price & Stock */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <h6 className="fw-bold mb-0">
                                        {item?.cost ? ethers.utils.formatUnits(item.cost.toString(), 'ether') : '0'} ETH
                                    </h6>
                                    <small className={`text-${item.stock > 0 ? 'success' : 'danger'}`}>
                                        {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                                    </small>
                                </div>
                            </div>

                            {/* Buy Button */}
                            <div className="card-footer bg-white border-0">
                                <button
                                    className="btn btn-primary w-100"
                                    disabled={item.stock < 1}
                                    onClick={() => togglePop(item)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section;
