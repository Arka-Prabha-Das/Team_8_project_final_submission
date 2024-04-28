/* eslint-disable no-async-promise-executor */
import { firestore, auth } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
const getCheckoutURL = (total) => {
  return new Promise(async (resolve, reject) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      reject(new Error("User is not authenticated."));
      return;
    }

    try {
      const checkoutSessionRef = collection(firestore, "users", userId ,"checkout_sessions");
      const docRef = await addDoc(checkoutSessionRef, {
        line_items: [{
          price_data:{
            currency: "usd",
            unit_amount: (total) * 100,
            product_data: {
                name: "New Booking"
              } 
            }, 
          quantity: 1,
        }],
        mode: 'payment',
        invoice_creation: {
          enabled: true,
        }, 
        success_url: window.location.origin + '/success/{CHECKOUT_SESSION_ID}', // Adjust as necessary
        cancel_url: window.location.origin + '/cancel', // Adjust as necessary
      });
      

      const unsubscribe = onSnapshot(docRef, (snap) => {
        const data = snap.data();
        if (!data) {
          return;
        }

        const { error, url } = data;
        if (error) {
          unsubscribe();
          reject(new Error(`An error occurred: ${error.message}`));
        }
        if (url) {
          console.log("Stripe Checkout URL:", url);
          unsubscribe();
          resolve(url);
        }
      });
    } catch (error) {
      reject(new Error("Failed to create checkout session: " + error.message));
    }
  });
};

export  default getCheckoutURL;