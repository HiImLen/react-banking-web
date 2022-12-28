import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext.js';

export default function NavBar(props) {
    const nagivate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        nagivate('/login');
    }

    return (
        <div id="wrapper">
            <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
                <div className="container-fluid d-flex flex-column p-0"><a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink" /></div>
                    <div className="sidebar-brand-text mx-3"><span>N.E.W.S</span></div>
                </a>
                    <hr className="sidebar-divider my-0" />
                    <ul className="navbar-nav text-light" id="accordionSidebar">
                        <li className="nav-item"><a className="nav-link" href="index.html"><i className="fas fa-tachometer-alt" /><span>Dashboard</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="profile.html"><i className="fas fa-user" /><span>Profile</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="table.html"><i className="fas fa-table" /><span>Table</span></a></li>
                    </ul>
                </div>
            </nav>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                        <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars" /></button>
                            <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." /><button className="btn btn-primary py-0" type="button"><i className="fas fa-search" /></button></div>
                            </form>
                            <ul className="navbar-nav flex-nowrap ms-auto">
                                <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i className="fas fa-search" /></a>
                                    <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                        <form className="me-auto navbar-search w-100">
                                            <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                                <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search" /></button></div>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span className="badge bg-danger badge-counter">3+</span><i className="fas fa-bell fa-fw" /></a>
                                        <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                            <h6 className="dropdown-header">alerts center</h6><a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="me-3">
                                                    <div className="bg-primary icon-circle"><i className="fas fa-file-alt text-white" /></div>
                                                </div>
                                                <div><span className="small text-gray-500">December 12, 2019</span>
                                                    <p>A new monthly report is ready to download!</p>
                                                </div>
                                            </a><a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="me-3">
                                                    <div className="bg-success icon-circle"><i className="fas fa-donate text-white" /></div>
                                                </div>
                                                <div><span className="small text-gray-500">December 7, 2019</span>
                                                    <p>$290.29 has been deposited into your account!</p>
                                                </div>
                                            </a><a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="me-3">
                                                    <div className="bg-warning icon-circle"><i className="fas fa-exclamation-triangle text-white" /></div>
                                                </div>
                                                <div><span className="small text-gray-500">December 2, 2019</span>
                                                    <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                                                </div>
                                            </a><a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span className="badge bg-danger badge-counter">7</span><i className="fas fa-envelope fa-fw" /></a>
                                        <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                            <h6 className="dropdown-header">Inbox</h6><a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="fw-bold">
                                                    <div className="text-truncate"><span>Hi there! I am wondering if you can help me with a problem I've been having.</span></div>
                                                    <p className="small text-gray-500 mb-0">Emily Fowler - 58m</p>
                                                </div>
                                            </a><a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="fw-bold">
                                                    <div className="text-truncate"><span>I have the photos that you ordered last month!</span></div>
                                                    <p className="small text-gray-500 mb-0">Jae Chun - 1d</p>
                                                </div>
                                            </a><a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="fw-bold">
                                                    <div className="text-truncate"><span>Last month's report looks great, I am very happy with the progress so far, keep up the good work!</span></div>
                                                    <p className="small text-gray-500 mb-0">Morgan Alvarez - 2d</p>
                                                </div>
                                            </a><a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="fw-bold">
                                                    <div className="text-truncate"><span>Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</span></div>
                                                    <p className="small text-gray-500 mb-0">Chicken the Dog · 2w</p>
                                                </div>
                                            </a><a className="dropdown-item text-center small text-gray-500" href="#">Show All Inbox</a>
                                        </div>
                                    </div>
                                    <div className="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown" />
                                </li>
                                <div className="d-none d-sm-block topbar-divider" />
                                <li className="nav-item dropdown no-arrow">
                                    <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span className="d-none d-lg-inline me-2 text-gray-600 small">Valerie Luna</span></a>
                                        <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a className="dropdown-item" href="#"><i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />&nbsp;Profile</a><a className="dropdown-item" href="#"><i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />&nbsp;Settings</a><a className="dropdown-item" href="#"><i className="fas fa-list fa-sm fa-fw me-2 text-gray-400" />&nbsp;Activity log</a>
                                            <div className="dropdown-divider" /><a className="dropdown-item" onClick={handleLogout}><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />&nbsp;Logout</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>


                    <div className="container-fluid">
                        <h3 className="text-dark mb-1">Blank Page</h3>
                    </div>

                    
                </div>


                <footer className="bg-white sticky-footer">
                    <div className="container my-auto">
                        <div className="text-center my-auto copyright"><span>Copyright © N.E.W.S 2022</span></div>
                    </div>
                </footer>
            </div>
        </div>
    );
}