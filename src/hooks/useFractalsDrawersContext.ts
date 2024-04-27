import { useContext } from "react";
import FractalsDrawersContext from "../classes/lab3-classes/FractalDrawersContext";

export default function useFractalsDrawersContext() {
    return useContext(FractalsDrawersContext);
}