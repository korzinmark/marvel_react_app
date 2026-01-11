import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MainPage, ComicsPage } from '../pages';
import AppHeader from "../appHeader/AppHeader";

function App() {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage></MainPage>} />
                        <Route path="/comics" element={<ComicsPage></ComicsPage>} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App