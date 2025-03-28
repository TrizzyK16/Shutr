import "./LPNUser.css"
import "../../FooterNUser/FooterNUser"
import FooterNUser from "../../FooterNUser/FooterNUser"

export default function LPNUser(){
    return (
        <>
            <div className="div1">
                <div className="div1-header">
                    <h1>The ultimate online destination for photographers.</h1>
                </div>
                <div className="div1-text">
                    <h2>div1-text</h2>
                </div>
                <div className="div1-images">
                    <div>
                    <img src="https://picsum.photos/800/600?random=1" />
                    </div>
                    <div>
                    <img src="https://picsum.photos/800/600?random=2" />
                    </div>
                </div>
            </div>

            <div className="div2">
                <div className="div1-header">
                    <h1>div2-header</h1>
                </div>
                <div className="div1-text">
                    <h2>div2-text</h2>
                </div>
                <div className="div2-images">
                    <div>
                    <img src="https://picsum.photos/800/600?random=3" />
                    </div>
                    <div>
                    <img src="https://picsum.photos/800/600?random=4" />
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
            
        </>
    )
}