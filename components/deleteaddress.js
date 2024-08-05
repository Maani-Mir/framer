import React from "react";

const deleteAddress = (address) => {
  const headers = {
    userid: "668e636cdfb7272abd65a759",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMjg0ODc4OSwiZXhwIjoxNzIzNDUzNTg5fQ.hjb3vgDdThKK7eZSl6fB9APBMzybUXX0PPhTfOQsdN8",
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
