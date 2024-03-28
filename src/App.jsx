import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListaUsuarios from './components/ListaUsuarios';
import Formulario from './components/Formulario';

function App() {
 
  return (
    <>
      <ToastContainer />
      <div className='container-main'>
        <Formulario />
        <ListaUsuarios/>
      </div>
    </>
  );
}

export default App;
