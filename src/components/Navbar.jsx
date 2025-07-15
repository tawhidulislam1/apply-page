import logo from './../assets/icon.png';

const Navbar = () => {
    const links = () => (
        <>
            <li>
                <a className="nav-link">
                    Home
                </a>
            </li>
            <li>
                <a className=" nav-link">
                    Apply
                </a>
            </li>
            <li>
                <a className="nav-link">
                    Contact
                </a>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-16 " id="navbar" >
            {/* Left Side (Mobile Menu + Logo) */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {links()}
                    </ul>
                </div>

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <img src={logo} alt="rentahouse logo" id="navbar-logo" />
                </div>
            </div>

            {/* Right Side (Desktop Menu) */}
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links()}</ul>
            </div>
        </div>
    );
};

export default Navbar;
