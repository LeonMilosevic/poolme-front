import React from "react";
// import ui
import ErrorMsg from "./ErrorMsg";
import SuccessMsg from "./SuccessMsg";

export const handleError = error => <ErrorMsg msg={error} />;
export const handleSuccess = success => <SuccessMsg msg={success} />;
