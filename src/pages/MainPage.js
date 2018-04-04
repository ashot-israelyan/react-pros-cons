import React from 'react';
import CardsComponent from '../components/CardsComponent';

const MainPage = () => (
    <div className="app">
        <header>Shoud I eat at McDonalds ?</header>
        <main className="container">
            <CardsComponent type="pros"/>
            <span className="line"></span>
            <CardsComponent type="cons"/>
        </main>
    </div>
);
export default MainPage;