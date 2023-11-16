import { gql, useMutation } from '@apollo/client';

export const CREATE_BKASH_DC_PAYMENT_MUTATION = gql`
	mutation($amount: Float!, $dcGroupId: ID!) {
		createDcPaymentMutation(amount: $amount, dcGroupId: $dcGroupId) {
			createPaymentData
		}
	}
`;

const useCreateDcBkashMutationHandler = () => {
	const [createDcPaymentMutation, { data, loading, error }] = useMutation(
		CREATE_BKASH_DC_PAYMENT_MUTATION
	);

	return { createDcPaymentMutation, data, loading, error };
};

export default useCreateDcBkashMutationHandler;

