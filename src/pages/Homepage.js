import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Homepage() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-4">
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <p>{product.name}</p>
                    <div className="text-center">
                      <img
                        src={product.imageURL}
                        alt="product cover"
                        className="product-img"
                      />
                    </div>
                  </div>
                  <div className="product-actions">
                    <h2>{product.price} $</h2>
                    <div className="d-flex">
                      <button
                        className="mx-2"
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/productinfo/${product.id}`);
                        }}
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
