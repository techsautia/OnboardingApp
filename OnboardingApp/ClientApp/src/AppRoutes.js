import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Customer } from "./components/Customer";
import { Product } from "./components/Product";
import { Store } from "./components/Store";
import { Sale } from "./components/Sale";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/customer",
    element: <Customer />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/sale",
    element: <Sale />,
  },
];

export default AppRoutes;
