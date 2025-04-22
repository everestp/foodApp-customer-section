import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { addFood } from "../../service/foodService";
import { assets } from "../../assets/assets";

const AddFood = () => {
  const [image, setImage] = React.useState(null);
  const [data, setData] = React.useState({
    name: "",
    description: "",
    category: "Electronic",
    price: "",
  });

  const onChangeHandler = (events) => {
    const name = events.target.name;
    const value = events.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please upload an image!");
      return;
    }
    try {
      await addFood(data, image);
      toast.success("Food added successfully!");
      setData({
        name: "",
        description: "",
        category: "Electronic",
        price: "",
      });
      setImage(null);
    } catch (error) {
      toast.error("Error adding food!");
      console.log("DEBUG:Error Adding Food ", error);
    }
  };

  return (
    <div className="mx-2 mt-5">
      <div className="row justify-content-center">
        <div className="card col-12 col-md-8 shadow-sm">
          <div className="card-body">
            <h2 className="mb-4 text-center text-primary">Add Food</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4 text-center">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.analog}
                    alt="Uploaded preview"
                    width={120}
                    height={120}
                    style={{
                      border: "2px solid #ccc",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  name="name"
                  placeholder="Enter name of Product"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="5"
                  required
                  placeholder="Write content here..."
                  name="description"
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  id="category"
                  name="category"
                  onChange={onChangeHandler}
                  value={data.category}
                >
                  <option value="Clothing">Clothing</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Cosmetics">Cosmetics</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Smart Watch">Smart watch</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Analog Watch">Analog watch</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  required
                  name="price"
                  placeholder="Price: Rs 1000"
                  onChange={onChangeHandler}
                  value={data.price}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ width: "100%" }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;