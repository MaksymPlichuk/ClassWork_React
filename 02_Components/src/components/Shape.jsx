const Shape = ({ h, w, color, type }) => {
    let cornerRadius = 0;
    if (type === "circle") {
        cornerRadius = "50%";
    }
    console.log(w, h, color, type)
    return (
        <>
            <div style={{ height: h, width: w, backgroundColor: color, borderRadius: cornerRadius }} ></div>
        </>
    );
}

export default Shape;