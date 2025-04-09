import { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement('#root');
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

  const closeModal = () => setIsModalOpen(false);

  const handleSave = async () => {
    try {
      const isNew = !modalContent.id;
      const url = isNew
        ? `https://67ee9742c11d5ff4bf7a36cc.mockapi.io/customers`
        : `https://67ee9742c11d5ff4bf7a36cc.mockapi.io/customers/${modalContent.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalContent),
      });

      const updated = await res.json();

      if (isNew) {
        setCustomers((prev) => [...prev, updated]);
      } else {
        setCustomers((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      }

      alert(isNew ? "Thêm mới thành công" : "Thay đổi thành công");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Lưu thất bại!");
    }
  };

  const handleChange = (field) => (e) =>
    setModalContent({ ...modalContent, [field]: e.target.value });

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
          <button
            onClick={() =>
              openModal({
                name: "",
                company: "",
                orderValue: "",
                orderDate: "",
                city: "",
                avatar: "https://i.pravatar.cc/150?img=5", // default avatar
              })
            }
          >
            Add
          </button>
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

        <Column
          field="company"
          header="Company"
          sortable
          style={{ width: "20%" }}
        />
        <Column
          field="orderValue"
          header="Order Value"
          sortable
          style={{ width: "15%" }}
        />
        <Column
          field="orderDate"
          header="Order Date"
          sortable
          style={{ width: "15%" }}
        />
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
              <button
                className="edit-button"
                onClick={() => openModal(rowData)}
              >
                Edit
              </button>
            </div>
          )}
        />
      </DataTable>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Customer Status"
        className="Modal"
      >
        <h2>{modalContent?.id ? "Edit Customer" : "Add Customer"}</h2>
        {modalContent && (
          <div>
            <p>
              <strong>Name:</strong>
              <input
                type="text"
                value={modalContent.name}
                onChange={handleChange("name")}
                placeholder="Enter name"
              />
            </p>
            <p>
              <strong>Company:</strong>
              <input
                type="text"
                value={modalContent.company}
                onChange={handleChange("company")}
                placeholder="Enter company"
              />
            </p>
            <p>
              <strong>Order Value:</strong>
              <input
                type="text"
                value={modalContent.orderValue}
                onChange={handleChange("orderValue")}
                placeholder="Enter order value"
              />
            </p>
            <p>
              <strong>Order Date:</strong>
              <input
                type="text"
                value={modalContent.orderDate}
                onChange={handleChange("orderDate")}
                placeholder="Enter order date"
              />
            </p>
            <p>
              <strong>City:</strong>
              <input
                type="text"
                value={modalContent.city}
                onChange={handleChange("city")}
                placeholder="Enter city"
              />
            </p>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                marginRight: "5px",
              }}
              onClick={handleSave}
            >
              Save changes
            </button>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                marginRight: "5px",
              }}
              onClick={closeModal}
            >
              Close Modal
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default DashboardContent;
