import React, { memo } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { useFetch, useRequestMount } from "libs/infra-app";
import { request } from "../../utils/request";
import { NavigationEntry } from "services/navigation/types";

const requestNavigationUsers = async () => {
  try {
    const { data } = await request<NavigationEntry[]>({ 
      url: "/api/navigation/list",
      params: { parent: "users" },
    });

    return data;
  } catch {
    return [];
  }
};

const User = memo(() => {
  const { id } = useParams();

  return <>User: {id}</>;
})

const elementMap = {
  usersAll: <>Users all</>,
  user: <User />,
};

export default memo(() => {
  const [navigation, getNavigation, navigationKey] = useFetch(requestNavigationUsers, [], "navigation-users");

  const routes = navigation.reduce<JSX.Element[]>((memo, [key, { path }]) => {
    const element = elementMap[key];

    if (element) {
      console.log(path)
      memo.push(<Route key={key} path={path.replace("/users", "")} element={element} />);
    }

    return memo;
  }, []);

  useRequestMount(getNavigation, navigationKey);

  return (
    <>
      <Link to="/users/all">All users</Link>
      <Link to="/users/user/123">User #123</Link>

      <div>
        <h4>USERS:</h4>
        <Routes>
          {routes}
          <Route path="/users/*">Default page</Route>
        </Routes>
      </div>
    </>
  );
});
