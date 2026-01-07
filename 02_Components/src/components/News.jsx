const News = ({url,text,textURL}) =>{
    return(
        <div>
            <img width={300} src={url} alt="phoyo" />
            <p>{text}</p>
            <p>Link: {textURL}</p>
        </div>
    );
};

export default News;