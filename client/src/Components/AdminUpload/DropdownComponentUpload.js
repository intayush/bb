import React  from "react";
import Grid from "@material-ui/core/Grid";

import Select from "react-select";

const DropdownComponentUpdate = (props) => {

  let dropdownDiv;
  dropdownDiv = (
    <Select options={props.optionsObject} onChange={props.onClickFunction} />
  );

  return (
    <Grid container component="div" direction="row">
      <Grid item xs={12} md={12} sm={12} lg={12}>
        <div>
          <label>{props.labelName}</label>
          {dropdownDiv}
        </div>
      </Grid>
    </Grid>
  );
};

export default DropdownComponentUpdate;
