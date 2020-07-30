import React from 'react';

export const showErrorMsg = (errMsg)=>(
    <div className="alert alert-danger" role="alert">
    {errMsg}
  </div>
);

export const showSucessMsg = (sucessMsg)=>(
    <div className="alert alert-success" role="alert">
  {sucessMsg}
</div>
);
