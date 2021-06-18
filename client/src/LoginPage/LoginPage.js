import "./loginPage.scss";

const LoginPage = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/lobby/:id" component={Lobby} />
          <Route path="/decktest" component={GameUI} />
          <Route path="*" component={FourOhFour} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default LoginPage;
