import React from 'react'
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <>
            <section id="footer">
		<div class="container">
			<div class="row text-center text-xs-center text-sm-left text-md-left">
				<div class="col-xs-12 col-sm-4 col-md-4">
					<h5><b>About Us</b></h5>
					{/* <ul class="list-unstyled quick-links">
						<li><a href="https://www.fiverr.com/share/qb8D02"><i class="fa fa-angle-double-right"></i>Home</a></li>
						<li><a href="https://www.fiverr.com/share/qb8D02"><i class="fa fa-angle-double-right"></i>About</a></li>
						<li><a href="https://www.fiverr.com/share/qb8D02"><i class="fa fa-angle-double-right"></i>FAQ</a></li>
						<li><a href="https://www.fiverr.com/share/qb8D02"><i class="fa fa-angle-double-right"></i>Get Started</a></li>
						<li><a href="https://www.fiverr.com/share/qb8D02"><i class="fa fa-angle-double-right"></i>Videos</a></li>
					</ul> */}
                    <p style={{color:'white'}}>Ecomm Store is an Online Shopping store to buy products at affordable prices. User can add the products to cart and pay online through card payment.</p>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<h5><b>Quick links</b></h5>
					<ul class="list-unstyled quick-links">
						<li><Link to="/"><i class="fa fa-angle-double-right"></i>Home</Link></li>
						<li><Link to="/cart"><i class="fa fa-angle-double-right"></i>Your Cart</Link></li>
						<li><Link to="/signup"><i class="fa fa-angle-double-right"></i>Create New Account</Link></li>
						<li><Link to="/signin"><i class="fa fa-angle-double-right"></i>Login</Link></li>
						
					</ul>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<h5><b>Get in touch</b></h5>
					<ul class="list-unstyled quick-links">
						<li class="list-inline-item"><a href="https://www.linkedin.com/in/lakshygupta/"><i class="fa fa-linkedin"></i></a></li>
                        <li class="list-inline-item"><a href="https://github.com/lakshygupta"><i class="fa fa-github"></i></a></li>
						<li class="list-inline-item"><a href="https://mobile.twitter.com/lakshyguptaa"><i class="fa fa-twitter"></i></a></li>
						<li class="list-inline-item"><a href="https://www.instagram.com/lakshygupta/"><i class="fa fa-instagram"></i></a></li>
						<li class="list-inline-item"><a href="mailto:lakshygupta99@gmail.com"><i class="fa fa-envelope"></i></a></li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
					<ul class="list-unstyled list-inline social text-center">
						
        <li><img alt="Credit Card Logos" title="Credit Card Logos" src="https://www.shift4shop.com/images/credit-card-logos/cc-sm-4.png" width="198" height="28" border="0" /></li>

					</ul>
				</div>
				<hr/>
			</div>	
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
					{/* <p><u><a href="https://www.nationaltransaction.com/">National Transaction Corporation</a></u> is a Registered MSP/ISO of Elavon, Inc. Georgia [a wholly owned subsidiary of U.S. Bancorp, Minneapolis, MN]</p> */}
					<p class="h6">Made with ❤️ by<a class="text-green ml-2" href="https://github.com/lakshygupta" target="_blank">Lakshy Gupta</a></p>
				</div>
				<hr/>
			</div>	
		</div>
	</section>
        </>
    )
}

export default Footer
