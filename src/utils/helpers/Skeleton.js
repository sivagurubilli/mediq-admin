import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const ShowSkeleton = () => {
  return (
    <>
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
    {Array(25)
      .fill()
      .map((item, index) => {
        return (
          <div key={index} className="row-sm-1 row-lg-1 card-group mb-1">
            <div className="card">
              <Skeleton height={60} />
            </div>
          </div>
        );
      })}
  </SkeletonTheme>
    </>
  );
};
export default ShowSkeleton

export const ShowSkeleton1 = () => {
  return (
    <>
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
    {Array(5)
      .fill()
      .map((item, index) => {
        return (
          <div key={index} className="row-sm-1 row-lg-1 card-group mb-1">
            <div className="card">
              <Skeleton height={60} />
            </div>
          </div>
        );
      })}
  </SkeletonTheme>
    </>
  );
};



