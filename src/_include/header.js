import react, { useState } from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';

const Header = ({ history, match, mode, changeMode}) => {

    const linkGo = (link) => {
        setToogle(false);

        history.push(`/${link}`);
    }

    const [ navExpanded, setNavExpanded ] = useState(false);

    const setToogle = (expanded) => {

        let isValue = expanded === true ? false : true;

        setNavExpanded(isValue);
    }
    return(
        <>
            <Navbar 
                collapseOnSelect 
                expand="lg" 
                bg={mode} 
                variant="dark"
                onToggle={() => setToogle(navExpanded)}
                expanded={navExpanded}
            >
                <Navbar.Brand href="#home">SamSaem</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link onClick={() => linkGo('test')}>Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link onClick={() => changeMode(mode)}>
                        Change Mode({ mode === 'dark' ? 'primary' : 'dark'})
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}


export default Header;