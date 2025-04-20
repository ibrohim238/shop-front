import {fetchUser} from "@/common/repositories/UserRepository.ts";
import {User} from "@/models/User.ts";

export async function getUser(): Promise<User> {
    const { data } = await fetchUser();

    return User.fromData(data);
}
