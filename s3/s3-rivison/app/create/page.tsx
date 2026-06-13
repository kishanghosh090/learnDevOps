"use client";

import axios from "axios";
import React, { useState } from "react";

export default function CreateProductPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [mime, setMime] = useState("");

  const getPresignedUrl = async () => {
    const res = await axios.post("http://127.0.0.1:5003/presignedUrl", {
      mime,
    });

    return res.data;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));

    const mimeType = file.type.split("/")[1];
    setMime(mimeType);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      // 1. Get Presigned URL
      const { url, fileName } = await getPresignedUrl();

      // 2. Upload image directly to S3
      //   await axios.put(url, image, {
      //     headers: {
      //       "Content-Type": image.type,
      //     },
      //   });
      await fetch(url, {
        method: "PUT",
        body: image,
        headers: {
          "Content-Type": image.type, // Required by S3 signature
        },
      });

      console.log("Uploaded Successfully");

      // 3. Save product data in database
      await axios.post("http://127.0.0.1:5003/product", {
        name: productName,
        price: 122,
        fileName: fileName, // store key/path in DB
      });

      console.log("Product Created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      {" "}
      <div className="max-w-2xl mx-auto bg-gray-800 shadow-lg rounded-xl p-6">
        {" "}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Product
        </h1>{" "}
        <form onSubmit={handleSubmit} className="space-y-5">
          {" "}
          {/* Product Name */}{" "}
          <div>
            {" "}
            <label className="block mb-2 font-medium">Product Name</label>{" "}
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />{" "}
          </div>{" "}
          {/* Description */}{" "}
          <div>
            {" "}
            <label className="block mb-2 font-medium">Description</label>{" "}
            <textarea
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              required
            />{" "}
          </div>{" "}
          {/* Image Upload */}{" "}
          <div>
            {" "}
            <label className="block mb-2 font-medium">Product Image</label>{" "}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2"
              required
            />{" "}
          </div>{" "}
          {/* Image Preview */}{" "}
          {preview && (
            <div>
              {" "}
              <label className="block mb-2 font-medium">
                Image Preview
              </label>{" "}
              <img
                src={preview}
                alt="Preview"
                className="w-full h-72 object-cover rounded-lg border"
              />{" "}
            </div>
          )}{" "}
          {/* Submit Button */}{" "}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {" "}
            Create Product{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
