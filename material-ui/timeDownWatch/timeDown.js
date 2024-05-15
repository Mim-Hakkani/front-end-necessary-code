/*
 time step down count 


1.
   const [remainingTime, setRemainingTime] = useState(40); // 2 minutes in seconds


2.
  useEffect(() => {
    let intervalId;

    if (confirmPaymentOrderModal) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            handleCloseConfirmOrderPayment();
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000); // Update every second
    }

    return () => clearInterval(intervalId);
  }, [confirmPaymentOrderModal, handleCloseConfirmOrderPayment]);


3.
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60



*/