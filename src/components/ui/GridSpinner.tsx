import dynamic from "next/dynamic";

const GridLoader = dynamic(
  () => import("react-spinners").then((mod) => mod.GridLoader),
  {
    ssr: false,
  }
);

type Props = {
  color?: string;
};

const GridSpinner = ({ color = "#8B5CF6" }: Props) => {
  return <GridLoader color={color} />;
};

export default GridSpinner;
