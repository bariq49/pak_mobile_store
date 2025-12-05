import React from "react";

interface VariationErrorProps {
    variationName: string;
}

const VariationError: React.FC<VariationErrorProps> = ({ variationName }) => (
    <p className="text-13px text-brand-danger">
        Please select an item in {variationName.split("-").join(" ")}.
    </p>
);

export default VariationError;