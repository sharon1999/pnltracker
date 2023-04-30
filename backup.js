import { Axios } from "axios";

{/* <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stockname"
                type="text"
                placeholder="Stock name"
              />
            </td>
            <td class="px-6 py-4">₹ 2999</td>
            <td class="px-6 py-4">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="buyprice"
                type="number"
                placeholder="Buy price"
              />
            </td>
            <td class="px-6 py-4">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="sellprice"
                type="number"
                placeholder="Sell price"
              />
            </td>
          </tr>
        
        </tbody> */}


        Axios

        const instance = axios.create({
          baseURL: "https://apidojo-yahoo-finance-v1.p.rapidapi.com",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "eec9e44be8msh08d7e1139de3beap158069jsn78a102ec5b20",
            "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        });
      
        instance
          .get("/auto-complete", {
            params: {
              q: "tesla",
              region: "US",
            },
          })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));

App.js 
