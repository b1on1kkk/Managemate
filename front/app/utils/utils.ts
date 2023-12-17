import type { Member } from "../redux/features/get_members.slice";

export function DevideIntoGroups(members: Member[]): [Member[], number] {
  const newArray: Member[] = [];
  let residue: number = 0;
  let counter = 0;

  for (let i = 0; i < members.length; i++) {
    counter++;
    if (counter === 5) {
      residue = members.length - i;
      break;
    }
    newArray.push(members[i]);
  }

  return [newArray, residue];
}
