import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb({ item1, item2 }) {
  if (item2) {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item text-primary">{item1}</li>
          <li class="breadcrumb-item active" aria-current="page">
            {item2}
          </li>
        </ol>
      </nav>
    );
  } else {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {item1}
          </li>
        </ol>
      </nav>
    );
  }
}

export default BreadCrumb;
