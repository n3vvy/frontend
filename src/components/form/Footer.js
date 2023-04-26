import React from 'react'
import partner1 from '../../assets/images/ewroon-profile-partner.png';
import partner2 from '../../assets/images/edenitoo-profile-partner.png';
import partner3 from '../../assets/images/diables-profile-partner.png';
import partner4 from '../../assets/images/exhiie-profile-partner.png';
import social1 from '../../assets/social/Instagram.png';
import social2 from '../../assets/social/Twitter.png';
import social3 from '../../assets/social/Youtube.png';
import social4 from '../../assets/social/facebook.png';
import { Link } from 'react-router-dom';

const Footer = () => {
const footerWidth = "30px";

  return (
    <section className='footer-wrapper'>
        <div className='footer-center'>
        <div className='footer-left'>
            <h5>Partnerzy:</h5>
        <div className='footer-partner-list'>
            <a href='https://www.twitch.tv/ewroon'>
            <div className='footer-single-partner'>
                <img src={partner1} alt='patrner-ewroon' width={footerWidth} className='single-partner-img'></img>
                <p>Ewroon</p>
            </div>
            </a>
            <a href='https://www.twitch.tv/edenitoo'>
            <div className='footer-single-partner'>
                <img src={partner2} alt='patrner1' width={footerWidth} className='single-partner-img'></img>
                <p>Edenitoo</p>
            </div>
            </a>
            <a href='https://www.twitch.tv/diables'>
            <div className='footer-single-partner'>
                <img src={partner3} alt='patrner1' width={footerWidth} className='single-partner-img'></img>
                <p>Diables</p>
            </div>
            </a>
            <a href='https://www.twitch.tv/exhiie'>
            <div className='footer-single-partner'>
                <img src={partner4} alt='patrner1' width={footerWidth} className='single-partner-img'></img>
                <p>exhiie</p>
            </div>
            </a>
        </div>
        </div>
        <div className='footer-right'>
        <h4>Ogólne:</h4>
            <Link to='/about-us' style={{textDecoration: "none", color: "#ffffff"}}>O nas</Link>
            <Link to='/contact' style={{textDecoration: "none", color: "#ffffff"}}>Kontakt</Link>
            <Link to='/privacy-policy' style={{textDecoration: "none", color: "#ffffff"}}>Polityka prywatności</Link>
            <Link to='/terms-and-conditions' style={{textDecoration: "none", color: "#ffffff"}}>Warunki i zasady</Link>
        </div>
        <div className='footer-social'>
        <h3>Social Media:</h3>
        <div className= 'footer-social-element'> 
         <Link to='https://www.instagramk.com' style={{textDecoration: "none", margin: "0 auto", color: "#ffffff"}}><img src={social1}alt='social1' width={footerWidth} className='single-partner-img'></img></Link> 
         <Link to='https://www.twitter.com/home' style={{textDecoration: "none", margin: "0 auto", color: "#ffffff"}}><img src={social2}alt='social2' width={footerWidth} className='single-partner-img'></img></Link> 
        </div>
        <div className= 'footer-social-element'>
         <Link to='https://youtube.com/home' style={{textDecoration: "none", margin: "0 auto", color: "#ffffff"}}><img src={social3}alt='social3' width={footerWidth} className='single-partner-img'></img></Link> 
         <Link to='https://www.facebook.com' style={{textDecoration: "none", margin: "0 auto", color: "#ffffff"}}><img src={social4}alt='social4' width={footerWidth} className='single-partner-img'></img></Link> 
        </div>
        </div>
        </div>
    </section>
  )
}

export default Footer