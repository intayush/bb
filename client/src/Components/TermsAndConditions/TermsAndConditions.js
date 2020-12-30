import React, { useEffect } from "react";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyle = makeStyles((theme) => ({
  body: {
    backgroundColor: "#f7f7f7",
  },
  banner: {
    marginTop: theme.spacing(5),
  },
  paper: {
    marginBottom: theme.spacing(5),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: theme.spacing(3),
    fontSize: 16,
    letterSpacing: 0.63,
    color: "#000000",
    lineHeight: "28px",
  },
  paperHeading: {
    fontSize: 36,
    letterSpacing: 1.07,
    color: "#eb2c2d",
    fontWeight: 600,
  },
  subHeading: {
    fontSize: 18,
    lineHeight: "26px",
    letterSpacing: 0.53,
    color: "#000000",
    fontWeight: 600,
  },
  list: {
    marginLeft: 20,
    "& li": {
      listStyleType: "disc !important",
      marginTop: 10,
      marginBottom: 10,
    },
  },

  mobileList:{
    marginLeft: 15,
    "& li": {
      listStyleType: "disc !important",
      marginTop: 10,
      marginBottom: 10,
    },
  },
  black: {
    color: "black",
  },
  mobilePaper: {
    marginBottom: theme.spacing(3),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: "20px",
    fontSize: 10,
    color: "#000000",
  },
  mobilePaperHeading: {
    fontSize: 15,
    color: "#eb2c2d",
    fontWeight: "bold",
  },
  mobilePaperSubHeading: {
    fontSize: 13,
    color: "#232b2b",
    fontWeight: "bold",
  },
}));

