import { useEffect } from 'react';
import './App.css'
import bellIcon from './assets/bell.png'
import helpIcon from './assets/question.png'
import avatar from './assets/react.svg'
import cartIcon from './assets/shopping-cart.png'
import userIcon from './assets/user.png'
import coinIcon from './assets/coin.png'
import { useState } from 'react';
function App() {
  const [totals, setTotals] = useState([]);
useEffect(() => {
    fetch('https://67ee9742c11d5ff4bf7a36cc.mockapi.io/metrics') 
      .then(response => response.json())
      .then(data => {
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
            {totals.map((value,index) => {
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
              )
            })}
            
          </div>
        </div>
        <div className="content">
          <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Order Value</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
              </tbody>
          </table>
        </div>

      </div>
      </>

  );
}

export default App
