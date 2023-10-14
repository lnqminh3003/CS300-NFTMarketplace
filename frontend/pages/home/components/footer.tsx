export default function Footer() {
    return (
        <div className="bg-cyan-600 p-16 mt-32 px-32">
            <div className="flex items-center">
                <div>
                    <div className="flex items-center">
                        <img
                            src="https://i.imgur.com/98gX8Ky.png"
                            className="h-6 mr-3 sm:h-9"
                        />
                        <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">
                            AuraSky
                        </span>
                    </div>
                    <div className="text-white text-sm font-medium mt-5 w-96 text-justify">
                        The world's smallest and dumbest market for crypto art
                        trading, where you can create, buy, sell, and discover
                        exclusive digital items. This site is used for
                        educational purposes only, we do not take any
                        responsibility for any e-commerce actions. Thanks to{" "}
                        <a href="https://opensea.io" className="text-amber-200">
                            OpenSea
                        </a>
                        , they have inspired a lot for us to complete this
                        project.
                    </div>
                </div>
                <div className="ml-auto text-white font-bold text-xl text-center">
                    <div className="mb-5 text-2xl">Join our community</div>
                    <div className="flex place-content-evenly items-center">
                        <div>
                            <a
                                href="https://r.mtdv.me/JzaKhxMPpK"
                                className="mx-2"
                            >
                                <i className="fa-brands fa-discord"></i>
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://r.mtdv.me/JzaKhxMPpK"
                                className="mx-2"
                            >
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://r.mtdv.me/JzaKhxMPpK"
                                className="mx-2"
                            >
                                <i className="fa-regular fa-paper-plane"></i>
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://r.mtdv.me/JzaKhxMPpK"
                                className="mx-2"
                            >
                                <i className="fa-brands fa-instagram text-2xl"></i>
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://r.mtdv.me/JzaKhxMPpK"
                                className="mx-2"
                            >
                                <i className="fa-brands fa-twitter text-2xl"></i>
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://r.mtdv.me/JzaKhxMPpK"
                                className="mx-2"
                            >
                                <i className="fa-brands fa-youtube text-2xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-white mt-10 text-xs">
                <i className="fa-regular fa-copyright"></i> 2023 - 2024 CS300-AuraSky, VNU HCMUS
            </div>
        </div>
    );
}
