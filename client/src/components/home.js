import React from 'react'
import SiteNavbar from './navbar.js'
import Footer from './footer.js'
import HomeContent from './homeContent.js'

function Home(){
    return(
        <>
            <SiteNavbar />
            <HomeContent />
            <Footer />
        </>
    )
}

export default Home;