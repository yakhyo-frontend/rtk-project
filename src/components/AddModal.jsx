import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../features/GetProducts";
import { AddProduct } from "../features/AddProducts";

const AddProductModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      title: title,
      description: description,
    };

    if (!user.title || !user.description) {
      return alert("Xatolik yuz berdi! Barcha maydonlarni to'ldiring.");
    }

    await dispatch(AddProduct(user));
    dispatch(getProducts());
    alert("Mahsulot muvaffaqiyatli qo'shildi");

    setTitle("");
    setDescription("");
    if (onClose) onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        fontFamily: "sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px 25px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "15px", color: "#333" }}>
          Yangi mahsulot
        </h3>

        <div style={{ marginBottom: "12px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#555",
            }}
          >
            Nomi:
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Nom kiriting"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#555",
            }}
          >
            Tavsif:
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Tavsif kiriting"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#ccc",
              color: "#333",
              border: "none",
              padding: "7px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            style={{
              background: "#28a745",
              color: "#fff",
              border: "none",
              padding: "7px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductModal;
