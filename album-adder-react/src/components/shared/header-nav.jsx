import './components-shared.css';

function HeaderNav() {
    return (
        <div className='header-container'>
            <h2 className='header-main-logo'>
                Album Adder
            </h2>
            {HeaderLink('Album list')}
            {HeaderLink('Public lists')}
            {HeaderLink('My List')}
            {HeaderLink('Login')}
        </div>
    );
}

function HeaderLink(displayText) {
    return (
        <div className='header-nav-link'>
            {displayText}
        </div>
    );
}

export default HeaderNav;
