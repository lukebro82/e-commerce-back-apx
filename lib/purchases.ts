import { firestore } from "../lib/firestore";
const collection = firestore.collection("orders");

// type Purchase = {
//   id: string;
//   from: string;
//   amount: number;
//   message: string;
//   date: Date;
//   status: string;
// };
// export async function getConfirmedPayments(): Promise<Purchase[]> {
//   const donacionesRef = collection(FirebaseDB, "donaciones");
//   const q = query(donacionesRef, where("status", "==", "confirmed"));
//   const querySnapshot = await getDocs(q);

//   return querySnapshot.docs.map((doc) => {
//     const data = doc.data();
//     return {
//       id: doc.id,
//       from: data.from,
//       amount: data.amount,
//       message: data.message,
//       date: data.date?.toDate ? data.date.toDate() : new Date(data.date),
//       status: data.status,
//     } as Purchase;
//   });
// }
// export async function createPurchase(
//   newPurchInput: Pick<Purchase, "from" | "amount" | "message">
// ): Promise<string> {
//   const purchase = {
//     ...newPurchInput,
//     date: new Date(),
//     status: "pending",
//   };
//   // guardamos esta nueva purchase en la db y devolvemos el id
//   const purchaseRef = collection(FirebaseDB, "donaciones");
//   const docRef = await addDoc(purchaseRef, purchase);

//   return docRef.id;
// }

export async function confirmPurchase(purchaseId: string) {
  // confirmamos la compra en la DB
  try {
    await collection.doc(purchaseId).update({
      status: "confirmed",
    });
    console.log(`Purchase ${purchaseId} confirmed`);
    return true;
  } catch (error) {
    console.error("Error confirming purchase: ", error);
    return false;
  }
}
