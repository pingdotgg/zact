"use server";

export const doDoubling = async (i: number) => {
  console.log("doing server things", i);
  return i * 2;
};
