import { firestore } from "../lib/firestore";

const collection = firestore.collection("auth");
export class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id) {
    if (!id) {
      throw new Error("Auth: id must be a non-empty string");
    }
    this.id = id;
    this.ref = collection.doc(id);
  }

  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push() {
    this.ref.update(this.data);
  }

  static async findByEmail(email: string) {
    const cleanEmail = email.toLowerCase().trim();

    const results = await collection.where("email", "==", cleanEmail).get();
    if (results.docs.length) {
      const first = results.docs[0];
      const newAuth = new Auth(first.id);
      newAuth.data = first.data();
      return newAuth;
    } else {
      return null;
    }
  }
  static async createNewAuth(data) {
    const newAuthSnap = await collection.add(data);
    const newAuth = new Auth(newAuthSnap.id);
    newAuth.data = data;
    return newAuth;
  }

  static async findByEmailAndCode(email: string, code: number) {
    const cleanEmail = email.toLowerCase().trim();
    const result = await collection
      .where("email", "==", cleanEmail)
      .where("code", "==", code)
      .get();
    if (result.docs.length) {
      const first = result.docs[0];
      const newAuth = new Auth(first.id);
      newAuth.data = first.data();
      return newAuth;
    } else {
      return null;
    }
  }
}
