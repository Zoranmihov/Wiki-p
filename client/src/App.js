import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { User } from "./UserContext";

//Components
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import About from "./screens/About";
import Admin from "./screens/Admin";
import AdminUsers from "./components/AdminUsers";
import Profile from "./components/Profile";
import AllArticles from "./screens/AllArticles";
import CreateNewArticle from "./screens/CreateNewArticle";
import EditArticle from "./screens/EditArticle";
import Article from "./components/Article";
import LoginAndRegister from "./screens/LoginAndRegister";
import NotFound from "./screens/NotFound";

function App() {
  let [user, setuser] = useState();
  useEffect(() => {
    if (Cookies.get("User")) {
      setuser(JSON.parse(Cookies.get("User")));
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <User.Provider value={{ user, setuser }}>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/admin" component={Admin} exact />
            <Route path="/admin/user/:id" component={AdminUsers} exact />
            <Route path="/about" component={About} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/articles" component={AllArticles} exact />
            <Route path="/articles/new" component={CreateNewArticle} exact />
            <Route path="/articles/edit/:id" component={EditArticle} />
            <Route path="/articles/:id" component={Article} exact />
            <Route path="/login" component={LoginAndRegister} exact />
            <Route component={NotFound} />
          </Switch>
        </User.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
