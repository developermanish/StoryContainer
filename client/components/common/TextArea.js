import React from "react";
// import PropTypes from "prop-types";

import Label from "./Label";
import Tooltip from "./Tooltip";

const TextArea = ({
    id, label, required = false, error, ...inputProps
}) => (
        <div className="flex flex-col mb-3 max-w-full relative">
            <Label id={id} label={label} error={error} required={required} />
            <textarea {...inputProps}></textarea>
            {error && <Tooltip message={error} />}
        </div>
    );

export default TextArea;
