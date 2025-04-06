import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import "./App.css";
import bellIcon from "./assets/bell.png";
import helpIcon from "./assets/question.png";
import avatar from "./assets/react.svg";
import cartIcon from "./assets/shopping-cart.png";
import userIcon from "./assets/user.png";
import coinIcon from "./assets/coin.png";
import editIcon from "./assets/pen.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function App() {
  const [totals, setTotals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { customerId } = useParams();

  const openModal = (customer) => {
    setModalContent({ ...customer });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {

    fetch("/api/metrics.json")
      .then((response) => response.json())
      .then((data) => {
        const totalTurnoverValue = data.reduce((sum, item) => {
          const reducedTurnover = Math.floor(item.turnover * 0.1);
          return sum + reducedTurnover;
        }, 0);

        const totalProfitValue = data.reduce((sum, item) => {
          const reducedProfit = Math.floor(item.profit * 0.1);
          return sum + reducedProfit;
        }, 0);

        const totalsData = [
          { label: "Turnover", value: totalTurnoverValue, icon: cartIcon },
          { label: "Profit", value: totalProfitValue, icon: coinIcon },
          { label: "New customer", value: data.length, icon: userIcon },
        ];
        setTotals(totalsData);
      });

    fetch("/api/customers.json")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      });
  }, []);

  useEffect(() => {
    if (customerId) {
      fetch(`/api/customers/${customerId}`)
        .then((response) => response.json())
        .then((data) => {
          setModalContent(data); 
        });
    }
  }, [customerId]);

  const handleEdit = () => {
    if (modalContent && modalContent.id) {
      fetch(`/api/customers/${modalContent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modalContent), 
      })
        .then((response) => response.json())
        .then(() => {
          setCustomers((prevCustomers) =>
            prevCustomers.map((customer) =>
              customer.id === modalContent.id
                ? { ...customer, ...modalContent }
                : customer
            )
          );
          closeModal(); 
        })
        .catch(() => {
          alert("Error updating customer data!");
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h2>Dashboard</h2>
          <div className="searchAndIcon">
            <input type="text" name="" id="search" placeholder="Search..." />
            <img src={helpIcon} alt="" />
            <img src={bellIcon} alt="" />
            <img src={avatar} alt="" />
          </div>
        </div>
        <div className="menu">
          <h2>Logo</h2>
          <div className="menuItem">
            <a href="#">Dashboard</a>
            <a href="#">Projects</a>
            <a href="#">Teams</a>
            <a href="#">Analytics</a>
            <a href="#">Messages</a>
            <a href="#">Integrations</a>
          </div>
        </div>
        <div className="items">
          <h2>Overview</h2>
          <div className="groupCard">
            {totals.map((value, index) => (
              <div key={index} className="card">
                <div className="cardContent">
                  <p>{value.label}</p>
                  <h3>{value.value}</h3>
                </div>
                <div className="cardIcon">
                  <img src={value.icon} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
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
            <Column field="name" header="Name" sortable style={{ width: "25%" }}></Column>
            <Column field="company" header="Company" sortable style={{ width: "20%" }}></Column>
            <Column field="orderValue" header="Order Value" sortable style={{ width: "15%" }}></Column>
            <Column field="orderDate" header="Order Date" sortable style={{ width: "15%" }}></Column>
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
                  <button
                    className="edit-button"
                    onClick={() => openModal(rowData)}
                  >
                    <img src={editIcon} alt="" />
                  </button>
                </div>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>

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
              <input
                type="text"
                value={modalContent.name}
                />
            </p>
            <p>
              <strong>Company:</strong>
              <input
                type="text"
                value={modalContent.company}
              />
            </p>
            <p>
              <strong>Order Value:</strong>
              <input
                type="text"
                value={modalContent.orderValue}
              />
            </p>
            <p>
              <strong>Order Date:</strong>
              <input
                type="text"
                value={modalContent.orderDate}
                />
            </p>
            <p>
              <strong>Status:</strong>
              <input
                type="text"
                value={modalContent.status}
                />
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
    </>
  );
}

export default App;
