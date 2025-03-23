import { RouterProvider } from "react-router-dom";
import browserRouter from "../routes";

const RootRouter = () => {
  return <RouterProvider router={browserRouter} />;
};

export default RootRouter;
