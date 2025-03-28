import "./FooterNUser.css"
import {NavLink} from "react-router-dom"

export default function FooterNUser(){
    return (
        <>
            <div className="footer">
                <div className="left-left">
                    <div className="left-left-top">
                        <img src="/shutr-logo-nbg.png" alt="logo" className="footer-logo-big"></img>
                        <h3 className="shutr-text-logo">Shutr</h3>
                    </div>

                    <div className="left-left-middle">
                        <p>The ultimate online destination for photographers.</p>
                    </div>

                    <div className="left-left-bottom">
                        <div>
                            <img src="/shutr-logo-nbg.png" alt="logo" width="60" height="60"></img>
                        </div>

                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                            alt="Instagram" className="instagram-logo"/>
                        </div>
                        
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
                            alt="Facebook" className="facebook-logo" />
                        </div>

                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
                            alt="YouTube" className="youtube-logo"/>
                        </div>
                    </div>
                </div>

                <div className="left-middle">
                    <div className='larger-footer-links'>
                        <h2>Product</h2>
                    </div>
                    <div className="smaller-footer-links">
                        <div>
                            <NavLink to="/features" className="footer-nav-link">Features</NavLink>
                        </div>
                        <div>
                            <NavLink to="/shutr-pro" className="footer-nav-link">ShutrPro</NavLink>
                        </div>
                        <div>
                            <NavLink to="/the-apps" className="footer-nav-link">The Apps</NavLink>
                        </div>
                    </div>
                </div>

                <div className="right-middle">
                    <div className='larger-footer-links'>
                        <h2>Community</h2>
                    </div>
                    <div className="smaller-footer-links">
                        <div>
                            <NavLink to="/community" className="footer-nav-link">Groups</NavLink>
                        </div>
                        <div>
                            <NavLink to="/community" className="footer-nav-link">Events</NavLink>
                        </div>
                        <div>
                            <NavLink to="/community" className="footer-nav-link">Blog</NavLink>
                        </div>
                    </div>
                </div>

                <div className="right-right">
                    <div className='larger-footer-links'>
                        <h2>Company</h2>
                    </div>
                    <div className="smaller-footer-links">
                        <div>
                            <NavLink to="/company" className="footer-nav-link">About Us</NavLink>
                        </div>
                        <div>
                            <NavLink to="/company" className="footer-nav-link">Sustainability</NavLink>
                        </div>
                        <div>
                            <NavLink to="/company" className="footer-nav-link">Advertise</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}