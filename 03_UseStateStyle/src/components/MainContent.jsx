import { useState } from "react";

export const MainContent = () => {

    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    return (
        <>
            <h4>Task 1</h4>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>

            <h4>Task 2</h4>
            <div className="counter" style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => setCount2((count2) => count2 + 1)}>+1</button>
                
                <div className="card" style={{ backgroundColor: "grey", borderRadius: 5 }}>
                    {count2}
                </div>
            </div>

            <h4>Task 3</h4>
        </>
    );
}

export const UserButton = ({ ammount, setUserCount }) => {

    return (
        <>
            <button style={{ margin: "5px 5px" }} onClick={() => setUserCount(val => val + parseInt(ammount))}> {ammount} </button>
        </>
    );
}

export const RestaurantInfo = ({ FirstName, FirsAdress, FirsRating, FirsKitchenType, FirsImgUrl }) => {

    const [name, setName] = useState(FirstName);
    const [adress, setAdress] = useState(FirsAdress);
    const [rating, setRating] = useState(FirsRating);
    const [kitchenType, setKitchenType] = useState(FirsKitchenType);
    const [imgUrl, setImgUrl] = useState(FirsImgUrl);

    return (
        <div>
            <h4>Task 4-5</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input style={{ margin: "5px 2px" }} value={name} onChange={(event) => setName(event.target.value)} />
                    <input style={{ margin: "5px 2px" }} value={adress} onChange={(event) => setAdress(event.target.value)} />
                    <input style={{ margin: "5px 2px" }} value={rating} onChange={(event) => setRating(event.target.value)} type="number" max={5} min={0} />
                    <input style={{ margin: "5px 2px" }} value={kitchenType} onChange={(event) => setKitchenType(event.target.value)} />
                    <input style={{ margin: "5px 2px" }} value={imgUrl} onChange={(event) => setImgUrl(event.target.value)} />
                </div>
                <div style={{ margin: "0px 5px" }}>
                    <img style={{ maxWidth: 250, maxHeight: 250 }} src={imgUrl} alt="imgByUser" />
                </div>
            </div>
        </div>
    );
}