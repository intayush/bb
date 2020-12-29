import React, { useEffect } from "react";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyle = makeStyles(theme =>({
    body: {
        backgroundColor: '#f7f7f7'
    },
    banner: {
        marginTop: theme.spacing(5)
    },
    paper: {
        marginBottom: theme.spacing(5),
        boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.2) !important',
        padding: theme.spacing(3),
        fontSize: 16,
        letterSpacing: 0.63,
        color: '#000000',
        lineHeight: '28px'
    },
    paperHeading: {
        fontSize: 36,
        letterSpacing: 1.07,
        color: '#eb2c2d',
        fontWeight: 600
    },
    subHeading: {
        fontSize: 18,
        lineHeight: '26px',
        letterSpacing: 0.53,
        color: '#000000',
        fontWeight: 600
    },
    li:{
        listStyleType: 'disc !important',
        marginLeft: 50
    },
    mobileli:{
        listStyleType: 'disc !important',
        marginLeft: 10
    },
    mobileView:{
        marginBottom: theme.spacing(5),
        boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.2) !important',
        padding: theme.spacing(3),
        fontSize: 10,
        color: '#000000',
       
    },mobilepaperHeading: {
        fontSize: 15,
        color: '#ff0000',
        fontWeight: 600
    },mobilesubheading:{
        fontSize:"13px",
        fontWeight:'bold'
    }

}));

