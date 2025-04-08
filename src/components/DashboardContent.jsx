import { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement('#root');
import editIcon from "../assets/pen.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function DashboardContent() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (customer) => {
    setModalContent({ ...customer });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setModalContent({
      name: "",
      company: "",
      orderValue: "",
      orderDate: "",
      city: "",
      avatar: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70), // ảnh random
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const method = modalContent.id ? "PUT" : "POST";
      const url = modalContent.id
        ? `https://67ee9742c11d5ff4bf7a36cc.mockapi.io/customers/${modalContent.id}`
        : "https://67ee9742c11d5ff4bf7a36cc.mockapi.io/customers";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalContent),
      });

      const data = await res.json();
      setCustomers((prev) =>
        method === "POST"
          ? [...prev, data]
          : prev.map((c) => (c.id === data.id ? data : c))
      );

      alert(method === "POST" ? "Thêm thành công!" : "Cập nhật thành công!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Lưu thất bại!");
    }
  };

  const handleChange = (field) => (e) =>
    setModalContent({ ...modalContent, [field]: e.target.value });

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetch("https://67ee9742c11d5ff4bf7a36cc.mockapi.io/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      });
  }, []);

  return (
    <div className="content">
      <div className="contentTitle">
        <h2>Detail Report</h2>
        <div className="groupBtn">
          <button onClick={openAddModal}>Add</button>
          <button>Import</button>
          <button>Export</button>
        </div>
      </div>

      <DataTable
        value={customers}
        paginator
        rows={4}
        sortMode="multiple"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header="Customer"
          style={{ width: "30%" }}
          body={(rowData) => (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={rowData.avatar}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <span>{rowData.name}</span>
            </div>
          )}
        />
        <Column field="company" header="Company" sortable style={{ width: "20%" }} />
        <Column field="orderValue" header="Order Value" sortable style={{ width: "15%" }} />
        <Column field="orderDate" header="Order Date" sortable style={{ width: "15%" }} />
        <Column
          field="city"
          header="City"
          sortable
          style={{ width: "25%" }}
          body={(rowData) => (
            <div className="status-container">
              <div className="status-text">
                <span>{rowData.city}</span>
              </div>
              <button className="edit-button" onClick={() => openModal(rowData)}>
                <img src={editIcon} alt="edit" />
              </button>
            </div>
          )}
        />
      </DataTable>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Customer"
        className="Modal"
      >
        <h2>{modalContent?.id ? "Edit Customer" : "Add Customer"}</h2>
        {modalContent && (
          <div>
            <p>
              <strong>Name:</strong>
              <input type="text" value={modalContent.name} onChange={handleChange("name")} />
            </p>
            <p>
              <strong>Company:</strong>
              <input type="text" value={modalContent.company} onChange={handleChange("company")} />
            </p>
            <p>
              <strong>Order Value:</strong>
              <input type="text" value={modalContent.orderValue} onChange={handleChange("orderValue")} />
            </p>
            <p>
              <strong>Order Date:</strong>
              <input type="text" value={modalContent.orderDate} onChange={handleChange("orderDate")} />
            </p>
            <p>
              <strong>City:</strong>
              <input type="text" value={modalContent.city} onChange={handleChange("city")} />
            </p>
            <button
              style={{ backgroundColor: "green", color: "white", marginRight: "5px" }}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              style={{ backgroundColor: "red", color: "white", marginRight: "5px" }}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default DashboardContent;
