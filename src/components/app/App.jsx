import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MainPage, ComicsPage } from '../pages';
import AppHeader from "../appHeader/AppHeader";

function App() {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage></MainPage>
                        </Route>

                        <Route exact path="/comics">
                            <ComicsPage></ComicsPage>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;