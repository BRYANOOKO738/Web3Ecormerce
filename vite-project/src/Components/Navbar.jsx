import React, { useState } from 'react'
import { Wallet, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { ethers } from 'ethers';

const Navbar = ({ account, setAccount }) => {

    const [searchQuery, setSearchQuery] = useState('')

    const handleConnect = async() => {
     try {
           // Request accounts from the user's Ethereum wallet
           const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
           
           // Get the first account and normalize it using ethers.js
           const account = ethers.utils.getAddress(accounts[0]);
           
           setAccount(account);
         } catch (error) {
           console.error("Error loading account:", error);
         }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 shadow">
                <div className="container">
                    <a className="navbar-brand fs-4 fw-bold text-white" href="#">
                        OokoStore
                    </a>

                    <button
                        className="navbar-toggler border-info"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">


                        {/* Search Form */}
                        <form className="d-flex w-50 mx-auto" onSubmit={handleSearch}>
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control form-control-lg bg-dark text-light border-info"
                                    placeholder="Search items, collections, and accounts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label="Search"
                                />
                                <button className="btn btn-info" type="submit">
                                    <Search className="h-5 w-5" />
                                </button>
                            </div>
                        </form>

                        {/* Right Side Items - Cart & Wallet */}
                        <div className="d-flex align-items-center gap-3">
                            {/* Cart Button */}
                            <button className="btn btn-outline-info position-relative">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    2
                                    <span className="visually-hidden">items in cart</span>
                                </span>
                            </button>

                            {/* Wallet Connection Button */}
                            {account ? (<button

                                className="btn  btn-success  d-flex align-items-center gap-2"
                            >
                                <Wallet className="h-5 w-5" />

                                <p>{account.slice(0, 6)}...{account.slice(-4)}</p>

                            </button>) : (<button
                                onClick={handleConnect}
                                className="btn btn-warning d-flex align-items-center gap-2"
                            >
                                <Wallet className="h-5 w-5" />


                                <p>Connect Wallet</p>
                            </button>)}

                        </div>
                    </div>
                </div>
            </nav>

            {/* Secondary Navigation Bar */}
            <nav className="navbar navbar-expand bg-dark-subtle navbar-dark py-2 shadow-sm">
                <div className="container">
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link text-dark fw-medium" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark fw-medium" href="#">
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark fw-medium" href="#">
                                    Categories
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark fw-medium" href="#">
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar