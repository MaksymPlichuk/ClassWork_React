const News = ({ url, text, textURL }) => {
    return (
        <div className="letter">
            <img width={300} src={url} alt="photo" />
            <p>{text}</p>
            <p>Link: <a href={textURL} target=" " className="urlLink">{textURL}</a></p>
        </div>
    );
};

export default News;