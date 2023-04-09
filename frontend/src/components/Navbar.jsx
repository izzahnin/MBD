
import React from "react";
import { Link } from "react-router-dom";
import Styles from "./styles/Navbar.module.css";
import { MdOutlineShoppingCart } from "react-icons/md";

function Navbar() {
  return (
    <header>
      <nav className={Styles.navbar}>
        <div className={Styles.logo}>
          {/* <GiFragrance className="logo-icon" /> */}
          <h1>
            Your<span className={Styles.navy}>Brand</span>
          </h1>
        </div>
        <ul className={Styles.navi_list}>
          <li className={Styles.nav_item}>
            <Link to="/" className={Styles.nav_links}>
              Home
            </Link>
          </li>
          <li className={Styles.nav_item}>
            <Link to="/products" className={Styles.nav_links}>
              Products
            </Link>
          </li>
          <li className={Styles.nav_item}>
            <Link to="/aboutus" className={Styles.nav_links}>
              About us
            </Link>
          </li>
          <li className={Styles.nav_item}>
            <Link to="/contactus" className={Styles.nav_links}>
              Contact us
            </Link>
          </li>
        </ul>

        <div className={Styles.btns}>
          <button className={Styles}>
            <MdOutlineShoppingCart />
          </button>
          <button className={Styles}>Account</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

/* <nav className="bg-tosca flex flex-row ">
        <div className="flex flex-row text-black justify-between">
          <Link to="/" className="navbar-logo">
            <GiFragrance /> Wangi
          </Link>
          <ul className="flex flex-row gap-4">
            <li className="flex-row">
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li className="">
              <Link to="/services" className="">
                Services
              </Link>
            </li>
            <li className="">
              <Link to="/products" className="">
                Products
              </Link>
            </li>
            <li className="">
              <Link to="/sign-up" className="">
                Sign Up
              </Link>
            </li>
          </ul>
          <Button buttonStyle="btn--outline">SIGN UP</Button>
        </div>
      </nav> */
