import react, { useCallback, useState } from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { themeDark, themePrimary } from '../../store/action/action';
import ReactHelmet from './helmet';

const Header = ({ history, match, mode, changeMode}) => {


    const linkGo = (link) => {

        setToogle(true);

        history.push(`/${link}`);
    }

    const [ navExpanded, setNavExpanded ] = useState(false);

    const { themeStats } = useSelector(state => ({themeStats : state.themeRedux }));
    
    const setToogle = (expanded) => {

        let isValue = expanded === true ? false : true;

        setNavExpanded(isValue);
    }

    const dispatch = useDispatch();
    
    const changeDark = useCallback( (e) => {
        dispatch(themeDark(e));
    }, [dispatch]);
    
    const changePrimary = useCallback( (e) => {
        dispatch(themePrimary(e));
    }, [dispatch]);
 
    const changeTheme = (e) => {

        let test = themeStats.themeState === 'dark' ? 'primary' : 'dark';
        console.log(test);

        if(e === 'dark'){
            changePrimary('primary');
        }else{
            changeDark('dark');
        }
    }
    
    let theme = themeStats.themeState;
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
                <Navbar.Brand href="#home">Sample Quiz</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* <Nav className="mr-auto">
                    <Nav.Link onClick={() => linkGo('board')}>게시판</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav> */}
                    <Nav>
                        <Nav.Link onClick={() => linkGo('quiz')}>Quiz</Nav.Link>
                        <Nav.Link onClick={() => changeTheme(mode)}>
                            Change Mode({ mode === 'dark' ? 'primary' : 'dark'}) { theme } { themeStats.themeState }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )

}


export default Header;