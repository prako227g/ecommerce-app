import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // ─── State ────────────────────────────────────────────────────────────────────
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");          // ⬅ starts empty
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  const toggleSize = (sz) =>
    setSizes((prev) => (prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]));

  const sizeBtnClass = (sz) =>
    `${sizes.includes(sz) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`;

  // ─── Submit ───────────────────────────────────────────────────────────────────
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));           // ensure numeric
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);         // "true"/"false"
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // quick sanity‑check
      // console.log(Object.fromEntries(formData));

      const res  = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });
      if(res.data.success){
        toast.success(res.data.message)
        setName("")
        setDescription("")
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setPrice("")

      }else{
        toast.error(res.data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  };

  // ─── JSX ──────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* ── Images ─────────────────────────────────────── */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((idx) => {
            const imgs = { 1: image1, 2: image2, 3: image3, 4: image4 };
            const setters = {
              1: setImage1,
              2: setImage2,
              3: setImage3,
              4: setImage4,
            };
            return (
              <label key={idx} htmlFor={`image${idx}`}>
                <img
                  className="w-20"
                  src={!imgs[idx] ? assets.upload_area : URL.createObjectURL(imgs[idx])}
                  alt={`preview-${idx}`}
                />
                <input
                  onChange={(e) => setters[idx](e.target.files[0])}
                  type="file"
                  id={`image${idx}`}
                  hidden
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Name ───────────────────────────────────────── */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>

      {/* ── Description ───────────────────────────────── */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write Content Here"
          required
        />
      </div>

      {/* ── Category / SubCategory / Price ────────────── */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        {/* Category */}
        <div>
          <p className="mb-2">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required                                 // ⬅ browser will block empty
            className="w-full px-3 py-2"
          >
            <option value="">Select Category</option> {/* placeholder */}
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* SubCategory */}
        <div>
          <p className="mb-2">SubCategory</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"                              // numeric keypad on mobile
            min="0"
            placeholder="25"
            required
          />
        </div>
      </div>

      {/* ── Sizes ─────────────────────────────────────── */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((sz) => (
            <div key={sz} onClick={() => toggleSize(sz)}>
              <p className={sizeBtnClass(sz)}>{sz}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bestseller checkbox ───────────────────────── */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      {/* ── Submit ────────────────────────────────────── */}
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
