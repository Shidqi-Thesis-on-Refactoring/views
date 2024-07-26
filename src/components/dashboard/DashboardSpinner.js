import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const DashboardSpinner = () => {
  return (
    <FidgetSpinner
      type='Circles'
      color='#123'
      height={100}
      width={100}
      className='dashboard-spinner'
    />
  );
};

export default DashboardSpinner;
