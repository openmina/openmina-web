export function truncateMid(value: string, firstSlice: number = 6, secondSlice: number = 6): string {
  if (!value) {
    return '';
  }
  return value.length > (firstSlice + secondSlice) ? value.slice(0, firstSlice) + '...' + value.slice(value.length - secondSlice) : value;
}

export function sort<T = any>(inpArray: T[], sort: any, strings: Array<keyof T>, sortNulls: boolean = false): T[] {
  const sortProperty = sort.sortBy;
  const isStringSorting = strings.includes(sortProperty);
  const array: T[] = [...inpArray];

  let toBeSorted: T[];
  let toNotBeSorted: T[] = [];
  if (sortNulls) {
    toBeSorted = array;
  } else {
    toBeSorted = isStringSorting ? array : array.filter(e => any(e)[sortProperty] !== undefined && any(e)[sortProperty] !== null);
    toNotBeSorted = isStringSorting ? [] : array.filter(e => any(e)[sortProperty] === undefined || any(e)[sortProperty] === null);
  }

  if (isStringSorting) {
    const stringSort = (o1: T, o2: T) => {
      const s2 = (any(o2)[sortProperty] || '') as string;
      const s1 = (any(o1)[sortProperty] || '') as string;
      return sort.sortDirection === 'descending'
        ? (s2).localeCompare(s1)
        : s1.localeCompare(s2);
    };
    toBeSorted.sort(stringSort);
  } else {
    const numberSort = (o1: T, o2: T): number => {
      const o2Sort = (hasValue(any(o2)[sortProperty]) ? any(o2)[sortProperty] : Number.MAX_VALUE) as number;
      const o1Sort = (hasValue(any(o1)[sortProperty]) ? any(o1)[sortProperty] : Number.MAX_VALUE) as number;
      return sort.sortDirection === 'descending'
        ? o2Sort - o1Sort
        : o1Sort - o2Sort;
    };
    toBeSorted.sort(numberSort);
  }

  return [...toBeSorted, ...toNotBeSorted];
}

function hasValue(value: any): boolean {
  return value !== undefined && value !== null;
}

function any(value: any): any {
  return value;
}