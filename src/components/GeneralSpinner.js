import React from "react";
import {FidgetSpinner} from "react-loader-spinner";

const GeneralSpinner = () => {
  return (
    <FidgetSpinner
      type='Bars'
      color='#123'
      height={100}
      width={100}
      className='general-spinner'
    />
  );
};

export default GeneralSpinner;
