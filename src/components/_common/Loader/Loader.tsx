import React from "react";
import loaderImage from "assets/refinq.png";

type LoaderProps = {
  altText?: string;
  size?: number;
};

const Loader: React.FC<LoaderProps> = ({ altText = "Loading...", size = 50 }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <img src={loaderImage} alt={altText} width={size} height={size} className="animate-spin" />
    </div>
  );
};

export default Loader;
