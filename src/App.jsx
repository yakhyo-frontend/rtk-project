import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./features/GetProducts";
import { deleteProduct } from "./features/DeleteProducts";
import AddProductModal from "./components/AddModal";
import { EditProduct } from "./features/EditProducts";
import EditProductModal from "./components/EditModal";

const App = () => {
  const { loading, error, data } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading)
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "45px",
          fontFamily: "sans-serif",
        }}
      >
        Yuklanmoqda...
      </h2>
    );

  if (error)
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "red",
          fontFamily: "sans-serif",
        }}
      >
        {error}
      </h2>
    );

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div
      style={{ width: "600px", margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, color: "#333" }}>Mahsulotlar ro'yxati</h2>

        <button
          onClick={() => setAddModal(true)}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            fontSize: "16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Qo'shish
        </button>
      </div>

      {addModal && (
        <AddProductModal isOpen={addModal} onClose={() => setAddModal(false)} />
      )}

      {editModal && (
        <EditProductModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          editId={editId}
        />
      )}

      {data?.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fdfdfd",
            border: "1px solid #ddd",
            padding: "10px 15px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <div>
            <h4 style={{ margin: "0 0 4px 0", color: "#222" }}>{item.title}</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>
              {item.description.slice(0, 120)}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <button
              onClick={() => {
                setEditModal(true);
                setEditId(item?.id);
              }}
              style={{
                background: "#4da6ff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Yangilash
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              style={{
                background: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              O'chirish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
