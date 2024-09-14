const AboutUsPage = () => {
    return (
        <div className="w-screen">
        <div className="(Image) grid w-full h-[40rem] bg-aboutus-background bg-cover bg-top rounded-sm opacity-80">

            <div className="ml-[40%] w-96 h-auto text-left text-7xl text-black font-serif">
                About Us
            </div>

        </div>
            <div className="(Body) p-6 md:p-12 lg:p-20 pb-24 bg-gradient-to-br from-green-300 to-white font-sans">
                <div className="(Body Content)max-w-screen-lg mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-[80px] my-8">Our Mission</h1>
                    <hr className="h-px my-6 border-black border-2"/>
                    <p className="text-base md:text-lg lg:text-2xl mb-10">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-[80px] my-8">What We're Doing</h1>
                    <hr className="h-px my-6 border-black border-2"/>
                    <p className="text-base md:text-lg lg:text-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                         Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUsPage;
