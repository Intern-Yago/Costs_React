import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//componentes especiais
import { Navbar } from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import { Container } from './components/layouts/Container';

//Paginas
import {Home} from './components/pages/Home'
import {Company} from './components/pages/Company'
import {Contact} from './components/pages/Contact'

//relacionado aos projetos
import { Project } from './components/pages/Project';
import { Projects } from './components/pages/Projects';
import {NewProject} from './components/pages/NewProject'


function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass='min-height'>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/company" element={<Company/>} caseSensitive/>
            <Route path="/contact" element={<Contact/>} caseSensitive/>
            <Route path="/newproject" element={<NewProject/>} caseSensitive/>
            <Route path="/projects" element={<Projects/>} caseSensitive/>
            <Route path="/projects/:id" element={<Project/>} caseSensitive/>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
