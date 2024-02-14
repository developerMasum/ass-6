
import { Divider } from 'antd';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { useGetAllProductsQuery } from '../../redux/features/product/productApi';

const colors = [
  '#b8d2ea',
  '#c5c5c5',
  '#ffbb28',
  '#dec1b4',
  '#b4b4de',
  '#f2c600',
  '#5c024b',
  '#b4b4de',
  '#eb6060',
  '#cfeb60',
  '#20eb4f',
  '#1fdbd8',
];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${
    x + width / 2
  },${y + height / 3} ${x + width / 2}, ${y} C${x + width / 2},${
    y + height / 3
  } ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height} Z`;
};

const TriangleBar = (props: {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) => {
  const { fill, x = 0, y = 0, width = 0, height = 0 } = props;

  if (width <= 0 || height <= 0) {
    // Return null or any fallback JSX when width or height is not valid
    return null;
  }

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function DemoColumn() {
  const { data: data2 } = useGetAllProductsQuery('');

  // Assuming 'productName', 'productPrice', and 'brand' are properties in your data
  const mappedData =
    (data2?.data as { brand: string; productQuantity: number }[] | undefined)?.map(
      (d) => ({
        name: d.brand,
        price: d.productQuantity,
      })
    ) || [];

  return (
    <div
      className="p-3 rounded-md customBg customText"
      style={{ width: '100%', maxWidth: 'xl', height: '480px' }}
    >
      <p className="text-base font-semi-bold">INVENTORY STOCK</p>
      <Divider style={{ border: '1px solid white' }} />
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={mappedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="price"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: 'top' }}
          >
            {mappedData.map((_entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
