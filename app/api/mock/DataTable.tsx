type Title = {
  title: string;
};

type Data = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export const TableHead: Title[] = [
  {
    title: "รหัสสินค้า",
  },
  {
    title: "รายการสินค้า",
  },
  {
    title: "หมวดหมู่สินค้า",
  },
  {
    title: "ราคา",
  },
];

export const TableBody: Data[] = [
  {
    id: "000123456",
    name: "Apple MacBook Pro 17'",
    category: "Laptop",
    price: 25000,
  },
  {
    id: "000123457",
    name: "Apple MacBook Pro 17'",
    category: "Laptop",
    price: 25000,
  },
  {
    id: "000123458",
    name: "Apple MacBook Pro 17'",
    category: "Laptop",
    price: 25000,
  },
  {
    id: "000123459",
    name: "Apple MacBook Pro 17'",
    category: "Laptop",
    price: 25000,
  },
  {
    id: "000123410",
    name: "Apple MacBook Pro 17'",
    category: "Laptop",
    price: 25000,
  },
  {
    id: "000123411",
    name: "Apple MacBook Pro 17'",
    category: "Laptop",
    price: 25000,
  },
];
