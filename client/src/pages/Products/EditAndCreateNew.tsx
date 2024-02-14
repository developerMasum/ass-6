import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

interface FormValues {
  productName: string;
  model: string;
  brand: string;
  productPrice: string;
  productQuantity: string;
  releaseDate: string;
  screenSize: string;
  storageCapacity: string;
  operatingSystem: string;
}

const EditAndCreateNew = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const { productId } = useParams<{ productId: string }>();
    const { data } = useGetSingleProductQuery(productId);
    const product = data?.data;
  
    // Reset the form with new default values when product data changes
    useEffect(() => {
      if (product) {
        reset({
          productName: product.productName || "",
          model: product.model || "",
          brand: product.brand || "",
          productPrice: product.productPrice || "",
          productQuantity: product.productQuantity || "",
          releaseDate: product.releaseDate || "",
          screenSize: product.screenSize || "",
          storageCapacity: product.storageCapacity || "",
          operatingSystem: product.operatingSystem || ""
        });
      }
    }, [product, reset]);
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      console.log(data);
    };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto p-2 rounded-md"
      >
        <div className="mb-4">
          <label htmlFor="productName" className="customText">
            Phone Name
          </label>
          <input
            {...register("productName", { required: "This field is required" })}
            id="productName"
            className="customBg customText p-2 w-full rounded"
            placeholder="Enter product name"
            defaultValue={product?.productName}
          />
          {errors.productName && (
            <p className="text-red-500">{errors.productName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="customText">
            Model
          </label>
          <input
            {...register("model", { required: "This field is required" })}
            id="model"
            className="customBg customText p-2 w-full mt-1 rounded"
            placeholder="Enter product model"
            defaultValue={product?.model}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brand" className="customText">
            Brand
          </label>
          <input
            {...register("brand", { required: "This field is required" })}
            id="brand"
            className="customBg customText p-2 w-full mt-1 rounded"
            placeholder="Enter product brand"
            defaultValue={product?.brand}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="customText">
            Price
          </label>
          <input
            {...register("productPrice", {
              required: "This field is required",
              pattern: {
                value: /^\d+$/,
                message: "Please enter a valid number",
                
              },
            })}
            id="productPrice"
            className="customBg customText p-2 w-full rounded"
            placeholder="Enter product price"
            defaultValue={product?.productPrice}
          />
          {errors.productPrice && (
            <p className="text-red-500">{errors.productPrice.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="productQuantity" className="customText ">
            Quantity
          </label>
          <input
            {...register("productQuantity", {
              required: "This field is required",
              pattern: {
                value: /^\d+$/,
                message: "Please enter a valid number",
              },
            })}
            id="productQuantity"
            className="customBg customText  p-2 w-full rounded"
            placeholder="Enter product quantity"
            defaultValue={product?.productQuantity}
          />
          {errors.productQuantity && (
            <p className="text-red-500">{errors.productQuantity.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="releaseDate" className="customText ">
            Release Date
          </label>
          <input
            type="date"
            {...register("releaseDate", {
              required: "This field is required",
            })}
            id="releaseDate"
            className="customBg customText  p-2 w-full rounded"
            placeholder="Release Date"
            defaultValue={product?.releaseDate}
          />
          {errors.releaseDate && (
            <p className="text-red-500">{errors.releaseDate.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="screenSize" className="customText ">
            Screen Size
          </label>
          <input
            {...register("screenSize", { required: "This field is required" })}
            id="screenSize"
            className="customBg customText  p-2 w-full mt-1 rounded"
            placeholder="Enter screen size"
            defaultValue={product?.screenSize}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="storageCapacity" className="customText">
            Storage Capacity
          </label>
          <select
            {...register("storageCapacity", { required: "This field is required" })}
            id="storageCapacity"
            className="customBg customText p-2 w-full mt-1 rounded"
            defaultValue={product?.storageCapacity}
          >
            {/* <option value="">Select storage capacity</option> */}
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
            <option value="64GB">64GB</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
            <option value="1TB">1TB</option>
          </select>
        </div>
        <div className="mb-4">
  <label htmlFor="operatingSystem" className="customText">
    Operating System
  </label>
  <select
    {...register("operatingSystem", { required: "This field is required" })}
    id="operatingSystem"
    className="customBg customText p-2 w-full mt-1 rounded"
    defaultValue={product && product.operatingSystem ? product.operatingSystem : ""}
  >
    {/* <option value="">Select operating system</option> */}
    <option value="IOS">IOS</option>
    <option value="Windows">Windows</option>
    <option value="Android">Android</option>
  </select>
</div>

        <button
          type="submit"
          className="bg-[#2f589f] text-white px-8 py-2 mt-4 w-full rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAndCreateNew;
