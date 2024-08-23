import React, {type ReactElement } from "react"

const createPaginationList = (max: number, page: number, setPage: React.Dispatch<React.SetStateAction<number>>): ReactElement<{}, any>[] => {
  const list = [] as ReactElement[];
  for (let i = 0; i <= (max > 11 ? 11 : max); i++) {
    let dis = 1;
    if (page < 10) dis = i+1;
    else dis = (i - (page%10)) + page-1;
    list.push(
      <li className={dis === page ? "current" : ""} onClick={() => setPage(dis)} key={i}>{dis}</li>
    );
  }
  return list;
}

export const Pagination: React.FC<{ max: number, current: number, setPage: React.Dispatch<React.SetStateAction<number>> }>
= ({ max, current, setPage }) =>
<div className="pagination-nav">
  <ul>
    {createPaginationList(max, current, setPage)}
  </ul>
</div>
