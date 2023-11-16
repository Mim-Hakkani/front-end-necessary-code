import { gql, useMutation } from "@apollo/client";

const CREATE_PAYPAL = gql`
mutation(
    $dcgId:ID!
    $reference:String!
){
    onCreatePaypalDcgPayment(
        dcgId: $dcgId,
        reference: $reference){
      success
    }
  }
`




const useCreatePaypalDirectGivenCommission = () => {
    const [onCreatePaypalDcgPayment] = useMutation(
        CREATE_PAYPAL,
      {
        refetchQueries: [
          // write something ...
        ],
      }
    );
    return {
        onCreatePaypalDcgPayment
    };
  };
  
  export default useCreatePaypalDirectGivenCommission;
  