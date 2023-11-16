import { gql, useMutation } from '@apollo/client';

export const EXECUTE_DC_PAYMENT_MUTATION = gql`
	mutation(
		$processingId: ID!, 
		$paymentID: ID!, 
		$status: String!) {
		executeDcPaymentMutation(
			processingId: $processingId
			paymentID: $paymentID
			status: $status
		) {
			executePaymentData
		}
	}
`;

const useExecuteDcBkashMutationHandler = () => {
	const [executeDcPaymentMutation, { data, loading, error }] = useMutation(
		EXECUTE_DC_PAYMENT_MUTATION
	);

	return { executeDcPaymentMutation, data, loading, error };
};

export default useExecuteDcBkashMutationHandler;
