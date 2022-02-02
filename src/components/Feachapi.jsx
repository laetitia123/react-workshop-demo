import React, { useEffect, useState } from "react";


import axios from "axios";

export default function FetchApi() {
  const [products, setProducts] = useState([]);
  const [title,setTitle] =useState("")
  const [description,setDescription] =useState("")
  const [price,setPrice] =useState(" ")
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get("https://fakestoreapi.com/products/");
      console.log("data", response);
      setProducts(response.data);
    
      setTitle(response.data.title);
      setDescription(response.data.description);
      setPrice(response.data.price);
      
    };
   
    fetchProduct();
  }, []);


  const handleUpdate = async () => {
    
    try {
  
      await axios.patch(`https://fakestoreapi.com/products/${products._id}`, {

        title,
        description,
        price,
      });
      setUpdateMode(false)
    } catch (err) {
      console.log(err)
    }
  };
  const deleteProduct = () => {

    // DELETE request using fetch with error handling

    axios
      .delete(`https://fakestoreapi.com/products/${products._id}`, { method: "DELETE" })

      .then((response) => {

        console.log(response);
        alert(" confirm delete product")

      }).catch((error) => {

        console.log("There was an error!", error);

      });


  };

   
  
  return (
    <div className="product-card">
      {products.map((product) => (
        <div>
             {updateMode ? (
                 <p
                     value={title}
                     autoFocus
                     onChange={(e) => setTitle(e.target.value)}
                   />
             ) :(
                 <div >
          {/* Title: <p{product.title}/> */}
          </div>
             )}
            
          <img src={product.image} />
          Category:<p>{product.category}</p>
          Price:<p>{product.price}</p>
          Decription:<p>{product.description}</p>
          Rating:<p>{product.rating.rate}</p>
          {/* <button onClick={handleDelete}>Delete</button> */}
          <button onclick={handleUpdate }>Update</button>
          <button type="button" onClick={() => deleteProduct()}>
              delete
            </button>
         
        </div>
      ))}
      
    </div>
  );
}
