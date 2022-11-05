import { RouterProvider as RouterProviderCore } from "react-router-dom";
import { router } from "./router";

export const RouterProvider = () => {
  return <RouterProviderCore router={router} />;
};
