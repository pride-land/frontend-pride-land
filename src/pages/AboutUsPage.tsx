const AboutUsPage = () => {
    return (
        <div className="w-screen flex flex-col">
            <div className="(Image) relative w-full h-[20rem]  md:h-[40rem] lg:h-[40rem]  bg-cover bg-center bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-center text-[40px] md:text-[60px] lg:text-[80px] font-serif bg-white">
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
