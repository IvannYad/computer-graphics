import { createContext } from "react";
import SerpinskiyTriangleDrawer from "./SerpinskiyTriangleDrawer";
import SerpinskiyCarpetDrawer from "./SerpinskiyCarpetDrawer";
import CustomFractalDrawer from "./CustomFractalDrawer";

type FractalDrawersContextValues = {
    serpinskiyTriangleDrawer: SerpinskiyTriangleDrawer;
    serpinskiyCarpetDrawer: SerpinskiyCarpetDrawer;
    customFractalDrawer: CustomFractalDrawer;
} 

const FractalsDrawersContext = createContext<FractalDrawersContextValues>({
    serpinskiyTriangleDrawer: new SerpinskiyTriangleDrawer(),
    serpinskiyCarpetDrawer: new SerpinskiyCarpetDrawer(),
    customFractalDrawer: new CustomFractalDrawer(),
});

export default FractalsDrawersContext;