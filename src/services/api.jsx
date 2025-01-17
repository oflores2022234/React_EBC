import axios from 'axios';

const apiClient = axios.create ({
    
    baseURL: 'https://node-ebc-ruddy.vercel.app/ebc/v1',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem('user');
        if (userDetails) {
            const token = JSON.parse(userDetails).token;
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
);

export const login = async (data) => {
    try {
        return await apiClient.post('/login/auth', data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }    
}

export const usersGet = async () => {
  try{
      return await apiClient.get('/user/users')
  }catch(e){
    return{
      error: true,
      e
    }
  }
}

export const userEdit = async (id, data) => {
  try {
    const response = await apiClient.put(`/user/update/${id}`, data);
    return response.data;
  } catch (e) {
    console.error('Error in userEdit API call:', e);
    console.log(data),
    console.log(id)
    return {
      error: true,
      e
    };
  }
};

export const getUser = async (id) => {
  try {
    const response = await apiClient.get(`/user/detailsUser/${id}`);
    console.log('API getUser response:', response);
    return response.data; 
  } catch (e) {
    console.error('Error in getUser API call:', e);
    return {
      error: true,
      e
    };
  }
};

export const deleteUser = async (id) => {
  try{
    return await apiClient.delete(`/user/deleteUser/${id}`)
  } catch (e) {
    return {
        error: true,
        e
    }
}
}



export const register = async (data) => {
    try {
        const response = await apiClient.post('/user/register', data);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};
export const addFavorite = async (data) => {
    try {
        const response = await apiClient.post('/account/addFavorite', data);
        return response.data;
    } catch (e) {
        if (e.response) {
            console.error('Server response error:', e.response.data);
            return e.response.data;
        } else if (e.request) {
            console.error('No response from server:', e.request);
            return { error: true, message: 'No response from server' };
        } else {
            console.error('Axios configuration error:', e.message);
            return { error: true, message: e.message };
        }
    }
};


export const getServicios = async () => {
    try {
        return await apiClient.get('/service/getServices');
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
export const createTransaction = async (data) => {
    try {
      const response = await apiClient.post('/transaction/transfer', data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Server response error:', error.response.data);
        return error.response.data;
      } else if (error.request) {
        console.error('No response from server:', error.request);
        return { error: true, message: 'No response from server' };
      } else {
        console.error('Axios configuration error:', error.message);
        return { error: true, message: error.message };
      }
    }
  };
export const createDeposit = async (data) =>{
    try {
      const response = await apiClient.post("/deposit/depositary", data);
      return response.data
    } catch (error) {
      if (error.response) {
        console.error('Server response error:', error.response.data);
        return error.response.data;
      } else if (error.request) {
        console.error('No response from server:', error.request);
        return { error: true, message: 'No response from server' };
      } else {
        console.error('Axios configuration error:', error.message);
        return { error: true, message: error.message };
      }
    }
}
export const getAccountDetails = async () => {
    try {
      return await apiClient.get('/account/accountDetails');
    } catch (e) {
      return {
        error: true,
        e
      };
    }
  };

export const registerService = async (data) => {
  try {
    return await apiClient.post("/service/addService", data);
  } catch (e) {
    return { error: true, e };
  }
};

export const updateService = async (id, data) => {
  try {
    return await apiClient.put(`/service/updateService/${id}`, data);
  } catch (e) {
    return { error: true, e };
  }
};

export const deleteService = async (id) => {
  try {
    return await apiClient.delete(`/service/deleteService/${id}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const convertCurrency = async (data) => {
  try {
      return await apiClient.post('/currency/convert', data)
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || e.message,
  };
  }
}

export const changePassword = async (data) => {
  try {
    return await apiClient.patch('/account/changePassword', data)
  } catch (e) {
    return {
      error: true,
      e
    }
  }
}

export const getAccountsAsc = async (orden) => {
  try {
    console.log('Orden:', orden);
    return await apiClient.get(`/account/accounts-by-movements/${orden}`);
  } catch (e) {
    return {
      error: true,
      e
    };
  }
}

export const getUserDetails = async () => {
  try {
    return await apiClient.get('/account/accountDetailsUser');
  } catch (e) {
    return {
      error: true,
      e
    };
  }
};

export const getTransactions = async () => {
  try {
    return await apiClient.get('/transaction/myTransactions');
  } catch (e) {
    return {
      error: true,
      e
    };
  }
}

export const getDeposits = async () => {
  try {
    return await apiClient.get('/deposit/depositsAll');
  } catch (e) {
    return {
      error: true,
      e
    };
  }
}

export const revertTransaction = async (idTransaction) => {
  try {
    return await apiClient.put(`/transaction/revert/${idTransaction}`);
  } catch (e) {
    return {
      error: true,
      e
    };
  }
}

export const revertDeposit = async (depositId) => {
  try {
    return await apiClient.put(`/deposit/revert/${depositId}`);
  } catch (e) {
    return {
      error: true,
      e
    };
  }
}

export const listFavorites = async () => {
  try {
      const response = await apiClient.get("/account/listFavorites");
      return response.data;
  } catch (error) {
      if (error.response) {
          console.error('Server response error:', error.response.data);
          return error.response.data;
      } else if (error.request) {
          console.error('No response from server:', error.request);
          return { error: true, message: 'No response from server' };
      } else {
          console.error('Axios configuration error:', error.message);
          return { error: true, message: error.message };
      }
  }
};

export const getQueries = async () => {
  try {
    return await apiClient.get('/account/query');
  } catch (e) {
    return {
      error: true,
      e
    };
  }
}
