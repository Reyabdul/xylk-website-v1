import React, { useEffect, useState } from "react";
import Client from "shopify-buy";
import Checkout from "./Cart";
import Product from "./Product";

//ACCESSING SHOPIFY
const SHOPIFY_KEY = process.env.REACT_APP_SHOPIFY_KEY;

const client = Client.buildClient({
    storefrontAccessToken: SHOPIFY_KEY,
    domain: "xylk.myshopify.com"
});

//globalizing 'productObj' from 'renderData'
let productObj;

//this is your new "modal" rendering function
const renderData = (product) => {
    //console.log(product)
    productObj = {
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "images": product.images, 
        "price": product.variants[0].price,
        "variants": product.variants[0].id 

    }

    return (
        <div>
            {productObj["id"]}
            {productObj["title"]}
            {productObj["description"]}
            {productObj["images"]}
            {productObj["price"]}
            {productObj["variantId"]}
        </div>
    )
}

//Creating Product List to show in homepage
const ProductList = () => {
    
    //Shopify 'product' data
    const [rawData, setRawData] = useState([]);

    //Modal 'open' state
    const [modalOpen, setModalOpen] = useState(false);

    //Fetch 'product' data from Shopify store
    const fetchAllProducts = () => {
        client.product.fetchAll().then((res) => {
            //console.log(res);
            setRawData(res);
        }).catch((error) => {
            console.log(error);
        })
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);


    //----- MODAL REFERENCE FROM STACK OVERFLOW
        //ref: https://stackoverflow.com/questions/67725086/how-do-i-use-react-modal-with-a-map-function

    return (

        <>
            <div className="container">
                {rawData.map((product, i) => (
                    
                    <div className='item' key={product.id}>
                        <img 
                               src={product.images[0].src} 
                               alt={product.title} 
                               style={{width: "100px"}} 
                               onClick={()=> {
                                   renderData(product);
                                   setModalOpen(true);
                               }
                             }
                           />
                    </div>
                ))}

                {/*Opens modal to display "Product" info*/}
                {modalOpen &&
                <Product setOpenModal={setModalOpen} productObj={productObj}>
                </Product> 
                }
                  
            </div>
        </>

    )    
}


export default ProductList;

    //this is code we will be needing in the future for project 2: it returns the collections that contain all project 2 products
    // const fetchCollections = () => {
    //     client.collection.fetchAllWithProducts().then((res) => {
    //         console.log(res);
    //     })
    // }
