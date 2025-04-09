import { useEffect } from "react";
import Modal from "react-modal";
import { NavLink, Outlet } from 'react-router-dom';

import "./App.css";
import bellIcon from "./assets/bell.png";
import helpIcon from "./assets/question.png";
import avatar from "./assets/react.svg";
import cartIcon from "./assets/shopping-cart.png";
import userIcon from "./assets/user.png";
import coinIcon from "./assets/coin.png";

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function App() {
  const [totals, setTotals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); 

  const openModal = (customer) => {
    setModalContent(customer); 
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetch("https://67ee9742c11d5ff4bf7a36cc.mockapi.io/metrics")
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
          { label: 'Turnover', value: totalTurnoverValue, icon: cartIcon  },
          { label: 'Profit', value: totalProfitValue, icon: coinIcon  },
          { label: 'New customer', value: data.length, icon: userIcon  }
        ];
        setTotals(totalsData); 
      });
    fetch("https://67ee9742c11d5ff4bf7a36cc.mockapi.io/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);  
      });
  }, []);

  return (
      <>
      <div className="container">
        <div className="header">
          <h2>Dashboard</h2> 
          <div className="searchAndIcon">
              <input type="text" name="" id="search" placeholder='Search...'/>
              <img src={helpIcon} alt="" />
              <img src={bellIcon} alt="" />
              <img src={avatar} alt="" />
              
              
          </div>
        </div>
        <div className="menu">
          <h2>Logo</h2>
          <div className="menuItem">
  <NavLink to="/" end>Dashboard</NavLink>
  <NavLink to="/projects">Projects</NavLink>
  <NavLink to="/teams">Teams</NavLink>
  <NavLink to="/analytics">Analytics</NavLink>
  <NavLink to="/messages">Messages</NavLink>
  <NavLink to="/integrations">Integrations</NavLink>
</div>


        </div>
        <div className="items">
          <h2>Over view</h2>
          <div className="groupCard">
            {totals.map((value, index) => {
              return (
                <div key={index} className="card">
                  <div className="cardContent">
                    <p>{value.label}</p>
                    <h3>{value.value}</h3>
                  </div>
                  <div className="cardIcon">
                    <img src={value.icon} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">
          <Outlet/>
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
            <p><strong>Name:</strong> {modalContent.name}</p>
            <p><strong>Company:</strong> {modalContent.company}</p>
            <p><strong>Order Value:</strong> {modalContent.orderValue}</p>
            <p><strong>Order Date:</strong> {modalContent.orderDate}</p>
            <p><strong>Status:</strong> {modalContent.status}</p>
            <button style={{backgroundColor: "red", color: "white"}} onClick={closeModal}>Close Modal</button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default App
