import App from "./App";
import ErrorPage from "./ErrorPage";

// What routes do we want?
// /home, /posts, /sign-up, /login, /posts/:id

const routes = [
  {
    path: "/:name?/:postId?",
    element: <App />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
