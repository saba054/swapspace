import React from "react";

export function Card({ className = "", children }) {
  return <div className={"bg-white rounded-lg shadow " + className}>{children}</div>;
}

export function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
} 