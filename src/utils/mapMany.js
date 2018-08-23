const mapMany = (arr, innerMap) => {
    return [].concat(...arr.map(innerMap));
}

export default mapMany;