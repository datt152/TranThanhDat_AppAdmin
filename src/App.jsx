import { useEffect } from "react";
import "./App.css";
import bellIcon from "./assets/bell.png";
import helpIcon from "./assets/question.png";
import avatar from "./assets/react.svg";
import cartIcon from "./assets/shopping-cart.png";
import userIcon from "./assets/user.png";
import coinIcon from "./assets/coin.png";
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        

function App() {
  const [totals, setTotals] = useState([]);
  const [customers, setCustomers] = useState([]); 
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
          <div className="contentTitle">
          <h2>Detail Report</h2>
          <div className="groupBtn">
            <button>Import</button><button>Export</button>
          </div>
          </div>
          <DataTable value={customers}  paginator rows={5} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Name" sortable style={{ width: '20%' }} ></Column>
            <Column field="company" header="Company" sortable style={{ width: '20%' }} ></Column>
            <Column field="orderValue" header="Order Value" sortable style={{ width: '20%' }} ></Column>
            <Column field="orderDate" header="Order Date" sortable style={{ width: '15%' }} ></Column>
            <Column 
              field="status" 
              header="Status" 
              sortable 
              style={{ width: '25%' }} 
              body={(rowData) => (
                <div>
                  <span style={{marginRight: "5px"}}>{rowData.status}</span>
                  <button>Edit</button>
                </div>
              )}
            ></Column>
            
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default App;
