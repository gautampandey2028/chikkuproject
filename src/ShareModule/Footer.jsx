import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div class="col-lg-3 col-md-6 footer-contact">
                <h3>Company</h3>
                <p>
                  A108 Adam Street <br />
                  New York, <br />
                  NY 535022 United States <br />
                  <strong>Phone:</strong> +1 5589 55488 55 <br />
                  <strong>Email:</strong> info@example.com
                </p>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Home</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">About us</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Services</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Terms and Services</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Privacy policy</Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Web Design</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Web Development</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Product Management</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Marketing</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="">Graphic Design</Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Join Our Newsletter</h4>
                <p>
                  Tamen quem nulla quae legam multos aute sint culpa legam
                  noster magna
                </p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>

              <div className="container d-md-flex py-4">
                <div className="mr-md-auto text-center text-md-left">
                  <div className="copyright">
                    &copy; Copyright{" "}
                    <strong>
                      <span>Company</span>
                    </strong>
                    . All Rights Reserved
                  </div>
                  <div className="credits">
                    Designed by{" "}
                    <a href="https://bootstrapmade.com/">BootstrapMade</a>
                  </div>
                </div>
                <div className="social-links text-center text-md-right pt-3 pt-md-0">
                  <Link to="" className="twitter">
                    <i className="bx bxl-twitter"></i>
                  </Link>
                  <Link to="" className="facebook">
                    <i className="bx bxl-facebook"></i>
                  </Link>
                  <Link to="" className="instagram">
                    <i className="bx bxl-instagram"></i>
                  </Link>
                  <Link to="" className="google-plus">
                    <i className="bx bxl-skype"></i>
                  </Link>
                  <Link to="" className="linkedin">
                    <i className="bx bxl-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
