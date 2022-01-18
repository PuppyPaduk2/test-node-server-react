import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Basename } from "../../utils/basename";
import { Link } from "../../utils/link";

export default memo(() => {
  return (
    <Basename value="/users">
      <Link to="/all">All users</Link>

      <div>
        <Routes>
          <Route path="/all" element={<>All</>} />
          <Route path="*" element={<>UsersService</>} />
        </Routes>
      </div>
    </Basename>
  );
});
