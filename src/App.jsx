import './App.css'

function App() {

  return (
      <>
      <div className="container">
        <div className="header">
          <h2>Dashboard</h2> 
          <div className="searchAndIcon">
              <input type="text" name="" id="search" placeholder='Search...'/>
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
              
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
          <img src="" alt="" />
        </div>
        <div className="items">
          <h2>Over view</h2>
          <div className="groupCard">
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
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

  )
}

export default App
