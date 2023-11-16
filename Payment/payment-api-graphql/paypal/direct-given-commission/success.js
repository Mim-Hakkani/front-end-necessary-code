 import { gql, useMutation } from "@apollo/client";

const DGC_SUCCESS_PAYPAL = gql`
mutation(
    $dcgId:ID!,
    $data:GenericScalar!

){
    onSuccessPaypalDcgPayment(
      dcgId: $dcgId,
      data:$data)
    {
      success,
      message
    }
  }
`




const useSuccessDgcPayment = () => {
    const [onSuccessPaypalDcgPayment,{data}] = useMutation(
        DGC_SUCCESS_PAYPAL,
      {
        refetchQueries: [
          // write something ...
        ],
      }
    );
    return {
        onSuccessPaypalDcgPayment,
        data
    };
  };
  
  export default useSuccessDgcPayment;
  