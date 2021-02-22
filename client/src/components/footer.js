import React from 'react'

const footerStyle = {
    left: 0,
    bottom: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 1024
}
function Footer(){
    return(
        <footer class="bg-dark text-center text-lg-start" style={footerStyle}>
            <div class="text-light text-center p-3">
                © 2020-2021 Copyright:
                <a class="text-light" href="https://github.com/Kakaladze/"> Krzysztof Szybowicz</a> <br></br>
                <a class="text-light" href="https://www.vecteezy.com/free-vector/package-icon">Package Icon Vectors by Vecteezy</a>
            </div>
        </footer>
    )
}

export default Footer;