const TermsAndConditions = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyle();

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  });

  return (
    <>
      {matches ? (
        <div id="TermsAndConditions" className={classes.body}>
          {/* <Header /> */}
          <MainMenu />
          <Grid
            container
            component="div"
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={11}
              sm={11}
              md={11}
              lg={11}
              className={classes.banner}
            >
              <Banner
                navigation="Terms and Conditions"
                heading="Terms and Conditions"
                text=""
                path={props.location.pathname}
              />
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                These ‘Terms and Conditions’ are for the users of the BikeBazaar
                website. Website www.BikeBazaar.com is owned and operated by
                ‘BluBird Auto Trade Private Limited’. Through BikeBazaar
                website, we provide access to users to our services, products
                and information present therein. <br /> <br />
                You are required to read our ‘Terms and Conditions’ and ‘Privacy
                Policy’ before starting using our services. By using BikeBazaar
                services, you agree to our ‘Terms and Conditions’ and ‘Privacy
                Policy’. If you don’t agree with our ‘Terms and Conditions’,
                please do not use our services and unsubscribe from BikeBazaar
                website.
                <br />
                <br />
                This document of ‘Terms and Conditions’ of BikeBazaar is an
                electronic record in terms of Information Technology Act, 2000
                and rules made thereunder and doesn’t require any physical copy,
                signature or seal.
                <br />
                <br />
                BikeBazaar reserves all the rights related to these ‘Terms and
                Conditions’ and these can be changed anytime without any notice.
                And you are required to check the ‘Terms and Conditions’
                periodically to keep yourself updated with the changes.
                <br />
                <br />
                These ‘Terms and Conditions’ apply to users who come to
                BikeBazaar website and transact and extend to those users who
                just access the information and don’t transact.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>Membership Eligibility</h3>
                <br />
                To qualify to be user of BikeBazaar website, you need to be of
                18+ age. If your age is lower than 18 years, you shall not
                register as a user of BikeBazaar and shall not use or transact
                on our website. If you wish to use or transact on our website,
                such use or transaction must be done by your parents or legal
                guardians. If you are found to be minor, BikeBazaar reserves all
                rights to terminate your membership.
                <br />
                <br />
                BikeBazaar reserves all the rights to terminate your membership
                at any point of time with or without giving any prior notice to
                you.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>Communication</h3>
                <br />
                When you share your information with us, you agree to receive
                communication from us in the form of SMS, telephone, email and
                other means. If you wish to opt out of this communication, it
                will be your sole responsibility to take the action upfront in
                this regard.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>
                  Intellectual Property Rights
                </h3>
                <br />
                BikeBazaar owns ‘Intellectual Property Rights’ (IPRs) related to
                all the information, media, resources and other content
                published on BikeBazaar website. Apart from your personal
                information, you don’t have any rights on information, media,
                resources or content published on this website. Any misuse of
                any of these intellectual properties is strictly prohibited and
                subjected to strict action against you as per court of law.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>
                  Additional Terms and Conditions for specific user groups
                </h3>
                <br />
                <h4 className={classes.subHeading}>Buyers</h4>
                <br />
                <ul className={classes.list}>
                  <li>
                    “Buyers” is the category of users who want to buy used
                    two-wheeler through franchise stores registered on
                    BikeBazaar website.
                  </li>
                  <li>
                    Buyers are required to share their correct information and
                    contact details. You solely are responsible for the
                    consequences of not sharing the correct details about you.
                  </li>
                  <li>
                    By sharing your information, you accept that we may
                    communicate to you through phone, Email, SMS or other means
                    of communication and you shall not have any issue in that.
                  </li>
                  <li>
                    Buyers can access the information about used two-wheelers
                    for the sole purpose of buying the vehicle.
                  </li>
                  <li>
                    Any other reason (apart from buying) for accessing the
                    information about the two-wheeler or BikeBazaar or franchise
                    stores will not be entertained.
                  </li>
                  <li>
                    Dealers/Mediators/Brokers cannot disguise themselves as
                    buyers and access the information related to Two-wheelers or
                    BikeBazaar or franchise stores. BikeBazaar reserves all the
                    rights related to qualifying or disqualifying anyone as
                    “Buyer”.
                  </li>
                </ul>
                <br />
                <br />
                <h4 className={classes.subHeading}>Sellers</h4>
                <br />
                <ul className={classes.list}>
                  <li>
                    “Sellers” is the category of users who want to sell their
                    used two-wheeler through BikeBazaar website or franchise
                    stores.
                  </li>
                  <li>
                    Sellers are required to share correct information about
                    themselves while submitting their personal information on
                    the website.
                  </li>
                  <li>
                    Sellers should not share any fake information about their
                    vehicle. You solely are responsible for the consequences of
                    not sharing the correct details about your vehicle.
                  </li>
                  <li>
                    Contact from available on the “Seller” page can only be
                    filled and submitted by sellers of two-wheelers. Any other
                    category of users will not be entertained on this webpage.
                    And you should fill this form only when you want to sell
                    your used two-wheeler through BikeBazaar website or store.
                  </li>
                  <li>
                    Sellers need to upload pics of their two-wheelers only,
                    which they want to sell. Any other image uploaded by you
                    will not be entertained and you solely are responsible for
                    the consequences. Uploading obscene images may even land you
                    in legal troubles. It’s why, the process of uploading the
                    two-wheeler images should be done very carefully by you.
                  </li>
                  <li>
                    Dealers/Mediators/Brokers cannot disguise themselves as
                    sellers. BikeBazaar reserves all the rights related to
                    qualifying or disqualifying someone as “Seller”.
                  </li>
                </ul>
                <br />
                <br />
                <h4 className={classes.subHeading}>Franchisee</h4>
                <br />
                <ul className={classes.list}>
                  <li>
                    “Franchisee” is the category of users who want to partner
                    with BikeBazaar in establishing BikeBazaar franchise stores
                    in their premises.
                  </li>
                  <li>
                    Franchisee are required to share correct information while
                    showing interest in becoming our franchisee partner. You
                    only are responsible for the consequences of sharing the
                    fake information.
                  </li>
                  <li>
                    Contact Form available on ‘Franchisee’ page can only be
                    filled and submitted by users willing to become our
                    franchise partners. Any other category of users will not be
                    entertained on this webpage.
                  </li>
                  <li>
                    BikeBazaar reserves all the rights related to qualifying or
                    disqualifying someone as Franchisee.
                  </li>
                </ul>
                <br />
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>Prohibited Conduct</h3>
                <br />
                By accessing BikeBazaar website or visiting franchise store or
                availing any of our services, you agree not to:
                <ul className={classes.list}>
                  <li>Violate Terms and Conditions.</li>
                  <li>
                    Faking your identity, faking any information about you or
                    referring yourself as the wrong user group (Buyer, Sellers
                    or Franchisee).
                  </li>
                  <li>
                    Infringe BikeBazaar’s or any of our partners’ intellectual
                    property rights.
                  </li>
                  <li>
                    Using BikeBazaar services if you are below the age of 18 not
                    accompanied with parents or local guardian.
                  </li>
                  <li>
                    Share, post or transmit any information, image or data which
                    is pornographic in nature or vulgar of offensive.
                  </li>
                  <li>
                    Share, transmit or post any data, image or information which
                    is about private or personal matters of any person.
                  </li>
                  <li>
                    Refuse to confirm your identity when asked by BikeBazaar to
                    do so.
                  </li>
                  <li>
                    Interfere, damage or disable security related features of
                    BikeBazaar website or App.
                  </li>
                  <li>
                    Use BikeBazaar website or Mobile App in any manner which
                    could interfere with the normal or automated functioning of
                    user journey on the website or mobile app.
                  </li>
                  <li>
                    Affect the operations of BikeBazaar by any means, including
                    but not limited to, disseminating viruses, adware, spyware,
                    worms or other malicious code or file with contaminating or
                    destructive features.
                  </li>
                  <li>
                    Use any automatic program, spider, Robot or manual process
                    to monitor, analyse or copy the BikeBazaar platform without
                    prior written permission.
                  </li>
                  <li>
                    Perform any action which increases load on BikeBazaar
                    networks, servers or system.
                  </li>
                  <li>
                    Use the assets, facilities or capabilities of BikeBazaar to
                    conduct any activity which is illegal or infringes the
                    rights of others.
                  </li>
                  <li>
                    Use BikeBazaar platform to gather its users’ personal or
                    financial information without taking the prior permission
                    from BikeBazaar.
                  </li>
                  <li>
                    Use BikeBazaar services that may result in dispute, fraud,
                    complaints, fee, penalty, fines or any liability on
                    BikeBazaar, any third party or you.
                  </li>
                  <li>
                    Take any action which affects the BikeBazaar brand in any
                    negative way.
                  </li>
                  <li>
                    Take any action which causes BikeBazaar to lose any of its
                    partners, associates, employees or service providers.
                  </li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>Termination</h3>
                <br />
                You agree that BikeBazaar reserves all the rights related to
                your account and it can, for any or no reason, may suspend or
                terminate your account or your use of BikeBazaar platform,
                facilities or any of its services. This termination of your
                account or services to you, can be done with or without notice
                and BikeBazaar won’t be liable for any loss for you or any third
                party. Upon termination for any reason, you agree to immediately
                stop using the BikeBazaar platform and its services.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>
                  Governing Law and Forum for Disputes
                </h3>
                <br />
                Any claim or dispute you might have against BikeBazaar must be
                resolved by a court having jurisdiction in Pune, Maharashtra,
                India. This Agreement shall be governed by Indian law only and
                this paragraph shall survive termination of this Agreement.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>Credit and EMI</h3>
                <br />
                BikeBazaar through its credit partners facilitates low cost EMI
                option to buyers to purchase their dream two-wheeler. However,
                availability of credit varies profile to profile basis. And the
                amount of loan, minimum EMI possible and term of loan depends
                upon your credit history and CIBIL Score.
                <br />
                <br />
                Any decision taken by the credit partner regarding the loan will
                be final and you cannot request to alter it.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>
                  Warranty and Buyer Protection
                </h3>
                <br />
                BikeBazaar facilitates 6 months’ (or such other period as may be
                decided by BikeBazaar) warranty on all refurbished pre-owned
                two-wheelers which is extendable beyond 6 months’ time (or such
                period as may be decided by BikeBazaar) through third party
                providing warranty solutions and administration. BikeBazaar
                reserves all rights to decide whether it wants to facilitate
                extended warranty on any two-wheeler or not. The said warranty
                coverage is provided for only some specific parts of
                two-wheeler.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>Indemnity</h3>
                <br />
                You shall indemnify and hold harmless BikeBazaar website, Mobile
                App, it’s owners, licensees, affiliates, subsidiaries,
                associated companies, group companies and their respective
                employees, agents, directors, investors, from any demand or
                claim or actions arising out of your breach of BikeBazaar’s
                ‘Terms and Conditions’ or ‘Privacy Policy’, or your violation of
                any rules, law or regulations or the rights of a third party, or
                legal code formulated by Indian government.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>
                  Modification of this Agreement
                </h3>
                <br />
                BikeBazaar reserves all rights to modify, change, add or remove
                portions of this agreement at any time. The changes will become
                effective as soon as they are published and deemed accepted by
                you. If you do not agree with such changes, you have all right
                to stop using the BikeBazaar website, app or services. For
                Certain changes, we might require notifying you in advance and
                BikeBazaar will comply with such requirements.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>
                  Violation of this Policy
                </h3>
                <br />
                Violation of BikeBazaar’s Terms and Conditions may result in a
                series of actions including;
                <ul className={classes.list}>
                  <li>Account Suspension</li>
                  <li>Limitations on Account</li>
                  <li>Loss of special status or Privileges</li>
                  <li>Other penalties or limitations</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h3 className={classes.paperHeading}>Contact Us</h3>
                <br />
                You may reach out to us for any questions or comments regarding
                usage of BikeBazaar’s website, mobile app or services. Please
                write to us at{" "}
                <span className={classes.red}>legal@bikebazaar.com</span> with a
                thorough description of such concerns/issues faced by you and we
                will try to resolve the issue for you.
              </Paper>
            </Grid>
          </Grid>
          <Footer />
        </div>
      ) : (
        <div id="TermsAndConditions" className={classes.body}>
          {/* <Header /> */}
          <MainMenu />
          <Grid
            container
            component="div"
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={11}
              sm={11}
              md={11}
              lg={11}
              className={classes.banner}
            >
              <Banner
                navigation="Terms and Conditions"
                heading="Terms and Conditions"
                text=""
                path={props.location.pathname}
              />
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                These ‘Terms and Conditions’ are for the users of the BikeBazaar
                website. Website www.BikeBazaar.com <br/>is owned and operated by
                ‘BluBird Auto Trade Private Limited’. Through BikeBazaar
                website, we provide <br/>access to users to our services, products
                and <br/>information present therein. <br /> <br />
                You are required to read our ‘Terms and Conditions’ and ‘Privacy
                Policy’ before starting using our services. By using BikeBazaar
                services, you agree to our ‘Terms and Conditions’ and ‘Privacy
                Policy’. If you don’t agree with<br/> our ‘Terms and Conditions’,
                please do not use our<br/> services and unsubscribe from BikeBazaar
                website.
                <br />
                <br />
                This document of ‘Terms and Conditions’ of BikeBazaar<br/> is an
                electronic record in terms of Information <br/> Technology Act, 2000
                and rules made thereunder and doesn’t require any physical copy,
                signature or seal.
                <br />
                <br />
                BikeBazaar reserves all the rights related to these  <br/>‘Terms and
                Conditions’ and these can be changed anytime without any notice.
                And you are required to check the ‘Terms and Conditions’
                periodically to keep yourself updated with the changes.
                <br />
                <br />
                These ‘Terms and Conditions’ apply to users who come <br/>to
                BikeBazaar website and transact and extend to <br/>those users who
                just access the information and don’t transact.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>Membership Eligibility</h3>
                <br />
                To qualify to be user of BikeBazaar website, you need to be of
                18+ age. If your age is lower than 18 years, you shall not
                register as a user of BikeBazaar and shall not use or transact
                on our website. If you wish to use or transact <br/>on our website,
                such use or transaction must be done<br/> by your parents or legal
                guardians. If you are found to<br/> be minor, BikeBazaar reserves all
                rights to terminate<br/> your membership.
                <br />
                <br />
                BikeBazaar reserves all the rights to terminate your membership
                at any point of time with or without giving any prior notice to
                you.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>Communication</h3>
                <br />
                When you share your information with us, you agree <br/> to receive
                communication from us in the form of SMS, telephone, email and
                other means. If you wish to opt <br/> out of this communication, it
                will be your sole responsibility to take the action upfront in
                this regard.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>
                  Intellectual Property Rights
                </h3>
                <br />
                BikeBazaar owns ‘Intellectual Property Rights’ (IPRs) related to
                all the information, media, resources and <br/>other content
                published on BikeBazaar website. <br/>Apart from your personal
                information, you don’t have <br/>any rights on information, media,
                resources or content published on this website. Any misuse of
                any of these intellectual properties is strictly prohibited and
                <br/> subjected to strict action against you as per court of <br/>law.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>
                  Additional Terms and Conditions <br/>for specific user groups
                </h3>
                <br />
                <h4 className={classes.mobilePaperSubHeading}>Buyers</h4>
                <br />
                <ul className={classes.mobileList}>
                  <li>
                    “Buyers” is the category of users who want to<br/> buy used
                    two-wheeler through franchise stores registered on
                    BikeBazaar website.
                  </li>
                  <li>
                    Buyers are required to share their correct <br/>information and
                    contact details. You solely are responsible for the
                    consequences of not sharing the correct details about you.
                  </li>
                  <li>
                    By sharing your information, you accept that we <br/>may
                    communicate to you through phone, Email, <br/>SMS or other means
                    of communication and you <br/> shall not have any issue in that.
                  </li>
                  <li>
                    Buyers can access the information about used <br/>two-wheelers
                    for the sole purpose of buying the vehicle.
                  </li>
                  <li>
                    Any other reason (apart from buying) for accessing <br/> the
                    information about the two-wheeler or<br/> BikeBazaar or franchise
                    stores will not be <br/>entertained.
                  </li>
                  <li>
                    Dealers/Mediators/Brokers cannot disguise <br/>themselves as
                    buyers and access the information related to Two-wheelers or
                    BikeBazaar or franchise stores. BikeBazaar reserves all the
                    rights related to qualifying or disqualifying anyone as
                    “Buyer”.
                  </li>
                </ul>
                {matches?<>  <br />
                <br /></>:<></>}
              
                <h4 className={classes.mobilePaperSubHeading}>Sellers</h4>
                <br />
                <ul className={classes.mobileList}>
                  <li>
                    “Sellers” is the category of users who want to sell <br/>their
                    used two-wheeler through BikeBazaar website <br/>or franchise
                    stores.
                  </li>
                  <li>
                    Sellers are required to share correct information <br/>about
                    themselves while submitting their personal information on
                    the website.
                  </li>
                  <li>
                    Sellers should not share any fake information about their
                    vehicle. You solely are responsible for the consequences of
                    not sharing the correct details about your vehicle.
                  </li>
                  <li>
                    Contact from available on the “Seller” page can only be
                    filled and submitted by sellers of two-wheelers.<br/> Any other
                    category of users will not be entertained on this webpage.
                    And you should fill this form only when you want to sell
                    your used two-wheeler through BikeBazaar website or store.
                  </li>
                  <li>
                    Sellers need to upload pics of their two-wheelers <br/>only,
                    which they want to sell. Any other image uploaded by you
                    will not be entertained and you<br/> solely are responsible for
                    the consequences.<br/> Uploading obscene images may even land you
                    in <br/>legal troubles. It’s why, the process of uploading the
                    two-wheeler images should be done very carefully by you.
                  </li>
                  <li>
                    Dealers/Mediators/Brokers cannot disguise <br/> themselves as
                    sellers. BikeBazaar reserves all the<br/> rights related to
                    qualifying or disqualifying someone as “Seller”.
                  </li>
                </ul>
                {matches? <>   <br />
                <br /></>:<></>}
             
                <h4 className={classes.mobilePaperSubHeading}>Franchisee</h4>
                <br />
                <ul className={classes.mobileList}>
                  <li>
                    “Franchisee” is the category of users who want to partner
                    with BikeBazaar in establishing BikeBazaar franchise stores
                    in their premises.
                  </li>
                  <li>
                    Franchisee are required to share correct <br/> information while
                    showing interest in becoming our franchisee partner. You
                    only are responsible for the consequences of sharing the
                    fake information.
                  </li>
                  <li>
                    Contact Form available on ‘Franchisee’ page can <br/>only be
                    filled and submitted by users willing to become our
                    franchise partners. Any other category <br/>of users will not be
                    entertained on this webpage.
                  </li>
                  <li>
                    BikeBazaar reserves all the rights related to<br/> qualifying or
                    disqualifying someone as Franchisee.
                  </li>
                </ul>
                <br />
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>Prohibited Conduct</h3>
                <br/>
                By accessing BikeBazaar website or visiting franchise store or
                availing any of our services, you agree not to:
                <ul className={classes.mobileList}>
                  <li>Violate Terms and Conditions.</li>
                  <li>
                    Faking your identity, faking any information about<br/> you or
                    referring yourself as the wrong user group <br/>(Buyer, Sellers
                    or Franchisee).
                  </li>
                  <li>
                    Infringe BikeBazaar’s or any of our partners’ intellectual
                    property rights.
                  </li>
                  <li>
                    Using BikeBazaar services if you are below the <br/>age of 18 not
                    accompanied with parents or local guardian.
                  </li>
                  <li>
                    Share, post or transmit any information, image or<br/> data which
                    is pornographic in nature or vulgar of offensive.
                  </li>
                  <li>
                    Share, transmit or post any data, image or<br/> information which
                    is about private or personal <br/>matters of any person.
                  </li>
                  <li>
                    Refuse to confirm your identity when asked by BikeBazaar to
                    do so.
                  </li>
                  <li>
                    Interfere, damage or disable security related features of
                    BikeBazaar website or App.
                  </li>
                  <li>
                    Use BikeBazaar website or Mobile App in any <br/>manner which
                    could interfere with the normal or automated functioning of
                    user journey on the<br/> website or mobile app.
                  </li>
                  <li>
                    Affect the operations of BikeBazaar by any means, including
                    but not limited to, disseminating viruses, adware, spyware,
                    worms or other malicious code or file with contaminating or
                    destructive features.
                  </li>
                  <li>
                    Use any automatic program, spider, Robot or manual process
                    to monitor, analyse or copy the BikeBazaar platform without
                    prior written permission.
                  </li>
                  <li>
                    Perform any action which increases load on BikeBazaar
                    networks, servers or system.
                  </li>
                  <li>
                    Use the assets, facilities or capabilities of BikeBazaar<br/> to
                    conduct any activity which is illegal or infringes<br/> the
                    rights of others.
                  </li>
                  <li>
                    Use BikeBazaar platform to gather its users’ personal or
                    financial information without taking the prior permission
                    from BikeBazaar.
                  </li>
                  <li>
                    Use BikeBazaar services that may result in dispute, fraud,
                    complaints, fee, penalty, fines or any liability on
                    BikeBazaar, any third party or you.
                  </li>
                  <li>
                    Take any action which affects the BikeBazaar brand <br/>in any
                    negative way.
                  </li>
                  <li>
                    Take any action which causes BikeBazaar to lose any<br/> of its
                    partners, associates, employees or service providers.
                  </li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>Termination</h3>
                <br />
                You agree that BikeBazaar reserves all the rights related to
                your account and it can, for any or no reason, may suspend or
                terminate your account or your use of BikeBazaar platform,
                facilities or any of its services. This termination of your
                account or services to you, can be done with or without notice
                and BikeBazaar won’t be liable for any loss for you or any third
                party. Upon termination for any reason, you agree to immediately
                stop using the BikeBazaar platform and its services.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>
                  Governing Law and Forum for Disputes
                </h3>
                <br />
                Any claim or dispute you might have against<br/> BikeBazaar must be
                resolved by a court having jurisdiction in Pune, Maharashtra,
                India. This Agreement shall be governed by Indian law only and
                this paragraph shall survive termination of this Agreement.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>Credit and EMI</h3>
                <br />
                BikeBazaar through its credit partners facilitates low <br/>cost EMI
                option to buyers to purchase their dream<br/> two-wheeler. However,
                availability of credit varies profile to profile basis. And the
                amount of loan, minimum EMI possible and term of loan depends
                upon your credit history and CIBIL Score.
                <br />
                <br />
                Any decision taken by the credit partner regarding the loan will
                be final and you cannot request to alter it.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>
                  Warranty and Buyer Protection
                </h3>
                <br />
                BikeBazaar facilitates 6 months’ (or such other period as may be
                decided by BikeBazaar) warranty on all refurbished pre-owned
                two-wheelers which is<br/> extendable beyond 6 months’ time (or such
                period as may be decided by BikeBazaar) through third party
                providing warranty solutions and administration. BikeBazaar
                reserves all rights to decide whether it<br/> wants to facilitate
                extended warranty on any<br/> two-wheeler or not. The said warranty
                coverage is provided for only some specific parts of
                two-wheeler.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>Indemnity</h3>
                <br />
                You shall indemnify and hold harmless BikeBazaar website, Mobile
                App, it’s owners, licensees, affiliates, subsidiaries,
                associated companies, group companies<br/> and their respective
                employees, agents, directors, investors, from any demand or
                claim or actions<br/> arising out of your breach of BikeBazaar’s
                ‘Terms and Conditions’ or ‘Privacy Policy’, or your violation of
                any rules, law or regulations or the rights of a third party, or
                legal code formulated by Indian government.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>
                  Modification of this Agreement
                </h3>
                <br />
                BikeBazaar reserves all rights to modify, change, add or remove
                portions of this agreement at any time. The changes will become
                effective as soon as they are published and deemed accepted by
                you. If you do not agree with such changes, you have all right
                to stop<br/> using the BikeBazaar website, app or services. For
                <br/>Certain changes, we might require notifying you in advance and
                BikeBazaar will comply with such requirements.
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>
                  Violation of this Policy
                </h3>
                <br />
                Violation of BikeBazaar’s Terms and Conditions may result in a
                series of actions including;
                <ul className={classes.mobileList}>
                  <li>Account Suspension</li>
                  <li>Limitations on Account</li>
                  <li>Loss of special status or Privileges</li>
                  <li>Other penalties or limitations</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.mobilePaper}>
                <h3 className={classes.mobilePaperHeading}>Contact Us</h3>
                <br />
                You may reach out to us for any questions or comments regarding
                usage of BikeBazaar’s website, mobile app or services. Please
                write to us at{" "}
                <span className={classes.black}>legal@bikebazaar.com</span> with a
                thorough description of such concerns/issues faced by you and we
                will try to resolve the issue for you.
              </Paper>
            </Grid>
          </Grid>
          <Footer />
        </div>
      )}
    </>
  );
};

export default TermsAndConditions;
