import './App.scss'
import MainHeader from '../MainHeader/MainHeader';
import Footer from '../Footer/Footer';
import { Outlet, useLocation } from 'react-router';
import FRONTEND_ROUTES from '../../common/constants/frontend-routes.constants';
import MainPage from '../../../pages/main-page/main-page';

function App() {
  const { pathname } = useLocation();
  return (
    <div>
        <MainHeader />
        {(pathname !== FRONTEND_ROUTES.BASE) && (<Outlet />)}
        {(pathname === FRONTEND_ROUTES.BASE) && (<MainPage />)}
        <Footer />
      </div>
  )
}

export default App
