"use client";

import { useEffect, useState } from "react";
import "./CSS/LoadingScreen.css";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img
          src="/SNAPBUY (4).png"
          alt="SnapBuy Logo"
          className="loading-logo"
        />
      </div>
    </div>
  );
}