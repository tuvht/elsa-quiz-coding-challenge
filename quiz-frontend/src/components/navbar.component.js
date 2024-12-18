// Import Modules
import { Nav, Navbar, Container }
    from 'react-bootstrap';

import {
    Link 
} from 'react-router-dom';

// NavBar Component
const NavBar = (props) => {
    // Return user form
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to={"/"}
                        className="nav-link">
                        Quiz
                    </Link>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

// Export NavBar Component
export default NavBar;
