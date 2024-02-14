import { useForm, SubmitHandler } from "react-hook-form";
import img1 from "../../assets/images/add.png";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type FormValues = {
  productName: string;
  productPrice: number;
  productQuantity: number;
  releaseDate: string;
  screenSize: string;
  storageCapacity: string;
  operatingSystem: string;
  model: string;
  brand: string;
};

function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log(data);
    const MergeData = {
      productPrice: Number(data.productPrice),
      productName: data.productName,
      productQuantity: Number(data.productQuantity),
      releaseDate: data.releaseDate,
      screenSize: data.screenSize,
      storageCapacity: data.storageCapacity,
      operatingSystem: data.operatingSystem,
      model: data.model,
      brand: data.brand,
    };
    // console.log(MergeData);
    try {
      toast.info("Creating product..."); // Show loading toast

     await createProduct(MergeData);
    

      toast.dismiss(); // Dismiss the loading toast

      // Handle success
      toast.success("Product created successfully!");
      // history.push('/'); // Navigate to '/'
      navigate("/product");
    } catch (error) {
      toast.dismiss(); // Dismiss the loading toast

      // Handle error
      console.error(error);
      toast.error("Error creating product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-center items-center gap-3 border border-dashed customBg  ">
        <p className="text-center text-2xl customText">ADD PRODUCT</p>
        <img src={img1} className="w-18" alt="" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto p-2 rounded-md"
      >
        <div className="mb-4">
          <label htmlFor="productName" className="customText ">
            Phone Name
          </label>
          <input
            {...register("productName", { required: "This field is required" })}
            id="productName"
            className="customBg customText  p-2 w-full rounded"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-red-500">{errors.productName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="customText ">
            Model
          </label>
          <input
            {...register("model", { required: "This field is required" })}
            id="model"
            className="customBg customText  p-2 w-full mt-1 rounded"
            placeholder="Enter product model"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="customText ">
            Brand
          </label>
          <input
            {...register("brand", { required: "This field is required" })}
            id="brand"
            className="customBg customText  p-2 w-full mt-1 rounded"
            placeholder="Enter product brand"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productPrice" className="customText ">
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
            className="customBg customText  p-2 w-full rounded"
            placeholder="Enter product price"
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
          />
        </div>

        <div className="mb-4">
          <label htmlFor="storageCapacity" className="customText ">
            Storage Capacity
          </label>
          <select
            {...register("storageCapacity", {
              required: "This field is required",
            })}
            id="storageCapacity"
            className="customBg customText  p-2 w-full mt-1 rounded"
          >
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
          <label htmlFor="operatingSystem" className="customText ">
            Operating System
          </label>
          <select
            {...register("operatingSystem", {
              required: "This field is required",
            })}
            id="operatingSystem"
            className="customBg customText  p-2 w-full mt-1 rounded"
          >
            <option value="IOS">IOS</option>
            <option value="Windows">Windows</option>
            <option value="Android">Android</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#2f589f] text-white  px-8 py-2 mt-4  w-full rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
