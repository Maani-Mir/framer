import React from "react";

const deleteAddress = (address) => {
  const headers = {
    userid: "668e636cdfb7272abd65a759",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMTM5MTU1NywiZXhwIjoxNzIxOTk2MzU3fQ.TCX32d_9Fu6sHuhKbdB9-wle62egJRV1VCdqWasABm0",
  };
  axios
    .delete(`https://backend.framer.pk/address/`, {
      headers: headers,
    })
    .then(function (response) {
      //console.log("response", response.data);
      if (response === null) {
        Alert.alert("There are no addresses here!");
      } else {
        setAddressData(response.data);
      }
      //console.log("response from addressData", addressData.data);
    })
    .catch(function (error) {
      console.log("error from orders", error.message);
    });
};
