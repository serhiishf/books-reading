import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.scss';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import LibraryPage from './views/LibraryPage';
import TrainingPage from './views/TrainingPage';

function App() {
  return (
    <>
      <Header />
      {/* <Suspense>
        <Routes>
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/training" element={<TrainingPage />} />
        </Routes>
      </Suspense> */}
    </>
  );
}

export default App;
