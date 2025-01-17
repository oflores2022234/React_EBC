import { getAccountDetails} from "../../services";
import { createTransaction } from "../../services";
import { useEffect } from "react";
import { useState } from "react";
const useTransfer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accountDetails, setAccountDetails] = useState({ accountNumber: '', balance: 0 });
  
    useEffect(() => {
      const fetchAccountDetails = async () => {
        const response = await getAccountDetails();
        if (!response.error) {
          setAccountDetails({
            accountNumber: response.data.accountNumber,
            balance: response.data.balance
          });
        } else {
          setError('Failed to fetch account details');
        }
      };
  
      fetchAccountDetails();
    }, []);
  
    const transferFunds = async (data) => {
      setIsLoading(true);
      try {
        const response = await createTransaction(data);
        setIsLoading(false);
        return response.data;
      } catch (e) {
        setIsLoading(false);
        setError(e.response ? e.response.data.message : 'Transfer failed');
        return { error: true, message: e.message };
      }
    };
  
    return { transferFunds, isLoading, error, accountDetails };
  };
  
  export default useTransfer;