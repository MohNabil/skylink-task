import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Product } from "../types/product";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useMutation, useQuery } from "react-query";
import {
  getProducts,
  searchProducts,
  updateProduct,
} from "../services/products";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: "products",
    queryFn: getProducts,
  });
  const debouncedVal = useDebounce(searchQuery, 500);
  const { data: searchData } = useQuery({
    queryKey: ["products", debouncedVal],
    queryFn: () => searchProducts(debouncedVal),
  });
  const { mutate } = useMutation({
    mutationFn: (id: string, product: Product) => {
      // console.log(product, "product");
      // console.log(id, "id");

      updateProduct(id, product);
    },
    onSuccess: (product: Product) => {
      const productId = product?.id;
      data[productId] = product;
    },
    onError: (error: any) => {
      console.log(error, "error");
    },
  });

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    let { newData } = e;

    console.log(newData, "newData");

    mutate(newData.id, newData);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (product: Product) => {
    return (
      <img src={product.thumbnail} alt={product.category} className="w-8 h-8" />
    );
  };

  const priceBodyTemplate = (product: Product) => {
    return formatCurrency(product.price);
  };

  const ratingBodyTemplate = (product: Product) => {
    return <Rating value={product.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (product: Product) => {
    return <Tag value={product.stock}></Tag>;
  };

  const nameBodyTemplate = (product: Product) => {
    return <p>{product.title}</p>;
  };

  const header = (
    <div className="flex  items-center justify-between">
      <span className="text-xl text-900 font-bold">Products</span>
      <InputText value={searchQuery} onChange={onSearch} placeholder="Search" />
    </div>
  );
  const footer = `In total there are ${data ? data.length : 0} products.`;

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback(e.target.value)
        }
      />
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="card">
          <DataTable
            value={searchData || data}
            header={header}
            footer={footer}
            tableStyle={{ minWidth: "60rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10]}
            editMode="row"
            dataKey="id"
            onRowEditComplete={onRowEditComplete}
          >
            <Column
              field="title"
              header="Name"
              body={nameBodyTemplate}
              editor={(options) => textEditor(options)}
            ></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
              editor={(options) => priceEditor(options)}
            ></Column>
            <Column
              field="category"
              header="Category"
              editor={(options) => textEditor(options)}
            ></Column>
            <Column
              field="rating"
              header="Reviews"
              body={ratingBodyTemplate}
              editor={(options) => textEditor(options)}
            ></Column>
            <Column
              field="stock"
              header="Stock"
              body={statusBodyTemplate}
              editor={(options) => textEditor(options)}
            ></Column>
            <Column
              rowEditor
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            ></Column>
          </DataTable>
        </div>
      )}
      {isError && (
        <p className="text-red-400">
          Something went wrong in getting the products
        </p>
      )}
    </>
  );
}

export default Products;
