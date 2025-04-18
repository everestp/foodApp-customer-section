import React from "react";

import ProductDisplay from "../../components/ProductDisplay/ProductDisplay";
const Explore = () => {
  const [category,setCategory] = React.useState("All");
  const [searchText, setSearchText] = React.useState("");
  return (
   <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="input-group mb-3">
              <select
                className="form-select mt-2"
                onChange={(e)=>setCategory(e.target.value)}
                style={{ maxWidth: "150px" }}
              >
                <option value="Clothing">Clothing</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Smart Watch">Smart watch</option>
                <option value="Headphone">Headphone</option>
                <option value="Analog Watch">Analog watch</option>
              </select>
              <input type="text" className="form-control mt-2" placeholder="Search" onChange={(e)=>setSearchText(e.target.value)} value={searchText}/>
              <button className="btn btn-primary mt-2" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <ProductDisplay category={category} searchText={searchText} />
    </div>
   
   </>
  );
};

export default Explore;
