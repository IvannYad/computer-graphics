import { createContext } from "react";
import SerpinskiyTriangleDrawer from "./SerpinskiyTriangleDrawer";

type FractalDrawersContextValues = {
    serpinskiyTriangleDrawer: SerpinskiyTriangleDrawer;
} 

const FractalsDrawersContext = createContext<FractalDrawersContextValues>({
    serpinskiyTriangleDrawer: new SerpinskiyTriangleDrawer(),
});

export default FractalsDrawersContext;