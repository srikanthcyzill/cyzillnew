import React from 'react';
import { Avatar } from "@nextui-org/react";

const AgentDetails = ({ property }) => {
    return (
        <div className="w-72 h-80 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
            <div className="agent-details mt-4">
                <h2 className="text-xl font-semibold">{`${property.personalDetails.charAt(0).toUpperCase() + property.personalDetails.slice(1)} Details`}</h2>
            </div>
            <Avatar src={property.photo} size="lg" />
            <h2 className="mt-4 text-xl my-8 font-semibold">{property.username}</h2>
            <p className="text-center">{property.phoneNumber || property.email}</p>
        </div>
    );
};

export default AgentDetails;
