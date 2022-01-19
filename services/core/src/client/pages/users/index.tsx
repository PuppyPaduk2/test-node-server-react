import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { BasenameProvider, Link } from "../../../../../../libs/infra-app";

export default memo(() => {
  return (
    <BasenameProvider value="/users">
      <Link to="/all">All users</Link>

      <div>
        <Routes>
          <Route path="/all" element={<>All</>} />
          <Route path="*" element={<>UsersService</>} />
        </Routes>
      </div>
    </BasenameProvider>
  );
});
