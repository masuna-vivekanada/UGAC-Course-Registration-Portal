import React from 'react'

export default function Footer() {
    return (
        <div>
            <>
                <footer className="sticky bottom-0 footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                    <aside>
                        <img src='https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original' height='50px' width='50px'></img>
                        <h4 className='font-bold'>
                            INDIAN INSTITUTE OF TECHNOLOGY BOMBAY
                            <br />
                            Since 1958
                        </h4>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </>
        </div>
    )
}
