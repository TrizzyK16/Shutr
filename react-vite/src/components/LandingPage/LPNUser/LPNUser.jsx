import "./LPNUser.css"
import "../../FooterNUser/FooterNUser"
import FooterNUser from "../../FooterNUser/FooterNUser"
import { NavLink } from "react-router-dom"

export default function LPNUser(){
    return (
        <div className="lpnuser">
            <div className="lpnu-div1">
                <h1 className="lpnu-div1-header">The ultimate online destination for photographers</h1>
                <div className="lpnu-div1-image1">
                    <img src="https://picsum.photos/800/600?random=1" />
                </div>
                <div className="lpnu-div1-signup-button">
                    <NavLink  to="/signup">Join For Free</NavLink>
                </div>
                <div className="lpnu-div1-image2">
                    <img src="https://picsum.photos/800/600?random=2" />
                </div>
            </div>

            <div className="lpnu-div2">
                <div className="lpnu-div2-top">
                    <h1>Welcome to the premier online space for photographers</h1>
                </div>
                <div className="lpnu-bottom">
                    <div className="lpnu-div2-image1">
                        <img src="https://picsum.photos/800/600?random=3" />
                    </div>
                    <h2 className="lpnu-div2-text">Become a part of a vibrant community of photographers, 
                        where you can share your work, connect with fellow creators, 
                        and learn new skills to grow your craft</h2>
                    <div className="lpnu-community-link">
                        <NavLink to="/community">Check Out Your New Community</NavLink>
                    </div>
                </div>
            </div>

            <div className="div3">
                <div className="div1-header">
                    <h1>div3-header</h1>
                </div>
                <div className="div1-text">
                    <h2>div3-text</h2>
                </div>
                <div className="div3-images">
                    <div>
                    <img src="https://picsum.photos/800/600?random=5" />
                    </div>
                    <div>
                    <img src="https://picsum.photos/800/600?random=6" />
                    </div>
                </div>
            </div>

            <div className="div4">
                <div className="div1-header">
                    <h1>div4-header</h1>
                </div>
                <div className="div1-text">
                    <h2>div4-text</h2>
                </div>
                <div className="div4-images">
                    <div>
                    <img src="https://picsum.photos/800/600?random=7" />
                    </div>
                    <div>
                    <img src="https://picsum.photos/800/600?random=8" />
                    </div>
                </div>
            </div>

            <div className="div5">
                <div className="div1-header">
                    <h1>div5-header</h1>
                </div>
                <div className="div1-text">
                    <h2>div5-text</h2>
                </div>
                <div className="div5-images">
                    <div>
                    <img src="https://picsum.photos/800/600?random=9" />
                    </div>
                    <div>
                    <img src="https://picsum.photos/800/600?random=10" />
                    </div>
                </div>
            </div>

            <div className="footer">
                <FooterNUser />
            </div>
            
        </div>
    )
}