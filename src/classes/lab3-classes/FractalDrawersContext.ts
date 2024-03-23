import { createContext } from "react";
import SerpinskiyTriangleDrawer from "./SerpinskiyTriangleDrawer";
import SerpinskiyCarpetDrawer from "./SerpinskiyCarpetDrawer";

type FractalDrawersContextValues = {
    serpinskiyTriangleDrawer: SerpinskiyTriangleDrawer;
    serpinskiyCarpetDrawer: SerpinskiyCarpetDrawer;
} 

const FractalsDrawersContext = createContext<FractalDrawersContextValues>({
    serpinskiyTriangleDrawer: new SerpinskiyTriangleDrawer(),
    serpinskiyCarpetDrawer: new SerpinskiyCarpetDrawer(),
});

export default FractalsDrawersContext;