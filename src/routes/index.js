import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

const index = () => (
	<>
		{useRoutes(routes())}
	</>
);

export default index;
