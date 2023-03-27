"use server";

export const doDoubling = async (i: number) => {
  console.log("doing server things", i, doDoubling.validator);
  return i * 2;
};

doDoubling.validator = "hi";
