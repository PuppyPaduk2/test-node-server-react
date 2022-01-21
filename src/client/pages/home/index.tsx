import React, { memo, useEffect } from "react";
import { MainMenuService } from "../../services/main-menu";

export default memo(() => {
  useEffect(() => {
    console.log("Home mount");

    return () => {
      console.log("Home unmount");
    };
  }, []);

  return (
    <div>
      <h1>Home page</h1>
      <MainMenuService />
    </div>
  );
});
