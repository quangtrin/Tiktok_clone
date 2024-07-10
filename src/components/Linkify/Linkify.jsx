const Linkify = ({ children, classNameLink }) => {
    const isUrl = (word) => {
        const regex =
            /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
        return regex.test(word);
    };

    const addMarkup = (word) => {
        return isUrl(word) ? `<a class="${classNameLink}" target="_blank" href="${word}">${word}</a>` : word;
    };

    const words = children.split(' ');
    const formatedWords = words.map((w, i) => addMarkup(w));
    const html = formatedWords.join(' ');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Linkify;
