import React from "react";

import Loading from "./Loading";
import { ButtonUnobtrusive } from "./Repository/Button";

const FetchMore = ({ loading, hasNextPage, fetchMore, children }) => (
  <div className="FetchMore">
    {loading ? (
      <Loading />
    ) : (
      hasNextPage && (
        <ButtonUnobtrusive
          className="FetchMore-button"
          onClick={() => fetchMore()}
        >
          More {children}
        </ButtonUnobtrusive>
      )
    )}
  </div>
);

export default FetchMore;
