import { Toaster } from 'react-hot-toast';
import { AppRoutes } from '@routes';

import './App.css';

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
