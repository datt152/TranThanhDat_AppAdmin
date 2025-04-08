import { useEffect, useState } from "react";
import Modal from "react-modal";
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

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetch("/api/customers.json")
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
        <Column field="name" header="Name" sortable style={{ width: "25%" }} />
        <Column field="company" header="Company" sortable style={{ width: "20%" }} />
        <Column field="orderValue" header="Order Value" sortable style={{ width: "15%" }} />
        <Column field="orderDate" header="Order Date" sortable style={{ width: "15%" }} />
        <Column
          field="status"
          header="Status"
          sortable
          style={{ width: "25%" }}
          body={(rowData) => (
            <div className="status-container">
              <div className="status-text">
                <span>{rowData.status}</span>
              </div>
              <button className="edit-button" onClick={() => openModal(rowData)}>
                <img src={editIcon} alt="" />
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
        <h2>Edit Customer Status</h2>
        {modalContent && (
          <div>
            <p>
              <strong>Name:</strong>
              <input type="text" value={modalContent.name} />
            </p>
            <p>
              <strong>Company:</strong>
              <input type="text" value={modalContent.company} />
            </p>
            <p>
              <strong>Order Value:</strong>
              <input type="text" value={modalContent.orderValue} />
            </p>
            <p>
              <strong>Order Date:</strong>
              <input type="text" value={modalContent.orderDate} />
            </p>
            <p>
              <strong>Status:</strong>
              <input type="text" value={modalContent.status} />
            </p>

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
