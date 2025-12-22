import { Toaster } from 'react-hot-toast';
import { AppRoutes } from '@routes';

import './App.css';

const App = () => (
  <>
    <AppRoutes />
    <Toaster position="top-center" />
  </>
);

export default App;
