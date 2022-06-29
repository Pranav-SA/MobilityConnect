import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

/**
 * Footer of the app
 * @param {props} props
 */
 function Footer(props) {

    return (
            <footer class="footer">
            <div class="footer-left col-md-4 col-sm-6">
                <p class="about">
                <span> About us</span> Mobility Connect was founded in 2021 with the goal of offering the easiest access to all the different mobility services in Munich. You can follow us on the links below.
                </p>
                <div class="icons">
                <Link href="https://github.com/Gr-Leon/SEBA.git">
                        <Grid item>
                            <GitHubIcon/>
                        </Grid>
                </Link>
                <Link href="https://facebook.com">
                        <Grid item>
                            <FacebookIcon/>
                        </Grid>
                </Link>
                <Link href="https://twitter.com">
                        <Grid item>
                            <TwitterIcon/>
                        </Grid>
                </Link>
                </div>
            </div>
            <div class="footer-center col-md-4 col-sm-6">
                <div>
                <i class="fa fa-map-marker"></i>
                <p><span> Marienplatz 25</span> Munich, Germany</p>
                </div>
                <div>
                <i class="fa fa-phone"></i>
                <p> (+49) 1100 245 324</p>
                </div>
                <div>
                <i class="fa fa-envelope"></i>
                <p><a href="#"> seba@master.com</a></p>
                </div>
            </div>
            <div class="footer-right col-md-4 col-sm-6">
                <h2> Mobility<span>Connect</span></h2>
                <p class="menu">
                <a href="/"> Home</a> |
                <a href="https://www.mvg.de/"> MVG Services</a> |
                <a href="https://www.s-bahn-muenchen.de/fahrplan/betriebslage"> Current issues of public transport</a> |
                <a href="https://www.mvg.de/dam/mvg/dienste/tickets/tarifreform/TSR_Preisuebersicht.pdf"> MVG prices</a> |
                <a href="/routing"> Find route</a> |
                <a href="mailto:seba@master.com?body=your question"> Contact us</a>
                </p>
                <p class="name"> MobilityConnect &copy; 2021</p>
            </div>
            </footer>

);
}

export default Footer;