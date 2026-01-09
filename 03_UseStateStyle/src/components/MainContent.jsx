import { useState } from "react";

export const MainContent = () => {

    const [count, setCount] = useState(0);

    return (
        <>
            <h4>Task 1</h4>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>

            <h4>Task 2</h4>
            <div className="counter">
                <button onClick={() => setCount((count) => count + 1)}>
                    +1
                </button>
                <div className="card" style={{ backgroundColor: "grey" }}>
                    {count}
                </div>
            </div>

            <h4>Task 3</h4>

        </>
    );
}
export const UserButton = ({ ammount }) => {

    let fullNum = ammount.split("+");
    if (fullNum.length == 1)  {
        fullNum = ammount.split("-");
    }


    let num = parseInt(fullNum[1])
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount((count) => count + num)}> {ammount} </button>
        </div>
    );
}