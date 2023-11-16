
// ================== Paypal Payment   ========================//


// step 1 : install react-paypal-button-v2

import { PayPalButton } from "react-paypal-button-v2";

 // step 2 : add in react compoent or pages 

const [scriptLoaded, setScriptLoaded] = useState(false);

useEffect(() => {
    const addPaypalScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      
      // sandbox url for test paypal

      script.src = `https://www.paypal.com/sdk/js?client-id=AUE22MUhrTAlUBzLSgE-KKxYo4M0kQDpyKAxJJEgDAwL9RzSfQTrTKWxiamDiPXZHDpTbFJcLzggX8XW`; 

      // production url for em.biz@example.com --> App name: EhsanMarketing


      // script.src = `https://www.paypal.com/sdk/js?client-id=AQ4c97qt9ENxq6D3RS6rZXw7KNTLZQMft0DJE-PcVNy4j-PdoGZszUcUvgaWgUz-ebHA4oJacVsadcb-`; 


      script.async = true;

      script.onload = () => {
      setScriptLoaded(true);

};

      document.body.appendChild(script);
    };
    addPaypalScript();
  }, []);


// step 3 : if necessary set up the api note : i am using graphql 


// paypal payment create mutation 
const {onCreatePaypalDcgPayment} =useCreatePaypalDirectGivenCommission()

//paypal payment success mutation 
const {onSuccessPaypalDcgPayment,data:afterPaymentData} =useSuccessDgcPayment()


// step 4 : Finally setup the code  in react or next js 

{scriptLoaded ? (
    <div 
    style={{
      width:'250px',  // used for paypal button size 
      margin:'0 auto'
    }}> 
    <PayPalButton

createOrder={(data, actions) => {

// here call mutaion 1 (paymentid + refID)

const refID = `em-${paymentId}`;  // used for graphql crated for unique 
const  amount  = 0.15; // amount which i pay for paypal


// for paypal create payment api 

        onCreatePaypalDcgPayment({
            variables:{
                dcgId:paymentId,
                reference:refID

            },
            context: {
                headers: {
                Authorization: `JWT ${token}`,
                },
            },
            onCompleted:()=>{
                // console.log("success :create")
            },
            onError:(err)=>{
            alert(err.message)
            }

        })

// paypal create payment api end 


return actions.order.create({
  purchase_units: [{
    reference_id:refID,
    amount: {
      currency_code: "USD",  // usd and another currency is setup
      value: amount  // which i pay for paypal 
        }
  }],

});
}}


onSuccess={(details, data) => {

      // graphql api after success start

        onSuccessPaypalDcgPayment({
            variables:{
                orderId:paymentId,
                data:data	
            },
            context: {
                headers: {
                  Authorization: `JWT ${token}`,
                },
            },
            
            onCompleted: (data) => {
                if (data.onSuccessPaypalDcgPayment.success === true) {
                
                  Swal.fire({
                    title: "Payment Successful",
                    text: data.onSuccessPaypalDcgPayment.message,
                    icon: "success"
                  });

                  setTimeout(() => {
                    
                    router.push('/consumer-dashboard/commissions/direct-given-commision/payment');
                  }, 3000);

              
                
                } else {
                    Swal.fire({
                        title: "Payment UnSuccess",
                        text: data.onSuccessPaypalDcgPayment.message,
                        icon: "warning"
                      });  
                }
              },
            

            onError:(err)=>{
                toast.warn(err.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
              }

        });

      // graphql api after success end 
     
    
      }}

    />

  </div>) : (<span></span>
                        )}
