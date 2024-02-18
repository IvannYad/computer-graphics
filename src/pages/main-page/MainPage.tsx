import "./MainPage.scss"

export default function MainPage(){
    return (
        <main className="page main-page">
            <div className="main-page-background-image">
                <div className="main-page-content-title-holder">
                    <h1>
                        Laboatory works on Computer Graphics
                    </h1>
                </div>
            </div>
            <div className="main-page-flex-grid">
                <div className="main-page-grid-element">
                    <div className="photo-border-partial left-bottom-border"></div>
                    <div className="photo-border-partial right-top-border"></div>
                    <img src="../../../public/me-handsome.png"/>
                </div>
                <div className="main-page-grid-element">
                    <div className="block-display">
                        <h2>Ivan Yadchychyn</h2>
                        <hr />
                        <p> 
                            Welcome stranger, my name is Ivan and I am passionate .NET and React software engineer.
                            I created this site in order to do my labiratory works on Computer Graphics.
                            Feel free to check out source code on <a target="blank" href="https://github.com/IvannYad/computer-graphics.git">my github</a> .
                        </p>
                    </div>   
                </div>
            </div>
        </main>
    )   
}