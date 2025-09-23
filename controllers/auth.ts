import { User } from "models/users";
import { Auth } from "models/auth";
import gen from "random-seed";
import { addMinutes } from "date-fns/addMinutes";
let seed = "lalala";
let random = gen.create(seed);

export async function findOrCreateAuth(email: string): Promise<Auth> {
  const cleanEmail = email.toLowerCase().trim();
  const result = await Auth.findByEmail(cleanEmail);
  // const;
  if (result) {
    return result;
  } else {
    const newUser = await User.createNewuser({ email: cleanEmail });
    const newAuth = Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      // code: "",
      // expires: new Date(),
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  return auth;
}
