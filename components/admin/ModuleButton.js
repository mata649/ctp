import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
export const ModuleButton = ({ title, href, icon }) => {
  return (
    <div className="mt-5 col-12 col-sm-6 col-md-4">
      <Link href={href} passHref>
        <div className="admin-module w-full p-4 d-flex flex-column justify-content-center">
          <h4 className="text-center">{title}</h4>
          <FontAwesomeIcon icon={icon} />
        </div>
      </Link>
    </div>
  );
};
