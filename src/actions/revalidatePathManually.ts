"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathManually(path: string) {
  revalidatePath(path);
}
