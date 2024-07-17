import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/headers/Header";
import Pages from "./components/mainpages/Pages";
import { DataProvider } from "./GlobalState";

const App = () => {
  return (
    <DataProvider>
    <Router>
    <div className="App">
      <Header/>
      <Pages/>
    </div>
    </Router>
    </DataProvider>
  )
}

export default App;