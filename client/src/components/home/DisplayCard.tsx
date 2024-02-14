import { Card, Progress } from "antd";
import image1 from '../../assets/images/decrease.png'
import image2 from '../../assets/images/increase.png'
import image3 from '../../assets/images/order.png'
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";

const DisplayCard = () => {
  const { data } = useGetAllProductsQuery("");
  const { data:pData } = useGetAllProductsQuery("");

  const allProduct = pData?.data || [];
  const totalProductQuantity = allProduct.reduce(
    (total: any, product: { productQuantity: any; }) => total + (product.productQuantity || 0),
    0
  );
 
  const percentTotalProduct =Number(( (50000 - totalProductQuantity)/1000).toFixed(0))

  const unitSold = data?.data?.length * 10;
  const unitPercent =( (data?.data?.length * 10) /5)
  const totalUnit = (data?.data.reduce(
    (total: any, product: { productQuantity: any; }) => total + (product.productQuantity || 0),
    0)-150
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "25px",
        flexWrap: "wrap", 
      }}
    >
      <Card className="customBg customText " bordered={false}  style={{ width: '100%', maxWidth: '450px', marginBottom: '20px',padding:'20px' }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{fontSize:'17px',}}>UNITS SOLD</p>
          <p>View</p>
        </div>
        <div className="customText ">
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "35px", fontFamily: "monospace" }}>{unitSold}</p>
            <p style={{ marginLeft: "5px", alignSelf: "flex-end" }}>
              smartphones
            </p>
          </div>

          <Progress
            percent={unitPercent}
            status="active"
            strokeColor={{ from: "#108ee9", to: "#87d068" }}
          />
        </div>

        <div>
            <img src={image1} alt="" style={{width:'30px'}} />
        </div>
      </Card>

      <Card  className="customBg customText " bordered={false} style={{ width: '100%', maxWidth: '450px',  marginBottom: '20px' ,padding:'20px' }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{fontSize:'17px',fontWeight: 'semi-bold'}}>UNITS AVAILABLE</p>
          <p>View</p>
        </div>
        <div className="customText ">
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "35px", fontFamily: "monospace" }}>{totalProductQuantity}</p>
            <p style={{ marginLeft: "5px", alignSelf: "flex-end" }}>
              smartphones
            </p>
          </div>

          <Progress
            percent={percentTotalProduct}
            status="active"
            strokeColor={{ from: "#04eb41", to: "#00f9f1f0" }}
          />
        </div>
        
        <div>
            <img src={image2} alt="" style={{width:'30px'}} />
        </div>

      </Card>

      <Card className="customBg customText " bordered={false} style={{ width: '100%', maxWidth: '450px',  marginBottom: '20px' ,padding:'20px' }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{fontSize:'17px',}}>TOTAL ORDERS</p>
          <p>View</p>
        </div>
        <div className="customText ">
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "35px", fontFamily: "monospace" }}>{totalUnit}</p>
            <p style={{ marginLeft: "5px", alignSelf: "flex-end" }}>
              orders
            </p>
          </div>

          <Progress
            percent={50}
            status="active"
            strokeColor={{ from: "#108ee9", to: "#87d068" }}
          />
        </div>

        <div>
            <img src={image3} alt="" style={{width:'30px'}} />
        </div>
      </Card>
    </div>
  );
};

export default DisplayCard;
