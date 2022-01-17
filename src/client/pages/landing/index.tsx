import React, { memo } from "react";
import { MainMenuService } from "../../services/main-menu";

export default memo(() => {
  return (
    <div>
      <h1>Landing Page</h1>
      <MainMenuService />
    </div>
  );
});
