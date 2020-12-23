import React from "react";
import "./mobileFilterPage.css";
import FilterWidget from "./widgetsForMobileFilterPage/mobileFilterPageCategWidget";
import CityWidget from "./widgetsForMobileFilterPage/mobileFilterPageCityWidget";
import BudgetWidget from "./widgetsForMobileFilterPage/mobileFilterPageBudgetWidget";
import BrandWidget from "./widgetsForMobileFilterPage/mobileFilterPageBrandWidget";
import { BRANDS } from "../../../shared/mappings/brands";
import YearWidget from "./widgetsForMobileFilterPage/mobileFilterPageYearWidget";
import KmWidget from "./widgetsForMobileFilterPage/kmWidget/MobileFilterkmWidget";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


const mobileFilterPage = () => {
  return (
    <div className="container">
      <div className="innerContainer">
        <p style={{ fontSize: "15.5px", fontWeight: "bold" }}>Filter</p>
        <FilterWidget />
        <br />
        <CityWidget />
        <br />
        <BudgetWidget
          clear={1}
          budget={[0, 15000, 25000, 35000, 45000, 55000, 100000]}
        />
        <br />
        <BrandWidget brands={BRANDS} />
        <br />
        <YearWidget startYear={2005} endYear={2020} />
        <br />
        <KmWidget />
      </div>
      <div className="bottomButtonsGroup">
        <Link style={{ letterSpacing: "0px" }} to="/">
          <Button
            style={{ width: "149px", height: "32px" }}
            variant="contained"
          >
            Cancel
          </Button>
        </Link>
        <Button
          style={{ width: "149px", height: "32px" }}
          variant="contained"
          color="secondary"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
export default mobileFilterPage;
