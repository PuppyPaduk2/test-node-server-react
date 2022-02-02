import React, { memo, useState } from "react";

console.log("Module (rules) loaded");

export const Rules = memo(() => {
  const [list, setList] = useState<any[]>([]);

  return (
    <div>
      <h2>Rules</h2>
      <button onClick={() => setList(prev => {
        const next = [...prev, { title: `Rule #${prev.length + 1}` }];

        return next;
      })}>Add rule</button>
      {list.length ? (<ul>
        {list.map(({ title }, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>) : (<div>Rule list is empty</div>)}
    </div>
  );
});
