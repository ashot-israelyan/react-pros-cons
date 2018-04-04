import React from 'react';
import ProsComponent from '../components/ProsComponent';
import ConsComponent from '../components/ConsComponent';

const MainPage = () => (
    <div>
        <header>Shoud I eat at McDonalds ?</header>
        <main className="container">
            <ProsComponent />
            <span className="line"></span>
            <ConsComponent />
        </main>
    </div>
);
export default MainPage;