// ================  start bKash payment Handler ================= // 

// graphql mutaion for send amount and id 

const {createDcPaymentMutation, data : responseData} = useCreateDcBkashMutationHandler()

 const handlePayWithBKash = ()=>{

 //  this mutaion all is created by graphql 
    createDcPaymentMutation({
      variables:{
       amount: 10,  // amount 
       dcGroupId: 150132 // id 
      },
       onCompleted: () => {
        	toast.success('successfully added payment', {
        		position: 'top-center',
        		autoClose: 3000,
        	});      
        },
        onError: (err) => {
        	//console.log("please input valid value :: ", err);
        	toast.warn(err.message, {
        		position: 'top-center',
        		autoClose: 3000,
        	});
        },
    })

  }


  // if i successfully send amount and id then bKash give me a link url (like : bkashURL ) . then i go to this page and give my amount and other info to bKash then i give me a another successfull url o

if(responseData){
window.location.href=responseData?.createDcPaymentMutation?.createPaymentData?.bkashURL
}

// ============ End BKash payment Handler ========================== 



// code using component 

<Button
id="bKash_button"  // required 
sx={{
  backgroundColor: "#e7279e",
  color: "#fff",
  textTransform: "none",
  fontSize: "10px",
  ":hover": {
    backgroundColor: "#a50c6a",
  },
}}

onClick={handlePayWithBKash} // reqired 
>
Pay with bKash
</Button>