import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter as Router , RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Error from './Pages/Error.jsx';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    }
  }
}); // Rename `query` to `queryClient`
const router = new Router([
  {
    path: '/',
    element: <App/>,
    errorElement: <App/>
  },
  {
    path: '/:video',
    element :<App/>
  },
  {
    path: '/error',
    element:<Error/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* Use `client` instead of `query` */}
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>,
);