const PrivacyPolicy = props => {
    const classes = useStyle();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() =>{
        try {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        } catch (error) {
          window.scrollTo(0, 0);
        }
      },[])

    return (
        <Paper >
                {matches?   <div id="PrivacyPolicy" className={classes.body}>
            {/* <Header /> */}
            <MainMenu/>
            <Grid container component="div" direction="row" justify="center" alignItems="center">
                <Grid item xs={11} sm={11} md={11} lg={11} className={classes.banner}>
                    <Banner
                        navigation="Privacy Policy"
                        heading="Privacy Policy"
                        text=""
                        path={props.location.pathname}
                    />
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.paper}>
                     This Privacy Policy is for the Visitors of the BikeBazaar website. Website www.bikebazaar.com is owned and operated by “Blubird Auto Trade Private Limited”. Through BikeBazaar website, we provide access to users to products, services and information available therein.
                    <br/><br/>
                    We value the trust you place on BikeBazaar, it’s why BikeBazaar is governed by the highest possible standards to protect your privacy.
                    <br/><br/>
                    Please read our ‘Privacy Policy’ & ‘Terms & Conditions’ before starting using our services. By using BikeBazaar services, you are deemed to agree to our ‘Privacy Policy’ and ‘Term & Conditions’. If you wish to not bind yourself by our privacy policy, please do not use our services and unsubscribe from the website. 
                    <br/><br/>
                    This privacy policy of BikeBazaar is an electronic record in the form of electronic contract as per the ‘Information Technology Act, 2000’ and rules made thereunder and don’t require any physical copy, signature or seal.
                    <br/><br/>
                    BikeBazaar privacy policy can be changed anytime without any notice. And you are required to check the privacy policy periodically to keep yourself updated with the changes.
                    <br/><br/>
                    This privacy policy applies to users who come to BikeBazaar website and transact and extends to those users who just access the information and don’t transact.</Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.paper}>
                        <span className={classes.paperHeading}>Information we collect,<br/> store and use</span><br/>
                        BikeBazaar collects a range of information about you to provide relevant products, services, information and offers. All your information is secure with us and it is free of any probable misuse. 
                        <br/><br/>
                        Following are some ways through which we collect information about you:
                        <br/><br/>
                        <h4 className={classes.subHeading}>Personal Information</h4><br/>
                        We collect and save your personal information voluntarily submitted by you on BikeBazaar website. <br/> <br/>
                        While you can browse some sections of BikeBazaar website without the requirement of sharing your personal information, you would be required to share your personal information for accessing some sections of the website. 
                        <br/><br/>
                        This information could be your Name, Mobile Number, Email ID, Your Preferences related to Two-Wheeler, Gender, Interest in taking a loan and other relevant and specific information about you.
                        <br/><br/>
                        We collect this information to offer you a personalized experience on our website and to provide you customized products, services and information. 
                        <br /> <br />
                        Your personal information is safe with us and we do not share it with any third party. 
                        Even if we are required to share it with any third party to offer you relevant products, services and information we do share it in an anonymized manner.
                        <br /> <br />
                        <h4 className={classes.subHeading}>Cookies</h4><br/>
                        To be able to provide you relevant information, products and services, we are required to drop cookies on your computer which are alphanumeric information enabling us to recognize your browser and serve you better. 
                        <br/><br/>
                        The webpages you visit on BikeBazaar and site search keywords you use to search within the website, are recorded to provide you relevant information and resources better suited for your specific requirements. 
                        <br/><br/>
                        If you don’t wish that your website actions be tracked through cookies, you can update your browser settings and decide how you want to control the cookies for BikeBazaar.  Through browser settings, you can prevent the browser from accepting the cookies for any website and disable the cookies altogether.
                        <br/><br/>
                        <h4 className={classes.subHeading}>Engagement</h4><br/>
                        Your engagement with our brand is crucial for us. It helps us in deciding whether you are the right <br/>audience for us or not which in turn helps you get better products and services. It’s why we regularly check your engagement with our brand. We do check email open rates, click rates for the emails sent to you. You are given full freedom to unsubscribe from our services anytime and stop us from checking the engagement rates.
                        <br/><br/>
                        <h4 className={classes.subHeading}>IP Address</h4><br/>
                        BikeBazaar’s Web Servers collect your IP Address transmitted by your router which helps us to get more information about our visitors.
                        <br/><br/>
                        We do not collect following information:
                        <ul>
                            <li className={classes.li}>We do not collect any personal or sensitive information about you which has not been shared voluntarily by you.</li>
                            <li className={classes.li}>We do not track any browsing behaviour outside our own website.</li>
                        </ul>
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.paper}>
                        <h3 className={classes.paperHeading}>Security of your Information</h3><br/>
                        The Security of all your personal information is of utmost importance to us. We use SSL (Secure Sockets Layer) technology to encrypt your data and maintain its security as per international standards.
                        <br/><br/>
                        For the purpose of better security of your personal data, we may ask for proof of identity before disclosing your personal information to you. 
                        <br/><br/>
                        <h4 className={classes.subHeading}>Third-Party Web Tools</h4><br/>
                        We regularly use third party web tools which help us to provide you a better user experience of BikeBazaar website and serve you better. Your information shared with such third-party web tools is anonymised and you are given full freedom to opt-out of such web tools.
                        <br/><br/>
                        <h4 className={classes.subHeading}>Third-Party Websites</h4><br/>
                        To give you the opportunity to learn more about the industry and about the products and services you are interested in, we may provide links to resources of third-party websites. We make our best efforts to link to only those websites which are secure and reliable from any international standards.  
                        <br/><br/>
                        We may share some of your information with advertising portals (Like Google, Facebook) to show you customized ads which will have products and services you are interested in. And this is done in an anonymised manner.
                        <br/><br/>
                        All such third-party websites may have different policies for ‘Privacy’ and ‘Terms of use’. We don’t have any control over policies of such websites and are not responsible for its content. It’s why you are advised to go through the policies of such websites to be sure of the security of your data.
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.paper}>
                        <h3 className={classes.paperHeading}>Disclosure of your Information</h3><br/>
                        Due to the existing regulatory environment, we cannot ensure that none of your personal information will ever be disclosed not otherwise described in the Privacy Policy.
                        <br/><br/>
                        BikeBazaar is bound to share information about you when we are required to do so by a court of law for any legal proceedings.
                        <br/><br/>
                        BikeBazaar may also be required to share your information before any law enforcement officer or government agencies if disclosing such information is crucial to protect the rights and interests of BikeBazaar or its users or public. 
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.paper}>
                        <h3 className={classes.paperHeading}>Limitation to Internet Privacy</h3><br/>
                        We follow international standards and use the latest technologies for securing all your personal information from unauthorized usage, access, disclosure or sharing. Even after making all the efforts for securing your data, your personal information may be vulnerable to theft through hacking or any other illegal means. And we are not responsible in any way for such breach of data through illegal means.
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.paper}>
                        <h3 className={classes.paperHeading}>Reliability of Our Procedures</h3><br/>
                        In order to protect the data and privacy of our users, our whole team is regularly trained about the latest threats and safety measures to handle any contingencies related to a data breach. We strictly follow all the international standards related to collection, usage and disposal of your information. 
                    </Paper>
                </Grid>
            </Grid>
            <Footer/>
        </div>:<div id="PrivacyPolicy" className={classes.body}>
            {/* <Header /> */}
            <MainMenu/>
            <Grid container component="div" direction="row" justify="center" alignItems="center">
                <Grid item xs={11} sm={11} md={11} lg={11} className={classes.banner}>
                    <Banner
                        navigation="Privacy Policy"
                        heading="Privacy Policy"
                        text=""
                        path={props.location.pathname}
                    />
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.mobileView}>
                    This Privacy Policy is for the Visitors of the BikeBazaar website. Website www.bikebazaar.com is owned and operated by “Blubird Auto Trade Private Limited”. Through BikeBazaar website, we provide access to users to products, services and information available therein.
                    <br/><br/>
                    We value the trust you place on BikeBazaar, it’s why BikeBazaar is governed by the highest possible standards to protect your privacy.
                    <br/><br/>
                    Please read our ‘Privacy Policy’ & ‘Terms & Conditions’ before starting using our services. By using BikeBazaar services, you are deemed to agree to our ‘Privacy Policy’ and ‘Term & Conditions’. If you wish to not bind yourself by our privacy policy, please do not use our services and unsubscribe from the website. 
                    <br/><br/>
                    This privacy policy of BikeBazaar is an electronic <br/>record in the form of electronic contract as per the ‘Information Technology Act, 2000’ and rules made thereunder and don’t require any physical copy, signature or seal.
                    <br/><br/>
                    BikeBazaar privacy policy can be changed anytime without any notice. And you are required to check the privacy policy periodically to keep yourself updated with the changes.
                    <br/><br/>
                    This privacy policy applies to users who come to BikeBazaar website and transact and extends to those users who just access the information and don’t transact.</Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.mobileView}>
                        <span className={classes.mobilepaperHeading}>Information we collect,<br/> store and use</span><br/>
                        BikeBazaar collects a range of information about you to provide relevant products, services, information and offers. All your information is secure with us and it is <br/>free of any probable misuse. 
                        <br/><br/>
                        Following are some ways through which we collect information about you:
                        <br/><br/>
                        <h4 className={classes.mobilesubheading}>Personal Information</h4><br/>
                        We collect and save your personal information voluntarily submitted by you on BikeBazaar website. <br/> <br/>
                        While you can browse some sections of BikeBazaar website without the requirement of sharing your personal information, you would be required to share your personal information for accessing some sections of the website. 
                        <br/><br/>
                        This information could be your Name, Mobile Number, Email ID, Your Preferences related to Two-Wheeler, Gender, Interest in taking a loan and other relevant and specific information about you.
                        <br/><br/>
                        We collect this information to offer you a personalized experience on our website and to provide you customized products, services and information. 
                        <br /> <br />
                        Your personal information is safe with us and we do <br/>not share it with any third party. 
                        Even if we are required to share it with any third party to offer you relevant products, services and information we do share it in an anonymized manner.
                        <br /> <br />
                        <h4 className={classes.mobilesubheading}>Cookies</h4><br/>
                        To be able to provide you relevant information, products and services, we are required to drop cookies on your computer which are alphanumeric information enabling us to recognize your browser and serve you better. 
                        <br/><br/>
                        The webpages you visit on BikeBazaar and site search keywords you use to search within the website, are recorded to provide you relevant information and resources better suited for your specific requirements. 
                        <br/><br/>
                        If you don’t wish that your website actions be tracked through cookies, you can update your browser settings and decide how you want to control the cookies for BikeBazaar.  Through browser settings, you can prevent the browser from accepting the cookies for any website and disable the cookies altogether.
                        <br/><br/>
                        <h4 className={classes.mobilesubheading}>Engagement</h4><br/>
                        Your engagement with our brand is crucial for us. It helps us in deciding whether you are the right audience for us or not which in turn helps you get better products and services. It’s why we regularly check your engagement with our brand. We do check email open rates, click rates for the emails sent to you. You are given full freedom to unsubscribe from our services anytime and stop us from checking the engagement rates.
                        <br/><br/>
                        <h4 className={classes.mobilesubheading}>IP Address</h4><br/>
                        BikeBazaar’s Web Servers collect your IP Address transmitted by your router which helps us to get more information about our visitors.
                        <br/><br/>
                        We do not collect following information:
                        <ul>
                            <li className={classes.mobileli}>We do not collect any personal or sensitive information about you which has not been shared voluntarily by you.</li>
                            <li className={classes.mobileli}>We do not track any browsing behaviour outside our own website.</li>
                        </ul>
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.mobileView}>
                        <h3 className={classes.mobilepaperHeading}>Security of your Information</h3><br/>
                        The Security of all your personal information is of utmost importance to us. We use SSL (Secure Sockets Layer) technology to encrypt your data and maintain its security as per international standards.
                        <br/><br/>
                        For the purpose of better security of your personal data, we may ask for proof of identity before disclosing your personal information to you. 
                        <br/><br/>
                        <h4 className={classes.mobilesubheading}>Third-Party Web Tools</h4><br/>
                        We regularly use third party web tools which help us to provide you a better user experience of BikeBazaar website and serve you better. Your information shared with such third-party web tools is anonymised and you are given full freedom to opt-out of such web tools.
                        <br/><br/>
                        <h4 className={classes.mobilesubheading}>Third-Party Websites</h4><br/>
                        To give you the opportunity to learn more about the industry and about the products and services you are interested in, we may provide links to resources of <br/>third-party websites. We make our best efforts to link to only those websites which are secure and reliable from any international standards.  
                        <br/><br/>
                        We may share some of your information with advertising portals (Like Google, Facebook) to show you customized ads which will have products and services you are interested in. And this is done in an anonymised manner.
                        <br/><br/>
                        All such third-party websites may have different policies for ‘Privacy’ and ‘Terms of use’. We don’t have any control over policies of such websites and are not responsible for its content. It’s why you are advised to go through the policies of such websites to be sure of the security of your data.
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.mobileView}>
                        <h3 className={classes.mobilepaperHeading}>Disclosure of your Information</h3><br/>
                        Due to the existing regulatory environment, we cannot ensure that none of your personal information will ever be disclosed not otherwise described in the Privacy Policy.
                        <br/><br/>
                        BikeBazaar is bound to share information about you when we are required to do so by a court of law for any legal proceedings.
                        <br/><br/>
                        BikeBazaar may also be required to share your information before any law enforcement officer or government agencies if disclosing such information is crucial to protect the rights and interests of BikeBazaar or its users or public. 
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.mobileView}>
                        <h3 className={classes.mobilepaperHeading}>Limitation to Internet Privacy</h3><br/>
                        We follow international standards and use the latest technologies for securing all your personal information from unauthorized usage, access, disclosure or sharing. Even after making all the efforts for securing your data, your personal information may be vulnerable to theft through hacking or any other illegal means. And we are not responsible in any way for such breach of data through illegal means.
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className={classes.mobileView}>
                        <h3 className={classes.mobilepaperHeading}>Reliability of Our Procedures</h3><br/>
                        In order to protect the data and privacy of our users, our whole team is regularly trained about the latest threats and safety measures to handle any contingencies related to a data breach. We strictly follow all the international standards related to collection, usage and disposal of your information. 
                    </Paper>
                </Grid>
            </Grid>
            <Footer/>
        </div>}
           
        </Paper>
      
    )
}

export default PrivacyPolicy;